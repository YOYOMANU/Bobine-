import { prisma } from "@/lib/prisma";

export async function seedTiers() {
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

    console.log(`✅ ${tiers.length} tiers créés`);
} 