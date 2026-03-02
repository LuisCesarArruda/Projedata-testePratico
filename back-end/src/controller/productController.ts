import { FastifyReply, FastifyRequest } from "fastify";
import { CreateProductInput, createProductSchema, GetProductParams, UpdateProductInput } from "../schema/productSchemas";
import { prisma } from "../lib/prisma";
import { randomUUID } from "node:crypto";
import { ZodError } from "zod";

export async function createProduct(request: FastifyRequest<{Body: CreateProductInput}>, reply: FastifyReply) {
    try {
        
        const { name, value } = createProductSchema.parse(request.body)

        const product = await prisma.product.create({
            data: { id: randomUUID(), name, value }
        })
        return reply.status(201).send(product)
    } catch (error) {
        if (error instanceof ZodError) {
            return reply.status(400).send({ message: error.message })
        }
        throw error
    }
}

export async function getProducts(request: FastifyRequest, reply: FastifyReply) {

    const products = await prisma.product.findMany()

    return reply.send(products)
}

export async function getProductById(request: FastifyRequest<{ Params: GetProductParams }>, reply: FastifyReply) {

    const { id } = request.params

    const product = await prisma.product.findUnique({
        where: { id }
    })

    if (!product) {
        return reply.status(404).send({ message: 'Product not found' })
    }

    return reply.send(product)
}

export async function updateProduct(request: FastifyRequest<{ Params: GetProductParams, Body: UpdateProductInput }>, reply: FastifyReply) {

    const { id } = request.params
    const { name, value } = request.body

    const productUpdated = await prisma.product.update({
        where: { id },
        data: { name, value }
    })

    return reply.send(productUpdated)
}

export async function deleteProduct(request: FastifyRequest<{ Params: GetProductParams }>, reply: FastifyReply) {

    const { id } = request.params

    await prisma.product.delete({
        where: { id }
    })

    return reply.status(204).send()
}
