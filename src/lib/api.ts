import { Product } from "@/types/product";

const BASE_URL = "https://fakestoreapi.com"

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${BASE_URL}/products`)

    if (!response.ok) {
        throw new Error("Falha no carregamento dos produtos")
    }

    return response.json()
}