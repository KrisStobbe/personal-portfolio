import { IProject } from './components/Projects'

const project1: IProject = {
  description:
    'A business website for Flex Software LLC, a leading provider of software development services.',
  images: [
    '/assets/projects/flex-software/image-1.png',
    '/assets/projects/flex-software/image-2.png',
  ],
  liveUrl: 'https://flexsoftware.org',
  repoUrl: 'https://github.com/Flex-Software-LLC/flex-portfolio-frontend',
  stack: ['React', 'JavaScript', 'Chakra UI'],
  title: 'Flex Software',
  createdAt: '2023-08-01T00:00:00Z',
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
  stack: ['React', 'Node.js', 'JavaScript', 'Next.js'],
  title: 'Analytics Dashboard',
  createdAt: '2023-12-01T00:00:00Z',
}

const project3: IProject = {
  description: 'A personal portfolio website.',
  images: ['/assets/projects/portfolio/image-1.png'],
  liveUrl: 'https://krisstobbe.com',
  repoUrl: 'https://github.com/KrisStobbe/personal-portfolio',
  stack: ['React', 'Next.js', 'Node.js', 'JavaScript', 'Tailwind CSS'],
  title: 'Personal Portfolio',
  createdAt: '2023-12-05T00:00:00Z',
}

export const projects: IProject[] = [project1, project2, project3]
