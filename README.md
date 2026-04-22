# Areum

A modern web application built with React, TypeScript, and Tailwind CSS, focused on delivering a polished user experience with responsive design and component-driven architecture.

## Overview

Areum demonstrates modern frontend development practices using industry-standard tools and design patterns. The project showcases responsive UI components, state management, and performance optimization techniques.

## Features

- **Responsive Design**: Fully adaptive layouts for mobile, tablet, and desktop
- **Component Library**: Custom UI components built with shadcn/ui primitives
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Modern Styling**: Utility-first CSS with Tailwind CSS
- **Performance Optimized**: Vite-powered build system with code splitting
- **Testing Ready**: Vitest configuration included

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: React hooks and context
- **Testing**: Vitest
- **Package Manager**: bun/npm

## Getting Started

### Prerequisites

- Node.js 18+ and npm/bun

### Installation

```bash
# Clone the repository
git clone https://github.com/joshuaas5/areum.git

# Navigate to the project
cd areum

# Install dependencies
npm install
# or
bun install

# Start the development server
npm run dev
# or
bun run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── pages/          # Page-level components
├── types/          # TypeScript definitions
└── styles/         # Global styles

public/             # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests with Vitest
- `npm run lint` - Run ESLint

## Deployment

```bash
npm run build
```

The production build will be available in the `dist/` directory, ready for deployment on Vercel, Netlify, or any static hosting provider.

## License

MIT
