import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

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
        <div className="flex gap-2 overflow-x-auto py-2 mx-10 md:justify-center md:mx-0">
            <Button
                onClick={() => handleCategoryClick(null)}
                variant={`${selectedCategory === null ? "default" : "outline"}`}
            >
                All
            </Button>
            {categories.map(category => (
                <Button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    variant={`${selectedCategory === category ? "default" : "ghost"}`}
                >
                    {category}
                </Button>
            ))}
        </div>
    )
}