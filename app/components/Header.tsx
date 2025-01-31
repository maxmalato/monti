import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ShoppingCart } from "lucide-react"


const Header = () => {
    return (
        <header className="sticky z-10 top-3">
            <div className="flex justify-between px-4 py-2 rounded-md mx-2 items-center drop-shadow-md bg-white mb-10">
                <h1 className="font-semibold text-xl cursor-pointer hover:text-slate-700">Monti.</h1>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger><ShoppingCart/></TooltipTrigger>
                        <TooltipContent>
                            <p>Minhas compras</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </header>
    )
}

export default Header