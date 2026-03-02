import { z } from 'zod'

export const createProductSchema = z.object({
    name: z.string().min(1,'Não pode ser vazio'),
    value: z.number().positive()
})
export const updateProductSchema = createProductSchema.partial()

export const getProductschema = z.object({
    id: z.string()
})

export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
export type GetProductParams = z.infer<typeof getProductschema>