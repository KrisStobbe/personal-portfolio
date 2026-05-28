import {
  WelcomeSection,
  AboutSection,
  ProjectsSection,
  TechnologiesSection,
} from 'app/sections'
import { AskWidget } from 'components/AskWidget'

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
