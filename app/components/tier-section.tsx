"use client";

import type { CSSProperties } from "react";
import { Reorder, type PanInfo } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import type { Tier, WatchItem } from "@/types";
import { getTierStyle } from "@/lib/tier-styles";
import { WatchItemCard } from "./watch-item-card";

interface TierSectionProps {
    tier: Tier;
    animationDelay?: number;
    getCardBackground?: (item: WatchItem) => string;
    onToggleFav: (id: number) => void;
    onEditItem: (item: WatchItem) => void;
    onViewItem?: (item: WatchItem) => void;
    onReorderTier?: (tierId: number, orderedIds: number[]) => void;
    onMoveItem?: (itemId: number, fromTierId: number, toTierId: number) => void;
}

export function TierSection({
    tier,
    animationDelay = 0,
    getCardBackground,
    onToggleFav,
    onEditItem,
    onViewItem,
    onReorderTier = () => { },
    onMoveItem = () => { },
}: TierSectionProps) {
    const { icon: TierIcon, color } = getTierStyle(tier.order);
    const items = tier.watchItems ?? [];
    const tierVars = { "--tier-color": color } as CSSProperties;

    const handleCardDragEnd = (item: WatchItem, info: PanInfo) => {
        // info.point est en coordonnées PAGE (inclut le scroll), alors que
        // elementFromPoint attend des coordonnées VIEWPORT — sans cette
        // correction, le hit-test se décale dès que la page est scrollée.
        const x = info.point.x - window.scrollX;
        const y = info.point.y - window.scrollY;

        const target = document.elementFromPoint(x, y);
        const targetRow = target?.closest<HTMLElement>("[data-tier]");
        if (!targetRow) return;

        const targetTierId = Number(targetRow.dataset.tier);
        if (targetTierId && targetTierId !== tier.id) {
            onMoveItem(item.id, tier.id, targetTierId);
        }
    };

    return (
        <div
            style={{ ...tierVars, animationDelay: `${animationDelay}ms` }}
            className="animate-in fade-in slide-in-from-bottom-3 duration-700"
        >
            {/* Header du tier */}
            <div className="flex items-center gap-3.5 mb-4">
                <div
                    className="flex h-11 w-11 items-center justify-center rounded-full shadow-[0_0_22px_-4px_var(--tier-color)] shrink-0"
                    style={{
                        background: `linear-gradient(135deg, color-mix(in srgb, ${color} 20%, transparent), color-mix(in srgb, ${color} 5%, transparent))`,
                        border: `1px solid color-mix(in srgb, ${color} 33%, transparent)`,
                    }}
                >
                    <TierIcon className="h-5 w-5" style={{ color }} strokeWidth={2.25} />
                </div>

                <div className="flex items-baseline gap-2.5">
                    <span
                        className="font-serif text-xl tracking-tight text-foreground"
                        style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)" }}
                    >
                        {tier.name}
                    </span>
                    {typeof tier.score === "number" && (
                        <span className="text-xs font-medium" style={{ color }}>
                            {tier.score.toFixed(1)} / 10
                        </span>
                    )}
                </div>

                <div
                    className="ml-auto h-px flex-1 max-w-24 hidden sm:block"
                    style={{
                        background: `linear-gradient(to right, color-mix(in srgb, ${color} 40%, transparent), transparent)`,
                    }}
                />

                <Badge
                    variant="outline"
                    className="text-[11px] font-medium tracking-wide"
                    style={{
                        borderColor: `color-mix(in srgb, ${color} 27%, transparent)`,
                        color,
                    }}
                >
                    {items.length} titre{items.length > 1 ? "s" : ""}
                </Badge>
            </div>

            {/* Rangée de cartes — Reorder.Group gère le drag interne au tier */}
            <Reorder.Group
                as="div"
                axis="x"
                values={items}
                onReorder={(newOrder) =>
                    onReorderTier(tier.id, newOrder.map((it) => it.id))
                }
                data-tier={tier.id}
                className="relative flex flex-wrap gap-4 rounded-2xl border p-4 min-h-[10.5rem] transition-colors"
                style={{
                    borderColor: `color-mix(in srgb, ${color} 13%, transparent)`,
                    background: `linear-gradient(160deg, color-mix(in srgb, ${color} 4%, transparent), transparent 55%)`,
                }}
            >
                {items.length === 0 ? (
                    <TierEmptyState />
                ) : (
                    items.map((item) => (
                        <WatchItemCard
                            key={item.id}
                            item={item}
                            getCardBackground={getCardBackground}
                            onToggleFav={onToggleFav}
                            onEdit={onEditItem}
                            onView={onViewItem}
                            onCardDragEnd={(info) => handleCardDragEnd(item, info)}
                        />
                    ))
                )}
            </Reorder.Group>
        </div>
    );
}

function TierEmptyState() {
    return (
        <div className="flex w-full flex-col items-center justify-center gap-2 py-8 text-muted-foreground">
            <Sparkles className="h-5 w-5 opacity-40" />
            <span className="text-xs tracking-wide">Déposez un titre dans ce palier</span>
        </div>
    );
}