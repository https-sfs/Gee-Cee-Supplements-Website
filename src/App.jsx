import Navbar from './components/Navbar'
import LandingSequence from './components/LandingSequence'
import EngineeringHeritage from './components/home/EngineeringHeritage'
import EngineeringSolutions from './components/home/EngineeringSolutions'
import ManufacturingRD from './components/home/ManufacturingRD'
import IndustriesServed from './components/home/IndustriesServed'

function App() {
  return (
    <>
      <Navbar />
      <LandingSequence />
      <EngineeringHeritage />
      <EngineeringSolutions />
      <ManufacturingRD />
      <IndustriesServed />
    </>
  )
}

export default App
