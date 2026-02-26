import express from 'express'
import { sha256 } from 'js-sha256'
import cors from 'cors'
const app = express()
app.use(express.json())

import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from '@prisma/client'

const adapter = new PrismaBetterSqlite3({ url: 'file:./shop.db' })
const prisma = new PrismaClient({ adapter })

app.use(cors({ origin: 'http://localhost:3000' }))

app.get('/api/categories', async (req, res) => {
    const results = await prisma.category.findMany()
    res.json(results)
})

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

app.get('/api/session/:session', async (req, res) => {
    const prismaResults = await prisma.user.findUnique({
        where: {
            session: req.params.session
        }
    })

    if(!prismaResults)
        return res.send({status: 404})

    return res.send({status: 200, email: prismaResults.email})
})

app.post('/api/signin', async (req, res) => {
    if (!req.body.email || !req.body.password)
        return res.send({ status: 400, message: "Missing Email or Password" })

    const session = sha256(req.body.password + Math.random() + (new Date()))

    const prismaResults = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    })

    if (prismaResults) {
        if (prismaResults.password != req.body.password)
            return res.send({ status: 400, message: "Wrong password" })

        await prisma.user.update({
            data: { session: session },
            where: { email: req.body.email }
        })
    }

    if (!prismaResults) {
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                password: req.body.password,
                session: session,
                isAdmin: false
            }
        })
    }

    res.send({
        status: 200,
        message: "Great Success",
        session: session
    })
})

app.listen(4000, () => {
    console.log("Server is running - http://localhost:4000")
})
