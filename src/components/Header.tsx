import { Search, ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetDescription } from "./ui/sheet";

export default function Header() {
    return (
        <div className="sticky top-2 flex items-center justify-between gap-4 pt-3 px-4">
            <Avatar>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex items-center gap-2 justify-center">
                <input type="search" placeholder="Pesquisar" className="outline-none border p-1.5 rounded-lg" />
                <Search className="cursor-pointer transition-colors hover:stroke-orange-400" />
            </div>

            <Sheet>
                <SheetTrigger>
                    <ShoppingCart />
                </SheetTrigger>
                <SheetContent>
                    <SheetTitle>Suas compras</SheetTitle>
                    <SheetDescription>
                        <p>Compras 1</p>
                        <p>Compras 2</p>
                        <p>Compras 3</p>
                    </SheetDescription>
                </SheetContent>
            </Sheet>
        </div>
    )
}