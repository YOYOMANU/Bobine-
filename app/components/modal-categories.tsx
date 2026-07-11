"use client"
import { Plus, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { addCategory, deleteCategory, getCategories } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Category } from "@/types";

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function ModalCategories({ open, setOpen }: Props) {
    const [newCat, setNewCat] = useState("");
    const router = useRouter()
    const [categories, setCategories] = useState<Category[]>([]);

    const loadCategories = async () => {
        const data = await getCategories();
        setCategories(data);
    };

    useEffect(() => {
        loadCategories()
    }, []);


    const handleCreateCategory = async () => {
        await addCategory(newCat);

        setNewCat("");

        await loadCategories();
    }

    const handleDeleteCategory = async (id: number) => {
        await deleteCategory(id);

        setNewCat("");

        await loadCategories();
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className="modal" id="overlay-cats">
                <DialogHeader className="modal-header">
                    <DialogTitle className="modal-title">
                        Gérer les catégories
                    </DialogTitle>
                </DialogHeader>

                <div className="cat-list" id="cat-list">
                    {/* rows générées dynamiquement, ex: */}
                    {categories.map((c) => (
                        <div className="cat-row" key={c.id}>
                            <span> {c.name} </span>
                            <button onClick={(id) => handleDeleteCategory(c.id)} className="cat-del">
                                <X className="size-4" />
                            </button>
                        </div>
                    ))}

                </div>

                <div className="cat-add">
                    <Input
                        type="text"
                        id="new-cat"
                        placeholder="Nouvelle catégorie..."
                        value={newCat}
                        onChange={(e) => setNewCat(e.target.value)}
                    />
                    <Button
                        onClick={handleCreateCategory}
                        className="btn-accent whitespace-nowrap"
                        id="add-cat-btn"
                    >
                        <Plus className="size-4" />
                        Ajouter
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}