"use server";

import { prisma } from "./prisma";
import type { ItemType } from "@/types";

// actions sur categories
export const getCategories = async () => {
    return await prisma.category.findMany({
        include: {
            watchItems: {
                include: {
                    categories: true,
                },
            },
        },
    });
};

export const addCategory = async (category: string) => {
    await prisma.category.create({
        data: {
            name: category,
        },
    });
};

export const deleteCategory = async (id: number) => {
    await prisma.category.delete({
        where: {
            id: id,
        },
    });
};

// actions sur les tiers
export const getTiers = async () => {
    return await prisma.tier.findMany({
        include: {
            watchItems: {
                include: {
                    categories: true,
                },
                orderBy: [{ position: "asc" }, { createdAt: "asc" }],
            },
        },
        orderBy: {
            order: "asc",
        },
    });
};

export const editTierId = async (itemId: number, tierId: number) => {
    return await prisma.watchItem.update({
        where: { id: itemId },
        data: { tierId },
    });
};

export const toggleFavorite = async (itemId: number, favorite: boolean) => {
    return await prisma.watchItem.update({
        where: { id: itemId },
        data: { favorite },
    });
};

export const reorderWatchItems = async (
    tierId: number,
    orderedIds: number[]
) => {
    return await prisma.$transaction(
        orderedIds.map((id, index) =>
            prisma.watchItem.update({
                where: { id, tierId },
                data: { position: index },
            })
        )
    );
};

// actions sur watchItem

export const getWatchItem = async () => {
    return await prisma.watchItem.findMany({
        include: {
            categories: true,
            tier: true,
        },
    });
};

// -- parsing partagé entre création et modification --
function parseWatchItemForm(formData: FormData) {
    const title = formData.get("title")?.toString().trim();
    const synopsis = formData.get("synopsis")?.toString().trim() || "";
    const typeRaw = formData.get("type")?.toString();
    const categoryIdsRaw = formData.getAll("categoryIds[]").map(String);
    const tierIdRaw = formData.get("tierId")?.toString();
    const image = formData.get("image")?.toString() || null;

    if (!title) throw new Error("Le titre est requis.");
    if (typeRaw !== "film" && typeRaw !== "serie") throw new Error("Type invalide.");
    const type = typeRaw as ItemType;

    if (categoryIdsRaw.length === 0) {
        throw new Error("Au moins un genre (catégorie) est requis.");
    }

    return {
        title,
        synopsis,
        type,
        image,
        categoryIds: categoryIdsRaw.map(Number),
        tierId: tierIdRaw ? Number(tierIdRaw) : null,
    };
}

export const addWatchItem = async (formData: FormData) => {
    const { categoryIds, ...data } = parseWatchItemForm(formData);

    return await prisma.watchItem.create({
        data: {
            ...data,
            image: null,
            favorite: false,
            categories: {
                connect: categoryIds.map((id) => ({ id })),
            },
        },
        include: {
            categories: true,
            tier: true,
        },
    });
};

export const updateWatchItem = async (itemId: number, formData: FormData) => {
    const { categoryIds, ...data } = parseWatchItemForm(formData);

    return await prisma.watchItem.update({
        where: { id: itemId },
        data: {
            ...data,
            categories: {
                set: categoryIds.map((id) => ({ id })),
            },
        },
        include: {
            categories: true,
            tier: true,
        },
    });
};

export const deleteWatchItem = async (itemId: number) => {
    return await prisma.watchItem.delete({
        where: {
            id: itemId,
        },
    });
};