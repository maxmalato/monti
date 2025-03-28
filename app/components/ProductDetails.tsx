"use client"

import Image from "next/image"
import { Product } from "../types/product"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "../store/cartStore"

interface ProductDetailsProps {
    product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const { addToCart, isInCart } = useCartStore()
    const added = isInCart(product.id)

    return (
        <section className="border p-3 flex flex-col items-center rounded-md gap-3 w-3/4 md:w-full md:border-none md:mb-10 my-4">
            <div className="flex items-center justify-between w-full mb-2">
                <p className="self-start p-2 bg-white rounded-xl text-sm drop-shadow-md">{product.category}</p>
                <p className="text-sm text-slate-600 md:font-semibold">Estoque: {product.stock}</p>
            </div>
            <h1 className="font-semibold text-xl md:text-center">{product.title}</h1>

            <Image src={product.thumbnail} alt={product.title} width={300} height={300} />
            <p className="indent-3 text-slate-500 md:px-20">{product.description}</p>
            <p className="text-3xl font-bold border-b-2 px-2 transition-colors hover:border-slate-900">$ {product.price}</p>
            <Button
                variant="outline"
                className="w-full mt-4 md:w-96"
                onClick={() => addToCart(product)}
                disabled={added}
            >
                <ShoppingCart /> {added ? "Adicionado" : "Adicionar no carrinho"}
            </Button>
        </section>
    )

}