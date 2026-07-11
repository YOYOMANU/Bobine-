"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Film, Clapperboard, Tv, Star, Heart } from "lucide-react";
import type { WatchItem } from "@/types"; // adapte le chemin

interface StatsProps {
    items: WatchItem[];
}

interface StatCardData {
    icon: React.ReactNode;
    value: React.ReactNode;
    label: string;
}

export function Stats({ items }: StatsProps) {
    const stats = useMemo<StatCardData[]>(() => {
        const total = items.length;
        const films = items.filter((i) => i.type === "film").length;
        const series = items.filter((i) => i.type === "serie").length;

        // Un item est "noté" s'il a un tier avec un score défini
        const rated = items.filter((i) => i.tier?.score != null);
        const scores = rated.map((i) => i.tier?.score as number);
        const moy = scores.length
            ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
            : "—";

        const favs = items.filter((i) => i.favorite).length;

        return [
            { icon: <Clapperboard />, value: total, label: "Total" },
            { icon: <Film />, value: films, label: "Films" },
            { icon: <Tv />, value: series, label: "Séries" },
            {
                icon: <Star />,
                value: (
                    <>
                        {moy}
                        <span className="text-base text-muted-foreground">/5</span>
                    </>
                ),
                label: "Moyenne",
            },
            { icon: <Heart />, value: favs, label: "Favoris" },
        ];
    }, [items]);

    return (
        <div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((stat, i) => (
                <Card key={i} className="border-border/50 rounded-md">
                    <CardContent className="flex flex-row justify-between gap-1 py-3 text-center">
                        <div>
                            <div className="text-4xl font-bold tracking-tight py-2">{stat.value}</div>
                            <div className="text-xs uppercase tracking-wide pt-2 text-muted-foreground">
                                {stat.label}
                            </div>
                        </div>
                        <span className="text-muted-foreground ">{stat.icon}</span>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}