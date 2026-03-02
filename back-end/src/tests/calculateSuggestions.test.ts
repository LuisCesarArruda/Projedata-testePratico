import { describe, it, expect } from 'vitest'
import { calculateSuggestion } from '../utils/calculateSuggestions'

describe('calculateSuggestion', () => {

    it('should return empty suggestion when no products are provided', () => {
        const result = calculateSuggestion([])
        expect(result.suggestion).toHaveLength(0)
        expect(result.grandTotal).toBe(0)
    })

    it('should return empty suggestion when product has no materials', () => {
        const products = [
            {
                name: 'Product A',
                value: 100,
                productMaterials: []
            }
        ]
        const result = calculateSuggestion(products)
        expect(result.suggestion).toHaveLength(0)
        expect(result.grandTotal).toBe(0)
    })

    it('should calculate correct quantity based on stock', () => {
        const products = [
            {
                name: 'Product A',
                value: 100,
                productMaterials: [
                    {
                        rawMaterialId: 'steel-id',
                        quantityRequired: 10,
                        rawMaterial: { id: 'steel-id', stockQuantity: 100 }
                    }
                ]
            }
        ]
        const result = calculateSuggestion(products)
        expect(result.suggestion[0].quantity).toBe(10)
        expect(result.suggestion[0].totalValue).toBe(1000)
    })

    it('should prioritize products with higher value', () => {
        const products = [
            {
                name: 'Product B',
                value: 200,
                productMaterials: [
                    {
                        rawMaterialId: 'steel-id',
                        quantityRequired: 30,
                        rawMaterial: { id: 'steel-id', stockQuantity: 100 }
                    }
                ]
            },
            {
                name: 'Product A',
                value: 100,
                productMaterials: [
                    {
                        rawMaterialId: 'steel-id',
                        quantityRequired: 10,
                        rawMaterial: { id: 'steel-id', stockQuantity: 100 }
                    }
                ]
            }
        ]
        const result = calculateSuggestion(products)
        expect(result.suggestion[0].product).toBe('Product B')
        expect(result.suggestion[0].quantity).toBe(3)
    })

    it('should consume stock correctly between products', () => {
        const products = [
            {
                name: 'Product B',
                value: 200,
                productMaterials: [
                    {
                        rawMaterialId: 'steel-id',
                        quantityRequired: 30,
                        rawMaterial: { id: 'steel-id', stockQuantity: 100 }
                    }
                ]
            },
            {
                name: 'Product A',
                value: 100,
                productMaterials: [
                    {
                        rawMaterialId: 'steel-id',
                        quantityRequired: 10,
                        rawMaterial: { id: 'steel-id', stockQuantity: 100 }
                    }
                ]
            }
        ]
        const result = calculateSuggestion(products)

        expect(result.suggestion).toHaveLength(2)
        expect(result.suggestion[1].product).toBe('Product A')
        expect(result.suggestion[1].quantity).toBe(1)
    })

    it('should return 0 units when stock is insufficient', () => {
        const products = [
            {
                name: 'Product A',
                value: 100,
                productMaterials: [
                    {
                        rawMaterialId: 'steel-id',
                        quantityRequired: 200,
                        rawMaterial: { id: 'steel-id', stockQuantity: 100 }
                    }
                ]
            }
        ]
        const result = calculateSuggestion(products)
        expect(result.suggestion).toHaveLength(0)
        expect(result.grandTotal).toBe(0)
    })

    it('should calculate grand total correctly', () => {
        const products = [
            {
                name: 'Product A',
                value: 100,
                productMaterials: [
                    {
                        rawMaterialId: 'steel-id',
                        quantityRequired: 10,
                        rawMaterial: { id: 'steel-id', stockQuantity: 100 }
                    }
                ]
            }
        ]
        const result = calculateSuggestion(products)
        expect(result.grandTotal).toBe(1000)
    })
})