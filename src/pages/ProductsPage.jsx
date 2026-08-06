import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductsHero from '../components/products/ProductsHero'
import ProductCategories from '../components/products/ProductCategories'
import ProductsCTA from '../components/products/ProductsCTA'

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [])

  const scrollToCategories = () => {
    const el = document.getElementById('product-categories')
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleQueryChange = (next) => {
    const wasEmpty = searchQuery.trim() === ''
    const isEmpty = next.trim() === ''

    setSearchQuery(next)

    // Scroll once when search starts (empty → non-empty). No scroll on clear.
    if (wasEmpty && !isEmpty) {
      scrollToCategories()
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <ProductsHero
          query={searchQuery}
          onQueryChange={handleQueryChange}
          onSearchSubmit={scrollToCategories}
        />
        <ProductCategories searchQuery={searchQuery} />
        <ProductsCTA />
      </main>
      <Footer />
    </>
  )
}
