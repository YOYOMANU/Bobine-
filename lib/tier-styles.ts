import {
    Crown,
    Heart,
    Trophy,
    ThumbsUp,
    Meh,
    ThumbsDown,
    type LucideIcon,
} from "lucide-react";
import type { WatchItem } from "@/types";

export interface TierStyle {
    icon: LucideIcon;
    color: string;
}

// Style par palier (icône + couleur), cyclique selon `order`.
// Les couleurs pointent vers les variables définies dans globals.css
// (--tier-super, --tier-adorable, etc.) pour rester cohérentes avec le
// reste du design system, au lieu de hex codés en dur.
export const TIER_STYLES: TierStyle[] = [
    { icon: Crown, color: "var(--tier-super)" }, // 1er palier
    { icon: Heart, color: "var(--tier-adorable)" },
    { icon: Trophy, color: "var(--tier-tresbien)" },
    { icon: ThumbsUp, color: "var(--tier-bien)" },
    { icon: Meh, color: "var(--tier-passable)" },
    { icon: ThumbsDown, color: "var(--tier-avoir)" },
];

export function getTierStyle(order: number): TierStyle {
    return TIER_STYLES[order % TIER_STYLES.length];
}

export function getDefaultBackground(item: WatchItem): string {
    const url = item.posterUrl ?? item.image;
    return url ? `url(${url})` : "none";
}