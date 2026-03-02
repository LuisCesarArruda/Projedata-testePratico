import { Routes, Route } from 'react-router-dom'
import { Products } from './pages/products'
import { RawMaterials } from './pages/rawMaterials'
import { ProductionSuggestion } from './pages/productSuggestion'
import { Navbar } from './components/Navbar'

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/raw-materials" element={<RawMaterials />} />
          <Route path="/production-suggestion" element={<ProductionSuggestion />} />
          <Route path="/" element={<Products />} />
        </Routes>
      </div>
    </div>
  )
}

export default App