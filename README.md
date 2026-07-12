# 🎬 Bobine

Bobine est une application de watchlist cinématographique qui permet de suivre, organiser et prioriser les films et séries que tu veux regarder — avec une expérience fluide et interactive.

## ✨ Fonctionnalités

- 📌 Ajouter des films/séries à ta watchlist
- 🔀 Réorganisation par glisser-déposer (drag-and-drop) grâce à Framer Motion (`Reorder`)
- ⚡ Interface réactive avec mises à jour optimistes (optimistic UI) — les actions s'affichent instantanément sans attendre la réponse serveur
- 🎨 UI moderne construite avec shadcn/ui (variante Base UI)
- 💾 Persistance des données via Prisma ORM et SQLite

## 🛠️ Stack technique

| Catégorie       | Technologie         |
| --------------- | ------------------- |
| Framework       | Next.js             |
| Base de données | SQLite              |
| ORM             | Prisma              |
| UI Components   | shadcn/ui (Base UI) |
| Animations      | Framer Motion       |
| Langage         | TypeScript          |

## 🚀 Installation

### Prérequis

- Node.js (v18 ou supérieur recommandé)
- npm, yarn ou pnpm

### Étapes

```bash
# Cloner le projet
git clone https://github.com/YOYOMANU/Bobine-
cd bobine

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
```

Renseigne les variables nécessaires dans `.env`, notamment l'URL de la base de données :

```env
DATABASE_URL="file:./dev.db"
```

### Base de données

```bash
# Appliquer les migrations Prisma
npx prisma migrate dev

# (optionnel) Générer le client Prisma
npx prisma generate
```

### Lancer le projet

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

## 📁 Structure du projet

```
bobine/
├── prisma/
│   ├── schema.prisma       # Schéma de la base de données
│   └── migrations/         # Historique des migrations
├── app/                     # Routes et pages Next.js
├── components/
│   ├── ui/                 # Composants shadcn/ui
│   └── ...                 # Composants métier (watchlist, drag-and-drop, etc.)
├── lib/                     # Utilitaires, client Prisma, helpers
└── public/                  # Assets statiques
```

## 🧩 Points d'implémentation notables

- **Drag-and-drop** : utilisation du composant `Reorder` de Framer Motion pour permettre de réordonner la watchlist de façon fluide et animée.
- **Optimistic UI** : les actions (ajout, suppression, réordonnancement) mettent à jour l'état local immédiatement, puis sont synchronisées en arrière-plan avec la base de données via Prisma.
- **Migrations Prisma** : le schéma évolue via des migrations versionnées, permettant de suivre les changements de structure de la base SQLite.

## 📝 Scripts disponibles

| Commande            | Description                       |
| ------------------- | --------------------------------- |
| `npm run dev`       | Lance le serveur de développement |
| `npm run build`     | Build de production               |
| `npm run start`     | Lance l'application en production |
| `npx prisma studio` | Interface graphique pour la BDD   |

## 🤝 Contribution

Ce projet est développé et maintenu par [Yoann](#). Toute suggestion ou contribution est la bienvenue via issues ou pull requests.

## 📄 Licence

Projet personnel — usage privé
