import Header from "@/components/Header";
import { fetchProducts } from "@/lib/api";

export default async function Home() {
  const products = await fetchProducts()

  return (
    <div>
      <Header />
      <main>
        <ul>
          {products.map((product) => (
            <li key={product.id} className="flex flex-col items-center gap-3 border my-10 p-2 rounded-lg">
              <h2 className="text-xl line-clamp-1">{product.title}</h2>
              <img className="size-40 border p-2" src={product.image} alt={product.title} />
              <p className="line-clamp-3 text-slate-500">{product.description}</p>
              <p className="font-semibold">$ {product.price}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
