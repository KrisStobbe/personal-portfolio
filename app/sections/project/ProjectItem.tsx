import React, { useRef, FunctionComponent, Suspense } from 'react'
import { useInView } from 'framer-motion'
import Link from 'next/link'
import ImageGallery from 'react-image-gallery'
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
  /** Reference to the project card container */
  const cardRef = useRef<HTMLDivElement>(null)
  /** Tracks if the card is in view for animation triggers */
  const isInView = useInView(cardRef, { once: true })

  /** Transforms project images into gallery format */
  const galleryImages = images.map((img) => ({
    original: img,
    loading: 'lazy' as 'lazy' | 'eager' | undefined,
  }))

  return (
    <article
      ref={cardRef}
      className="flex flex-col rounded-lg bg-card-light dark:bg-card-dark"
      style={{
        transform: isInView
          ? 'none'
          : `${
              index === 0 ? 'translateY(250px)' : `translateY(${200 / index}px)`
            }`,
        opacity: isInView ? 1 : 0,
        transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${
          index === 0 ? 0 : 25 * index
        }ms`,
      }}
    >
      <figure>
        <div
          className="aspect-[12/9.2] w-full h-full"
          style={{
            padding: 6,
          }}
        >
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
    </article>
  )
}

export default ProjectItem
