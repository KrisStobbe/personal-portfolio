import {
  WelcomeSection,
  AboutSection,
  ProjectsSection,
  TechnologiesSection,
} from 'app/sections'
import { AskWidget } from 'components/AskWidget'

/**
 * Landing page composed of the welcome, about, projects, and technologies
 * sections, with the floating AI chat widget overlaid on top.
 *
 * @returns {JSX.Element} The home page content.
 */
export default function Page() {
  return (
    <div className="container-md">
      <WelcomeSection />
      <AboutSection />
      <ProjectsSection />
      <TechnologiesSection />
      <AskWidget />
    </div>
  )
}
