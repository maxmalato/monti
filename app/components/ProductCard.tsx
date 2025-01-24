import Link from "next/link";
import { Product } from "../types/product";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <section className="border mb-2 p-3 flex flex-col items-center bg-slate-100 gap-3">
            <p className="self-start p-2 bg-white rounded-md text-sm font-semibold drop-shadow-md">{product.category}</p>
            <h1 className="font-semibold text-xl">{product.title}</h1>
            <img className="bg-slate-300 rounded-lg" src={product.thumbnail} alt={product.title} />
            <p className="text-center line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-around w-full">
                <p className="text-2xl font-semibold bg-white p-2 rounded-md drop-shadow-sm">$ {product.price}</p>
                <p className="border-l pl-2 border-slate-800"><span className="font-semibold">Quantidade: </span>{product.stock}</p>
            </div>
            <div className="flex gap-4">
                <Link href={`/products/${product.id}`}>
                    <Button variant="link">Mais detalhes</Button>
                </Link>

                <Button variant="outline">
                    <ShoppingCart /> Adicionar
                </Button>
            </div>
        </section>
    )
}

export default ProductCard