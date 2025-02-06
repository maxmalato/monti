const BASE_URL = "https://dummyjson.com"

// API para buscar todos os produtos
export const fetchProducts = async () => {
    const response = await fetch(`${BASE_URL}/products`)

    try {
        if (!response.ok) {
            throw new Error("Erro ao buscar os produtos na API.")
        }

        const { products } = await response.json()

        return products

    } catch (error) {
        console.error("Erro ao buscar os produtos.", error)
        // Resposta para o cliente
        throw new Error("Ocorreu um problema. Tente novamente mais tarde.")
    }
}


// API para buscar produto por ID
export const fetchProductId = async (id: string | string[]) => {
    const responseId = await fetch(`${BASE_URL}/products/${id}`)

    try {
        if (!responseId.ok) {
            throw new Error("Erro ao buscar um produto na API.")
        }

        return responseId.json()
    } catch (error) {
        console.error("Erro ao buscar os produtos.")
        throw new Error("Ocorreu um problema. Tente novamente mais tarde.")
    }
}