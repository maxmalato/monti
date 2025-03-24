"use client";

import React, { useState } from "react";
import { useCartStore } from "../store/cartStore";
import { Button } from "@/components/ui/button";
import { Boxes, CheckCircle2, PackageCheck } from "lucide-react";
import Vmasker from "vanilla-masker";

const CheckoutPage: React.FC = () => {
    const cart = useCartStore((state) => state.cart);

    // Calcula o total do carrinho
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Formata o campo de telefone
    const phoneMask = (value: string) => Vmasker.toPattern(value, "(99) 99999-9999");

    // Formata o campo de CPF
    const cpfMask = (value: string) => Vmasker.toPattern(value, "999.999.999-99");

    // Formata o campo de CEP
    const cepMask = (value: string) => Vmasker.toPattern(value, "99999-999");

    // Estados para os campos do formulário
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [cpf, setCpf] = useState("");
    const [cep, setCep] = useState("");
    const [address, setAddress] = useState("");

    // Função para lidar com a finalização da compra
    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !address || !phone || !cpf) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        alert(`Compra finalizada com sucesso!
    Nome: ${name}
    Endereço: ${address}
    Telefone: ${phone}
    CPF: ${cpf}
    Total: R$ ${total.toFixed(2)}`);
    };

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

                        {/* CPF */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                CPF:
                            </label>
                            <input
                                type="text"
                                value={cpf}
                                onChange={(e) => setCpf(cpfMask(e.target.value))}
                                placeholder="999.999.999-99"
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
                                placeholder="Av Brasil, 123, Centro, São Paulo, SP"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500"
                            />
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