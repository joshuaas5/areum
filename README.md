# AREUM - Landing de Cosmético com Conversão

Projeto de landing page focado em conversão para o sérum facial AREUM.

Objetivo do produto:

- posicionar o produto com estética premium
- converter tráfego em checkout
- capturar leads com roleta promocional

## O que está implementado

- Hero comercial com proposta de valor e CTA direto para checkout
- Seções de benefícios, modo de uso e depoimentos
- Componente de roleta para captura de leads
- Persistência de leads no Supabase
- Design responsivo com microinterações (Framer Motion)

Principais componentes:

- src/components/Hero.tsx
- src/components/Benefits.tsx
- src/components/HowToUse.tsx
- src/components/Testimonials.tsx
- src/components/CTA.tsx
- src/components/LuckyWheel.tsx

## Stack

- Vite
- React 18
- TypeScript
- Tailwind CSS
- Radix UI / shadcn
- Supabase
- Framer Motion

## Como rodar localmente

~~~bash
npm install
npm run dev
~~~

Build de produção:

~~~bash
npm run build
npm run preview
~~~

## Variáveis de ambiente

Copie .env.example para .env e preencha:

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

## Status de segurança

- .env removido do versionamento
- .env adicionado ao .gitignore
- .env.example criado com placeholders

## Observação de produto

Este repositório representa uma landing comercial real (não template de estudo), com foco em copy, conversão e operação de campanha.