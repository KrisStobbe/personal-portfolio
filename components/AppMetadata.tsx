const author = 'Kristoffer Stobbe'
const description =
  'Senior Software Engineer with a background in full-stack development, data analytics, and technical support. Passionate about developing innovative software solutions, optimizing data-driven processes, and enhancing user experience. Holds an MS in Data Analytics from Georgia Institute of Technology and enjoys delving into philosophy and science, alongside playing the electric guitar.'
const url = 'https://krisstobbe.com/'

interface OpenGraphImage {
  url: string
  width: number
  height: number
  alt: string
}

interface OpenGraph {
  title: string
  description: string
  url: string
  siteName: string
  images: OpenGraphImage[]
  locale: string
  type: string
}

interface Author {
  name: string
  url: string
}

interface AppMetadata {
  metadataBase: URL
  title: {
    default: string
    template: string
  }
  description: string
  icons: {
    icon: string
  }
  keywords: string[]
  creator: string
  authors: Author[]
  openGraph: OpenGraph
}

export const AppMetadata: AppMetadata = {
  metadataBase: new URL('https://krisstobbe.com/'),
  title: {
    default: `Portfolio | ${author}`,
    template: `%s | ${author}`,
  },
  description: description,
  icons: {
    icon: '/favicon.ico',
  },
  keywords: [
    'Kristoffer Stobbe',
    'Kristoffer Stobbe - software developer',
    'Frontend developer',
    'Portfolio website',
    'Frontend Developer Portfolio',
  ],
  creator: author,
  authors: [{ name: author, url: url }],
  openGraph: {
    title: `${author} | Portfolio`,
    description: description,
    url: url,
    siteName: `${author} | Portfolio`,
    images: [
      {
        url: 'https://krisstobbe.com/assets/portfolio.png',
        width: 800,
        height: 600,
        alt: 'My personal portfolio website',
      },
      {
        url: 'https://krisstobbe.com/assets/portfolio.png',
        width: 1800,
        height: 1600,
        alt: 'My personal portfolio website',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
}
