import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { randomUUID } from "node:crypto";
import { CreateProductMaterialInput, GetProductMaterialParams, UpdateProductMaterialInput } from "../schema/productMaterialSchemas";

export async function createProductMaterial(request: FastifyRequest<{ Body: CreateProductMaterialInput }>, reply: FastifyReply) {

    const { productId, quantityRequired, rawMaterialId } = request.body

    const productMaterial = await prisma.productMaterial.create({
        data: {
            id: randomUUID(),
            productId,
            rawMaterialId,
            quantityRequired
        }
    })
    return reply.status(201).send(productMaterial)
}

export async function getProductMaterial(request: FastifyRequest, reply: FastifyReply) {

    const productMaterial = await prisma.productMaterial.findMany()

    return reply.send(productMaterial)
}

export async function getProductMaterialById(request: FastifyRequest<{ Params: GetProductMaterialParams }>, reply: FastifyReply) {

    const { id } = request.params

    const productMaterial = await prisma.productMaterial.findUnique({
        where: { id }
    })

    if (!productMaterial) {
        return reply.status(404).send({ message: 'Product not found' })
    }

    return reply.send(productMaterial)
}

export async function updateProductMaterial(request: FastifyRequest<{ Params: GetProductMaterialParams, Body: UpdateProductMaterialInput }>, reply: FastifyReply) {

    const { id } = request.params
    const { productId, rawMaterialId, quantityRequired } = request.body

    const productMaterialUpdated = await prisma.productMaterial.update({
        where: { id },
        data: {
            productId,
            rawMaterialId,
            quantityRequired
        }
    })

    return reply.send(productMaterialUpdated)
}

export async function deleteProductMaterial(request: FastifyRequest<{ Params: GetProductMaterialParams }>, reply: FastifyReply) {

    const { id } = request.params

    await prisma.productMaterial.delete({
        where: { id }
    })

    return reply.status(204).send()
}
