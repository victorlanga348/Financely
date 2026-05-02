# 🛠️ Guia de Construção: Financely do Zero

Este documento é um roteiro técnico para desenvolvedores que desejam replicar a arquitetura do **Financely**. Ele detalha as etapas cruciais, desde a configuração do servidor até o polimento da interface.

---

## 🏗️ Fase 1: O Coração do Backend (Node.js & Prisma)

### 1. Inicialização
O backend foi construído com **Node.js** e **Express 5**. A primeira etapa é configurar o ambiente e as dependências de segurança:
- `bcrypt`: Para transformar senhas em hashes.
- `jsonwebtoken`: Para gerar tokens de acesso (JWT).
- `cors`: Para permitir a comunicação com o frontend.

### 2. Modelagem com Prisma
O banco de dados (PostgreSQL) é gerenciado pelo Prisma. O segredo aqui é o relacionamento **1:N** (Um usuário para N transações):
```prisma
model User {
  id       String @id @default(uuid())
  email    String @unique
  name     String
  password String
  transactions Transaction[]
}

model Transaction {
  id          String   @id @default(uuid())
  description String
  amount      Float
  type        String   // 'income' ou 'expense'
  category    String
  date        DateTime
  userId      String
  user        User     @relation(fields: [userId], references: [id])
}
```

### 3. Middleware de Autenticação
Toda rota privada passa por um interceptor que valida o JWT no Header `Authorization`. Se o token for válido, o `userId` é injetado na requisição para que o banco saiba exatamente de quem são os dados.

---

## 🎨 Fase 2: O Visual Premium (React & Tailwind)

### 1. Design System (Glassmorphism)
O visual "premium" é alcançado através do Glassmorphism. No `index.css`, definimos uma classe utilitária:
```css
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```
Isso dá a sensação de profundidade e modernidade.

### 2. Responsividade Híbrida (Cards vs. Tabelas)
Este é um dos maiores diferenciais do projeto. Em vez de tentar "esmagar" a tabela no celular, usamos renderização condicional do Tailwind:
- **Desktop:** `hidden md:block` (Tabela clássica).
- **Mobile:** `md:hidden` (Lista de Cards verticais).

---

## ⚡ Fase 3: Lógicas de Experiência do Usuário (UX)

### 1. Filtro em Tempo Real (Client-side)
Para que a busca seja instantânea, não fazemos uma requisição ao banco a cada letra digitada.
1. Buscamos todas as transações do usuário ao carregar a página.
2. Usamos o `.filter()` do JavaScript para criar uma lista derivada baseada no `searchTerm`.
3. O React re-renderiza a lista automaticamente.

### 2. Modal com Fechamento Inteligente
O modal de cadastro implementa a lógica de `e.stopPropagation()`. Isso permite que o usuário feche o modal clicando no fundo escuro, mas que os cliques dentro do formulário não disparem o fechamento indesejado.

### 3. Categorias Livres
Substituímos o `select` fixo por um `input` de texto. Isso dá flexibilidade para o usuário criar seu próprio ecossistema financeiro sem limitações do desenvolvedor.

---

## 🚀 Fase 4: Integração (Axios Interceptors)

A comunicação é feita via Axios. Centralizamos a URL base e os headers em um serviço:
- O frontend envia o Token JWT em cada requisição.
- Se a API retornar erro de autenticação, o app limpa o `localStorage` e redireciona para o Login.

---

## ✅ Checklist para Criação
- [ ] Configurar Express com suporte a módulos (`type: module`).
- [ ] Gerar migrations do Prisma para estruturar o banco.
- [ ] Criar rotas de Auth (Register/Login).
- [ ] Implementar CRUD de transações vinculado ao `userId`.
- [ ] Criar Dashboard com somatórios (`reduce`) de entradas e saídas.
- [ ] Aplicar Tailwind para garantir 100% de responsividade.
- [ ] Adicionar notificações com `Sonner` para feedback visual.

---

## ✍️ Considerações Finais
O segredo para criar o **Financely** não é apenas o código, mas a atenção aos detalhes: as bordas arredondadas (`rounded-[2rem]`), o espaçamento generoso e as cores vibrantes contra o fundo escuro (`slate-950`).

---
Desenvolvido por Victor Langa
