import type { Dispatch } from "react";
import type { User, Category, Product } from "../generated/prisma/client.ts"
import type { Items } from "./Item.ts";

export type TableParams = {
    data: Items,
    setData: any,
    orderCallback: any,
    editCallback: any,
    createCallback: any,
    deleteCallback: any,
    columns: string[]
}

export type TableCallbackParams = {
    user: User,
    data: Items,
    setData: Dispatch<Items>,
    item?: Product | Category,
    newName?: string | null
}
