import { prisma } from "@/lib/prisma";
import { seedCategories } from "./seeders/categories.seed";
import { seedDatabase } from "./seeders/database.seed";

async function main() {
    console.log("🌱 Début du seed...\n");

    // Ordre important : respecter les dépendances (FK)
    await seedCategories();
    await seedDatabase();
    // await seedWatchItems();

    console.log("\n🌱 Seed terminé avec succès");
}

main()
    .catch((e) => {
        console.error("❌ Erreur pendant le seed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });