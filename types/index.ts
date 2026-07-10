export interface Category {
    id: number,
    name: string;
    // watchItems: WatchItem[]
}


// interface Tier {
//     id: number
//     name: string
//     order: number
//     watchItems: WatchItem[]
// }

// interface WatchItem {
//     id: number
//     title: string
//     type: "film" | "serie"
//     posterUrl?: string
//     categoryId: number
//     category: Category
//     tierId: number
//     createdAt: Date
// }


export type ItemType = "film" | "serie";
export type TierKey =
    | "avoir"
    | "super"
    | "adorable"
    | "tresbien"
    | "bien"
    | "passable";

export interface TierConfig {
    key: TierKey;
    label: string;
    color: string;
    icon: string;
    score: number | null;
}

export interface WatchItem {
    id: number;
    title: string;
    type: ItemType;
    genre: string;
    tier: TierKey;
    fav: boolean;
    hue: [number, number, number];
    image: string;
}