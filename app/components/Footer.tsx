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
        <footer className="bg-slate-100">
            <section className="text-center">
                <h2 className="font-semibold">Monti.</h2>
                <p>Monti © <span>{currentYear}</span> - Todos os direitos reservados.</p>
            </section>

            <section className="flex gap-3 justify-center mt-2">
                <div className="flex gap-1 transition-colors hover:text-pink-600 cursor-pointer">
                    <Instagram />
                    <p>Instagram</p>
                </div>
                <div className="flex gap-1 transition-colors hover:text-blue-500 cursor-pointer">
                    <Facebook />
                    <p>Facebook</p>
                </div>
            </section>

            <section>
                <h2 className="font-semibold">Empresa</h2>
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
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium architecto alias deserunt beatae, enim, adipisci atque consequatur necessitatibus deleniti maiores quam nisi? Nostrum harum sunt animi eligendi porro nisi deleniti.
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

            <section>
                <h2 className="font-semibold">Contato</h2>
                <div className="flex gap-2">
                    <Phone/>
                    <p className="text-sm">+55 01 91234-5678</p>
                </div>
                <div className="flex gap-2">
                    <AtSign/>
                    <p>contato@monti.com.br</p>
                </div>
                <div className="flex gap-2">
                    <MapPin/>
                    <p>Rua das amendoeras, 23, Centro - São Luís - MA</p>
                </div>
            </section>
        </footer>
    )
}

export default Footer