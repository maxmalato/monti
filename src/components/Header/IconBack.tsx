import { Undo2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export default function IconBack() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className="bg-slate-200 rounded-lg flex items-center p-2 cursor-pointer transition-colors hover:bg-slate-400">
                    <Undo2 />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Voltar</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}