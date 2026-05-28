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
  const { description, images, liveUrl, repoUrl, stack, title } = project

  /** Transforms project images into gallery format with next/image optimization + alt text. */
  const galleryImages: ReactImageGalleryItem[] = images.map((img, i) => ({
    original: img,
    originalAlt: `${title} — screenshot ${i + 1}`,
    loading: 'lazy' as 'lazy' | 'eager' | undefined,
    renderItem: (item) => (
      <div className="image-gallery-image relative aspect-[12/9.2] w-full">
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
      initial={{ opacity: 0, y: index === 0 ? 250 : 200 / Math.max(index, 1) }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{
        duration: 0.9,
        ease: [0.17, 0.55, 0.55, 1],
        delay: index === 0 ? 0 : 0.025 * index,
      }}
      className="flex flex-col rounded-lg bg-card-light dark:bg-card-dark"
    >
      <figure>
        <div className="aspect-[12/9.2] w-full h-full p-1.5">
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

      <div className="flex-[2] px-5 py-6 text-center flex flex-col gap-10">
        <header className="flex-1 flex items-center justify-start flex-col gap-3">
          <h3 tabIndex={0} className="text-2xl font-bold">
            {title}
          </h3>
          <p tabIndex={0} className="leading-7 font-light">
            {description}
          </p>
        </header>

        <footer className="flex flex-col gap-10">
          {!!stack.length && (
            <div className="flex-center flex-wrap gap-3">
              {stack.map((tag) => (
                <span
                  key={tag}
                  tabIndex={0}
                  className="px-2 text-sm leading-normal rounded bg-badge-light/50 dark:bg-badge-dark"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex-center gap-10">
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                className="icon-link-btn"
                title="Go to Github repository"
              >
                <VscSourceControl />
                <span>Source</span>
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                className="icon-link-btn"
                title="Go to live address"
              >
                <FiExternalLink />
                <span>Demo</span>
              </a>
            )}
          </div>
        </footer>
      </div>
    </m.article>
    </LazyMotion>
  )
}

export default ProjectItem
