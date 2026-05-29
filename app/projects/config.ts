import { IProject } from './components/Projects'

const floqastReconciliation: IProject = {
  caseStudy: true,
  context: 'FloQast · 2026',
  title: 'Event-driven reconciliation engine',
  description:
    'Leading design of an event-driven reconciliation engine serving FloQast’s largest enterprise customers. Decomposed a synchronous monolith into a queue-backed, idempotent pipeline that scales horizontally per customer.',
  impact:
    'Unblocks the enterprise tier by making reconciliation throughput predictable at month-end close — the highest-load window in our customers’ calendar.',
  images: [],
  liveUrl: null,
  repoUrl: null,
  stack: ['TypeScript', 'Node.js', 'AWS', 'MongoDB'],
  createdAt: '2025-10-01T00:00:00Z',
}

const floqastAiGlMapping: IProject = {
  caseStudy: true,
  context: 'FloQast · 2025',
  title: 'AI-driven GL-mapping tool',
  description:
    'Designed and shipped an AI-driven general-ledger mapping tool that suggests account mappings for new customers during onboarding using LLM-backed classification with human-in-the-loop review.',
  impact:
    'Led my team to the Operational Excellence Award at FloQast’s inaugural hackathon; cut a previously manual onboarding step into a guided, reviewable workflow.',
  images: [],
  liveUrl: null,
  repoUrl: null,
  stack: ['TypeScript', 'Node.js', 'AWS', 'MongoDB'],
  createdAt: '2024-09-01T00:00:00Z',
}

const sunpowerLoanApp: IProject = {
  caseStudy: true,
  context: 'SunPower · 2022',
  title: 'React financial app for solar loans',
  description:
    'Led the build of a React-powered financial application backed by a RESTful API. Owned architecture, frontend, and integration with the loan-servicing backend.',
  impact:
    'Powering $2M+ in annual solar loan volume; the launch was the milestone for my promotion to Sr. Software Engineer.',
  images: [],
  liveUrl: null,
  repoUrl: null,
  stack: ['React', 'TypeScript', 'Java', 'DynamoDB'],
  createdAt: '2022-01-15T00:00:00Z',
}

const flexSoftware: IProject = {
  context: 'Side project · 2024',
  description:
    'Business website for Flex Software LLC, a provider of software development services.',
  impact: 'Designed, built, and shipped solo end-to-end.',
  images: [
    '/assets/projects/flex-software/image-1.png',
    '/assets/projects/flex-software/image-2.png',
  ],
  liveUrl: 'https://flexsoftware.org',
  repoUrl: null,
  stack: ['React', 'TypeScript', 'Chakra UI'],
  title: 'Flex Software',
  createdAt: '2024-06-01T00:00:00Z',
}

const analyticsDashboard: IProject = {
  context: 'Side project · 2024',
  description:
    'A Next.js analytics dashboard demonstrating server components, server-side filtering, and pagination over a public dataset.',
  impact: 'Showcase of Next.js App Router patterns end-to-end.',
  images: [
    '/assets/projects/dashboard/image-1.png',
    '/assets/projects/dashboard/image-2.png',
  ],
  liveUrl: 'https://next-dashboard-cyan-two.vercel.app/pokemons?page=1',
  repoUrl: 'https://github.com/KrisStobbe/next-dashboard',
  stack: ['React', 'Node.js', 'TypeScript', 'Next.js'],
  title: 'Analytics Dashboard',
  createdAt: '2024-06-01T00:00:00Z',
}

const providerAnalytics: IProject = {
  context: 'Side project · 2024',
  description:
    'An analytics dashboard for a provider, served by a supporting Express REST API. Full-stack TypeScript end-to-end.',
  impact: 'Reference architecture for small full-stack TS services.',
  images: ['/assets/projects/provider-analysis/image-1.png'],
  liveUrl: null,
  repoUrl: 'https://github.com/KrisStobbe/node-react-dashboard',
  stack: ['React', 'Node.js', 'Express.js', 'TypeScript', 'Tailwind CSS'],
  title: 'Provider Analytics',
  createdAt: '2024-03-05T00:00:00Z',
}

const personalPortfolio: IProject = {
  context: 'Open source · 2023',
  description:
    'This site. Next.js 14 App Router, Tailwind, framer-motion, and a Claude-powered Ask-my-work widget.',
  impact: 'Iterating on it in public — see GitHub for the commit history.',
  images: ['/assets/projects/portfolio/image-1.png'],
  liveUrl: 'https://krisstobbe.com',
  repoUrl: 'https://github.com/KrisStobbe/personal-portfolio',
  stack: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Anthropic SDK'],
  title: 'Personal Portfolio',
  createdAt: '2023-05-05T00:00:00Z',
}

export const projects: IProject[] = [
  flexSoftware,
  floqastReconciliation,
  floqastAiGlMapping,
  sunpowerLoanApp,
  analyticsDashboard,
  providerAnalytics,
  personalPortfolio,
]
