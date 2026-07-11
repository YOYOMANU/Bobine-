"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

interface GenreMultiSelectProps {
    categories: Category[];
    value: string[];
    onChange: (value: string[]) => void;
}

export default function GenreMultiSelect({
    categories,
    value,
    onChange,
}: GenreMultiSelectProps) {
    const [open, setOpen] = useState(false);

    const selected = categories.filter((c) => value.includes(String(c.id)));

    const toggle = (id: string) => {
        onChange(
            value.includes(id) ? value.filter((v) => v !== id) : [...value, id]
        );
    };

    const remove = (id: string) => {
        onChange(value.filter((v) => v !== id));
    };

    return (
        <div className="flex flex-col gap-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger
                    render={
                        <Button
                            type="button"
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between font-normal"
                        >
                            {selected.length > 0
                                ? `${selected.length} genre${selected.length > 1 ? "s" : ""} sélectionné${selected.length > 1 ? "s" : ""}`
                                : "Choisir un ou plusieurs genres"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    }
                />
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command>
                        <CommandInput placeholder="Rechercher un genre..." />
                        <CommandList>
                            <CommandEmpty>Aucun genre trouvé.</CommandEmpty>
                            <CommandGroup>
                                {categories.map((c) => {
                                    const id = String(c.id);
                                    const isSelected = value.includes(id);
                                    return (
                                        <CommandItem
                                            key={id}
                                            value={c.name}
                                            onSelect={() => toggle(id)}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    isSelected ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {c.name}
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {selected.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {selected.map((c) => (
                        <Badge key={c.id} variant="secondary" className="gap-1 pr-1">
                            {c.name}
                            <button
                                type="button"
                                onClick={() => remove(String(c.id))}
                                className="ml-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    );
}