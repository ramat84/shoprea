import type { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
const adapter = new PrismaBetterSqlite3({ url: 'file:./shop.db' })
const prisma = new PrismaClient({ adapter })

import { GetSessionEmail } from "../users.ts";

export const PutCategoriesOrder = async (req: Request, res: Response) => {
    if (!GetSessionEmail(req.params.session)) return;

    let order = 1;

    req.params.ids.split(",").forEach(async (catId) => {
        await prisma.category.update({
            where: { id: parseInt(catId) },
            data: { order: order++ }
        })
    })

    return res.json({ status: 200 })
}

export const PutCategoriesName = async (req: Request, res: Response) => {
    if (!GetSessionEmail(req.params.session)) return;

    const reqName = req.body.name ?? ''
    const reqId = req.params.id ?? ''

    if (!reqName || !reqId)
        return res.json({ status: 405 })

    await prisma.category.update({
        where: { id: parseInt(reqId) },
        data: { name: reqName }
    }).then(() => {
        return res.json({ status: 200 })
    })

    return res.json({ status: 404 })
}

export const DeleteCategory = async (req: Request, res: Response) => {
    console.log(req.params)
    if (!req.params.id || !req.params.to)
        return;

    const catId = parseInt(req.params.id as string)
    const toId = parseInt(req.params.to as string)

    await prisma.productCategory.updateMany({
        data: { categoryID: toId },
        where: { categoryID: catId }
    })

    await prisma.category.delete({
        where: { id: catId }
    })

    res.json({ status: 200 })
}

export const CreateCategory = async (req: Request, res: Response) => {
    if (!req.body.name) return;

    await prisma.category.create({
        data: {
            name: req.body.name,
            order: req.body.order
        }
    })

    res.json({ status: 200 })
}

