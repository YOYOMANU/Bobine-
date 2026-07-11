"use client";

import { useRef, useState, type DragEvent } from "react";
import { ImagePlus, X, Film } from "lucide-react";

interface ImageDropzoneProps {
    /** URL classique ou data URL (base64) issue d'un fichier déposé. */
    value: string;
    onChange: (value: string) => void;
}

export default function ImageDropzone({ value, onChange }: ImageDropzoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const readFile = (file: File) => {
        if (!file.type.startsWith("image/")) return;
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === "string") onChange(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            readFile(file);
            return;
        }

        const url =
            e.dataTransfer.getData("text/uri-list") ||
            e.dataTransfer.getData("text/plain");
        if (url) onChange(url.trim());
    };

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => !value && fileInputRef.current?.click()}
            className={`group relative aspect-square w-full overflow-hidden rounded-xl border transition-all duration-300 ${isDragging
                    ? "border-primary bg-primary/10 shadow-[0_0_0_1px_var(--primary)]"
                    : value
                        ? "border-border/60"
                        : "border-dashed border-border/60 bg-black/20 hover:border-primary/50 hover:bg-primary/5 cursor-pointer"
                }`}
        >
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) readFile(file);
                    e.target.value = "";
                }}
            />

            {value ? (
                <>
                    <img
                        src={value}
                        alt="Aperçu de l'affiche"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onChange("");
                        }}
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-destructive group-hover:opacity-100"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current?.click();
                        }}
                        className="absolute inset-x-0 bottom-0 bg-black/70 py-2 text-center text-xs font-medium text-primary opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                    >
                        Changer l'image
                    </button>
                </>
            ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
                    <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors ${isDragging
                                ? "border-primary/40 bg-primary/15"
                                : "border-border/60 bg-white/5"
                            }`}
                    >
                        {isDragging ? (
                            <ImagePlus className="h-5 w-5 text-primary" />
                        ) : (
                            <Film className="h-5 w-5 text-muted-foreground" />
                        )}
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-sm font-medium text-foreground">
                            {isDragging ? "Lâchez l'image ici" : "Glissez une affiche ici"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            ou cliquez pour parcourir vos fichiers
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}