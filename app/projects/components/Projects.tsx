import React from 'react'
import ProjectItem from 'app/sections/project/ProjectItem'

/**
 * Interface representing a single project in the portfolio
 * @interface IProject
 */
export interface IProject {
  description: string
  /** Headline impact / outcome line, shown beneath the description. Optional. */
  impact?: string
  /** Tag shown above the title, e.g. "FloQast · 2024–2025". Optional. */
  context?: string
  images: string[]
  liveUrl?: string | null
  repoUrl?: string | null
  stack: string[]
  title: string
  createdAt: string
  /** True for case-study cards with no live deployment / no public repo. */
  caseStudy?: boolean
}

/**
 * Interface for the Projects component props
 * @interface IProjects
 */
interface IProjects {
  /** Array of project objects to be displayed */
  projects: IProject[]
}

/**
 * Projects component that displays a responsive grid of project items
 * 
 * @param {IProjects} props - Component props containing an array of projects
 * @returns {JSX.Element} A responsive grid of project items
 * @example
 * ```tsx
 * <Projects projects={[
 *   {
 *     title: "My Project",
 *     description: "Project description",
 *     images: ["image1.jpg"],
 *     stack: ["React", "TypeScript"],
 *     createdAt: "2024-03-20"
 *   }
 * ]} />
 * ```
 */
export function Projects({ projects }: IProjects) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects?.map((project, index) => (
        <ProjectItem key={project.title} project={project} index={index} />
      ))}
    </div>
  )
}
