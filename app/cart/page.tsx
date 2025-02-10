"use client"

import Image from "next/image"
import { useCartStore } from "../store/cartStore"
import { Button } from "@/components/ui/button"
import { PackageX, Trash2 } from "lucide-react"
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tooltip } from "@radix-ui/react-tooltip"

export default function CartPage() {
    const { cart, removeFromCart, clearCart } = useCartStore()

    return (
        <main className="flex flex-col gap-10 items-center">
            {cart.length === 0 ? (
                <p className="text-center">Seu carrinho está vazio.</p>
            ) : (
                <ul className="flex flex-col items-center gap-5 md:flex-row md:grid md:grid-cols-2">
                    {cart.map((item) => (
                        <li key={item.id} className="border p-3 rounded-lg w-96 flex flex-col">
                            <div className="flex gap-3">
                                <Image src={item.thumbnail} alt={item.title} width={100} height={100} />
                                <div className="border-l-2 my-2 px-2">
                                    <h1 className="line-clamp-1 font-bold">{item.title}</h1>
                                    <p className="font-semibold text-2xl pt-4">$ {item.price}</p>
                                </div>
                            </div>

                            <div className="self-center mt-5">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button onClick={() => removeFromCart(item.id)} variant="destructive">
                                                <Trash2 />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Remover do carrinho</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {cart.length > 0 && (
                <Button onClick={clearCart} className="w-96">
                    <PackageX /> Limpar o carrinho
                </Button>
            )}
        </main>
    )
}
