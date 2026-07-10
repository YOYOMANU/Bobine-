import { prisma } from "@/lib/prisma";

export async function seedWatchItems() {
    const scifi = await prisma.category.findFirstOrThrow({
        where: { name: "Science-Fiction" },
    });

    await prisma.watchItem.createMany({
        data: [
            { title: "Dune: Part Two", type: "film", categoryId: scifi.id },
            { title: "The Bear", type: "serie", categoryId: scifi.id },
        ],
    });

    console.log("✅ Watch items créés");
}