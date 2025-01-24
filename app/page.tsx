"use client"

import { useEffect, useState } from "react";
import { fetchProducts } from "./services/api";

interface Product {
  id: number
  title: string
  description: string
  category?: string
  price?: number
  stock?: number
}

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
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <h2 className="text-2xl">{p.title}</h2>
            <p>{p.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}