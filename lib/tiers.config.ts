import { TierConfig } from "@/types";

export const tiersConfig: TierConfig[] = [
    { key: "avoir", label: "À voir", color: "var(--tier-avoir)", icon: "📋", score: null },
    { key: "super", label: "Super", color: "var(--tier-super)", icon: "👑", score: 5 },
    { key: "adorable", label: "Adorable", color: "var(--tier-adorable)", icon: "💖", score: 4 },
    { key: "tresbien", label: "Très bien", color: "var(--tier-tresbien)", icon: "✨", score: 3 },
    { key: "bien", label: "Bien", color: "var(--tier-bien)", icon: "👍", score: 2 },
    { key: "passable", label: "Passable", color: "var(--tier-passable)", icon: "👀", score: 1 },
];  