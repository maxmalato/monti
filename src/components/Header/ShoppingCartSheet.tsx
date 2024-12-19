import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

export default function ShoppingCartSheet() {
    return (
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
                        <Button className="text-lg" type="submit">Finalizar pedido</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}