import { prisma } from "@/lib/prisma";

export async function seedTiers() {
    const tiers = [
        { name: "Super", order: 1 },
        { name: "Adorable", order: 2 },
        { name: "Très bien", order: 3 },
        { name: "Bien", order: 4 },
        { name: "Passable", order: 5 },
        { name: "À voir", order: 6 },
    ];

    for (const tier of tiers) {
        await prisma.tier.upsert({
            where: { name: tier.name },
            update: {},
            create: tier,
        });
    }

    console.log(`✅ ${tiers.length} tiers créés`);
}