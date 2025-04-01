# Monti - E-commerce Simples

Monti é um e-commerce simples desenvolvido com Next.js e TypeScript. Ele permite listar produtos, visualizar detalhes, adicionar itens ao carrinho e finalizar a compra com um checkout funcional.

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://monti-ecommerce.vercel.app/)

## 🚀 Funcionalidades

- Listagem de produtos a partir da API DummyJSON

- Página de detalhes do produto com descrição, estoque e comentários

- Carrinho de compras com ajuste de quantidade e cálculo do total

- Checkout com revisão da compra e preenchimento automático de cidade e estado via BrasilAPI

- Validação de e-mail e aplicação de máscaras para telefone, CEP e estado

## 🛠 Tecnologias Utilizadas

- Next.js e TypeScript – Estrutura e lógica do projeto

- TailwindCSS – Estilização

- Zustand – Gerenciamento do carrinho

- APIs – DummyJSON (produtos) e BrasilAPI (CEP)

- Vanilla-Masker – Formatação de campos

- SessionStorage – Armazenamento temporário do carrinho

### 📦 Instalação e Execução

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/monti.git
cd monti
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

4. Inicie o projeto:
```bash
npm run dev
# ou
yarn dev
```

Acesse http://localhost:3000/ no navegador.
