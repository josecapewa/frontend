# Portal IPIL - Frontend

Este repositório contém o código-fonte do **Portal do IPIL**, uma plataforma completa para gestão escolar. Desenvolvido com **React**, **TypeScript** e **Vite**, o projeto oferece uma interface moderna, responsiva e eficiente para atender às necessidades de administração, professores e alunos.

---

## 🚀 Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Tipagem estática para maior segurança e produtividade.
- **Vite**: Ferramenta de build ultrarrápida e leve.
- **Tailwind CSS**: Para um design elegante e responsivo.
- **ESLint**: Linter configurado com regras específicas para TypeScript e React.

---

## ✨ Funcionalidades Principais

- 🔐 **Gestão de usuários** com autenticação segura.
- 📊 **Estatísticas e relatórios** dinâmicos para acompanhamento do desempenho escolar.
- 👩‍🏫 **Gerenciamento de turmas, professores e alunos**.
- 🖥️ Interface responsiva e estilizada para dispositivos desktop e móveis.
- ⚙️ **Ferramentas administrativas** para criação e edição de dados.

---

## ⚙️ Configuração do Ambiente de Desenvolvimento

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/seu-repositorio/portal-ipil-frontend.git
cd portal-ipil-frontend
```

### 2️⃣ Instale as Dependências

```bash
npm install
```

### 3️⃣ Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em: **[http://localhost:5173](http://localhost:5173)**

---

## 🧹 Configuração de ESLint

Este projeto vem pré-configurado com **ESLint** para garantir boas práticas. Para personalizar ou expandir a configuração, siga os passos abaixo:

1. **Instale o plugin React**:

   ```bash
   npm install eslint-plugin-react --save-dev
   ```

2. **Atualize o arquivo `eslint.config.js`**:

   ```js
   import react from "eslint-plugin-react";

   export default {
     settings: { react: { version: "18.3" } },
     plugins: { react },
     rules: {
       ...react.configs.recommended.rules,
       ...react.configs["jsx-runtime"].rules,
     },
   };
   ```

3. **Execute o lint** para verificar o código:
   ```bash
   npm run lint
   ```

---

## 📂 Estrutura do Projeto

```
src/
├── app/                     # A aplicação em si
    ├── pages/               # Páginas principais da aplicação
    ├── routes/              # Definição das rotas da aplicação
    ├── layout.tsx           # O layout das páginas (excepto login) da aplicação
    ├── query-provider.tsx   # O Provider para as consultas do react-query
├── components/              # Componentes reutilizáveis
├── lib/                     # Definição de opções (como as opções da side-bar, etc...) e funções (utils.ts) reutilizáveis na aplicação
├── modules/                 # Outros módulos da aplicação (serviços, tipos, validações, etc.)
```

---

## 📜 Scripts Disponíveis

- `npm run dev`: Inicia o ambiente de desenvolvimento com recarregamento automático.
- `npm run build`: Realiza o build otimizado para produção.
- `npm run preview`: Serve o projeto após o build.
- `npm run lint`: Executa o ESLint para garantir qualidade no código.

---

## 🤝 Contribuição

Contribuições são sempre bem-vindas!  
Sinta-se à vontade para abrir issues ou enviar pull requests para melhorias e correções.

PARA OS COLABORADORES INTERNOS DO PROJECTO: Não se esqueçam de criar a vossa branch para qualquer funcionalidade e alteração no projecto

---

## 📄 Licença

Este projeto está licenciado sob os termos da **MIT License**.

---

Feito com ❤️ para transformar a gestão escolar no IPIL e em Angola! 🎓
