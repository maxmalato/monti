import { fetchProductId } from "@/app/services/api";
import { Product } from "@/app/types/product";
import ProductDetails from "@/app/components/ProductDetails";

interface ProductPageProps {
    params: { id: string }
}

const ProductPage = async ({ params }: ProductPageProps) => {
    const product: Product = await fetchProductId(params.id)

    return (
        <section className="flex flex-col items-center px-4 gap-3">
            <p className="self-start p-2 bg-white rounded-md text-sm drop-shadow-md">{product.category}</p>
            <h1 className="font-semibold text-2xl text-center">{product.title}</h1>
            <img className="w-96" src={product.thumbnail} alt={product.title} />
            <p className="text-sm text-slate-500 indent-8">{product.description}</p>
            <p className="text-3xl font-semibold border-b-2 px-2 transition-colors hover:border-slate-900">$ {product.price}</p>
            <div className="self-start text-sm">Em estoque: {product.stock}</div>

            <ProductDetails product={product} />
        </section>
    )
}

export default ProductPage