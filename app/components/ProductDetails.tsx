"use client"

import Image from "next/image"
import { Product } from "../types/product"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "../store/cartStore"
interface ProductDetailsProps {
    product: Product
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
    const { addToCart, isInCart } = useCartStore()
    const added = isInCart(product.id)

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        return date.toLocaleDateString("pt-BR");
    };

    return (
        <div className="flex flex-col items-center w-full">
            <section className="border p-3 flex flex-col items-center rounded-md gap-3 w-3/4 md:w-full md:border-none md:mb-10 my-4">
                <div className="flex justify-between md:justify-around items-center bord mb-2 w-full">
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

            <section className="self-start px-2 w-full">
                <h1 className="text-2xl">Comentários:</h1>

                <article className="pl-2">
                    {product.reviews?.length ? (
                        product.reviews.map((item, index) => (
                            <div key={index} className="border rounded-lg p-2 my-3">
                                <p className="text-xl">{item.reviewerName}</p>
                                <p className="text-sm text-slate-500">{item.reviewerEmail}</p>
                                <div className="my-3">
                                    <p>{item.comment}</p>
                                    <p className="text-xs text-slate-500 mt-1">{formatDate(item.date)}</p>
                                </div>
                                <p className="font-semibold">Avaliação: {item.rating}/5</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-500">Nenhum comentário disponível.</p>
                    )}
                </article>
            </section>
        </div>
    )
};

export default ProductDetails;