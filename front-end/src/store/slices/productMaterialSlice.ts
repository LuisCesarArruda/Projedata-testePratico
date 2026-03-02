import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../services/api'
import type { ProductMaterial } from '../../@types/productMaterialInterface'

export const fetchProductMaterials = createAsyncThunk('productMaterials/fetchAll', async () => {
    const response = await api.get('/product-materials')
    return response.data
})

export const createProductMaterial = createAsyncThunk('productMaterials/create', async (data: Omit<ProductMaterial, 'id'>) => {
    const response = await api.post('/product-materials', data)
    return response.data
})

export const updateProductMaterial = createAsyncThunk('productMaterials/update', async ({ id, ...data }: ProductMaterial) => {
    const response = await api.put(`/product-materials/${id}`, data)
    return response.data
})

export const deleteProductMaterial = createAsyncThunk('productMaterials/delete', async (id: string) => {
    await api.delete(`/product-materials/${id}`)
    return id
})

const productMaterialSlice = createSlice({
    name: 'productMaterials',
    initialState: {
        items: [] as ProductMaterial[],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductMaterials.pending, (state) => { state.loading = true })
            .addCase(fetchProductMaterials.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(createProductMaterial.fulfilled, (state, action) => {
                state.items.push(action.payload)
            })
            .addCase(updateProductMaterial.fulfilled, (state, action) => {
                const index = state.items.findIndex(pm => pm.id === action.payload.id)
                if (index !== -1) state.items[index] = action.payload
            })
            .addCase(deleteProductMaterial.fulfilled, (state, action) => {
                state.items = state.items.filter(pm => pm.id !== action.payload)
            })
    }
})

export default productMaterialSlice.reducer