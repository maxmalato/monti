"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { fetchProducts } from "@/lib/api"

interface ComboboxProps{
    selectCategory: String,
    setSelectCategory: (category: String) => void
}

export default function Combobox({ selectCategory, setSelectCategory}: ComboboxProps) {

    const [open, setOpen] = React.useState(false)
    const [categories, setCategories] = React.useState<string[]>([])

    React.useEffect(() => {
        async function fecthCategories() {
            try {
                const response = await fetchProducts()
                const uniqueCategories = Array.from(
                    // new Set: categorias únicas
                    new Set(response.map((product: { category: string }) => product.category))
                )
                setCategories(["Todos", ...uniqueCategories])

            } catch (error) {
                console.error("Erro ao buscar os dados de categorias", error)
            }
        }

        fecthCategories()
    }, [])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between h-7 md:h-auto"
                >
                    {selectCategory || "Categorias"}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Pesquisar..." />
                    <CommandList>
                        <CommandEmpty>Categoria não encontrada.</CommandEmpty>
                        <CommandGroup>
                            {categories.map((category) => (
                                <CommandItem
                                    key={category}
                                    value={category}
                                    onSelect={(currentValue) => {
                                        setSelectCategory(currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {category}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            selectCategory === category ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
