import express from 'express'
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController"
const publicRouter = express.Router()
/* Authentication middleware to be defined l8r */
publicRouter.get("/api/v1/products", getAllProducts)
publicRouter.get("/api/v1/product/:id", getProductById)
publicRouter.post("/api/v1/product", createProduct)
publicRouter.patch("/api/v1/product/:id", getProductById)
publicRouter.delete("/api/v1/delete", deleteProduct)

export default publicRouter
