import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { Product } from "../types/product"

interface CartItem extends Product {
    quantity: number
}
interface CartState {
    cart: CartItem[]
    addToCart: (product: Product) => void
    removeFromCart: (id: number) => void
    clearCart: () => void
    isInCart: (id: number) => boolean
    increeaseQuantity: (id: number) => void
    decreaseQuantity: (id: number) => void
}


export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (product) => {
                set((state) => {
                    const existingItem = state.cart.find((p) => p.id === product.id)
                    if (!existingItem) {
                        return { cart: [...state.cart, {...product, quantity:1}] }
                    }

                    return {
                        cart: state.cart.map((p) => 
                            p.id === product.id ? {...p, quantity: p.quantity + 1} : p
                        )
                    }
                })
            },
            removeFromCart: (id) => {
                set((state) => ({
                    cart: state.cart.filter((p) => p.id !== id)
                }))
            },
            clearCart: () => set({ cart: [] }),
            isInCart: (id) => {
                return get().cart.some((p) => p.id === id)
            },
            increeaseQuantity: (id) => {
                set((state) => ({
                    cart: state.cart.map((p) => 
                        p.id === id ? {...p, quantity: p.quantity + 1} : p
                    )
                }))
            },
            decreaseQuantity: (id) => {
                set((state) => ({
                    cart: state.cart.map((p) => 
                        p.id === id && p.quantity > 1 ? {...p, quantity: p.quantity - 1} : p
                    )
                }))
            }
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)