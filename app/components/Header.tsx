import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"


const Header = () => {
    return (
        <header className="sticky z-10 top-3">
            <div className="flex justify-between px-4 py-2 rounded-md mx-2 items-center drop-shadow-md bg-white mb-10">
                <Link href="/">
                    <h1 className="font-semibold text-xl cursor-pointer hover:text-slate-700">Monti.</h1>
                </Link>
                <Link href="/cart">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger><ShoppingCart /></TooltipTrigger>
                            <TooltipContent>
                                <p>Minhas compras</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </Link>
            </div>
        </header>
    )
}

export default Header