import { FastifyInstance } from "fastify";
import { updateProductMaterial, deleteProductMaterial, createProductMaterial, getProductMaterial, getProductMaterialById } from "../controller/productMaterialController";



export async function productMaterialRoutes(app: FastifyInstance) {

    app.post('/', createProductMaterial)

    app.get('/', getProductMaterial)

    app.get('/:id', getProductMaterialById)

    app.put('/:id', updateProductMaterial)

    app.delete('/:id', deleteProductMaterial)

}

