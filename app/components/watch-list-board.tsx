"use client";

import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import type { Category, Tier, WatchItem } from "@/types";
import { TierList } from "./tier-list";
import FormWatch from "./form-watch";
import {
    editTierId,
    getCategories,
    getTiers,
    reorderWatchItems,
    toggleFavorite,
} from "@/lib/actions";
import WatchItemDetails from "./watch-item-detail";
import SearchBar, { type TypeFilter } from "./search-bar";
import GenreChips from "./genre-chips";
import { Stats } from "./render-stats";

export function WatchlistBoard() {
    const [tiers, setTiers] = useState<Tier[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    // Filtres
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState<TypeFilter>("tous");
    const [genreFilter, setGenreFilter] = useState("tous");

    const [formOpen, setFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<WatchItem | null>(null);

    const [detailsOpen, setDetailsOpen] = useState(false);
    const [viewingItem, setViewingItem] = useState<WatchItem | null>(null);

    const load = async () => {
        try {
            const [tiersData, categoriesData] = await Promise.all([
                getTiers(),
                getCategories(),
            ]);
            setTiers(tiersData);
            setCategories(categoriesData);
        } catch (error) {
            console.error("Erreur lors du chargement :", error);
            toast.error("Erreur de chargement des données.");
        }
    };

    useEffect(() => {
        load();
    }, []);

    const allWatchItems = useMemo(() => {
        return tiers.flatMap((t) => t.watchItems ?? []);
    }, [tiers]);

    // Tiers affichés = tiers réels avec watchItems filtrés. `tiers` reste la
    // source de vérité (drag, toggle fav, etc.) ; `filteredTiers` n'est
    // qu'une vue dérivée pour le rendu.
    const filteredTiers = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();

        return tiers.map((t) => ({
            ...t,
            watchItems: (t.watchItems ?? []).filter((item) => {
                const matchesQuery = q === "" || item.title.toLowerCase().includes(q);
                const matchesType = typeFilter === "tous" || item.type === typeFilter;
                const matchesGenre =
                    genreFilter === "tous" ||
                    (item.categories ?? []).some((c) =>
                        c.name.trim().toLowerCase() === genreFilter.trim().toLowerCase()
                    );
                return matchesQuery && matchesType && matchesGenre;
            }),
        }));
    }, [tiers, searchQuery, typeFilter, genreFilter]);

    const handleToggleFav = async (id: number) => {
        const currentItem = tiers
            .flatMap((t) => t.watchItems ?? [])
            .find((it) => it.id === id);
        if (!currentItem) return;

        const newFavorite = !currentItem.favorite;

        setTiers((prev) =>
            prev.map((t) => ({
                ...t,
                watchItems: t.watchItems?.map((it) =>
                    it.id === id ? { ...it, favorite: newFavorite } : it
                ),
            }))
        );

        try {
            await toggleFavorite(id, newFavorite);
        } catch (error) {
            console.error("Échec de la persistance du favori, rollback :", error);
            toast.error("Impossible de mettre à jour le favori.");
            load();
        }
    };

    const handleEditItem = (item: WatchItem) => {
        setEditingItem(item);
        setFormOpen(true);
    };

    const handleViewItem = (item: WatchItem) => {
        setViewingItem(item);
        setDetailsOpen(true);
    };

    const handleAddNew = () => {
        setEditingItem(null);
        setFormOpen(true);
    };

    const handleReorderTier = async (tierId: number, orderedIds: number[]) => {
        setTiers((prev) =>
            prev.map((t) => {
                if (t.id !== tierId) return t;
                const byId = new Map((t.watchItems ?? []).map((it) => [it.id, it]));
                const visibleOrdered = orderedIds
                    .map((id) => byId.get(id))
                    .filter((it): it is WatchItem => !!it);

                // Reorder.Group ne connaît que les items VISIBLES (donc filtrés) :
                // orderedIds ne contient jamais les items masqués par un filtre
                // actif. On les rajoute à la suite pour ne pas les faire
                // disparaître du state tant qu'un filtre est actif.
                const visibleIds = new Set(orderedIds);
                const hiddenItems = (t.watchItems ?? []).filter(
                    (it) => !visibleIds.has(it.id)
                );

                return {
                    ...t,
                    watchItems: [...visibleOrdered, ...hiddenItems],
                };
            })
        );

        try {
            await reorderWatchItems(tierId, orderedIds);
        } catch (error) {
            console.error("Échec de la persistance du réordonnancement, rollback :", error);
            toast.error("Impossible d'enregistrer le nouvel ordre.");
            load();
        }
    };


    const handleMoveItem = async (
        itemId: number,
        fromTierId: number,
        toTierId: number
    ) => {
        let movedTitle = "";
        let targetTierName = "";

        setTiers((prev) => {
            let movedItem: WatchItem | undefined;

            const withoutItem = prev.map((t) => {
                if (t.id !== fromTierId) return t;
                const items = t.watchItems ?? [];
                movedItem = items.find((it) => it.id === itemId);
                return { ...t, watchItems: items.filter((it) => it.id !== itemId) };
            });

            if (!movedItem) return prev;
            const item = movedItem;
            movedTitle = item.title;
            targetTierName = prev.find((t) => t.id === toTierId)?.name ?? "";

            return withoutItem.map((t) =>
                t.id === toTierId
                    ? { ...t, watchItems: [...(t.watchItems ?? []), { ...item, tierId: toTierId }] }
                    : t
            );
        });

        try {
            await editTierId(itemId, toTierId);
            if (movedTitle) {
                toast.success(
                    targetTierName
                        ? `« ${movedTitle} » déplacé vers « ${targetTierName} ».`
                        : `« ${movedTitle} » déplacé.`
                );
            }
        } catch (error) {
            console.error("Échec de la persistance du déplacement, rollback :", error);
            toast.error("Impossible de déplacer le titre.");
            load();
        }
    };

    return (
        <>
            <Stats watchItems={allWatchItems} />
            <SearchBar
                query={searchQuery}
                onQueryChange={setSearchQuery}
                typeFilter={typeFilter}
                onTypeFilterChange={setTypeFilter}
            />

            <GenreChips
                genres={categories}
                value={genreFilter}
                onChange={setGenreFilter}
            />

            {tiers.length === 0 ? (
                <div className="p-10 text-center">Aucune donnée trouvée en base.</div>
            ) : filteredTiers.flatMap(t => t.watchItems).length === 0 ? (
                <div className="p-10 text-center">Aucun élément ne correspond à vos filtres.</div>
            ) : (
                <TierList
                    tiers={filteredTiers}
                    onToggleFav={handleToggleFav}
                    onEditItem={handleEditItem}
                    onViewItem={handleViewItem}
                    onReorderTier={handleReorderTier}
                    onMoveItem={handleMoveItem}
                />
            )}

            <button
                className="fab"
                onClick={handleAddNew}
                aria-label="Ajouter un titre"
            >
                +
            </button>

            <FormWatch
                open={formOpen}
                setOpen={setFormOpen}
                item={editingItem}
                onSuccess={load}
            />

            <WatchItemDetails
                open={detailsOpen}
                setOpen={setDetailsOpen}
                item={viewingItem}
                tiers={tiers}
                onEdit={handleEditItem}
                onSuccess={load}
            />
        </>
    );
}