import { Search, ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetDescription, SheetHeader, SheetFooter, SheetClose } from "./ui/sheet";
import { Button } from "./ui/button";

export default function Header() {
    return (
        <nav className="sticky top-0 flex justify-around px-3 py-2 bg-white">
            <Avatar>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex items-center gap-2 justify-center">
                <input type="search" placeholder="Pesquisar" className="outline-none border p-1.5 rounded-lg" />
                <Search className="cursor-pointer transition-colors hover:stroke-slate-400" />
            </div>

            <Sheet>
                <SheetTrigger>
                    <ShoppingCart />
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Minhas compras</SheetTitle>
                        <SheetDescription>
                            Produto que estão no carrinho.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col gap-2 my-4">
                        <section>
                            <h3 className="text-lg">Notebook Acer Nitro 5</h3>
                            <p className="text-xs text-slate-500">Notebook Gamer com core i9</p>
                        </section>

                        <section>
                            <h3 className="text-lg">TV 32 LG"</h3>
                            <p className="text-xs text-slate-500">SmartTV com Android 9 e HDR</p>
                        </section>
                    </div>
                    <SheetFooter className="flw-64">
                        <SheetClose asChild>
                            <Button type="submit">Finalizar pedido</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </nav>
    )
}