import { initialItems, tiersConfig } from "@/lib/mock-data";
import { prisma } from "@/lib/prisma";

export async function seedWatchItems() {
    const categories = await prisma.category.findMany();
    const categoryIdByName = new Map(categories.map((c) => [c.name, c.id]));

    const tiers = await prisma.tier.findMany();
    if (tiers.length === 0) {
        throw new Error(
            "❌ Aucun tier trouvé en base. Lance seedTiers() AVANT seedWatchItems()."
        );
    }
    const tierIdByName = new Map(tiers.map((t) => [t.name, t.id]));
    const tierLabelByKey = new Map(tiersConfig.map((t) => [t.key, t.label]));

    let created = 0;
    let missingTier = 0;

    for (const item of initialItems) {
        const categoryId = categoryIdByName.get(item.genre);
        if (!categoryId) {
            console.warn(`⚠️ Catégorie introuvable pour "${item.genre}", item "${item.title}" ignoré.`);
            continue;
        }

        const tierLabel = tierLabelByKey.get(item.tier);
        const tierId = tierLabel ? tierIdByName.get(tierLabel) ?? null : null;

        if (!tierId) {
            missingTier++;
            console.warn(
                `⚠️ Tier introuvable pour item.tier="${item.tier}" (label résolu="${tierLabel}") — "${item.title}" créé SANS tier.`
            );
        }

        await prisma.watchItem.create({
            data: {
                title: item.title,
                type: item.type as any,
                synopsis: item.synopsis,
                favorite: item.favorite,
                image: item.image || null,
                posterUrl: item.posterUrl || null,
                tierId,
                categories: { connect: [{ id: categoryId }] },
            },
        });
        created++;
    }

    console.log(`✅ ${created} watch items créés (${missingTier} sans tier).`);
}