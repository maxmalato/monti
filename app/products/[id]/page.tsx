import { fetchProductId } from "@/app/services/api";
import { Product } from "@/app/types/product";
import ProductDetails from "@/app/components/ProductDetails";

interface ProductPageProps {
    params: { id: string }
}

const ProductPage = async ({ params }: ProductPageProps) => {
    const product: Product = await fetchProductId(params.id)

    return (
        <section>
            <h1>{product.title}</h1>
            <img src={product.thumbnail} alt={product.title} />
            <div>Em estoque: {product.stock}</div>

            <ProductDetails product={product}/>
        </section>
    )
}

export default ProductPage