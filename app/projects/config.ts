import { IProject } from './components/Projects'

const project1: IProject = {
  description:
    'A business website for Flex Software LLC, a leading provider of software development services.',
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

const project2: IProject = {
  description:
    'A dashboard that allows users to view their favorite pokemon and their stats.',
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

const project3: IProject = {
  description:
    'An analytics dashboard for a provider with a supporting Express REST API.',
  images: ['/assets/projects/provider-analysis/image-1.png'],
  liveUrl: null,
  repoUrl: 'https://github.com/KrisStobbe/node-react-dashboard',
  stack: ['React', 'Node.js', 'Express.js', 'TypeScript', 'Tailwind CSS'],
  title: 'Provider Analytics',
  createdAt: '2024-03-05T00:00:00Z',
}

const project4: IProject = {
  description: 'A personal portfolio website.',
  images: ['/assets/projects/portfolio/image-1.png'],
  liveUrl: 'https://krisstobbe.com',
  repoUrl: 'https://github.com/KrisStobbe/personal-portfolio',
  stack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS'],
  title: 'Personal Portfolio',
  createdAt: '2023-05-05T00:00:00Z',
}

export const projects: IProject[] = [project1, project2, project3, project4]
