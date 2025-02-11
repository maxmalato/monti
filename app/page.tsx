import { fetchProducts } from "./services/api"
import ProductList from "./components/ProductList"
import { Product } from "./types/product"

export default async function Home() {
  const products: Product[] = await fetchProducts();

  console.log(products)

  return (
    <main className="my-4">
      <ProductList products={products} />
    </main>
  )
}