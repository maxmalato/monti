import { fetchProductId } from "@/app/services/api"
import { Product } from "@/app/types/product"
import ProductDetails from "@/app/components/ProductDetails"

interface ProductPageProps {
    params: Promise<{ id: string }>
}

const ProductPage =  async ({ params }: ProductPageProps) => {
    const { id } = await params
    const product: Product = await fetchProductId(id)
    
    return (
        <main className="flex justify-center md:justify-start">
            <ProductDetails product={product} />
        </main>
    )
};

export default ProductPage;