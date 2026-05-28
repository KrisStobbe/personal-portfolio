'use client'

import React, { FunctionComponent, Suspense } from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery'
import { Loader } from 'components'
import { VscSourceControl } from 'react-icons/vsc'
import { FiExternalLink } from 'react-icons/fi'
import { IProject } from 'app/projects/components/Projects'
import 'react-image-gallery/styles/css/image-gallery.css'

/**
 * Props for the ProjectItem component
 * @interface ProjectItemProps
 */
interface ProjectItemProps {
  /** Project data from the IProject interface */
  project: IProject
  /** Index of the project in the grid for staggered animation */
  index: number
}

/**
 * ProjectItem component that displays a single project card
 * 
 * Features:
 * - Animated entrance effect with staggered timing
 * - Image gallery with lazy loading
 * - Project details display
 * - Technology stack tags
 * - Links to repository and live demo
 * - Responsive design
 * - Dark mode support
 * 
 * @param {ProjectItemProps} props - Component props containing project data and index
 * @returns {JSX.Element} A styled project card with animations
 */
const ProjectItem: FunctionComponent<ProjectItemProps> = ({
  project,
  index,
}) => {
  const {
    description,
    impact,
    context,
    images,
    liveUrl,
    repoUrl,
    stack,
    title,
    caseStudy,
  } = project

  const galleryImages: ReactImageGalleryItem[] = images.map((img, i) => ({
    original: img,
    originalAlt: `${title} — screenshot ${i + 1}`,
    loading: 'lazy' as 'lazy' | 'eager' | undefined,
    renderItem: (item) => (
      <div className="image-gallery-image relative aspect-[12/6] w-full">
        <Image
          src={item.original}
          alt={item.originalAlt ?? `${title} screenshot`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover rounded"
          priority={index === 0 && i === 0}
        />
      </div>
    ),
  }))

  return (
    <LazyMotion features={domAnimation}>
      <m.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-5% 0px' }}
        transition={{
          duration: 0.7,
          ease: [0.17, 0.55, 0.55, 1],
          delay: 0.05 * index,
        }}
        className="flex flex-col rounded-xl bg-card-light dark:bg-card-dark border border-cobalt-600/20 dark:border-cobalt-400/10 hover:border-cobalt-600/60 dark:hover:border-cobalt-400/40 transition-colors overflow-hidden"
      >
        {caseStudy ? (
          <div className="aspect-[12/6] w-full bg-gradient-to-br from-cobalt-600/20 via-cobalt-400/10 to-transparent flex items-center justify-center">
            <span className="text-xs uppercase tracking-[0.22em] font-semibold text-cobalt-700 dark:text-cobalt-400">
              Case study
            </span>
          </div>
        ) : (
          <figure>
            <div className="aspect-[12/6] w-full h-full p-1.5">
              <Suspense fallback={<Loader />}>
                <ImageGallery
                  items={galleryImages}
                  showPlayButton={false}
                  showThumbnails={false}
                  additionalClass="gallery-item"
                  lazyLoad={true}
                  showIndex={true}
                  showFullscreenButton={false}
                />
              </Suspense>
            </div>
          </figure>
        )}

        <div className="flex-1 px-5 py-6 flex flex-col gap-5">
          <header className="flex flex-col gap-1.5">
            {context && (
              <p className="text-xs uppercase tracking-[0.18em] font-semibold text-cobalt-700 dark:text-cobalt-400">
                {context}
              </p>
            )}
            <h3 className="text-xl font-bold leading-tight">{title}</h3>
          </header>

          <p className="leading-relaxed text-sm opacity-85">{description}</p>

          {impact && (
            <p className="text-sm font-medium leading-relaxed border-l-2 border-cobalt-600 dark:border-cobalt-400 pl-3">
              {impact}
            </p>
          )}

          <footer className="mt-auto flex flex-col gap-4">
            {!!stack.length && (
              <div className="flex flex-wrap gap-2">
                {stack.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs leading-normal rounded bg-badge-light/50 dark:bg-badge-dark"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {(repoUrl || liveUrl) && (
              <div className="flex gap-4 pt-2 border-t border-cobalt-600/15 dark:border-cobalt-400/10">
                {repoUrl && (
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-link-btn text-sm"
                    title="Source repository"
                  >
                    <VscSourceControl />
                    <span>Source</span>
                  </a>
                )}
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-link-btn text-sm"
                    title="Live demo"
                  >
                    <FiExternalLink />
                    <span>Demo</span>
                  </a>
                )}
              </div>
            )}
          </footer>
        </div>
      </m.article>
    </LazyMotion>
  )
}

export default ProjectItem
