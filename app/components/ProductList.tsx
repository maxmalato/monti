"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "../types/product";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "../store/cartStore";
import Categories from "./Categories";
import SearchBar from "./SearchBar";

interface ProductListProps {
    products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
    const { addToCart, isInCart } = useCartStore();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchText, setSearchText] = useState<string>("");
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

    // Filtra os produtos quando a categoria ou a pesquisa mudar
    useEffect(() => {
        setFilteredProducts(
            products.filter((product) => {
                const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
                const matchesSearch = searchText.length < 2 || product.title.toLowerCase().includes(searchText.toLowerCase());
                return matchesCategory && matchesSearch;
            })
        );
    }, [selectedCategory, searchText, products]);

    return (
        <>
            <Categories products={products} onSelectCategory={setSelectedCategory} />
            <SearchBar onSearch={setSearchText} />
            <main className="text-center mt-3">
                {filteredProducts.length === 0 ? (
                    <p role="alert">Nenhum produto encontrado.</p>
                ) : (
                    <div className="flex flex-col gap-4 items-center my-10 px-3 md:grid md:grid-cols-2 md:gap-3 md:place-items-center lg:grid-cols-3">
                        {filteredProducts.map((product) => {
                            const alreadyInCart = isInCart(product.id);

                            return (
                                <section key={product.id} className="flex flex-col items-center border p-3 gap-4 mx-2 md:mx-0">
                                    <h3 className="self-start p-2 bg-white rounded-xl text-sm drop-shadow-md" aria-label={`Categoria ${product.category}`}>{product.category}</h3>
                                    <h1 className="font-semibold text-xl line-clamp-1" aria-label={`Nome do produto: ${product.title}`}>{product.title}</h1>

                                    <Image src={product.thumbnail} alt={product.title} width={500} height={500} />
                                    <p className="text-center line-clamp-2" aria-label={`Descrição do produto ${product.title}`}>{product.description}</p>
                                    <div className="flex items-center justify-around w-full">
                                        <p className="text-2xl font-semibold border-b-2 px-2 transition-colors hover:border-slate-900" aria-label={`Preço do produto ${product.title}`}>$ {product.price}</p>
                                        <Link href={`/products/${product.id}`}>
                                            <Button variant="link" aria-label="Mais detalhes">Mais detalhes</Button>
                                        </Link>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="w-full mt-4"
                                        onClick={() => addToCart(product)}
                                        disabled={alreadyInCart}
                                        aria-disabled={alreadyInCart}
                                        aria-label={alreadyInCart ? "Adicionado no carrinho" : "Adicionar no carrinho"}
                                    >
                                        <ShoppingCart /> {alreadyInCart ? "Adicionado" : "Adicionar no carrinho"}
                                    </Button>
                                </section>
                            );
                        })}
                    </div>
                )}
            </main>
        </>
    );
};

export default ProductList;