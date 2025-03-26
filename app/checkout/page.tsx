"use client";

import React, { useEffect, useState } from "react";
import Vmasker from "vanilla-masker";
import { useCartStore } from "../store/cartStore";
import { fetchCep } from "../services/cep";
import { isValidEmail } from "@/lib/utils/validationEmail";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"
import { Boxes, CheckCircle2, PackageCheck } from "lucide-react";

const CheckoutPage: React.FC = () => {
    const cart = useCartStore((state) => state.cart);
    const { toast } = useToast()

    // Calcula o total do carrinho
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Formata o campo de telefone
    const phoneMask = (value: string) => Vmasker.toPattern(value, "(99) 99999-9999");

    // Formata o campo de CEP
    const cepMask = (value: string) => Vmasker.toPattern(value, "99999-999");

    //Formatar o campo de Estado
    const stateMask = (value: string) => Vmasker.toPattern(value, "AA").toLocaleUpperCase();

    // Estados para os campos do formulário
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phone, setPhone] = useState("");
    const [cep, setCep] = useState("");
    const [address, setAddress] = useState("");
    const [numAddress, setNumAddress] = useState("");
    const [complement, setComplement] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    // Validação do e-mail
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value)

        if (!isValidEmail(value)) {
            setEmailError("E-mail inválido.")
        } else {
            setEmailError("")
        }
    }

    useEffect(() => {
        const searchAddres = async () => {
            try {
                const data = await fetchCep(cep);

                setAddress(data.street || "");
                setNeighborhood(data.neighborhood || "");
                setCity(data.city);
                setState(data.state);

            } catch (error) {
                console.error(error)
                alert("CEP inválido. Verifique novamente ou preencha manualmente.")
            }
        }
        if (cep.length === 9) {
            searchAddres();
        }

    }, [cep]);

    // Função para lidar com a finalização da compra
    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !phone || !cep || !address || !numAddress || !neighborhood || !city || !state) {
            toast({
                title: "Erro",
                description: "Por favor, preencha todos os campos.",
                variant: "destructive"
            });
            return;
        }

        toast({
            title: "Compra finalizada com sucesso.",
            description: "Seu pedido foi recebido e está sendo processado."
        })

        // Limpeza dos dados depois da finalização da compra.
        setName("")
        setEmail("")
        setPhone("")
        setCep("")
        setAddress("")
        setNumAddress("")
        setComplement("")
        setNeighborhood("")
        setCity("")
        setState("")
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6 justify-center">
                <Boxes />
                <h1 className="text-3xl font-semibold">Seus produtos</h1>
            </div>
            {cart.length === 0 ? (
                <p className="text-gray-600 text-center">Seu carrinho está vazio.</p>
            ) : (
                <>
                    <ul className="mb-6">
                        {cart.map((item) => (
                            <li key={item.id} className="flex justify-between items-center my-4 border-b pb-2">
                                <div className="flex items-center gap-2">
                                    <PackageCheck />
                                    <span className="line-clamp-1 w-48 md:line-clamp-0 md:w-fit">{item.title}</span> - {item.quantity} x $ {item.price.toFixed(2)}
                                </div>
                                <div className="font-semibold">
                                    $ {(item.price * item.quantity).toFixed(2)}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h2 className="text-2xl font-semibold mb-4">
                        Total: <span className="text-green-600">$ {total.toFixed(2)}</span>
                    </h2>
                    <form onSubmit={handleCheckout} className="flex flex-col gap-4">
                        <h1 className="text-xl font-semibold text-gray-600">Informe seus dados:</h1>

                        {/* Nome */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Nome completo:
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Digite seu nome completo"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* E-mail */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                E-mail:
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="contato@email.com.br"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500"
                            />
                            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                        </div>

                        {/* Telefone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Telefone:
                            </label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(phoneMask(e.target.value))}
                                placeholder="(99) 98820-3040"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500"

                            />
                        </div>

                        {/* CEP */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                CEP:
                            </label>
                            <input
                                type="text"
                                placeholder="91000-000"
                                value={cep}
                                onChange={(e) => setCep(cepMask(e.target.value))}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* Endereço */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Endereço:
                            </label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Av Brasil"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* Número */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Número:
                            </label>
                            <input
                                type="text"
                                value={numAddress}
                                onChange={(e) => setNumAddress(e.target.value)}
                                placeholder="123"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* Complemento */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Complemento (opcional):
                            </label>
                            <input
                                type="text"
                                value={complement}
                                onChange={(e) => setComplement(e.target.value)}
                                placeholder="Bloco A Apto 101 ou Proximo ao mercado"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* Bairro */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Bairro:
                            </label>
                            <input
                                type="text"
                                value={neighborhood}
                                onChange={(e) => setNeighborhood(e.target.value)}
                                placeholder="Centro"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* Cidade e Estado */}
                        <div className="flex gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Cidade:
                                </label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="Porto Alegre"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Estado:
                                </label>
                                <input
                                    type="text"
                                    value={state}
                                    onChange={(e) => setState(stateMask(e.target.value))}
                                    placeholder="RS"
                                    className="mt-1 block w-24 p-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>

                        <Button className="w-96 self-center" variant="default">
                            <CheckCircle2 /> Finalizar Compra
                        </Button>
                    </form>
                </>
            )}
        </div>
    );
};

export default CheckoutPage;