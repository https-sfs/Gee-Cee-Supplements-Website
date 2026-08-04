import Navbar from '../components/Navbar'
import LandingSequence from '../components/LandingSequence'
import EngineeringHeritage from '../components/home/EngineeringHeritage'
import EngineeringSolutions from '../components/home/EngineeringSolutions'
import ManufacturingRD from '../components/home/ManufacturingRD'
import LandmarkProjects from '../components/home/LandmarkProjects'
import HomeCTA from '../components/home/HomeCTA'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <LandingSequence />
      <EngineeringHeritage />
      <EngineeringSolutions />
      <ManufacturingRD />
      <LandmarkProjects />
      <HomeCTA />
      <Footer />
    </>
  )
}
