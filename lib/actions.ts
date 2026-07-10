"use server"
import { prisma } from "./prisma"

export const getCategories = async () => {
    return await prisma.category.findMany()
}

export const addCategory = async (category: string) => {
    await prisma.category.create({
        data: {
            name: category
        }
    })
}

export const deleteCategory = async (id: number) => {
    await prisma.category.delete({
        where: {
            id: id
        }
    })
}  