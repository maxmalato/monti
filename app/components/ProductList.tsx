"use client"

import Link from "next/link"
import { Product } from "../types/product"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useCartStore } from "../store/cartStore"
interface ProductListProps {
    products: Product[]
}

export default function ProductList({ products }: ProductListProps) {
    const { addToCart, isInCart } = useCartStore()

    return (
        <main className="flex flex-col gap-3 items-center md:flex-row md:flex-wrap md:justify-center">
            {products.map((product) => {
                const alreadyInCart = isInCart(product.id)

                return (
                    <section key={product.id} className="border p-3 flex flex-col items-center rounded-md w-3/4 md:w-80 gap-3 mb-4">
                        <h3 className="self-start p-2 bg-white rounded-md text-sm drop-shadow-md">{product.category}</h3>
                        <h1 className="font-semibold text-xl line-clamp-1">{product.title}</h1>

                        <Image src={product.thumbnail} alt={product.title} width={500} height={500} />
                        <p className="text-center line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-around w-full">
                            <p className="text-2xl font-semibold border-b-2 px-2 transition-colors hover:border-slate-900">$ {product.price}</p>
                            <Link href={`/products/${product.id}`}>
                                <Button variant="link">Mais detalhes</Button>
                            </Link>
                        </div>
                        <Button
                            variant="default"
                            className="w-full mt-4"
                            onClick={() => addToCart(product)}
                            disabled={alreadyInCart}
                        >
                            <ShoppingCart /> {alreadyInCart ? "Adicionado" : "Adicionar no carrinho"}
                        </Button>
                    </section>
                )
            })}
        </main>
    )
}