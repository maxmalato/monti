"use client";

import Image from "next/image";
import { useCartStore } from "../store/cartStore";
import { Button } from "@/components/ui/button";
import { CheckCheck, Minus, PackageX, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    increeaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  return (
    <main className="flex flex-col gap-10 items-center my-4 min-h-[35rem]">
      {cart.length === 0 ? (
        <p className="text-center">Seu carrinho está vazio.</p>
      ) : (
        <ul className="flex flex-col items-center gap-5 w-full px-2 md:grid md:grid-cols-2 md:justify-items-center">
          {cart.map((item) => (
            <li key={item.id} className="border p-3 rounded-xl w-full">
              <div className="flex justify-between">
                <Link href={`/products/${item.id}`}>
                  <div className="flex gap-3">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="bg-slate-100 rounded-lg drop-shadow-md"
                    />
                    <div className="flex flex-col gap-2">
                      <h1 className="line-clamp-1 font-bold">{item.title}</h1>
                      <p className="text-xs text-slate-500">
                        Estoque: {item.stock}
                      </p>
                      <p className="font-semibold text-xl">
                        $ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="mt-4 flex justify-center gap-10">
                <Button
                  onClick={() => removeFromCart(item.id)}
                  variant="destructive"
                  className="w-20"
                >
                  <Trash2 />
                  <span>Excluir</span>
                </Button>

                <div className="flex items-center gap-3">
                  <div
                    className="border rounded-full p-1 cursor-pointer"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    <Minus size={24} />
                  </div>
                  <div className="text-sm font-semibold">{item.quantity}</div>
                  <div
                    className="bg-slate-900 text-white rounded-full p-1 cursor-pointer"
                    onClick={() => increeaseQuantity(item.id)}
                  >
                    <Plus size={24} />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cart.length >= 1 && (
        <>
          <div>
            <p className="text-center">
              Total:{" "}
              <span className="font-semibold text-2xl">
                ${" "}
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </span>
            </p>
          </div>

          <div className="flex gap-4">
            <Button onClick={clearCart} variant="destructive">
              <PackageX /> Limpar o carrinho
            </Button>

            <Link href="/checkout">
              <Button variant="outline">
                <CheckCheck /> Ir para o checkout
              </Button>
            </Link>
          </div>
        </>
      )}
    </main>
  );
};

export default CartPage;
