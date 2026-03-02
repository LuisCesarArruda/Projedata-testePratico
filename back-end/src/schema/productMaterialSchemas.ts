import { z } from 'zod'

export const createProductMaterialSchema = z.object({
    productId: z.string(),
    rawMaterialId: z.string(),
    quantityRequired: z.number()
})
export const updateProductMaterialSchema = createProductMaterialSchema.partial()

export const getProductMaterialSchema = z.object({
    id: z.string()
})

export type CreateProductMaterialInput = z.infer<typeof createProductMaterialSchema>
export type UpdateProductMaterialInput = z.infer<typeof updateProductMaterialSchema>
export type GetProductMaterialParams = z.infer<typeof getProductMaterialSchema>