import { WatchItem } from "@/types";

export const initialGenres = [
    "Drame",
    "Science-fiction",
    "Thriller",
    "Animation",
    "Cinéma africain",
    "Comédie",
];

export const initialItems: WatchItem[] = [
    { id: 1, title: "La Nuit des rois", type: "film", genre: "Cinéma africain", tier: "super", fav: true, hue: [200, 55, 30], image: "" },
    { id: 2, title: "Dune : Deuxième partie", type: "film", genre: "Science-fiction", tier: "adorable", fav: false, hue: [35, 50, 26], image: "" },
    { id: 3, title: "Parasite", type: "film", genre: "Drame", tier: "super", fav: true, hue: [150, 22, 20], image: "" },
    { id: 4, title: "Oppenheimer", type: "film", genre: "Drame", tier: "tresbien", fav: false, hue: [20, 38, 23], image: "" },
    { id: 5, title: "Souleymane", type: "film", genre: "Cinéma africain", tier: "avoir", fav: false, hue: [10, 50, 28], image: "" },
    { id: 6, title: "Gone Girl", type: "film", genre: "Thriller", tier: "bien", fav: false, hue: [260, 28, 18], image: "" },
    { id: 7, title: "Spider-Man: Across the Spider-Verse", type: "film", genre: "Animation", tier: "super", fav: true, hue: [280, 55, 28], image: "" },
    { id: 8, title: "La Zone d'intérêt", type: "film", genre: "Drame", tier: "passable", fav: false, hue: [0, 0, 16], image: "" },
    { id: 9, title: "The Bear", type: "serie", genre: "Comédie", tier: "adorable", fav: true, hue: [24, 44, 26], image: "" },
    { id: 10, title: "Dark", type: "serie", genre: "Science-fiction", tier: "tresbien", fav: false, hue: [210, 30, 18], image: "" },
    { id: 11, title: "Fargo", type: "serie", genre: "Thriller", tier: "bien", fav: false, hue: [45, 40, 24], image: "" },
    { id: 12, title: "Shôgun", type: "serie", genre: "Drame", tier: "avoir", fav: false, hue: [15, 35, 20], image: "" },
];