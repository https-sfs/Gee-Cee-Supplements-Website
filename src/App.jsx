import Navbar from './components/Navbar'
import LandingSequence from './components/LandingSequence'
import EngineeringHeritage from './components/home/EngineeringHeritage'
import EngineeringSolutions from './components/home/EngineeringSolutions'
import ManufacturingRD from './components/home/ManufacturingRD'
import LandmarkProjects from './components/home/LandmarkProjects'

function App() {
  return (
    <>
      <Navbar />
      <LandingSequence />
      <EngineeringHeritage />
      <EngineeringSolutions />
      <ManufacturingRD />
      <LandmarkProjects />
    </>
  )
}

export default App
