"use client";

import type { Category } from "@/types";

interface GenreChipsProps {
    genres: Category[];
    value: string;
    onChange: (genre: string) => void;
}

export default function GenreChips({ genres, value, onChange }: GenreChipsProps) {
    return (
        <div id="genres" className="flex flex-wrap gap-2">
            <button
                type="button"
                className={`chip ${value === "tous" ? "active" : ""}`}
                data-genre="tous"
                onClick={() => onChange("tous")}
            >
                Tous genres
            </button>

            {genres.map((c) => (
                <button
                    type="button"
                    key={c.id}
                    className={`chip ${value === c.name ? "active" : ""}`}
                    data-genre={c.name}
                    onClick={() => onChange(c.name)}
                >
                    {c.name}
                </button>
            ))}
        </div>
    );
}