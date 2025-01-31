const BASE_URL = "https://dummyjson.com"

// API para buscar todos os produtos
export const fetchProducts = async () => {
    const response = await fetch(`${BASE_URL}/products`)

    if (!response.ok) {
        throw new Error("Erro ao buscar os produtos na API.")
    }

    return response.json()
}


// API para buscar produto por ID
export const fetchProductId = async (id: string | string[]) => {
    const responseId = await fetch(`${BASE_URL}/products/${id}`)

    if (!responseId.ok) {
        throw new Error("Erro ao buscar um produto na API.")
    }

    return responseId.json()
}