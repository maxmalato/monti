import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/lib/api";
import { ShoppingCart } from "lucide-react";

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
              <div className="w-full max-w-[200px] rounded-lg">
                <img src={product.image} alt={product.title} />
              </div>
              <p className="line-clamp-3 text-slate-500">{product.description}</p>
              <div className="flex items-center justify-around w-full">
                <p className="font-semibold">$ {product.price}</p>
                <Button>
                  <ShoppingCart />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
