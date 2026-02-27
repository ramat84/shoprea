import express from 'express'
import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const adapter = new PrismaBetterSqlite3({ url: 'file:./shop.db' })
const prisma = new PrismaClient({ adapter })

export const ProductsAPI = (app) => {
    app.get('/api/products', async (req, res) => {
        const results = await prisma.product.findMany()
        res.json(results)
    })

    app.get('/api/product/:id', async (req, res) => {
        const prismaResults = await prisma.product.findUnique({
            where: {
                id: parseInt(req.params.id)
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
        res.json(returnResults)
    })

    app.get('/api/products/:category', async (req, res) => {
        const results = await prisma.product.findMany({
            where: {
                categories: { some: { categoryID: Number(req.params.category) } }
            }
        })
        res.json(results)
    })

    app.get('/api/products/multi/:ids', async (req, res) => {
        const ids = req.params.ids.match(/[0-9]+/g).map((id) => parseInt(id))

        if (ids.length == 0) throw new Error("Missing numbers")

        const results = await prisma.product.findMany({
            where: { id: { in: ids } }
        })
        res.json(results)
    })

    app.get('/api/categories', async (req, res) => {
        const results = await prisma.category.findMany()
        res.json(results)
    })

}
