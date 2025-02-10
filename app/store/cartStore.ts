import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Product } from "../types/product"

interface CartState {
    cart: Product[]
    addToCart: (product: Product) => void
    removeFromCart: (id: number) => void
    clearCart: () => void
}

export const useCartStore = create<CartState>((set) => ({
    cart: [],
    addToCart: (product) => {
        set((state) => {
            const existingItem = state.cart.find((p) => p.id === product.id)
            if (!existingItem) {
                return { cart: [...state.cart, product] }
            }

            return state
        })
    },
    removeFromCart: (id) => {
        set((state) => ({
            cart: state.cart.filter((p) => p.id !== id)
        }))
    },
    clearCart: () => set({ cart: [] })
}))