# 📅 StudyDay - Calendário & Organizador de Estudos

<div align="center">

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Google AI Studio](https://img.shields.io/badge/Google%20AI%20Studio-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Alura](https://img.shields.io/badge/Imersão%20Alura-005696?style=for-the-badge)

<p align="center">
  <strong>Uma aplicação minimalista, ágil e focada para planejar seus estudos diários, gerenciar metas futuras e centralizar links úteis.</strong>
</p>

<p align="center">
  🚀 <strong><a href="https://studyday-calendar.netlify.app/" target="_blank">Acesse a Demonstração Online no Netlify</a></strong>
</p>

[🌐 Testar Online](https://studyday-calendar.netlify.app/) • [Funcionalidades](#-funcionalidades) • [Origem do Projeto](#-origem-e-desenvolvimento) • [Tecnologias](#-tecnologias-utilizadas) • [Como Executar](#-como-executar-o-projeto) • [Estrutura](#-estrutura-do-projeto)

</div>

---

## 🌐 Demonstração Online

A aplicação está publicada e pronta para uso! Você pode acessar, organizar sua rotina e testar todas as funcionalidades diretamente pelo navegador:

👉 **[https://studyday-calendar.netlify.app/](https://studyday-calendar.netlify.app/)**

---

## 📖 Sobre o Projeto

O **StudyDay** é um sistema moderno de organização de tarefas e rotina de estudos projetado para ser simples, visualmente agradável e livre de atritos. 

A aplicação foi concebida para quem deseja manter o foco no aprendizado: você pode definir a matéria e as tarefas de cada dia no calendário, além de manter um backlog separado de tarefas futuras com a flexibilidade de agendá-las quando fizer sentido.

---

## ✨ Funcionalidades

### 🗓️ 1. Aba Calendário (Planejamento Diário)
- **Grade Mensal Interativa:** Navegue entre os meses, identifique facilmente os dias que já possuem planos ou tarefas e selecione qualquer data com um clique.
- **Foco & Anotações do Dia:** Campo dedicado para registrar o tema/matéria de estudo do dia e anotações rápidas de apoio.
- **Checklist de Tarefas:** Adicione, edite, conclua e exclua tarefas específicas para a data selecionada.
- **Barra de Progresso:** Acompanhamento visual da porcentagem de conclusão das tarefas do dia em tempo real.
- **Resumo "Produtividade de Hoje":** Atalho rápido para pular para a data atual e visualizar o resumo de tarefas concluídas.
- **Links do Dia:** Adicione links úteis diretamente relacionados ao estudo do dia selecionado (artigos, aulas, documentações).

### 📋 2. Aba Tarefas Futuras (Backlog de Metas)
- **Planejamento de Médio e Longo Prazo:** Registre tarefas, tópicos e metas que você pretende realizar no futuro, sem a obrigação de associar a uma data imediata.
- **Links de Apoio por Tarefa:** Associe links de referência diretamente a cada meta futura (ex.: link de um curso na Alura, repositório ou documentação).
- **Agendamento Inteligente:** Transfira ou programe uma tarefa do backlog diretamente para um dia no calendário com um clique, podendo mantê-la ou não na lista futura.
- **Mural de Recursos Globais:** Área para manter links úteis gerais (MDN, LeetCode, GitHub, Roadmaps) acessíveis a qualquer momento.

### 🔗 3. Gestão Centralizada de Links
- Suporte a links úteis distribuídos em 3 níveis:
  - Links específicos daquele dia no calendário.
  - Links vinculados a uma meta/tarefa futura específica.
  - Mural geral de links rápidos frequentes.
- Abertura segura em nova aba com protocolo validado e normalizado.

### 📱 4. Design Totalmente Responsivo
- Interface construída pensando em **Mobile First** e adaptada para **Desktop / PC**:
  - No computador: visualização em painéis lado a lado (calendário mensal compacto + painel de detalhes do dia).
  - No celular/tablet: layout em fluxo vertical intuitivo e com botões de fácil toque.

### 💾 5. Armazenamento com LocalStorage (Zero Backend)
- **100% Local no Navegador:** Seus dados ficam salvos no `localStorage`, garantindo carregamento instantâneo, total privacidade e funcionamento sem necessidade de cadastro, login ou conexão com servidor.
- **Importação e Exportação (Backup):** Faça download de um arquivo `.json` com todos os seus dados a qualquer momento ou importe um backup existente para restaurar seu progresso.
- **Reset Rápido:** Opção de restaurar os dados de exemplo caso deseje reiniciar a base.

---

## 🤖 Origem e Desenvolvimento

Este projeto foi desenvolvido utilizando o **Google AI Studio**, explorando capacidades avançadas de prototipagem rápida e desenvolvimento de software potencializado por Inteligência Artificial.

> 🎓 O aprendizado e a metodologia para utilizar essa ferramenta foram adquiridos durante a **Imersão de Engenharia de Software com IA**, promovida pela **Alura em parceria com o Google**.

A experiência combinou engenharia de prompt, raciocínio arquitetural e o ecossistema do Google AI para acelerar a criação de uma aplicação funcional, com tipagem estrita e foco em boas práticas de UX/UI.

---

## 🛠️ Tecnologias Utilizadas

- **[React 19](https://react.dev/):** Biblioteca para construção de interfaces declarativas e componentes modulares.
- **[TypeScript](https://www.typescriptlang.org/):** Tipagem estática rigorosa para maior previsibilidade e manutenibilidade.
- **[Vite](https://vitejs.dev/):** Ferramenta de build rápida e ambiente de desenvolvimento ágil.
- **[Tailwind CSS v4](https://tailwindcss.com/):** Estilização utilitária moderna para um design limpo e responsivo.
- **[Lucide React](https://lucide.dev/):** Conjunto consistente e elegante de ícones vetoriais.
- **[Motion](https://motion.dev/):** Micro-animações suaves para aprimorar a experiência do usuário.
- **Web Storage API (`localStorage`):** Persistência de dados offline no cliente.
- **[Netlify](https://www.netlify.com/):** Plataforma utilizada para hospedagem e deploy contínuo da aplicação web.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
Certifique-se de ter o **[Node.js](https://nodejs.org/)** instalado em sua máquina (versão 18 ou superior recomendada).

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Pedro-Ramon2608/StudyDay-calendar.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd StudyDay-calendar
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador:**
   Abra seu navegador e entre no endereço exibido no terminal (geralmente `http://localhost:3000`).

### Outros Scripts Úteis

- `npm run build`: Gera a versão otimizada para produção na pasta `dist/`.
- `npm run preview`: Visualiza localmente o build de produção.
- `npm run lint`: Executa a verificação de tipos com o compilador TypeScript.

---

## 📂 Estrutura do Projeto

```text
StudyDay-calendar/
├── src/
│   ├── components/
│   │   ├── Calendar/         # Grade do calendário e painel do dia selecionado
│   │   │   ├── CalendarGrid.tsx
│   │   │   └── DayView.tsx
│   │   ├── Common/           # Componentes reutilizáveis (links, barras de progresso)
│   │   │   ├── LinkManager.tsx
│   │   │   └── ProgressBar.tsx
│   │   ├── FutureTasks/      # Aba de tarefas futuras e modal de agendamento
│   │   │   ├── FutureTasksView.tsx
│   │   │   └── ScheduleModal.tsx
│   │   └── Navbar.tsx        # Navegação entre abas, importação/exportação e reset
│   ├── hooks/
│   │   └── useStudyStorage.ts # Gerenciamento de estado e persistência no localStorage
│   ├── utils/
│   │   └── dateUtils.ts      # Funções utilitárias para formatação e manipulação de datas
│   ├── types.ts              # Definições de tipos e interfaces do TypeScript
│   ├── App.tsx               # Componente raiz com o roteamento entre as abas
│   ├── main.tsx              # Ponto de entrada da aplicação React
│   └── index.css             # Estilos globais e importações do Tailwind CSS
├── public/
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

<div align="center">
  Feito com foco no aprendizado contínuo com o apoio do <strong>Google AI Studio</strong> e da <strong>Alura</strong>.
</div>
