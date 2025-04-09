"use client";

import React, { useEffect, useState } from "react";
import Vmasker from "vanilla-masker";
import { useCartStore } from "../store/cartStore";
import { fetchCep } from "../services/cep";
import { isValidEmail } from "@/lib/utils/validationEmail";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast"
import { Boxes, CheckCircle2 } from "lucide-react";

const CheckoutPage: React.FC = () => {
    const cart = useCartStore((state) => state.cart);
    const { clearCart } = useCartStore()
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
    const [cepError, setCepError] = useState("");
    const [address, setAddress] = useState("");
    const [numAddress, setNumAddress] = useState("");
    const [complement, setComplement] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    // Validação do e-mail
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = (e.target.value).toLocaleLowerCase();
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

                if (data) {
                    setAddress(data.street || "");
                    setNeighborhood(data.neighborhood || "");
                    setCity(data.city);
                    setState(data.state);

                    setCepError("");
                } else {
                    throw new Error("CEP Inválido");
                }
            } catch (error) {
                console.error(error);
                setCepError("CEP inválido. Verifique novamente ou preencha manualmente.");
                setAddress("");
                setNeighborhood("");
                setCity("");
                setState("");
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
                title: "Erro!",
                description: "Por favor, preencha todos os seus dados.",
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

        clearCart()
    }

    return (
        <div className="p-6 max-w-3xl mx-auto min-h-[35rem]">
            <div className="flex items-center gap-4 mb-6 justify-center" aria-label="Seus produtos">
                <Boxes aria-hidden="true" />
                <h1 className="text-3xl font-semibold">Seus produtos</h1>
            </div>
            {cart.length === 0 ? (
                <p className="text-gray-600 text-center" role="alert" >Seu carrinho está vazio.</p>
            ) : (
                <>
                    <ul className="mb-6" aria-live="polite">
                        {cart.map((item) => (
                            <li key={item.id} className="flex justify-between items-center my-4 border-b pb-2">
                                <div>
                                    <div className="line-clamp-1 w-56 text-sm md:line-clamp-0 md:w-fit md:text-base">{item.title}</div>
                                    <div className="text-sm font-semibold text-gray-500" aria-label={`Quantidade: ${item.quantity}, Preço unitário: $${item.price.toFixed(2)}`}>{item.quantity} x $ {item.price.toFixed(2)}</div>
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

                    <div className="bg-red-600 p-2 rounded-lg my-3">
                        <p className="text-sm text-white text-center" role="alert">Não se preocupe que os seus dados não serão gravados. Isso é apenas uma simulação.</p>
                    </div>
                    <form onSubmit={handleCheckout} className="flex flex-col gap-4">
                        <h1 className="text-2xl font-semibold text-gray-600 text-center">Informe seus dados:</h1>

                        {/* Nome */}
                        <div>
                            <Label htmlFor="name">Nome:</Label>
                            <Input
                                type="text"
                                id="name"
                                value={name}
                                placeholder="Digite seu nome"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* E-mail */}
                        <div>
                            <Label htmlFor="email"> E-mail:</Label>
                            <Input
                                type="email"
                                id="email"
                                value={email}
                                placeholder="contato@email.com.br"
                                onChange={handleEmailChange}
                                aria-describedby={emailError ? "email-error" : undefined}
                            />
                            {emailError && <p className="text-red-500 text-sm pt-1">{emailError}</p>}
                        </div>

                        {/* Telefone */}
                        <div>
                            <Label htmlFor="phone">Telefone:</Label>
                            <Input
                                type="text"
                                inputMode="numeric"
                                id="phone"
                                value={phone}
                                placeholder="(99) 98820-3040"
                                onChange={(e) => setPhone(phoneMask(e.target.value))}
                            />
                        </div>

                        {/* CEP */}
                        <div>
                            <Label htmlFor="cep">CEP:</Label>
                            <Input
                                type="text"
                                inputMode="numeric"
                                id="cep"
                                value={cep}
                                placeholder="91000-000"
                                onChange={(e) => {
                                    const newCep = cepMask(e.target.value)
                                    setCep(newCep)

                                    if (newCep.length < 9) setCepError("")
                                }}
                            />
                            {cepError && <p className="text-red-500 text-sm pt-1">{cepError}</p>}
                        </div>

                        {/* Endereço */}
                        <div>
                            <Label htmlFor="address">Logradouro:</Label>
                            <Input
                                type="text"
                                id="address"
                                value={address}
                                placeholder="Av Brasil"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        {/* Número */}
                        <div>
                            <Label htmlFor="numAddress">Número:</Label>
                            <Input
                                type="text"
                                id="numAddress"
                                value={numAddress}
                                placeholder="123"
                                onChange={(e) => setNumAddress(e.target.value)}
                            />
                        </div>

                        {/* Complemento */}
                        <div>
                            <Label htmlFor="complement">Complemento (opcional):</Label>
                            <Input
                                type="text"
                                id="complement"
                                value={complement}
                                placeholder="Bloco A Apto 101 ou Proximo ao mercado"
                                onChange={(e) => setComplement(e.target.value)}
                            />
                        </div>

                        {/* Bairro */}
                        <div>
                            <Label htmlFor="neighborhood">Bairro:</Label>
                            <Input
                                type="text"
                                id="neighborhood"
                                value={neighborhood}
                                placeholder="Centro"
                                onChange={(e) => setNeighborhood(e.target.value)}
                            />
                        </div>

                        {/* Cidade e Estado */}
                        <div className="flex gap-4">
                            <div>
                                <Label htmlFor="city">Cidade:</Label>
                                <Input
                                    type="text"
                                    id="city"
                                    value={city}
                                    placeholder="Porto Alegre"
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="state">Estado:</Label>
                                <Input
                                    type="text"
                                    id="state"
                                    value={state}
                                    placeholder="RS"
                                    onChange={(e) => setState(stateMask(e.target.value))}
                                />
                            </div>
                        </div>

                        <Button variant="default" className="mt-10" aria-label="Finalizar a compra">
                            <CheckCircle2 aria-hidden="true" /> Finalizar Compra
                        </Button>
                    </form>
                </>
            )}
        </div>
    );
};

export default CheckoutPage;