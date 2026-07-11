"use client";

import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Clapperboard, Film, Search, Tv } from "lucide-react";
import type { ItemType } from "@/types";

export type TypeFilter = "tous" | ItemType;

interface SearchBarProps {
    query: string;
    onQueryChange: (query: string) => void;
    typeFilter: TypeFilter;
    onTypeFilterChange: (type: TypeFilter) => void;
}

export default function SearchBar({
    query,
    onQueryChange,
    typeFilter,
    onTypeFilterChange,
}: SearchBarProps) {
    return (
        <div className="toolbar">
            <div className="search-wrapper ml-5">
                <Search className="search-icon size-4" />
                <Input
                    type="text"
                    className="search-input pl-10"
                    id="search"
                    placeholder="Rechercher un titre..."
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                />
            </div>

            <ToggleGroup
                value={[typeFilter]}
                onValueChange={(value: string[]) => {
                    // Base UI travaille en tableau même en sélection unique.
                    // Un clic sur l'item déjà actif renvoie un tableau vide
                    // (désélection) — on retombe alors sur "tous".
                    const next = value[0];
                    onTypeFilterChange(next ? (next as TypeFilter) : "tous");
                }}
                className="type-toggle"
                id="type-toggle"
            >
                <ToggleGroupItem value="tous" data-type="tous">
                    <Clapperboard className="size-4" />
                    Tous
                </ToggleGroupItem>
                <ToggleGroupItem value="film" data-type="film">
                    <Film className="size-4" />
                    Films
                </ToggleGroupItem>
                <ToggleGroupItem value="serie" data-type="serie">
                    <Tv className="size-4" />
                    Séries
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    );
}