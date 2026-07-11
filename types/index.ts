export type ItemType = "film" | "serie";

export interface Category {
    id: number;
    name: string;
    watchItems?: WatchItem[];
}

export interface WatchItem {
    id: number;
    title: string;
    type: ItemType;
    favorite: boolean;
    image: string | null;
    posterUrl: string | null;
    categories: Category[];
    tierId: number | null;
    tier?: Tier | null;
    position: number;
    createdAt: Date;
}

export interface Tier {
    id: number;
    name: string;
    order: number;
    score: number | null;
    watchItems?: WatchItem[];
}