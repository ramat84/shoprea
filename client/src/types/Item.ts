import type { Category, Product } from "../generated/prisma/client.ts"
export type Item = Category | Product
export type Items = (Product | null)[] | (Category | null)[];
