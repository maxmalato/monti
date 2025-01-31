"use client"

import { useState } from "react"
import { Product } from "../types/product"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface ProductDetailsProps {
    product: Product
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
    const [quantify, setQuantify] = useState(1)
    const [cart, setCart] = useState<Product[]>([])

    const addToCart = () => {
        const newItem = { ...product, quantify }
        setCart([...cart, newItem])
        alert(`Adicionado ${quantify}x  ${product.title} ao carrinho.`)
    }

    return (
        <div>
            <label>Quantidade:</label>
            <input
                type="number"
                min="1"
                max={product.stock}
                value={quantify}
                onChange={(e) => setQuantify(Number(e.target.value))}
            />

            <Button variant="outline" onClick={addToCart}>
                Adicionar no carrinho <ShoppingCart />
            </Button>
        </div>
    )

}

export default ProductDetails