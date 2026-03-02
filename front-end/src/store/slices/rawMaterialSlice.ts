import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../services/api'
import type { RawMaterial } from '../../@types/rawMaterialInterface'

export const fetchRawMaterials = createAsyncThunk('rawMaterials/fetchAll', async () => {
    const response = await api.get('/raw-materials')
    return response.data
})

export const createRawMaterial = createAsyncThunk('rawMaterials/create', async (data: Omit<RawMaterial, 'id'>) => {
    const response = await api.post('/raw-materials', data)
    return response.data
})

export const updateRawMaterial = createAsyncThunk('rawMaterials/update', async ({ id, ...data }: RawMaterial) => {
    const response = await api.put(`/raw-materials/${id}`, data)
    return response.data
})

export const deleteRawMaterial = createAsyncThunk('rawMaterials/delete', async (id: string) => {
    await api.delete(`/raw-materials/${id}`)
    return id
})

const rawMaterialSlice = createSlice({
    name: 'rawMaterials',
    initialState: {
        items: [] as RawMaterial[],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRawMaterials.pending, (state) => { state.loading = true })
            .addCase(fetchRawMaterials.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(createRawMaterial.fulfilled, (state, action) => {
                state.items.push(action.payload)
            })
            .addCase(updateRawMaterial.fulfilled, (state, action) => {
                const index = state.items.findIndex(r => r.id === action.payload.id)
                if (index !== -1) state.items[index] = action.payload
            })
            .addCase(deleteRawMaterial.fulfilled, (state, action) => {
                state.items = state.items.filter(r => r.id !== action.payload)
            })
    }
})

export default rawMaterialSlice.reducer