"use client";

import { WatchItem } from "@/types";

function getCardBackground(item: WatchItem) {
    if (item.image) return `url(${item.image})`;
    const [h, s, l] = item.hue;
    return `radial-gradient(circle at 30% 20%, hsl(${h},${s}%,${l + 8}%), hsl(${h},${s}%,${l}%) 70%)`;
}

export default function WatchCard({ item }: { item: WatchItem }) {

    return (
        <div
            className="card"
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", String(item.id));
                e.currentTarget.classList.add("dragging");
            }}
            onDragEnd={(e) => e.currentTarget.classList.remove("dragging")}
            onDoubleClick={() => openEditModal(item)}
        >
            <div
                className="poster"
                style={{
                    backgroundImage: getCardBackground(item),
                    backgroundSize: "cover",
                }}
            >
                <div className="poster-overlay" />
                <span className="type-badge">
                    {item.type === "film" ? "🎥 Film" : "📺 Série"}
                </span>
                <button
                    className={`fav-btn ${item.fav ? "active" : ""}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFav(item.id);
                    }}
                >
                    {item.fav ? "★" : "☆"}
                </button>
                <div className="title">{item.title}</div>
            </div>
            <div className="meta">
                <span className="genre-tag">{item.genre}</span>
            </div>
        </div>
    );
}