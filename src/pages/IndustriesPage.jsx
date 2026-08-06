import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import IndustriesHero from '../components/industries/IndustriesHero'
import IndustriesIntro from '../components/industries/IndustriesIntro'
import IndustriesListing from '../components/industries/IndustriesListing'
import ProductsCTA from '../components/products/ProductsCTA'
import { industriesCTA } from '../data/categoryCTAs'

export default function IndustriesPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <IndustriesHero />
        <IndustriesIntro />
        <IndustriesListing />
        <ProductsCTA content={industriesCTA} />
      </main>
      <Footer />
    </>
  )
}
