import express from 'express'
import cors from 'cors'
const app = express()
app.use(express.json())

import { ProductsAPI } from './api/products.ts'
import { LocationAPI } from './api/location.ts'
import { UsersAPI } from './api/users.ts'

app.use(cors({ origin: 'http://localhost:3000' }))

ProductsAPI(app)
LocationAPI(app)
UsersAPI(app)

app.listen(4000, () => {
    console.log("Server is running - http://localhost:4000")
})
