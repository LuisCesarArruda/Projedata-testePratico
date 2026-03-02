# Inventory Management System

Um sistema de gerenciamento de inventário desenvolvido com **Fastify**,**TypeScript**, **Prisma** e **PostgreSQL**.

## 📋 Descrição

Este projeto é uma API REST para gerenciar produtos, matérias-primas e suas relações. Permite criar, ler, atualizar e deletar registros de produtos e matérias-primas, além de gerenciar a composição de produtos a partir de matérias-primas.

## 🚀 Tecnologias

- **Node.js** (v20)
- **TypeScript**
- **Fastify** - Framework web de alto desempenho
- **Prisma** - ORM moderno
- **PostgreSQL** - Banco de dados
- **Docker & Docker Compose** - Containerização
- **Zod** - Validação de esquemas
- **Pino** - Logger

## 📁 Estrutura do Projeto

```
src/
├── app.ts                    # Configuração do Fastify
├── server.ts               # Inicialização do servidor
├── controller/             # Lógica de controle das rotas
│   ├── productController.ts
│   ├── rawMaterialController.ts
│   └── productMaterialController.ts
├── routes/                 # Definição das rotas
│   ├── productRoutes.ts
│   ├── rawMaterialRoutes.ts
│   └── productMaterialRoutes.ts
├── schema/                 # Esquemas de validação Zod
│   ├── productSchemas.ts
│   ├── rawMaterialSchemas.ts
│   └── productMaterialSchemas.ts
├── lib/
│   └── prisma.ts          # Instância do Prisma Client
└── env/
    └── index.ts           # Validação de variáveis de ambiente
prisma/
├── schema.prisma          # Schema do banco de dados
└── migrations/            # Histórico de migrações
```
## 🛠️ Instalação

1. Clone o repositório e instale as dependências:

```bash
npm install
```

2. Configure o arquivo `.env` com base no `.env.example`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas variáveis de ambiente:

```env
DB_USER= "seu_user"
DB_PASSWORD="sua_senha_segura"
DB_NAME="inventory"
DB_PORT=5432
PORT=3333
NODE_ENV=development
```

3. Execute as migrações do Prisma:

```bash
npx prisma migrate dev
```

## 🐳 Docker

Para executar o projeto com Docker Compose:

```bash
docker-compose up
```

O Docker Compose irá:
- Iniciar PostgreSQL na porta definida em `.env`
- Iniciar a API na porta definida em `.env`
- Criar automaticamente o banco de dados

**Nota:** Certifique-se de que o arquivo `.env` está configurado antes de executar o Docker Compose.

## 🚀 Executar Localmente

**Desenvolvimento:**
```bash
npm run dev
```

**Build:**
```bash
npm run build
```

**Produção:**
```bash
npm start
```

## 🧪 Testes

Este projeto usa `vitest` para testes. Há testes de unidade e integração; os testes de integração carregam variáveis de ambiente específicas (`.env.test`) e usam a configuração `vitest.integration.config.ts`.

- Rodar todos os testes (modo interativo):

```bash
npm test
```

- Rodar testes em modo não-interativo (run):

```bash
npm run test:run
```

- Rodar somente os testes de integração (usa `.env.test`):

```bash
npm run test:integration
```

Observações:
- Arquivo de configuração de integração: [vitest.integration.config.ts](vitest.integration.config.ts)
- Variáveis de ambiente de teste podem ser definidas em `.env.test` (ver `npm run test:integration`).
- Testes de exemplo estão em [src/tests](src/tests) (ex.: `calculateSuggestions.test.ts`, `product.integration.test.ts`).

## 📚 API Endpoints

### Produtos
- `POST /products` - Criar produto
- `GET /products` - Listar todos os produtos
- `GET /products/:id` - Obter produto por ID
- `PUT /products/:id` - Atualizar produto
- `DELETE /products/:id` - Deletar produto

### Matérias-Primas
- `POST /raw-materials` - Criar matéria-prima
- `GET /raw-materials` - Listar todas as matérias-primas
- `GET /raw-materials/:id` - Obter matéria-prima por ID
- `PUT /raw-materials/:id` - Atualizar matéria-prima
- `DELETE /raw-materials/:id` - Deletar matéria-prima

### Relação Produto-Matéria Prima
- `POST /product-materials` - Associar matéria-prima a produto
- `GET /product-materials` - Listar todas as associações
- `GET /product-materials/:id` - Obter associação por ID
- `PUT /product-materials/:id` - Atualizar associação
- `DELETE /product-materials/:id` - Deletar associação

## 📊 Modelos de Dados

### Product
```typescript
{
  id: string
  name: string
  value: number
  createdAt: datetime
  updatedAt: datetime
}
```

### RawMaterial
```typescript
{
  id: string
  name: string
  stockQuantity: number
  createdAt: datetime
  updatedAt: datetime
}
```

### ProductMaterial
```typescript
{
  id: string
  productId: string
  rawMaterialId: string
  quantityRequired: number
}
```


