# 💰 Financely - Gestão Financeira Inteligente & Design Premium

Aplicação Full Stack de controle financeiro pessoal com foco em **responsividade mobile-first**, **filtragem em tempo real** e uma interface moderna baseada em **Glassmorphism**. O projeto foi construído para oferecer uma experiência nativa em qualquer dispositivo, permitindo o controle rigoroso de receitas e despesas com alta performance.

Diferente de planilhas estáticas, o Financely utiliza uma lógica de filtragem instantânea no cliente e um sistema adaptativo que transforma tabelas densas em cards intuitivos para telas pequenas.

---

## 🔗 Links do Projeto
- **Live Demo:** [Em breve]
- **Documentação da API:** [Em breve]

---

## 🧠 Decisões de Arquitetura

### **1. Interface Adaptativa (Mobile-First)**
Optei por uma arquitetura de componentes híbridos. Em telas grandes, o sistema exibe **Data Tables** para máxima densidade de informação. Em dispositivos móveis, o layout se reconfigura automaticamente para uma **Lista de Cards**, eliminando scrolls horizontais e proporcionando uma experiência de app nativo.

### **2. Filtragem Instantânea (Client-side Search)**
Para garantir a sensação de "premium", a lógica de busca por categorias e descrições é processada no frontend. Como os dados financeiros pessoais possuem um volume gerenciável, essa abordagem permite que os resultados apareçam no mesmo milissegundo em que o usuário digita.

### **3. Modelagem com Prisma ORM**
Utilizei o Prisma para garantir **Type Safety** e migrations seguras. A estrutura do banco foi desenhada para garantir integridade referencial, onde cada transação está vinculada de forma única ao seu proprietário, prevenindo qualquer vazamento de dados entre usuários.

### **4. Categorias Dinâmicas (Custom Categories)**
Diferente de sistemas com categorias fixas, o Financely permite a criação de categorias "on-the-fly". Isso remove a fricção no cadastro e permite que o usuário organize suas finanças com termos que façam sentido para sua realidade.

---

## 🔒 Pontos Técnicos e Segurança

- **Data Ownership:** Todas as consultas utilizam o `userId` extraído do token JWT via middleware. Um usuário nunca pode ver ou editar transações de outro, mesmo manipulando IDs na URL.
- **Proteção de Rotas:** Implementação de navegação protegida que verifica a existência de sessão antes de renderizar componentes sensíveis.
- **CORS & Headers:** Backend configurado com políticas de segurança restritivas para aceitar requisições apenas da origem autorizada.
- **Feedback Semântico:** Uso de Toasts (Sonner) para confirmar cada ação, garantindo que o usuário saiba exatamente o status de suas transações.

---

## 🛠️ Tecnologias Utilizadas

### **Backend (Node.js & Express)**
- **Express 5:** Gerenciamento de rotas e middlewares.
- **Prisma ORM:** Manipulação de banco de dados com segurança de tipos.
- **PostgreSQL:** Banco de dados relacional para persistência de transações.
- **JWT (JSON Web Token):** Autenticação stateless segura.
- **Bcrypt:** Hashing de senhas para proteção de credenciais.

### **Frontend (React & Vite)**
- **React 19:** Componentização avançada e hooks customizados.
- **Tailwind CSS 4:** Estilização utilitária com design system moderno.
- **Lucide React:** Conjunto de ícones consistentes e leves.
- **Axios:** Integração com API com tratamento de erros.
- **Sonner:** Sistema de notificações de alta qualidade.

---

## 🔒 Destaques de Engenharia e Segurança

### **1. Autenticação JWT Segura**
Fluxo de login completo que armazena informações de sessão de forma segura e gerencia o estado global do usuário para uma navegação fluida.

### **2. Design System Glassmorphism**
Uso intensivo de efeitos de desfoque (`backdrop-blur`), bordas sutis e transparências para criar uma interface que se destaca visualmente e transmite modernidade.

### **3. UX de Performance**
- **Empty States:** Feedback visual quando não há transações ou resultados de busca.
- **Click-outside logic:** Modais que fecham ao clicar fora, seguindo padrões de usabilidade modernos.
- **Loading Skeletons:** Feedback de carregamento em botões para evitar ações duplicadas.

---

## 📋 Principais Funcionalidades
- [x] **Dashboard:** Resumo visual de Saldo, Entradas e Saídas do mês.
- [x] **Transações:** Cadastro rápido com descrição, valor, data e categoria personalizada.
- [x] **Filtros:** Busca em tempo real por descrição ou categoria em todas as páginas.
- [x] **Responsividade:** Alternância inteligente entre Tabelas (Desktop) e Cards (Mobile).
- [x] **Relatórios:** Extrato detalhado com fluxo de caixa consolidado.
- [x] **Segurança:** Sistema de Login e Registro com validação de dados.

---

## 📂 Estrutura do Projeto

```text
├── backend/              # API Server
│   ├── src/
│   │   ├── Controllers/  # Lógica de negócio (Transações, Auth)
│   │   ├── Middlewares/  # Segurança e Validação JWT
│   │   ├── Routes/       # Definição de endpoints
│   │   └── Services/     # Configuração do Prisma/DB
├── frontend/             # Interface SPA
│   ├── src/
│   │   ├── components/   # Componentes reutilizáveis (Cards, Inputs, Nav)
│   │   ├── pages/        # Telas da aplicação (Dashbord, Relatórios...)
│   │   └── services/     # Configuração Axios/API
```

---

## 🚀 Como Rodar o Projeto

### **1. Clone o repositório**
```bash
git clone https://github.com/seu-usuario/financely.git
```

### **2. Configure o Backend:**
- Acesse `cd backend` e instale: `npm install`.
- Crie um `.env` com `DATABASE_URL` e `JWT_SECRET`.
- Rode as migrations: `npx prisma migrate dev`.
- Inicie: `npm run dev`.

### **3. Configure o Frontend:**
- Acesse `cd frontend` e instale: `npm install`.
- Inicie: `npm run dev`.

---

## ✍️ Autor

Desenvolvido por **Victor Langa** como um projeto de alta fidelidade visual e técnica, demonstrando domínio em arquitetura Full Stack, UX responsiva e segurança em aplicações Web modernas.
