import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../services/api'
import type { Product } from '../../@types/productInterface'

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
    const response = await api.get('/products')
    return response.data
})

export const createProduct = createAsyncThunk('products/create', async (data: Omit<Product, 'id'>) => {
    const response = await api.post('/products', data)
    return response.data
})

export const updateProduct = createAsyncThunk('products/update', async ({ id, ...data }: Product) => {
    const response = await api.put(`/products/${id}`, data)
    return response.data
})

export const deleteProduct = createAsyncThunk('products/delete', async (id: string) => {
    await api.delete(`/products/${id}`)
    return id
})

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [] as Product[],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => { state.loading = true })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.items.push(action.payload)
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex(p => p.id === action.payload.id)
                if (index !== -1) state.items[index] = action.payload
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(p => p.id !== action.payload)
            })
    }
})

export default productSlice.reducer