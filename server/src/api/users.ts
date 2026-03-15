import type { Express } from 'express'
import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const adapter = new PrismaBetterSqlite3({ url: 'file:./shop.db' })
const prisma = new PrismaClient({ adapter })
import { sha256 } from 'js-sha256'

export const UsersAPI = (app: Express) => {
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

    app.get('/api/session/:session', async (req, res) => {
        const prismaResults = await prisma.user.findUnique({
            where: {
                session: req.params.session
            }
        })

        if (!prismaResults)
            return res.send({ status: 404 })

        return res.send({ status: 200, email: prismaResults.email })
    })
}
