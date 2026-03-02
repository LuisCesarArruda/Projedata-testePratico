import { useState } from 'react'
import { api } from '../services/api'
import type { ProductSuggestion } from '../@types/productSuggestionInterface'

export function ProductionSuggestion() {
    const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([])
    const [grandTotal, setGrandTotal] = useState(0)
    const [loading, setLoading] = useState(false)

    async function handleFetchSuggestion() {
        setLoading(true)
        const response = await api.get('/production-suggestion')
        setSuggestions(response.data.suggestion)
        setGrandTotal(response.data.grandTotal)
        setLoading(false)
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Production Suggestion</h1>
                <button
                    onClick={handleFetchSuggestion}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Gerar Sugestão
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : suggestions.length === 0 ? (
                <p className="text-gray-500">Click "Gerar Sugestão"</p>
            ) : (
                <div>
                    <table className="w-full border-collapse border border-gray-300 mb-4">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 p-2 text-left">Produto</th>
                                <th className="border border-gray-300 p-2 text-left">Quantitade</th>
                                <th className="border border-gray-300 p-2 text-left">Valor total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suggestions.map((suggestion, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 p-2">{suggestion.product}</td>
                                    <td className="border border-gray-300 p-2">{suggestion.quantity}</td>
                                    <td className="border border-gray-300 p-2">R$ {suggestion.totalValue}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-gray-100 font-bold">
                            <tr>
                                <td className="border border-gray-300 p-2" colSpan={2}>Total</td>
                                <td className="border border-gray-300 p-2">R$ {grandTotal}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )}
        </div>
    )
}
