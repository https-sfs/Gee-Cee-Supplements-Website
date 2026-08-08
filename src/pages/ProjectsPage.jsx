import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProjectsHero from '../components/projects/ProjectsHero'
import FeaturedProjects from '../components/projects/FeaturedProjects'
import EngineeringApplications from '../components/projects/EngineeringApplications'
import OurReach from '../components/projects/OurReach'
import TrustedByLeaders from '../components/projects/TrustedByLeaders'
import TechnicalSupportCTA from '../components/projects/TechnicalSupportCTA'

/**
 * Projects page — hero, Featured Projects, Engineering Applications,
 * Our Reach, Trusted By Industry Leaders, Technical Support CTA.
 */
export default function ProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <ProjectsHero />
        <FeaturedProjects />
        <EngineeringApplications />
        <OurReach />
        <TrustedByLeaders />
        <TechnicalSupportCTA />
      </main>
      <Footer />
    </>
  )
}
