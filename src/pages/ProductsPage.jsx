import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductsHero from '../components/products/ProductsHero'
import ProductCategories from '../components/products/ProductCategories'
import ProductsCTA from '../components/products/ProductsCTA'

export default function ProductsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <ProductsHero />
        <ProductCategories />
        <ProductsCTA />
      </main>
      <Footer />
    </>
  )
}
