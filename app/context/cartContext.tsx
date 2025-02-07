"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { Product } from "../types/product"

interface CartContextProps {
    cart: Product[]
    addToCart: (product: Product) => void
    removeToCart: (id: number) => void
    clearCart: () => void
}

const CartContext = createContext<CartContextProps | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Product[]>([])

    function addToCart(product: Product) {
        setCart((prev) => [...prev, product])
    }

    function removeToCart(id: number) {
        setCart((prev) => prev.filter((item) => item.id !== id))
    }

    function clearCart() {
        setCart([])
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)

    if(!context) throw new Error("useCart deve ser usando dentro de um CartProvider.")

    return context
}