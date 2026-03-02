interface RawMaterial {
    id: string
    stockQuantity: number
}

interface ProductMaterial {
    rawMaterialId: string
    quantityRequired: number
    rawMaterial: RawMaterial
}

interface Product {
    name: string
    value: number | { toNumber: () => number }
    productMaterials: ProductMaterial[]
}

export function calculateSuggestion(products: Product[]) {
    const virtualStock: Record<string, number> = {}

    for (const product of products) {
        for (const pm of product.productMaterials) {
            if (!virtualStock[pm.rawMaterialId]) {
                virtualStock[pm.rawMaterialId] = pm.rawMaterial.stockQuantity
            }
        }
    }

    const suggestion = []

    for (const product of products) {
        if (product.productMaterials.length === 0) continue

        let possibleUnits = Infinity

        for (const pm of product.productMaterials) {
            const available = virtualStock[pm.rawMaterialId]
            const units = Math.floor(available / pm.quantityRequired)
            possibleUnits = Math.min(possibleUnits, units)
        }

        if (possibleUnits === 0 || possibleUnits === Infinity) continue

        for (const pm of product.productMaterials) {
            virtualStock[pm.rawMaterialId] -= possibleUnits * pm.quantityRequired
        }

        suggestion.push({
            product: product.name,
            quantity: possibleUnits,
            totalValue: possibleUnits * Number(product.value)
        })
    }

    const grandTotal = suggestion.reduce((acc, item) => acc + item.totalValue, 0)

    return { suggestion, grandTotal }
}