import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getCategoryBySlug } from '../data/productCategories'

export default function ProductCategoryPage() {
  const { slug } = useParams()
  const category = getCategoryBySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [slug])

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <section className="mx-auto w-full max-w-[92rem] px-4 pt-28 pb-24 sm:px-5 lg:px-6 xl:px-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#2495ff] transition-colors hover:text-blue-deep"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Products
          </Link>

          {category ? (
            <div className="mt-10 max-w-3xl">
              <p
                className="text-[0.75rem] font-semibold uppercase tracking-[0.18em]"
                style={{ color: '#2495ff' }}
              >
                {category.count} Products
              </p>
              <h1
                className="font-display mt-4 font-bold tracking-[-0.04em]"
                style={{
                  color: '#101722',
                  fontSize: 'clamp(2.1rem, 1.3rem + 2vw, 3.25rem)',
                  lineHeight: 1.05,
                }}
              >
                {category.title}
              </h1>
              <p className="mt-5 text-[1.1rem] leading-[1.7]" style={{ color: '#5F6B7A' }}>
                {category.description}
              </p>
              <p className="mt-10 text-sm" style={{ color: '#6d7684' }}>
                Individual product listings for this category will follow in a later pass.
              </p>
            </div>
          ) : (
            <div className="mt-10 max-w-xl">
              <h1
                className="font-display font-bold tracking-[-0.035em]"
                style={{ color: '#101722', fontSize: '2rem' }}
              >
                Category not found
              </h1>
              <p className="mt-4" style={{ color: '#5F6B7A' }}>
                The product category you're looking for isn't available. Return to the full range
                to continue browsing.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
