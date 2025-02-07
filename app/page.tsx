import { fetchProducts } from "./services/api"
import ProductList from "./components/ProductList"
import { Product } from "./types/product"

export default async function Home() {
  const products: Product[] = await fetchProducts(); // Busca informações da API

  console.log(products)

  return (
    <main>
      <ProductList products={products} />
    </main>
  )
}