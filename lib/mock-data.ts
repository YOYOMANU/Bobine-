
// lib/mock-data.ts

import { TierConfig } from "@/types";

export const initialGenres = [
    "Drame",
    "Science-Fiction", // (Attention à la casse : correspond à ton mock-data)
    "Thriller",
    "Animation",
    "Cinéma africain",
    "Comédie",
    "Fantastique",
    "Action"
];



export const tiersConfig: TierConfig[] = [
    { key: "avoir", label: "À voir", score: null },
    { key: "super", label: "Super", score: 5 },
    { key: "adorable", label: "Adorable", score: 4 },
    { key: "tresbien", label: "Très bien", score: 3 },
    { key: "bien", label: "Bien", score: 2 },
    { key: "passable", label: "Passable", score: 1 },
];

export const initialItems = [
    { title: "Inception", type: "film", synopsis: "Un voleur de rêves infiltre le subconscient.", favorite: true, genre: "Science-Fiction", image: null },
    { title: "Breaking Bad", type: "serie", synopsis: "Un prof de chimie devient baron de la drogue.", favorite: true, genre: "Drame", image: null },
    { title: "The Vampire Diaries", type: "serie", synopsis: "Deux frères vampires aiment la même lycéenne.", favorite: false, genre: "Fantastique", image: null },
    { title: "Heroes", type: "serie", synopsis: "Des personnes ordinaires découvrent des super-pouvoirs.", favorite: false, genre: "Science-Fiction", image: null },
    { title: "Supernatural", type: "serie", synopsis: "Deux frères chassent des créatures surnaturelles.", favorite: true, genre: "Fantastique", image: null },
    { title: "Avengers", type: "film", synopsis: "Les super-héros s'unissent pour sauver la Terre.", favorite: true, genre: "Action", image: null },
    { title: "La Casa de Papel", type: "serie", synopsis: "Un casse ingénieux dans la Fabrique de la monnaie.", favorite: false, genre: "Thriller", image: null },
    { title: "Devs", type: "serie", synopsis: "Une ingénieure enquête sur une division technologique secrète.", favorite: false, genre: "Science-Fiction", image: null },
    { title: "Silicon Valley", type: "serie", synopsis: "Les galères d'une startup dans la tech.", favorite: false, genre: "Comédie", image: null },
    { title: "Avatar", type: "film", synopsis: "Un soldat découvre la planète Pandora.", favorite: false, genre: "Science-Fiction", image: null },
    { title: "Black Mirror", type: "serie", synopsis: "Une anthologie sur les dérives technologiques.", favorite: true, genre: "Science-Fiction", image: null },
    { title: "The Dark Knight", type: "film", synopsis: "Batman affronte le chaos du Joker.", favorite: true, genre: "Action", image: null },
    { title: "Stranger Things", type: "serie", synopsis: "Des disparitions mystérieuses dans une petite ville.", favorite: true, genre: "Fantastique", image: null },
    { title: "Interstellar", type: "film", synopsis: "Un voyage spatial pour sauver l'humanité.", favorite: true, genre: "Science-Fiction", image: null },
    { title: "Dark", type: "serie", synopsis: "Une disparition d'enfant lie quatre familles dans le temps.", favorite: true, genre: "Science-Fiction", image: null },
    { title: "Game of Thrones", type: "serie", synopsis: "Des familles nobles luttent pour le trône de fer.", favorite: true, genre: "Fantastique", image: null },
    { title: "The Witcher", type: "serie", synopsis: "Un chasseur de monstres solitaire croise le destin d'une magicienne.", favorite: false, genre: "Fantastique", image: null },
    { title: "Mr. Robot", type: "serie", synopsis: "Un hackeur socialement instable veut renverser le système.", favorite: true, genre: "Thriller", image: null },
    { title: "The Mandalorian", type: "serie", synopsis: "Un chasseur de primes solitaire dans la galaxie Star Wars.", favorite: true, genre: "Science-Fiction", image: null },
    { title: "Fight Club", type: "film", synopsis: "Un homme insatisfait crée un club de combat clandestin.", favorite: true, genre: "Drame", image: null },
    { title: "Rick and Morty", type: "serie", synopsis: "Un savant fou et son petit-fils voyagent dans le multivers.", favorite: true, genre: "Science-Fiction", image: null },
    { title: "Westworld", type: "serie", synopsis: "Un parc d'attractions peuplé d'androïdes devient dangereux.", favorite: false, genre: "Science-Fiction", image: null },
    { title: "Parasite", type: "film", synopsis: "Une famille pauvre s'infiltre dans le quotidien d'une famille riche.", favorite: true, genre: "Thriller", image: null },
    { title: "The Boys", type: "serie", synopsis: "Un groupe de justiciers combat des super-héros corrompus.", favorite: true, genre: "Action", image: null },
    { title: "Blade Runner 2049", type: "film", synopsis: "Un policier découvre un secret enfoui depuis longtemps.", favorite: false, genre: "Science-Fiction", image: null },
    { title: "Sherlock", type: "serie", synopsis: "Le célèbre détective résout des crimes dans le Londres moderne.", favorite: true, genre: "Thriller", image: null },
    { title: "Arcane", type: "serie", synopsis: "Deux sœurs se retrouvent dans des camps opposés durant une guerre.", favorite: true, genre: "Science-Fiction", image: null },
    { title: "Joker", type: "film", synopsis: "L'ascension tragique d'un comédien vers la folie.", favorite: false, genre: "Drame", image: null },
    { title: "The Handmaid's Tale", type: "serie", synopsis: "Une société dystopique où les femmes sont réduites en esclavage.", favorite: false, genre: "Drame", image: null },
    { title: "Matrix", type: "film", synopsis: "Un hacker découvre que son monde est une simulation.", favorite: true, genre: "Science-Fiction", image: null },
    { title: "Mindhunter", type: "serie", synopsis: "Des agents du FBI créent le profilage des tueurs en série.", favorite: true, genre: "Thriller", image: null },
    { title: "The Office", type: "serie", synopsis: "Le quotidien absurde d'une entreprise de papier.", favorite: false, genre: "Comédie", image: null },
    { title: "Dune", type: "film", synopsis: "Un jeune noble doit protéger la ressource la plus précieuse.", favorite: true, genre: "Science-Fiction", image: null },
    { title: "Peaky Blinders", type: "serie", synopsis: "Une famille de gangsters britanniques dans les années 1920.", favorite: true, genre: "Thriller", image: null },
    { title: "Tenet", type: "film", synopsis: "Un agent lutte contre le temps pour sauver le monde.", favorite: false, genre: "Science-Fiction", image: null },
    { title: "True Detective", type: "serie", synopsis: "Deux inspecteurs traquent un tueur en série.", favorite: true, genre: "Thriller", image: null },
    { title: "Pulp Fiction", type: "film", synopsis: "Les destins croisés de malfrats à Los Angeles.", favorite: true, genre: "Drame", image: null },
    { title: "The Last of Us", type: "serie", synopsis: "Un survivant escorte une ado immunisée.", favorite: true, genre: "Science-Fiction", image: null },
    { title: "Friends", type: "serie", synopsis: "Le quotidien de six amis new-yorkais.", favorite: false, genre: "Comédie", image: null },
    { title: "Seven", type: "film", synopsis: "Deux détectives traquent un tueur aux sept péchés.", favorite: true, genre: "Thriller", image: null },
    { title: "Foundation", type: "serie", synopsis: "La chute d'un empire galactique.", favorite: false, genre: "Science-Fiction", image: null },
    { title: "Seigneur des Anneaux", type: "film", synopsis: "Un hobbit doit détruire l'anneau unique.", favorite: true, genre: "Fantastique", image: null },
    { title: "Severance", type: "serie", synopsis: "Séparation chirurgicale du travail et du privé.", favorite: true, genre: "Science-Fiction", image: null },
    { title: "Star Wars", type: "film", synopsis: "Lutte entre la Rébellion et l'Empire.", favorite: true, genre: "Science-Fiction", image: null },
    { title: "Lost", type: "serie", synopsis: "Survivants d'un crash sur une île mystérieuse.", favorite: false, genre: "Science-Fiction", image: null },
    { title: "Narcos", type: "serie", synopsis: "La traque des barons de la drogue en Colombie.", favorite: true, genre: "Thriller", image: null },
    { title: "Cowboy Bebop", type: "serie", synopsis: "Chasseurs de primes dans l'espace.", favorite: true, genre: "Science-Fiction", image: null },
    { title: "Gladiator", type: "film", synopsis: "Un général trahi devient gladiateur.", favorite: true, genre: "Action", image: null },
    { title: "Breaking Bad", type: "serie", synopsis: "Un prof devient baron de la drogue.", favorite: true, genre: "Drame", image: null },
    { title: "The Office", type: "serie", synopsis: "Vie de bureau hilarante.", favorite: false, genre: "Comédie", image: null }
];