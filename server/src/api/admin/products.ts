import type { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
const adapter = new PrismaBetterSqlite3({ url: 'file:./shop.db' })
const prisma = new PrismaClient({ adapter })

import { GetSessionEmail } from "../users.ts";
import type { describe } from 'node:test'

interface Params {
    id: string,
    ids: string,
    session: string
}

export const PutCategoriesOrder = async (req: Request<Params>, res: Response) => {
    if (!GetSessionEmail(req.params.session)) return;

    let order = 1;

    req.params.ids.split(",").forEach(async (catId: string) => {
        await prisma.category.update({
            where: { id: parseInt(catId) },
            data: { order: order++ }
        })
    })

    return res.json({ status: 200 })
}

export const PutProductsOrder = async (req: Request<Params>, res: Response) => {
    if (!GetSessionEmail(req.params.session)) return;

    let order = 1;

    req.params.ids.split(",").forEach(async (prodId: string) => {
        await prisma.product.update({
            where: { id: parseInt(prodId) },
            data: { order: order++ }
        })
    })

    return res.json({ status: 200 })
}

export const PutProduct = async (req: Request<Params>, res: Response) => {
    if (!GetSessionEmail(req.params.session)) return;

    let data: { title: string, description: string, price: number, image?: string } = {
        title: req.body.title,
        description: req.body.description,
        price: parseInt(req.body.price),
    }

    if (req.files && req.files.image) {
        if (req.files.image.mimetype.indexOf("image") === -1)
            return res.json({ status: 500, message: "You can only upload images" })

        req.files.image.mv(`./public/images/${req.files.image.name}`, (err: string) => { if (err) console.log('UPLOAD ERROR', err) })
        data.image = `/images/${req.files.image.name}`
    }

    await prisma.product.update({
        where: { id: parseInt(req.params.id) },
        data: data
    })

    return res.json({ status: 200 })
}


export const PutCategoriesName = async (req: Request<Params>, res: Response) => {
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

