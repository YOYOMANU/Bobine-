"use client"
import { Search, FolderOpen, Plus, Film, Tv, Clapperboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import ModalCategories from "./modal-categories";
import FormWatch from "./form-watch";

export default function Header() {
    const [openModal, setOpenModal] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    return (
        <>
            <header className="header my-5">
                <div className="brand">
                    <h1 className="logo">Bobine</h1>
                    <Badge className="badge">Dashboard</Badge>
                </div>
                <div className="header-actions">
                    <Button onClick={() => setOpenModal(true)} variant="outline" className="btn" id="btn-cats">
                        <FolderOpen className="size-4" />
                        Catégories
                    </Button>
                    <Button onClick={() => setOpenForm(true)} className="btn-accent" id="btn-add-top">
                        <Plus className="size-4" />
                        Ajouter
                    </Button>
                </div>
            </header>
            <ModalCategories open={openModal} setOpen={setOpenModal} />
            <FormWatch open={openForm} setOpen={setOpenForm} />
        </>
    );
}