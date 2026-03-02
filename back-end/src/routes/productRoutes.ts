import { FastifyInstance } from "fastify";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controller/productController";

export async function productRoutes(app: FastifyInstance) {

    app.post('/', createProduct)

    app.get('/', getProducts)

    app.get('/:id', getProductById)

    app.put('/:id', updateProduct)

    app.delete('/:id', deleteProduct)

}