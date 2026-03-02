import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/productSlice'
import rawMaterialReducer from './slices/rawMaterialSlice'
import productMaterialReducer from './slices/productMaterialSlice'

export const store = configureStore({
    reducer: {
        products: productReducer,
        rawMaterials: rawMaterialReducer,
        productMaterials: productMaterialReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch