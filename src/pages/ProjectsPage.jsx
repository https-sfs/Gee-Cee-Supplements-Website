import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProjectsHero from '../components/projects/ProjectsHero'
import FeaturedProjects from '../components/projects/FeaturedProjects'

/**
 * Projects page — hero + Featured Projects (Project 01).
 * Remaining projects and sections land in later sprints.
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
      </main>
      <Footer />
    </>
  )
}
