# Personal Portfolio

Welcome to the repository for my personal portfolio website. This site showcases my work, skills, and projects in software development, particularly in full-stack and front-end technologies.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm or yarn

### Installing

First, clone the repository to your local machine:

```bash
git clone https://github.com/KrisStobbe/personal-portfolio
```

Next, install the dependencies:

```bash
npm install
```

or if you use yarn:

```bash
yarn
```

### Environment variables

The "Ask my work" widget calls the Anthropic API server-side. Copy `.env.local.example` to `.env.local` and set:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Get a key from https://console.anthropic.com/. The widget degrades gracefully when the key is unset (it shows a configuration message instead of streaming a response).

For production (Vercel), add `ANTHROPIC_API_KEY` to the project's environment variables.

## Development

To start the development server:

```bash
npm run dev
```

or if you use yarn:

```bash
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## Build

To build the project for production:

```bash
npm run build
```

or if you use yarn:

```bash
yarn build
```
