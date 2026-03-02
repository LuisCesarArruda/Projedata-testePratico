# 📦 Inventory System — Full Stack Application

Aplicação web **full-stack** desenvolvida como teste técnico prático para gerenciamento de estoque de matérias-primas e cálculo automático de produção possível com base no inventário disponível.

---

## 🎯 Objetivo do Projeto

O sistema permite:

- Gerenciar matérias-primas e seus estoques
- Cadastrar produtos e definir sua composição
- Determinar automaticamente quais produtos podem ser fabricados
- Calcular o valor total estimado da produção possível
- Priorizar produtos de maior valor

---

## 🏗 Arquitetura do Projeto

O projeto está dividido em duas aplicações independentes:
## 🔧 Back-end

API responsável por:

- Regras de negócio
- Controle de estoque
- Cálculo de produção possível
- Persistência de dados
- Validação e testes automatizados

📌 Todas as instruções de configuração, variáveis de ambiente, Docker e testes estão no:

👉 `back-end/README.md`

---

## 🎨 Front-end

Aplicação web responsável por:

- Interface de gerenciamento
- Cadastro e edição de dados
- Visualização da sugestão de produção
- Comunicação com a API REST

📌 Todas as instruções de instalação e execução estão no:

👉 `front-end/README.md`
