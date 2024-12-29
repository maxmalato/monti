"use client";

import { useEffect, useState } from "react";
import Combobox from "@/components/Combobox";
import Header from "@/components/Header/Header";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Busca os produtos no lado do cliente
  useEffect(() => {
    async function loadProducts() {
      try {
        const data:any = await fetchProducts();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      }
    }

    loadProducts();
  }, []);

  return (
    <div>
      <Header />
      <div className="md:hidden pl-16 border-t pt-4 mx-4 mt-2">
        <Combobox />
      </div>
      <main className="mx-4 md:border-t md:mt-2 md:pt-2">
        {error ? (
          <p className="text-red-500 text-center">Erro: {error}</p>
        ) : (
          <ul className="flex flex-col items-center md:flex-row md:flex-wrap md:gap-4 md:justify-center">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  const handleMoreInfo = (id: number) => {
    router.push(`/product/${id}`);
  };

  return (
    <li
      key={product.id}
      className="flex flex-col items-center justify-center gap-4 border my-4 p-2 rounded-lg shadow-md w-80"
    >
      <h3 className="text-sm self-start bg-slate-200 text-slate-600 px-3 py-1 rounded-lg">
        {product.category}
      </h3>
      <h2 className="text-xl line-clamp-1 text-center">{product.title}</h2>
      <div>
        <img
          className="w-full h-40 mix-blend-darken"
          src={product.image}
          alt={product.title}
        />
      </div>
      <p className="line-clamp-2 text-slate-400 text-center px-2">{product.description}</p>
      <div className="flex items-center justify-around w-full">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={() => handleMoreInfo(product.id)}
              className="bg-slate-200 p-3 rounded-full cursor-pointer"
            >
              <Plus />
            </TooltipTrigger>
            <TooltipContent>
              <p>Mais informações</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <p className="font-semibold bg-slate-200 p-3 rounded-lg text-slate-800 text-lg">
          $ {product.price}
        </p>

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
  );
}
