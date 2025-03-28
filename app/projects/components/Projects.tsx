import React from 'react'
import ProjectItem from 'app/sections/project/ProjectItem'

/**
 * Interface representing a single project in the portfolio
 * @interface IProject
 */
export interface IProject {
  /** A brief description of the project */
  description: string
  /** Array of image URLs associated with the project */
  images: string[]
  /** Optional URL to the live deployment of the project */
  liveUrl?: string | null
  /** Optional URL to the project's repository */
  repoUrl?: string | null
  /** Array of technologies used in the project */
  stack: string[]
  /** Title of the project */
  title: string
  /** Creation date of the project in ISO string format */
  createdAt: string
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
  const sortedProjects = projects?.sort((a, b) => {
    const dateB = new Date(a?.createdAt)
    const dateA = new Date(b?.createdAt)
    return dateA.getTime() - dateB.getTime()
  })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      {sortedProjects?.map((project, index) => (
        <ProjectItem key={project.title} project={project} index={index} />
      ))}
    </div>
  )
}
