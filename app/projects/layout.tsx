import type { Metadata, ResolvingMetadata } from 'next'
import React, { ReactNode } from 'react'

export async function generateMetadata(
  _props: Record<string, never>,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentMeta = await parent
  return {
    title: 'Projects',
    description:
      "A selection of Kristoffer Stobbe's full-stack, data, and infrastructure projects — including React/Next.js apps, analytics dashboards, and AI-powered tools.",
    alternates: { canonical: '/projects' },
    openGraph: {
      ...(parentMeta.openGraph ?? {}),
      title: 'Projects | Kristoffer Stobbe',
      description:
        "A selection of Kristoffer Stobbe's full-stack, data, and infrastructure projects.",
      url: 'https://krisstobbe.com/projects',
    },
  }
}

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
