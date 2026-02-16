import express from 'express'
import cors from 'cors'
const app = express()

import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from '@prisma/client'

const adapter = new PrismaBetterSqlite3({ url: 'file:./shop.db' })
const prisma = new PrismaClient({ adapter })

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.get('/api/categories', async (req, res) => {
    const results = await prisma.category.findMany()
    res.json(results)
})

app.listen(4000, () => {
    console.log("Server is running - http://localhost:4000")
})
