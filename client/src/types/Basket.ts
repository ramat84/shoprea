import type { Product } from '../generated/prisma/client.ts'
import type { Dispatch } from 'react'

export type BasketProductType = (null | {
    id: number,
    title: string,
    image: string,
    shortDesc: string,
    price: number,
    amount: number | undefined
})

export type BasketContextType = {
    amounts: null | [AmountsType, Dispatch<AmountsType>],
    products: null | [Product[], Dispatch<Product[]>],
    total: null | number
}

export type AmountsType = { [key: number]: number }
