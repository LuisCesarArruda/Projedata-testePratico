import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { RawMaterials } from '../pages/rawMaterials'
import rawMaterialReducer from '../store/slices/rawMaterialSlice'

const mockStore = configureStore({
    reducer: {
        rawMaterials: rawMaterialReducer
    }
})

vi.mock('../store/slices/rawMaterialSlice', async () => {
    const actual = await vi.importActual('../store/slices/rawMaterialSlice')
    return {
        ...actual,
        fetchRawMaterials: () => ({ type: 'rawMaterials/fetchAll/fulfilled', payload: [] }),
    }
})

function renderWithStore(component: React.ReactElement) {
    return render(
        <Provider store={mockStore}>
            {component}
        </Provider>
    )
}

describe('RawMaterials', () => {
    it('should render the title', () => {
        renderWithStore(<RawMaterials />)
        expect(screen.getByText('Matérias Primas')).toBeInTheDocument()
    })

    it('should render the new raw material button', () => {
        renderWithStore(<RawMaterials />)
        expect(screen.getByText('Novas matérias primas')).toBeInTheDocument()
    })

    it('should show form when clicking new raw material button', () => {
        renderWithStore(<RawMaterials />)
        fireEvent.click(screen.getByText('Novas matérias primas'))
        expect(screen.getByPlaceholderText('Name')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Stock Quantity')).toBeInTheDocument()
    })

    it('should hide form when clicking cancel', () => {
        renderWithStore(<RawMaterials />)
        fireEvent.click(screen.getByText('Novas matérias primas'))
        fireEvent.click(screen.getByText('Cancel'))
        expect(screen.queryByPlaceholderText('Name')).not.toBeInTheDocument()
    })
})