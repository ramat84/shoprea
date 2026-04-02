import type { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const adapter = new PrismaBetterSqlite3({ url: 'file:./shop.db' })
const prisma = new PrismaClient({ adapter })
import { sha256 } from 'js-sha256'

export const SignIn = async (req: Request, res: Response) => {
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
        await prisma.user.create({
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
}

export const GetSessionEmail = async (session: string) => {
    const prismaResults = await prisma.user.findUnique({
        where: { session: session }
    })

    if (!prismaResults) return ''

    return prismaResults.email
}

export const GetSession = async (req: Request, res: Response) => {
    const email = await GetSessionEmail(req.params.session)

    if (!email) return res.send({ status: 404 })

    return res.send({ status: 200, email: email })
}

