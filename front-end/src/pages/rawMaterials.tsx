import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store'
import { fetchRawMaterials, createRawMaterial, updateRawMaterial, deleteRawMaterial } from '../store/slices/rawMaterialSlice'
import type { RawMaterial } from '../@types/rawMaterialInterface'

export function RawMaterials() {
    const dispatch = useDispatch<AppDispatch>()
    const { items, loading } = useSelector((state: RootState) => state.rawMaterials)

    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState<RawMaterial | null>(null)
    const [name, setName] = useState('')
    const [stockQuantity, setStockQuantity] = useState('')

    useEffect(() => {
        dispatch(fetchRawMaterials())
    }, [dispatch])

    function handleSubmit() {
        if (!name || !stockQuantity) return

        if (editing) {
            dispatch(updateRawMaterial({ id: editing.id, name, stockQuantity: Number(stockQuantity) }))
        } else {
            dispatch(createRawMaterial({ name, stockQuantity: Number(stockQuantity) }))
        }

        setName('')
        setStockQuantity('')
        setEditing(null)
        setShowForm(false)
    }

    function handleEdit(rawMaterial: RawMaterial) {
        setEditing(rawMaterial)
        setName(rawMaterial.name)
        setStockQuantity(String(rawMaterial.stockQuantity))
        setShowForm(true)
    }

    function handleDelete(id: string) {
        dispatch(deleteRawMaterial(id))
    }

    function handleCancel() {
        setName('')
        setStockQuantity('')
        setEditing(null)
        setShowForm(false)
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Matérias Primas</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Novas matérias primas
                </button>
            </div>

            {showForm && (
                <div className="bg-gray-100 p-4 rounded mb-4">
                    <h2 className="text-lg font-semibold mb-3">{editing ? 'Editar matéria prima' : 'Novas matérias primas'}</h2>
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
                            placeholder="Stock Quantity"
                            value={stockQuantity}
                            onChange={(e) => setStockQuantity(e.target.value)}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="flex gap-2 mt-3">
                        <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            Save
                        </button>
                        <button onClick={handleCancel} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 p-2 text-left">Nome</th>
                            <th className="border border-gray-300 p-2 text-left">quantidade em stock</th>
                            <th className="border border-gray-300 p-2 text-left">ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((rawMaterial) => (
                            <tr key={rawMaterial.id}>
                                <td className="border border-gray-300 p-2">{rawMaterial.name}</td>
                                <td className="border border-gray-300 p-2">{rawMaterial.stockQuantity}</td>
                                <td className="border border-gray-300 p-2">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(rawMaterial)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(rawMaterial.id)}
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
            )}
        </div>
    )
}
