🏥 Benefícios Fundação
======================

📌 Visão Geral do Sistema
-------------------------

O sistema **Benefícios Fundação** foi desenvolvido para gerenciar benefícios de colaboradores, como:

- Planos de saúde

- Planos odontológicos

- Reembolsos diversos

A plataforma oferece funcionalidades como:

- Gerenciamento de usuários

- Processamento e controle de benefícios

- Importação e exportação de arquivos

- Geração de relatórios gerenciais

- Integração com sistemas externos como **Unimed**, **Bradesco**, **Senior** e **ADP**

- Suporte a múltiplos perfis de usuário

* * * * *

🚀 Tecnologias e Stacks Utilizadas
----------------------------------

- ⚡ **Vite** - Build tool ultrarrápida

- 🧪 **Jest** + **React Testing Library** - Testes unitários e de componentes

- 📚 **Storybook** - Catálogo interativo de componentes

- 🎨 **TailwindCSS** - Estilização utilitária

- ✨ **ShadCN** - UI components com Tailwind

- 🍞 **React-Toastify** - Notificações personalizadas

- 🧠 **Zustand** - Gerenciamento de estado global

- 📦 **Abstração de dependências** - Organização limpa e desacoplada

- 📀 **Biome** - Padrões de código e formatação

- 🧹 **Husky** - Git hooks automatizados

- 💬 **Commitizen** + **CommitLint** - Padronização de commits

* * * * *

🧱 Estrutura de Pastas
-------------------------------------

```
src/
├── @types/                 # Tipagens da aplicação
├── assets/                 # imagens e svg
├── components/             # Componentes reutilizáveis
    ├── index.tsx           
    ├── index.stories.tsx   
    ├── index.test.tsx      
├── hooks/                  # Hooks customizados
├── pages/                  # Páginas da aplicação
├── services/               # Integrações externas e APIs
    ├── config/             # Configurações de APIs e Endpoints
├── store/                  # Controles de estado
├── styles/                 # Estilos globais e Tailwind config
├── utils/                  # Utilitários gerais
└── main.tsx                # Entry point
```

* * * * *

🛠️ Como Rodar o Projeto
------------------------

### 1\. Clone o repositório

```
git clone https://slcagricola@dev.azure.com/slcagricola/BeneficiosFundacao/_git/beneficios-fundacao-frontend
```

### 2\. Instale as dependências

```
npm install
# ou
yarn
```

### 3\. Inicie o projeto com Vite

```
npm run dev
# ou
yarn dev
```

* * * * *

📕 Rodando o Storybook
----------------------

```
npm run storybook
# ou
yarn storybook
```

* * * * *

🥪 Rodando os Testes
--------------------

```
npm run test
# ou
yarn test
```

* * * * *


🔒 Commits Padronizados
-----------------------

Este projeto utiliza **Commitizen** e **CommitLint** para manter uma convenção de commits.

### Para fazer um commit

```
npm run commit
```

Isso abrirá um assistente interativo para escrever seu commit de forma padronizada.

* * * * *

🔑 Husky
--------

O **Husky** está configurado para rodar:

- Lint no código

- Verificação de mensagens de commit

- Testes 

* * * * *
