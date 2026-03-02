import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { randomUUID } from "node:crypto";
import { CreateRawMaterialInput, UpdateRawMaterialInput, GetRawMaterialParams } from "../schema/rawMaterialSchemas";

export async function createRawMaterial(request: FastifyRequest<{ Body: CreateRawMaterialInput }>, reply: FastifyReply) {

    const { name, stockQuantity } = request.body

    const rawMaterial = await prisma.rawMaterial.create({
        data: {
            id: randomUUID(),
            name,
            stockQuantity
        }
    })
    return reply.status(201).send(rawMaterial)
}

export async function getRawMaterial(request: FastifyRequest, reply: FastifyReply) {

    const rawMaterial = await prisma.rawMaterial.findMany()

    return reply.send(rawMaterial)
}

export async function getRawMaterialById(request: FastifyRequest<{ Params: GetRawMaterialParams }>, reply: FastifyReply) {

    const { id } = request.params

    const rawMaterial = await prisma.rawMaterial.findUnique({
        where: { id }
    })

    if (!rawMaterial) {
        return reply.status(404).send({ message: 'RawMaterial not found' })
    }

    return reply.send(rawMaterial)
}

export async function updateRawMaterial(request: FastifyRequest<{ Params: GetRawMaterialParams, Body: UpdateRawMaterialInput }>, reply: FastifyReply) {

    const { id } = request.params
    const { name, stockQuantity } = request.body

    const rawMaterialUpdated = await prisma.rawMaterial.update({
        where: { id },
        data: {
            name,
            stockQuantity
        }
    })

    return reply.send(rawMaterialUpdated)
}

export async function deleteRawMaterial(request: FastifyRequest<{ Params: GetRawMaterialParams }>, reply: FastifyReply) {

    const { id } = request.params

    await prisma.rawMaterial.delete({
        where: { id }
    })

    return reply.status(204).send()
}
