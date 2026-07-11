"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Save, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    addWatchItem,
    deleteWatchItem,
    getCategories,
    getTiers,
    updateWatchItem,
} from "@/lib/actions";
import { Category, ItemType, Tier, WatchItem } from "@/types";
import ImageDropzone from "./image-dropzone";
import GenreMultiSelect from "./genre-multi-select";

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    item?: WatchItem | null;
    onSuccess?: () => void;
};

interface FormState {
    title: string;
    type: ItemType;
    categoryIds: string[];
    tierId: string;
    posterUrl: string;
}

const EMPTY_FORM: FormState = {
    title: "",
    type: "film",
    categoryIds: [],
    tierId: "",
    posterUrl: "",
};

function itemToFormState(item: WatchItem): FormState {
    return {
        title: item.title,
        type: item.type,
        categoryIds: (item.categories ?? []).map((c) => String(c.id)),
        tierId: item.tierId ? String(item.tierId) : "",
        posterUrl: item.posterUrl ?? "",
    };
}

export default function FormWatch({ open, setOpen, item, onSuccess }: Props) {
    const isEditMode = !!item;

    const [categories, setCategories] = useState<Category[]>([]);
    const [tiers, setTiers] = useState<Tier[]>([]);
    const [form, setForm] = useState<FormState>(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const load = async () => {
        const [cats, tiersList] = await Promise.all([getCategories(), getTiers()]);
        setCategories(cats);
        setTiers(tiersList);
    };

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        if (open) {
            setForm(item ? itemToFormState(item) : EMPTY_FORM);
            setError(null);
        }
    }, [open, item]);

    const canSave = form.title.trim().length > 0 && (form.categoryIds?.length ?? 0) > 0;

    const buildFormData = () => {
        const selectedCategories = categories.filter((c) =>
            form.categoryIds.includes(String(c.id))
        );

        const formData = new FormData();
        formData.set("title", form.title.trim());
        formData.set("type", form.type);
        form.categoryIds.forEach((id) => formData.append("categoryIds[]", id));
        selectedCategories.forEach((c) => formData.append("genres[]", c.name));
        if (form.tierId) formData.set("tierId", form.tierId);
        if (form.posterUrl.trim()) formData.set("posterUrl", form.posterUrl.trim());
        return formData;
    };

    const handleSave = async () => {
        if (!canSave || saving) return;
        setSaving(true);
        setError(null);

        const formData = buildFormData();
        const title = form.title.trim();

        try {
            if (isEditMode && item) {
                await updateWatchItem(item.id, formData);
                toast.success(`« ${title} » a été modifié.`);
            } else {
                await addWatchItem(formData);
                toast.success(`« ${title} » a été ajouté.`);
            }
            setOpen(false);
            onSuccess?.();
        } catch (err) {
            console.error(err);
            const message =
                err instanceof Error ? err.message : "Erreur lors de l'enregistrement.";
            setError(message);
            toast.error(message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!item || deleting) return;
        const confirmed = window.confirm(
            `Supprimer « ${item.title} » ? Cette action est irréversible.`
        );
        if (!confirmed) return;

        setDeleting(true);
        setError(null);

        try {
            await deleteWatchItem(item.id);
            toast.success(`« ${item.title} » a été supprimé.`);
            setOpen(false);
            onSuccess?.();
        } catch (err) {
            console.error(err);
            const message =
                err instanceof Error ? err.message : "Erreur lors de la suppression.";
            setError(message);
            toast.error(message);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-6 dialog-scroll">
                <DialogHeader>
                    <DialogTitle id="form-title" className="text-xl font-semibold pr-6">
                        {isEditMode ? "Modifier un titre" : "Ajouter un titre"}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4 mt-2">
                    <div className="flex flex-col gap-2">
                        <Label>Affiche</Label>
                        <ImageDropzone
                            value={form.posterUrl}
                            onChange={(value) => setForm((f) => ({ ...f, posterUrl: value }))}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="title">Titre</Label>
                        <Input
                            type="text"
                            id="title"
                            placeholder="Ex: Dune: Part Two"
                            value={form.title}
                            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="type">Type</Label>
                        <Select
                            value={form.type}
                            onValueChange={(value) =>
                                setForm((f) => ({ ...f, type: value as ItemType }))
                            }
                        >
                            <SelectTrigger id="type" className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="film">🎥 Film</SelectItem>
                                <SelectItem value="serie">📺 Série</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Genres</Label>
                        <GenreMultiSelect
                            categories={categories}
                            value={form.categoryIds}
                            onChange={(ids) => setForm((f) => ({ ...f, categoryIds: ids }))}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="f-tier">Classement</Label>
                        <Select
                            value={form.tierId}
                            onValueChange={(value) => setForm((f) => ({ ...f, tierId: value ?? "" }))}
                        >
                            <SelectTrigger id="f-tier" className="w-full">
                                <SelectValue placeholder="Choisir un tier (optionnel)" />
                            </SelectTrigger>
                            <SelectContent>
                                {tiers.map((tier) => (
                                    <SelectItem key={tier.id} value={String(tier.id)}>
                                        {tier.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {error && <p className="text-sm text-destructive">{error}</p>}
                </div>

                <DialogFooter className="mt-6 flex-row gap-2 sm:justify-between">
                    {isEditMode ? (
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleting || saving}
                        >
                            {deleting ? (
                                <Loader2 className="size-4 animate-spin" />
                            ) : (
                                <Trash2 className="size-4" />
                            )}
                            Supprimer
                        </Button>
                    ) : (
                        <span />
                    )}
                    <Button
                        id="save-btn"
                        onClick={handleSave}
                        disabled={!canSave || saving || deleting}
                    >
                        {saving ? (
                            <Loader2 className="size-4 animate-spin" />
                        ) : (
                            <Save className="size-4" />
                        )}
                        Enregistrer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}