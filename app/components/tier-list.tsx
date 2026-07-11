"use client";

import { LayoutGroup } from "framer-motion";
import type { Tier, WatchItem } from "@/types";
import { TierSection } from "./tier-section";

interface TierListProps {
    tiers: Tier[];
    getCardBackground?: (item: WatchItem) => string;
    onToggleFav: (id: number) => void;
    onEditItem: (item: WatchItem) => void;
    onViewItem?: (item: WatchItem) => void;
    onReorderTier?: (tierId: number, orderedIds: number[]) => void;
    onMoveItem?: (itemId: number, fromTierId: number, toTierId: number) => void;
}

export function TierList({
    tiers,
    getCardBackground,
    onToggleFav,
    onEditItem,
    onViewItem,
    onReorderTier,
    onMoveItem,
}: TierListProps) {
    return (
        <LayoutGroup>
            <div id="tiers" className="space-y-10 mt-10">
                {tiers.map((tier, index) => (
                    <TierSection
                        key={tier.id}
                        tier={tier}
                        animationDelay={index * 90}
                        getCardBackground={getCardBackground}
                        onToggleFav={onToggleFav}
                        onEditItem={onEditItem}
                        onViewItem={onViewItem}
                        onReorderTier={onReorderTier}
                        onMoveItem={onMoveItem}
                    />
                ))}
            </div>
        </LayoutGroup>
    );
}