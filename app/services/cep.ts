// Buscar o CEP de um endereço
export const fetchCep = async (cep: string) => {
  try {
    const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);

    if(!response.ok) {
      throw new Error("Erro ao buscar CEP. Tente novamente.");
    }

    const data = await response.json();

    if(data.erro) {
      throw new Error("CEP não encontrado.");
    }

    return data;
  } catch (error) {
    console.error("Erro ao buscar o CEP.", error);
    throw new Error("Ocorreu um problema. Tente novamente mais tarde.");
  }
};
