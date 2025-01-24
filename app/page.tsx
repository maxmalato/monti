"use client"

import { useEffect, useState } from "react";
import { fetchProducts } from "./services/api";
import { Product } from "./types/product";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { products: data } = await fetchProducts()
        setProducts(data)
      } catch (error) {
        console.error(error)
      }
    }

    loadProducts()
  }, [])

  return (
    <main>
      <h1>Produtos</h1>
      <div>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}