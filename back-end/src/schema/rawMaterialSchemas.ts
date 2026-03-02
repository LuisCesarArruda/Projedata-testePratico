import { z } from 'zod'

export const createRawMaterialSchema = z.object({
    name: z.string().min(1, 'Não pode ser vazio'),
    stockQuantity: z.number().positive()
})
export const updateRawMaterialSchema = createRawMaterialSchema.partial()

export const getRawMaterialSchema = z.object({
    id: z.string()
})

export type CreateRawMaterialInput = z.infer<typeof createRawMaterialSchema>
export type UpdateRawMaterialInput = z.infer<typeof updateRawMaterialSchema>
export type GetRawMaterialParams = z.infer<typeof getRawMaterialSchema>