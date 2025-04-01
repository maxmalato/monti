import { AtSign, Facebook, Instagram, MapPin, Phone } from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t mt-10 pt-4 px-4">
            <section className="flex justify-center gap-8 mb-7">
                <div className="flex gap-1 transition-colors hover:text-pink-600 cursor-pointer">
                    <Instagram />
                    <p>Instagram</p>
                </div>
                <div className="flex gap-1 transition-colors hover:text-blue-500 cursor-pointer">
                    <Facebook />
                    <p>Facebook</p>
                </div>
            </section>

            <div className="md:flex md:gap-16 md:mb-10">
                <section className="md:w-full">
                    <h2 className="font-semibold text-lg">Empresa</h2>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Sobre nós</AccordionTrigger>
                            <AccordionContent>
                                Uma loja simples de e-commerce.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Vagas</AccordionTrigger>
                            <AccordionContent>
                                No momento não temos vagas, mas peço que acompanhe as nossas redes sociais.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Entregas</AccordionTrigger>
                            <AccordionContent>
                                Entregamos para todo o Brasil.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>

                <section className="mt-5 mb-6 md:w-full md:mt-0">
                    <h2 className="font-semibold text-lg mb-3">Contato</h2>
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-2 hover:text-slate-600">
                            <Phone />
                            <p className="text-sm">+55 01 91234-5678</p>
                        </div>
                        <div className="flex gap-2 hover:text-slate-600">
                            <AtSign />
                            <a href="mailto:contato@monti.com.br">contato@monti.com.br</a>
                        </div>
                        <div className="flex gap-2 hover:text-slate-600">
                            <MapPin />
                            <p>Rua das amendoeras, 23, Centro - São Luís - MA</p>
                        </div>
                    </div>
                </section>
            </div>

            <p className="text-center">Monti. © <span>{currentYear}</span> - Todos os direitos reservados.</p>
        </footer>
    )
}

export default Footer