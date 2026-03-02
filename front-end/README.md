# Inventory System — Front-end

Interface web para o sistema de controle de estoque de insumos e produtos industriais.

## Tecnologias

- **React** com **TypeScript**
- **Vite** como bundler
- **Tailwind CSS** para estilização
- **Redux Toolkit** para gerenciamento de estado
- **Axios** para requisições HTTP
- **React Router DOM** para navegação

## Pré-requisitos

- Node.js 20+
- Back-end rodando em `http://localhost:3333`

## Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/TesteAutoflex.git

# Entre na pasta do front-end
cd TesteAutoflex/front-end

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Funcionalidades

### Produtos
- Listagem de todos os produtos cadastrados
- Cadastro de novos produtos com nome e valor
- Edição de produtos existentes
- Exclusão de produtos
- Associação de matérias-primas ao produto com quantidade necessária

### Matérias-primas
- Listagem de todas as matérias-primas cadastradas
- Cadastro de novas matérias-primas com nome e quantidade em estoque
- Edição de matérias-primas existentes
- Exclusão de matérias-primas

### Sugestão de Produção
- Consulta de quais produtos podem ser produzidos com o estoque atual
- Exibição da quantidade possível de cada produto
- Exibição do valor total que será gerado com a produção sugerida
- Priorização por produtos de maior valor

## Estrutura de Pastas

```
src/
├── pages/
│   ├── Products.tsx
│   ├── RawMaterials.tsx
│   └── ProductionSuggestion.tsx
├── components/
│   ├── ProductForm.tsx
│   ├── RawMaterialForm.tsx
│   └── ProductMaterialForm.tsx
├── store/
│   ├── index.ts
│   └── slices/
│       ├── productSlice.ts
│       ├── rawMaterialSlice.ts
│       └── productMaterialSlice.ts
├── services/
│   └── api.ts
└── types/
    └── index.ts
```

## Scripts disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Gera o build de produção
npm run preview  # Visualiza o build de produção
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3333
```

## Conexão com o Back-end

O front-end consome a API REST do back-end. Certifique-se de que o back-end está rodando antes de iniciar o front-end. Para mais detalhes sobre a API consulte o README do back-end.