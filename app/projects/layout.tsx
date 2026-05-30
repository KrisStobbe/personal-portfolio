import type { Metadata, ResolvingMetadata } from 'next'
import React, { ReactNode } from 'react'

/**
 * Generates page-specific metadata for the `/projects` route. Merges the
 * parent layout's Open Graph block with project-specific overrides so
 * social previews render correctly.
 *
 * @param _props - Route props (unused).
 * @param parent - Resolving metadata from the parent layout.
 * @returns Resolved {@link Metadata} for the projects route.
 */
export async function generateMetadata(
  _props: Record<string, never>,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentMeta = await parent
  return {
    title: 'Projects',
    description:
      "A selection of Kristoffer Stobbe's full-stack, data, and infrastructure projects, including React/Next.js apps, analytics dashboards, and AI-powered tools.",
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

/**
 * Pass-through layout for the projects route segment. Exists primarily
 * to scope {@link generateMetadata} to `/projects`.
 *
 * @param props.children - Nested route content.
 */
export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
