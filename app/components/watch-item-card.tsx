"use client";

import { useRef } from "react";
import { Reorder, type PanInfo } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clapperboard, Tv, Star } from "lucide-react";
import type { WatchItem } from "@/types";
import { getDefaultBackground } from "@/lib/tier-styles";

interface WatchItemCardProps {
    item: WatchItem;
    getCardBackground?: (item: WatchItem) => string;
    onToggleFav: (id: number) => void;
    onEdit: (item: WatchItem) => void;
    /** Simple clic (sans drag) : ouvre la vue détails. */
    onView?: (item: WatchItem) => void;
    /** Appelé à la fin du drag, avec la position du pointeur — sert à détecter
     * si l'item a été lâché sur un autre tier (voir TierSection). */
    onCardDragEnd?: (info: PanInfo) => void;
}

export function WatchItemCard({
    item,
    getCardBackground = getDefaultBackground,
    onToggleFav,
    onEdit,
    onView,
    onCardDragEnd,
}: WatchItemCardProps) {
    const itemRef = useRef<HTMLDivElement>(null);

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        const node = itemRef.current;
        if (node) node.style.pointerEvents = "none";
        onCardDragEnd?.(info);
        if (node) node.style.pointerEvents = "";
    };

    const categories = item.categories ?? [];

    return (
        <Reorder.Item
            as="div"
            ref={itemRef}
            value={item}
            layoutId={`watch-item-${item.id}`}
            drag
            dragElastic={0.15}
            dragMomentum={false}
            whileDrag={{ scale: 1.06, zIndex: 30 }}
            onDragEnd={handleDragEnd}
            onTap={() => onView?.(item)}
            onDoubleClick={() => onEdit(item)}
            data-id={item.id}
            className="group relative w-40 overflow-hidden rounded-xl border border-white/5 bg-neutral-950 cursor-grab active:cursor-grabbing transition-shadow duration-300 hover:shadow-[0_12px_28px_-8px_var(--tier-color)] hover:border-[color:var(--tier-color)]/40"
        >
            <div
                className="relative aspect-[2/3] w-full bg-cover bg-center"
                style={{ backgroundImage: getCardBackground(item) }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/0" />
                <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-overlay"
                    style={{
                        background:
                            "linear-gradient(160deg, color-mix(in srgb, var(--tier-color) 33%, transparent) 0%, transparent 60%)",
                    }}
                />

                <Badge
                    variant="secondary"
                    className="absolute left-2 top-2 gap-1 border-0 bg-black/60 text-[10px] font-medium text-white/90 backdrop-blur-sm px-1.5 py-0.5"
                >
                    {item.type === "film" ? (
                        <Clapperboard className="h-2.5 w-2.5" />
                    ) : (
                        <Tv className="h-2.5 w-2.5" />
                    )}
                    {item.type === "film" ? "Film" : "Série"}
                </Badge>

                <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFav(item.id);
                    }}
                    className={`absolute right-1.5 top-1.5 h-7 w-7 rounded-full bg-black/40 backdrop-blur-sm transition-transform hover:scale-110 hover:bg-black/60 ${item.favorite ? "text-yellow-400" : "text-white/70"
                        }`}
                >
                    <Star className="h-3.5 w-3.5" fill={item.favorite ? "currentColor" : "none"} />
                </Button>

                <div className="absolute inset-x-0 bottom-0 p-2.5">
                    <p
                        className="line-clamp-2 text-[13px] font-medium leading-snug text-white"
                        style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)" }}
                    >
                        {item.title}
                    </p>
                    {categories.length > 0 && (
                        <span className="mt-1 block text-[10px] uppercase tracking-wider text-white/60 truncate">
                            {categories.map((c) => c.name).join(" · ")}
                        </span>
                    )}
                </div>
            </div>
        </Reorder.Item>
    );
}