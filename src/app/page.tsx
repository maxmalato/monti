import Header from "@/components/Header";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { fetchProducts } from "@/lib/api";
import { Plus, ShoppingCart } from "lucide-react";

export default async function Home() {
  const products = await fetchProducts()

  return (
    <div>
      <Header />
      <main className="mx-4">
        <ul>
          {products.map((product) => (
            <li key={product.id} className="flex flex-col items-center justify-center gap-4 border my-10 p-2 rounded-lg shadow-md size-96">
              <h2 className="text-xl line-clamp-1">{product.title}</h2>
              <div>
                <img className="w-full h-40" src={product.image} alt={product.title} />
              </div>
              <p className="line-clamp-2 text-slate-500 indent-8 px-2">{product.description}</p>
              <div className="flex items-center justify-around w-full">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="bg-slate-200 p-3 rounded-full">
                      <Plus />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Mais informações</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <p className="font-semibold bg-slate-300 p-3 rounded-full text-slate-800 text-xl">$ {product.price}</p>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="bg-slate-200 p-3 rounded-full">
                      <ShoppingCart />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Adicionar ao carrinho</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
