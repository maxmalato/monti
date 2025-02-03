"use client"

import { useState } from "react"
import { Product } from "../types/product"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ProductDetailsProps {
    product: Product
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
    // const [quantify, setQuantify] = useState(1)
    // const [cart, setCart] = useState<Product[]>([])

    // const addToCart = () => {
    //     const newItem = { ...product, quantify }
    //     setCart([...cart, newItem])
    //     alert(`Adicionado ${quantify}x  ${product.title} ao carrinho.`)
    // }

    return (
        <div className="flex gap-2 mt-10">
            <Input type="number" placeholder="Quantidade" className="w-36" />
            <Button type="submit" variant="outline">
                <ShoppingCart/>
                Adicionar ao carrinho
            </Button>
        </div>
    )

}

export default ProductDetails