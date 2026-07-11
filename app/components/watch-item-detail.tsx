"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clapperboard, Tv, Star, Pencil, Trash2, Loader2 } from "lucide-react";
import type { Tier, WatchItem } from "@/types";
import { deleteWatchItem } from "@/lib/actions";

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    item: WatchItem | null;
    tiers: Tier[];
    onEdit: (item: WatchItem) => void;
    onSuccess?: () => void;
};

export default function WatchItemDetails({
    open,
    setOpen,
    item,
    tiers,
    onEdit,
    onSuccess,
}: Props) {
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!item) return null;

    const tierName = tiers.find((t) => t.id === item.tierId)?.name;
    const categories = item.categories ?? [];

    const handleDelete = async () => {
        const confirmed = window.confirm(
            `Supprimer « ${item.title} » ? Cette action est irréversible.`
        );
        if (!confirmed) return;

        setDeleting(true);
        setError(null);

        try {
            await deleteWatchItem(item.id);
            setOpen(false);
            onSuccess?.();
        } catch (err) {
            console.error(err);
            setError(
                err instanceof Error ? err.message : "Erreur lors de la suppression."
            );
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-6 dialog-scroll">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold pr-6">
                        {item.title}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-[140px_1fr] gap-5 mt-4">
                    {item.posterUrl ? (
                        <img
                            src={item.posterUrl}
                            alt={item.title}
                            className="w-full aspect-[2/3] object-cover rounded-lg"
                        />
                    ) : (
                        <div className="w-full aspect-[2/3] rounded-lg bg-muted flex items-center justify-center">
                            {item.type === "film" ? (
                                <Clapperboard className="h-8 w-8 text-muted-foreground" />
                            ) : (
                                <Tv className="h-8 w-8 text-muted-foreground" />
                            )}
                        </div>
                    )}

                    <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="gap-1">
                                {item.type === "film" ? (
                                    <Clapperboard className="h-3 w-3" />
                                ) : (
                                    <Tv className="h-3 w-3" />
                                )}
                                {item.type === "film" ? "Film" : "Série"}
                            </Badge>

                            {categories.map((c) => (
                                <Badge key={c.id} variant="outline">
                                    {c.name}
                                </Badge>
                            ))}

                            {tierName && <Badge variant="outline">{tierName}</Badge>}

                            {item.favorite && (
                                <Badge variant="secondary" className="gap-1 text-yellow-400">
                                    <Star className="h-3 w-3" fill="currentColor" />
                                    Favori
                                </Badge>
                            )}
                        </div>

                        {error && (
                            <p className="text-sm text-destructive">{error}</p>
                        )}
                    </div>
                </div>

                <DialogFooter className="mt-6 flex-row gap-2 sm:justify-between">
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        {deleting ? (
                            <Loader2 className="size-4 animate-spin" />
                        ) : (
                            <Trash2 className="size-4" />
                        )}
                        Supprimer
                    </Button>

                    <Button
                        onClick={() => {
                            setOpen(false);
                            onEdit(item);
                        }}
                    >
                        <Pencil className="size-4" />
                        Modifier
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}