"use client"
import { Search, FolderOpen, Plus, Film, Tv, Clapperboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import ModalCategories from "./modal-categories";
import FormWatch from "./form-watch";

export default function Header() {
    const [openModal, setOpenModal] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    return (
        <div>
            <header className="header mt-5">
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

            <div className="stats-grid" id="stats" />

            <div className="toolbar">
                <div className="search-wrapper ml-5">
                    <Search className="search-icon size-4" />
                    <Input
                        type="text"
                        className="search-input pl-10"
                        id="search"
                        placeholder="Rechercher un titre..."
                    />
                </div>

                <ToggleGroup
                    type="single"
                    //@ts-expect-error
                    defaultValue="tous"
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

            <div className="genres" id="genres" />

            <div id="tiers" />
            <ModalCategories open={openModal} setOpen={setOpenModal} />
            <FormWatch open={openForm} setOpen={setOpenForm} />
        </div>
    );
}