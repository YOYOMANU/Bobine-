"use client"
import { Dispatch, SetStateAction, useState } from "react";
import { ImageIcon, Save } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
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

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function FormWatch({ open, setOpen }: Props) {
    const [imageUrl, setImageUrl] = useState("");

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="modal" id="overlay-form">
                <DialogHeader className="modal-header">
                    <DialogTitle className="modal-title" id="form-title">
                        Ajouter un titre
                    </DialogTitle>
                </DialogHeader>

                {/* Image Upload */}
                <div className="form-group">
                    <Label className="form-label">Affiche</Label>
                    <div
                        className="image-upload-area"
                        id="image-upload-area"
                        onClick={() =>
                            document.getElementById("image-url-input")?.focus()
                        }
                    >
                        {imageUrl && (
                            <img
                                className="image-preview"
                                id="image-preview"
                                src={imageUrl}
                                alt="Aperçu"
                            />
                        )}
                        <div className="text-muted-foreground text-[13px] flex items-center gap-1.5 justify-center">
                            <ImageIcon className="size-4" />
                            Cliquez pour ajouter une URL d'image
                        </div>
                        <Input
                            type="text"
                            className="image-url-input"
                            id="image-url-input"
                            placeholder="Collez l'URL de l'image..."
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <Label className="form-label">Titre</Label>
                    <Input
                        type="text"
                        className="form-input"
                        id="f-title"
                        placeholder="Ex: Dune: Part Two"
                    />
                </div>

                <div className="field-row">
                    <div className="form-group">
                        <Label className="form-label">Type</Label>
                        <Select defaultValue="film">
                            <SelectTrigger className="form-select" id="f-type">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="film">🎥 Film</SelectItem>
                                <SelectItem value="serie">📺 Série</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="form-group">
                        <Label className="form-label">Genre</Label>
                        <Select>
                            <SelectTrigger className="form-select" id="f-genre">
                                <SelectValue placeholder="Choisir un genre" />
                            </SelectTrigger>
                            <SelectContent>
                                {/* options générées dynamiquement */}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="form-group">
                    <Label className="form-label">Classement</Label>
                    <Select>
                        <SelectTrigger className="form-select" id="f-tier">
                            <SelectValue placeholder="Choisir un tier" />
                        </SelectTrigger>
                        <SelectContent>
                            {/* options générées dynamiquement */}
                        </SelectContent>
                    </Select>
                </div>

                <div className="form-actions">
                    <Button className="btn-primary" id="save-btn">
                        <Save className="size-4" />
                        Enregistrer
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}