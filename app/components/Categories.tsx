import { useState, useEffect } from "react";

interface CategoriesProps {
    products: { category: string }[]
    onSelectCategory: (category: string | null) => void
}

export default function Categories({ products, onSelectCategory }: CategoriesProps) {
    const [categories, setCategories] = useState<string[]>([])

    useEffect(() => {
        const uniqueCategories = Array.from(new Set(products.map(product => product.category)))
        setCategories(uniqueCategories)
    }, [products])

    return (
        <div className="flex justify-center space-x-2">
            <button onClick={() => onSelectCategory(null)} className="px-3 py-1 bg-gray-300 rounded">Todos</button>
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-400"
                >
                    {category}
                </button>
            ))}
        </div>
    )
}