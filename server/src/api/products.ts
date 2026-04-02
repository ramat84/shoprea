import type { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const adapter = new PrismaBetterSqlite3({ url: 'file:./shop.db' })
const prisma = new PrismaClient({ adapter })

export const GetAll = async (req: Request, res: Response) => {
    const results = await prisma.product.findMany()
    return res.json(results)
}

export const GetProduct = async (req: Request, res: Response) => {
    const prismaResults = await prisma.product.findUnique({
        where: {
            id: parseInt(req.params.id as string)
        },
        include: {
            categories: {
                select: {
                    categoryID: true
                }
            }
        }
    })

    let returnResults: any = prismaResults
    returnResults.categories = prismaResults?.categories.map((category) => category.categoryID)
    return res.json(returnResults)
}

export const GetCategoryProducts = async (req: Request, res: Response) => {
    const results = await prisma.product.findMany({
        where: {
            categories: { some: { categoryID: Number(req.params.category) } }
        }
    })
    return res.json(results)
}

export const GetMultipleProducts = async (req: Request, res: Response) => {
    const ids = (req.params.ids as string).match(/[0-9]+/g)?.map((id) => parseInt(id)) ?? []

    if (ids.length == 0) throw new Error("Missing numbers")

    const results = await prisma.product.findMany({
        where: { id: { in: ids } }
    })
    return res.json(results)
}

export const GetCategories = async (req: Request, res: Response) => {
    const results = await prisma.category.findMany({
        orderBy: { order: "asc" }
    })
    return res.json(results)
}
