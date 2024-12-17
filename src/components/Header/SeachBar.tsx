import { Search } from "lucide-react";
import Combobox from "../Combobox";

export default function SearchBar() {
    return (
        <div className="flex items-center gap-2 justify-center">
            <div className="hidden md:block md:mr-5">
                <Combobox />
            </div>

            <input type="search" placeholder="Pesquisar" className="outline-none border p-1.5 rounded-lg" />
            <Search className="cursor-pointer transition-colors hover:stroke-slate-400" />
        </div>
    )
}