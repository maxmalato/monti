import { useState, useEffect } from "react";

interface CategoriesProps {
    products: { category: string }[]
    onSelectCategory: (category: string | null) => void
}

export default function Categories({ products, onSelectCategory }: CategoriesProps) {
    const [categories, setCategories] = useState<string[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    useEffect(() => {
        const uniqueCategories = Array.from(new Set(products.map(product => product.category)))
        setCategories(uniqueCategories)
    }, [products])

    const handleCategoryClick = (category: string | null) => {
        setSelectedCategory(category)
        onSelectCategory(category)
    }

    return (
        <div className="flex justify-center space-x-4 px-2">
            <button
                onClick={() => handleCategoryClick(null)}
                className={`px-2 py-1 rounded-xl ${selectedCategory === null ? 'bg-slate-700 text-white' : 'bg-gray-200'}`}
            >
                Todos
            </button>
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`border px-2 py-1 rounded-xl hover:border-slate-700 ${selectedCategory === category ? 'border-slate-700 text-slate-700' : 'border-gray-300'}`}
                >
                    {category}
                </button>
            ))}
        </div>
    )
}