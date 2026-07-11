import { prisma } from "@/lib/prisma";

export async function seedCategories() {
    const categories = [
        { name: "Drame" },
        { name: "Science-fiction" },
        { name: "Thriller" },
        { name: "Animation" },
        { name: "Cinéma africain" },
        { name: "Comédie" },
    ];

    for (const category of categories) {
        await prisma.category.upsert({
            where: { name: category.name },
            update: {},
            create: category,
        });
    }

    console.log(`✅ ${categories.length} catégories créées`);
}