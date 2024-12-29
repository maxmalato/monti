"use client"

import { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/types/product";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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
        return (
            <div className="flex justify-center pt-10">
                <Button disabled>
                    <Loader2 className="animate-spin" />
                    Aguarde...
                </Button>
            </div>
        )
    }

    return (
        <div>
            <Header showSearchBar={false} showIconBack={true} />
            <div className="border p-2 pb-4 rounded-lg mx-4">
                <div className="flex flex-col items-center gap-3">
                    <div className="bg-slate-200 text-slate-600 p-1 rounded-md w-fit self-start">{product.category}</div>
                    <img className="w-56 mix-blend-darken" src={product.image} alt={product.title} />
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <h1 className="text-xl line-clamp-1 text-center">{product.title}</h1>
                    <h2 className="text-slate-700 text-center px-2">{product.description}</h2>
                    <p className="font-semibold bg-slate-200 p-3 rounded-lg text-slate-800 text-2xl w-40 self-center text-center">$ {product.price}</p>
                </div>
                <div className="flex flex-col items-center gap-3 mt-7">
                    <Button className="text-lg w-60" type="submit">Comprar agora</Button>
                    <Button className="text-lg w-60" variant="outline" type="submit">Adicionar ao carrinho</Button>
                </div>
            </div>

        </div>
    )
}