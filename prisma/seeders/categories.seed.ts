import { initialGenres } from "@/lib/mock-data";
import { prisma } from "@/lib/prisma";

export async function seedCategories() {
    // 1. On itère sur les noms des genres
    for (const genreName of initialGenres) {
        await prisma.category.upsert({
            // On cherche par le nom
            where: { name: genreName },
            // S'il existe, on ne change rien
            update: {},
            // S'il n'existe pas, on le crée
            create: { name: genreName },
        });
    }

    // 2. Pour loguer le nombre, on récupère le total en base
    const count = await prisma.category.count();
    console.log(`✅ ${count} catégories sont présentes en base.`);
}