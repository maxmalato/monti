import Link from "next/link";
import { Product } from "../types/product";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <section className="border p-3 flex flex-col items-center rounded-md w-80 gap-4">
            <p className="self-start p-2 bg-white rounded-md text-sm drop-shadow-md">{product.category}</p>
            <h1 className="font-semibold text-xl line-clamp-1">{product.title}</h1>
            <img className="bg-gradient-to-t from-slate-50 to-slate-300 rounded-md drop-shadow-md" src={product.thumbnail} alt={product.title} />
            <p className="text-center line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-around w-full">
                <p className="text-2xl font-semibold border-b-2 px-2 transition-colors hover:border-slate-900">$ {product.price}</p>
                <Link href={`/products/${product.id}`}>
                    <Button variant="link">Mais detalhes</Button>
                </Link>
            </div>
            <div className="flex gap-6 mt-5 items-center">
                <p className="text-sm">Quantidade:{product.stock}</p>
                <Button variant="outline">
                    Adicionar <ShoppingCart/>
                </Button>
            </div>
        </section>
    )
}

export default ProductCard