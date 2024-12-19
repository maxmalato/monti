"use client"

import { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/types/product";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Undo2 } from "lucide-react";

export default function ProductDetails() {
    const [product, setProduct] = useState<Product | null>(null)
    const [error, setError] = useState<string | null>(null)
    const { id } = useParams()

    useEffect(() => {
        // Aguarda o ID estar disponível
        if (!id) return

        async function fetchProductsDetails() {
            try {
                const products = await fetchProducts()
                const selectProduct = products.find((p) => p.id === Number(id))

                if (!selectProduct) {
                    setError("Produto não encontrado")
                    return
                }

                setProduct(selectProduct)
            } catch (err) {
                setError("Erro ao carregar o produto.")
                console.error(err)
            }
        }

        fetchProductsDetails()
    }, [id])

    if (error) {
        return <div>{error}</div>
    }

    if (!product) {
        return <div>Carregando...</div>
    }

    return (
        <div>
            <Header showSearchBar={false} showIconBack={true} />
            <div className="flex flex-col items-center gap-4 border p-2 pb-6 shadow-md m-4 rounded-lg">
                <div className="bg-slate-200 text-slate-600 px-3 py-1 rounded-lg w-fit self-start">{product.category}</div>
                <img className="w-56 mix-blend-darken" src={product.image} alt={product.title} />
                <h1 className="text-xl line-clamp-1 text-center">{product.title}</h1>
                <h2 className="text-slate-700 text-center px-2">{product.description}</h2>
                <p className="font-semibold bg-slate-200 p-3 rounded-lg text-slate-800 text-2xl">$ {product.price}</p>
                <div className="flex gap-4 justify-center mt-5">
                    <Button className="text-lg" type="submit">Comprar agora</Button>
                    <Button className="text-lg" type="submit">Adicionar ao carrinho</Button>
                </div>
            </div>

        </div>
    )
}