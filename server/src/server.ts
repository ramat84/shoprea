import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload';

const app = express()
app.use(express.json())

import * as Product from './api/products.ts'
import * as Loc from './api/location.ts'
import * as User from './api/users.ts'

import * as ProductAdmin from './api/admin/products.ts'

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(fileUpload())

// Website
app.get('/api/products', Product.GetAll)
app.get('/api/product/:id', Product.GetProduct)
app.get('/api/products/:category', Product.GetCategoryProducts)
app.get('/api/products/multi/:ids', Product.GetMultipleProducts)
app.get('/api/categories', Product.GetCategories);

app.get('/api/location/countries', Loc.GetLocCountries)
app.get('/api/location/countries/:country/states', Loc.GetCountryStates)
app.get('/api/location/countries/:country/states/:state/cities', Loc.GetStateCities)
app.get('/api/location/countries/:country/cities', Loc.GetCountryCities)

// User
app.post('/api/signin', User.SignIn)
app.get('/api/session/:session', User.GetSession)

// Admin - categories
app.put('/api/categories/order/:session/:ids', ProductAdmin.PutCategoriesOrder)
app.put('/api/categories/name/:session/:id', ProductAdmin.PutCategoriesName)
app.delete('/api/categories/delete/:session/:id/:to', ProductAdmin.DeleteCategory)
app.post('/api/categories/create/:session', ProductAdmin.CreateCategory)

// Admin - products
app.put('/api/products/order/:session/:ids', ProductAdmin.PutProductsOrder)
app.put('/api/products/update/:session/:id', ProductAdmin.PutProduct)

app.listen(4000, () => {
    console.log("Server is running - http://localhost:4000")
})
