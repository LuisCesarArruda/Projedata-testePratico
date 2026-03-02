import { FastifyInstance } from "fastify";
import { createRawMaterial, deleteRawMaterial, getRawMaterial, getRawMaterialById, updateRawMaterial } from "../controller/rawMaterialController";


export async function rawMaterialRoutes(app: FastifyInstance) {

    app.post('/', createRawMaterial)

    app.get('/', getRawMaterial)

    app.get('/:id', getRawMaterialById)

    app.put('/:id', updateRawMaterial)

    app.delete('/:id', deleteRawMaterial)

}