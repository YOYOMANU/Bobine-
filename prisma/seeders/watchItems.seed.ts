import { prisma } from "@/lib/prisma";
import { initialItems } from "@/lib/mock-data";
import { tiersConfig } from "@/lib/tiers.config";

export async function seedWatchItems() {
    const categories = await prisma.category.findMany();
    const categoryIdByName = new Map(categories.map((c) => [c.name, c.id]));

    const tiers = await prisma.tier.findMany();
    const tierIdByName = new Map(tiers.map((t) => [t.name, t.id]));

    const tierLabelByKey = new Map(tiersConfig.map((t) => [t.key, t.label]));

    for (const item of initialItems) {
        const categoryId = categoryIdByName.get(item.genre);
        if (!categoryId) {
            throw new Error(
                `Catégorie introuvable pour le genre "${item.genre}" (item: "${item.title}")`
            );
        }

        const tierLabel = tierLabelByKey.get(item.tier);
        const tierId = tierLabel ? tierIdByName.get(tierLabel) ?? null : null;

        await prisma.watchItem.create({
            data: {
                title: item.title,
                type: item.type,
                favorite: item.favorite,
                image: item.image || null,
                tierId,
                categories: {
                    connect: [{ id: categoryId }],
                },
            },
        });
    }

    console.log(`✅ ${initialItems.length} watch items créés`);
}