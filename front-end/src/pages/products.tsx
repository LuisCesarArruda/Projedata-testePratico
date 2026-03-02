import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store'
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../store/slices/productSlice'
import { fetchRawMaterials } from '../store/slices/rawMaterialSlice'
import { createProductMaterial, deleteProductMaterial, fetchProductMaterials } from '../store/slices/productMaterialSlice'
import type { Product } from '../@types/productInterface'

export function Products() {
    const dispatch = useDispatch<AppDispatch>()
    const { items: products, loading } = useSelector((state: RootState) => state.products)
    const { items: rawMaterials } = useSelector((state: RootState) => state.rawMaterials)
    const { items: productMaterials } = useSelector((state: RootState) => state.productMaterials)

    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState<Product | null>(null)
    const [name, setName] = useState('')
    const [value, setValue] = useState('')

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [rawMaterialId, setRawMaterialId] = useState('')
    const [quantityRequired, setQuantityRequired] = useState('')

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchRawMaterials())
        dispatch(fetchProductMaterials())
    }, [dispatch])

    function handleSubmit() {
        if (!name || !value) return

        if (editing) {
            dispatch(updateProduct({ id: editing.id, name, value: Number(value) }))
        } else {
            dispatch(createProduct({ name, value: Number(value) }))
        }

        setName('')
        setValue('')
        setEditing(null)
        setShowForm(false)
    }

    function handleEdit(product: Product) {
        setEditing(product)
        setName(product.name)
        setValue(String(product.value))
        setShowForm(true)
    }

    function handleDelete(id: string) {
        dispatch(deleteProduct(id))
        if (selectedProduct?.id === id) setSelectedProduct(null)
    }

    function handleCancel() {
        setName('')
        setValue('')
        setEditing(null)
        setShowForm(false)
    }

    function handleAddMaterial() {
        if (!selectedProduct || !rawMaterialId || !quantityRequired) return

        dispatch(createProductMaterial({
            productId: selectedProduct.id,
            rawMaterialId,
            quantityRequired: Number(quantityRequired)
        }))

        setRawMaterialId('')
        setQuantityRequired('')
    }

    function handleRemoveMaterial(id: string) {
        dispatch(deleteProductMaterial(id))
    }

    const materialsOfSelectedProduct = productMaterials.filter(
        pm => pm.productId === selectedProduct?.id
    )

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Produto</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Novo produto
                </button>
            </div>

            {showForm && (
                <div className="bg-gray-100 p-4 rounded mb-4">
                    <h2 className="text-lg font-semibold mb-3">{editing ? 'Editar produto' : 'Novo produto'}</h2>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border p-2 rounded w-full"
                        />
                        <input
                            type="number"
                            placeholder="Value"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="flex gap-2 mt-3">
                        <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            salvar
                        </button>
                        <button onClick={handleCancel} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="flex gap-6">
                    <div className="flex-1">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-gray-300 p-2 text-left">Nome</th>
                                    <th className="border border-gray-300 p-2 text-left">Valor</th>
                                    <th className="border border-gray-300 p-2 text-left">ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr
                                        key={product.id}
                                        className={selectedProduct?.id === product.id ? 'bg-blue-50' : ''}
                                    >
                                        <td className="border border-gray-300 p-2">{product.name}</td>
                                        <td className="border border-gray-300 p-2">R$ {product.value}</td>
                                        <td className="border border-gray-300 p-2">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setSelectedProduct(product)}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                                >
                                                    Materiais
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                >
                                                    Deletar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {selectedProduct && (
                        <div className="w-96 border border-gray-300 rounded p-4">
                            <h2 className="text-lg font-semibold mb-3">
                                Materiais de {selectedProduct.name}
                            </h2>

                            <div className="flex flex-col gap-2 mb-3">
                                <select
                                    value={rawMaterialId}
                                    onChange={(e) => setRawMaterialId(e.target.value)}
                                    className="border p-2 rounded"
                                >
                                    <option value="">selecione o material</option>
                                    {rawMaterials.map((rm) => (
                                        <option key={rm.id} value={rm.id}>{rm.name}</option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    placeholder="Quantity Required"
                                    value={quantityRequired}
                                    onChange={(e) => setQuantityRequired(e.target.value)}
                                    className="border p-2 rounded"
                                />
                                <button
                                    onClick={handleAddMaterial}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Adicionar Material
                                </button>
                            </div>

                            <table className="w-full border-collapse border border-gray-300">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border border-gray-300 p-2 text-left">Material</th>
                                        <th className="border border-gray-300 p-2 text-left">quantidade</th>
                                        <th className="border border-gray-300 p-2 text-left">ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {materialsOfSelectedProduct.map((pm) => {
                                        const rm = rawMaterials.find(r => r.id === pm.rawMaterialId)
                                        return (
                                            <tr key={pm.id}>
                                                <td className="border border-gray-300 p-2">{rm?.name}</td>
                                                <td className="border border-gray-300 p-2">{pm.quantityRequired}</td>
                                                <td className="border border-gray-300 p-2">
                                                    <button
                                                        onClick={() => handleRemoveMaterial(pm.id)}
                                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                                    >
                                                        Remover
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}