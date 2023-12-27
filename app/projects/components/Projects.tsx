import React from 'react'
import ProjectItem from 'app/sections/project/ProjectItem'

export interface IProject {
  description: string
  images: string[]
  liveUrl?: string
  repoUrl?: string
  stack: string[]
  title: string
  createdAt: string
}

interface IProjects {
  projects: IProject[]
}

export function Projects({ projects }: IProjects) {
  const sortedProjects = projects?.sort((a, b) => {
    const dateA = new Date(a?.createdAt)
    const dateB = new Date(b?.createdAt)
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
