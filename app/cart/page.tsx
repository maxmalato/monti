"use client"

import Image from "next/image"
import { useCartStore } from "../store/cartStore"
import { Button } from "@/components/ui/button"
import { Minus, PackageX, Plus, Trash2 } from "lucide-react"
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tooltip } from "@radix-ui/react-tooltip"
import Link from "next/link"

export default function CartPage() {
    const { cart, removeFromCart, clearCart, increeaseQuantity, decreaseQuantity } = useCartStore()

    return (
        <main className="flex flex-col gap-10 items-center my-4 min-h-96">
            {cart.length === 0 ? (
                <p className="text-center">Seu carrinho está vazio.</p>
            ) : (
                <ul className="flex flex-col items-center gap-5 w-full px-2 md:grid md:grid-cols-2 md:justify-items-center lg:grid-cols-3">
                    {cart.map((item) => (
                        <li key={item.id} className="border p-3 rounded-lg w-full">
                            <div className="flex justify-between">
                                <Link href={`/products/${item.id}`}>
                                    <div className="flex gap-3">
                                        <Image src={item.thumbnail} alt={item.title} width={100} height={100} className="bg-slate-100 rounded-lg drop-shadow-md" />
                                        <div className="flex flex-col justify-around">
                                            <h1 className="line-clamp-1 font-bold">{item.title}</h1>
                                            <p className="text-sm text-slate-500">Estoque: {item.stock}</p>
                                            <p className="font-semibold text-xl">$ {(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="mt-4 flex justify-center gap-10">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button onClick={() => removeFromCart(item.id)} variant="ghost" className="w-20">
                                                <Trash2 />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Remover do carrinho</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <div className="flex items-center gap-3">
                                    <div className="border rounded-full p-1 cursor-pointer" onClick={() => decreaseQuantity(item.id)}>
                                        <Minus size={24} />
                                    </div>
                                    <div className="text-sm font-semibold">{item.quantity}</div>
                                    <div className="bg-slate-900 text-white rounded-full p-1 cursor-pointer" onClick={() => increeaseQuantity(item.id)}>
                                        <Plus size={24} />
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {cart.length > 1 && (
                <Button onClick={clearCart} className="w-96 py-5" variant="secondary">
                    <PackageX /> Limpar o carrinho
                </Button>
            )}
        </main>
    )
}
