"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Film, Clapperboard, Tv, Star, Heart } from "lucide-react";
import type { WatchItem } from "@/types"; // adapte le chemin
import { getWatchItem } from "@/lib/actions";


interface StatsProps {
    watchItems: WatchItem[]; // Reçoit les données en props
}

interface StatCardData {
    icon: React.ReactNode;
    value: React.ReactNode;
    label: string;
}

export function Stats({ watchItems }: StatsProps) {
    const stats = useMemo<StatCardData[]>(() => {
        // Votre logique de calcul reste identique
        const total = watchItems.length;
        const films = watchItems.filter((i) => i.type === "film").length;
        const series = watchItems.filter((i) => i.type === "serie").length;
        const favs = watchItems.filter((i) => i.favorite).length;

        return [
            { icon: <Clapperboard />, value: total, label: "Total" },
            { icon: <Film />, value: films, label: "Films" },
            { icon: <Tv />, value: series, label: "Séries" },
            { icon: <Heart />, value: favs, label: "Favoris" },
        ];
    }, [watchItems]);

    return (
        <div className="grid grid-cols-2 justify-items-center ml-30 gap-4 mb-8 sm:grid-cols-3 lg:grid-cols-5 w-full">
            {stats.map((stat, i) => (
                <Card
                    key={i}
                    className="border-border/50 rounded-md w-full max-w-[220px] stat-card" // Ajout d'une largeur max contrôlée
                >
                    <CardContent className="flex flex-row justify-between items-center gap-1 py-3 px-4">
                        <div>
                            <div className="text-4xl font-bold tracking-tight stat-value">{stat.value}</div>
                            <div className="text-xs uppercase tracking-wide stat-label pt-1 text-muted-foreground">
                                {stat.label}
                            </div>
                        </div>
                        <span className="text-muted-foreground stat-icon">{stat.icon}</span>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}