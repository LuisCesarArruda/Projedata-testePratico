import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";

export async function getProductionSuggestion(request:FastifyRequest, reply:FastifyReply) {


    const products = await prisma.product.findMany({
        include: {
            productMaterials: {
                include: {
                    rawMaterial: true
                }
            }
        }, orderBy: {
            value: "desc"
        }
    })

    const virtualStock: Record<string, number> = {}

    for (const product of products) {
        for (const primaryMaterial of product.productMaterials) {

            if (!virtualStock[primaryMaterial.rawMaterialId]) {

                virtualStock[primaryMaterial.rawMaterialId] = primaryMaterial.rawMaterial.stockQuantity
            }
        }
    }

    const suggestion = []

    for (const product of products) {
        if (product.productMaterials.length === 0) continue

        let possibleUnits = Infinity

        for (const primaryMaterial of product.productMaterials) {
            const available = virtualStock[primaryMaterial.rawMaterialId]
            const units = Math.floor(available / primaryMaterial.quantityRequired)
            possibleUnits = Math.min(possibleUnits, units)
        }

        if (possibleUnits === 0 || possibleUnits === Infinity) continue

        for (const primaryMaterial of product.productMaterials) {
            virtualStock[primaryMaterial.rawMaterialId] -= possibleUnits * primaryMaterial.quantityRequired
        }

        suggestion.push({
            product: product.name,
            quantity: possibleUnits,
            totalValue: possibleUnits * Number(product.value)
        })
    }

    const grandTotal = suggestion.reduce((acc, item) => acc + item.totalValue, 0)

    return reply.send({ suggestion, grandTotal })
}