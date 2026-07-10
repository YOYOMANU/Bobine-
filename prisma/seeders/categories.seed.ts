import { prisma } from "@/lib/prisma";

export async function seedCategories() {
    const categories = await prisma.category.createMany({
        data: [
            { name: "Action" },
            { name: "Science-Fiction" },
            { name: "Drame" },
            { name: "Comédie" },
        ],
    });

    console.log(`✅ ${categories.count} catégories créées`);
}