import type { Dispatch } from "react";
import type { User, Category, Product } from "../generated/prisma/client.ts"

export type Data = (Product | null)[] | (Category | null)[];

export type TableParams = {
    data: Data,
    setData: any,
    orderCallback: any,
    editCallback: any,
    createCallback: any,
    deleteCallback: any,
    columns: string[]
}

export type TableCallbackParams = {
    user: User,
    data: Data,
    setData: Dispatch<Data>,
    item?: Product | Category,
    newName?: string | null
}
