"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ChangeEvent } from "react";

interface SearchBarProps {
    onSearch: (text: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <div className="flex justify-center mt-5">
            <div className="flex gap-2 items-center">
                <Input 
                    placeholder="Pesquise seu produto" 
                    onChange={handleInputChange}
                />
                <Search />
            </div>
        </div>
    );
};

export default SearchBar;
