import Combobox from "@/components/Combobox";
import Header from "@/components/Header";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { fetchProducts } from "@/lib/api";
import { Plus, ShoppingCart } from "lucide-react";

export default async function Home() {
  const products = await fetchProducts()

  return (
    <div>
      <Header />
      <div className="border-t mx-8 my-3 pt-4">
        <Combobox />
      </div>
      <main className="mx-4">
        <ul className="flex flex-col items-center md:flex-row md:flex-wrap md:gap-4 md:justify-center">
          {products.map((product) => (
            <li key={product.id} className="flex flex-col items-center justify-center gap-4 border my-4 p-2 rounded-lg shadow-md h-96 w-80">
              <h3 className="text-sm self-start bg-slate-100 px-3 py-1 rounded-lg">{product.category}</h3>
              <h2 className="text-xl line-clamp-1 text-center">{product.title}</h2>
              <div>
                <img className="w-full h-40" src={product.image} alt={product.title} />
              </div>
              <p className="line-clamp-2 text-slate-500 text-center px-2">{product.description}</p>
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

                <p className="font-semibold bg-slate-200 p-3 rounded-lg text-slate-800 text-lg">$ {product.price}</p>

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
