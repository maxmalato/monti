"use client";

import { ShoppingCart, UserCircle } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "../store/cartStore";

const Header = () => {
    const { cart } = useCartStore();
    const cartCount = cart.length;

    return (
        <header className="sticky z-10 top-3 h-fit">
            <div className="flex justify-between p-2 mx-2 rounded-xl items-center drop-shadow-md bg-white">
                <Link href="/" aria-label="Página Inicial">
                    <h1 className="font-semibold text-xl cursor-pointer hover:text-slate-700">Monti.</h1>
                </Link>

                <div className="flex items-center space-x-4">
                    <UserCircle aria-hidden="true" />

                    <Link href="/cart" aria-label="Carrinho de compras">
                        <div>
                            <ShoppingCart aria-hidden="true" />

                            {cartCount > 0 && (
                                <span className="absolute -top-0 -right-0 bg-red-600 text-white text-xs font-bold size-5 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
