import { Link } from 'react-router-dom'

export function Navbar() {
    return (

        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex gap-6">
                <Link to="/products" className="hover:underline">Produto</Link>
                <Link to="/raw-materials" className="hover:underline">Matéria Prima</Link>
                <Link to="/production-suggestion" className="hover:underline">Sugestão de produto</Link>
            </div>
        </nav>
    )
}

