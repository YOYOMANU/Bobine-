import { prisma } from "@/lib/prisma";
import { seedCategories } from "./seeders/categories.seed";
import { seedTiers } from "./seeders/tiers.seed";
import { seedWatchItems } from "./seeders/watchItems.seed";

async function main() {
    console.log("🌱 Début du seed...\n");

    // Ordre important : respecter les dépendances (FK)
    await seedCategories();
    await seedTiers();
    await seedWatchItems();

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