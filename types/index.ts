export type ItemType = "film" | "serie";

export interface Category {
    id: number;
    name: string;
    watchItems?: WatchItem[];
}

export interface WatchItem {
    id: number;
    title: string;
    synopsis: string;
    type: ItemType;
    favorite: boolean;
    image: string | null;
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

export interface TierConfig {
    key: string;
    label: string;
    score: number | null;
}