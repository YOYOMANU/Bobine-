import { initialItems, tiersConfig } from "@/lib/mock-data";
import { prisma } from "@/lib/prisma";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function getRandomTierKey(): string {
    const index = Math.floor(Math.random() * tiersConfig.length);
    return tiersConfig[index].key;
}

// Interroge TMDB pour récupérer l'affiche réelle d'un titre
async function fetchPosterUrl(title: string, type: "film" | "serie"): Promise<string | null> {
    if (!TMDB_API_KEY) {
        console.warn("⚠️ TMDB_API_KEY manquante dans .env — les affiches ne seront pas récupérées.");
        return null;
    }

    const endpoint = type === "film" ? "search/movie" : "search/tv";

    try {
        const res = await fetch(
            `${TMDB_BASE}/${endpoint}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&language=fr-FR`
        );
        if (!res.ok) {
            console.warn(`⚠️ Échec requête TMDB pour "${title}" (status ${res.status})`);
            return null;
        }

        const data = await res.json();
        const posterPath = data.results?.[0]?.poster_path;
        return posterPath ? `${TMDB_IMAGE_BASE}${posterPath}` : null;
    } catch (error) {
        console.warn(`⚠️ Erreur réseau TMDB pour "${title}":`, error);
        return null;
    }
}

// Petite pause pour ne pas se faire rate-limiter par TMDB
function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function seedDatabase() {
    // 1. Création des Tiers
    const tiers = [
        { name: "Super", order: 1, score: 5 },
        { name: "Adorable", order: 2, score: 4 },
        { name: "Très bien", order: 3, score: 3 },
        { name: "Bien", order: 4, score: 2 },
        { name: "Passable", order: 5, score: 1 },
        { name: "À voir", order: 6, score: null },
    ];

    for (const tier of tiers) {
        await prisma.tier.upsert({
            where: { name: tier.name },
            update: { score: tier.score, order: tier.order },
            create: tier,
        });
    }
    console.log("✅ Tiers créés");

    // 2. Récupère les catégories déjà seedées
    const categories = await prisma.category.findMany();
    const categoryIdByName = new Map(categories.map((c) => [c.name, c.id]));

    // 3. Insertion des WatchItems
    let inserted = 0;
    let missingCategory = 0;
    let missingPoster = 0;

    for (const item of initialItems) {
        const randomKey = getRandomTierKey();
        const tierConfig = tiersConfig.find((t) => t.key === randomKey)!;
        const targetTier = await prisma.tier.findUnique({ where: { name: tierConfig.label } });

        if (!targetTier) {
            console.warn(`⚠️ Tier "${tierConfig.label}" introuvable en base — vérifie l'étape 1.`);
            continue;
        }

        const categoryId = categoryIdByName.get(item.genre);
        if (!categoryId) {
            missingCategory++;
            console.warn(`⚠️ Catégorie introuvable pour "${item.genre}" ("${item.title}")`);
        }

        const image = await fetchPosterUrl(item.title, item.type as "film" | "serie");
        if (!image) missingPoster++;

        await prisma.watchItem.upsert({
            where: { title: item.title },
            update: {
                type: item.type as any,
                synopsis: item.synopsis,
                favorite: item.favorite,
                image,
                tierId: targetTier.id,
                ...(categoryId && { categories: { set: [{ id: categoryId }] } }),
            },
            create: {
                title: item.title,
                type: item.type as any,
                synopsis: item.synopsis,
                favorite: item.favorite,
                image,
                tierId: targetTier.id,
                ...(categoryId && { categories: { connect: [{ id: categoryId }] } }),
            },
        });
        inserted++;

        // Pause pour rester sous la limite de requêtes TMDB (~40 req/10s)
        await sleep(150);
    }

    console.log(`✅ ${inserted} items insérés (${missingCategory} sans catégorie, ${missingPoster} sans affiche trouvée).`);
}