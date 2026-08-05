import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Reveal from '../components/shared/Reveal'
import ProductsCTA from '../components/products/ProductsCTA'
import { getCategory } from '../data/productsCatalog'
import { getCategoryCTA } from '../data/categoryCTAs'

/**
 * Lovable category page — product listings for a single category.
 * Landing page at /products is unchanged.
 */
export default function ProductCategoryPage() {
  const { categoryId } = useParams()
  const category = getCategory(categoryId)

  useEffect(() => {
    window.scrollTo(0, 0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [categoryId])

  if (!category) {
    return (
      <>
        <Navbar />
        <main className="bg-white">
          <section className="shell pt-28 pb-24">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-blue-deep"
            >
              <ArrowLeft className="size-4" aria-hidden="true" /> All categories
            </Link>
            <h1 className="display-md mt-10 text-foreground">Category not found</h1>
            <p className="lede mt-4">
              The product category you're looking for isn't available. Return to the full range to
              continue browsing.
            </p>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Approved hero — do not modify */}
        <section className="relative overflow-hidden pt-[4.5rem]">
          <div className="absolute inset-0">
            <img src={category.image} alt="" className="size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/93 via-white/86 to-background" />
          </div>
          <div className="shell relative pb-16 pt-16 lg:pb-20 lg:pt-20">
            <Reveal>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-blue-deep"
              >
                <ArrowLeft className="size-4" aria-hidden="true" /> All categories
              </Link>
              <h1 className="display-xl mt-8 max-w-4xl text-foreground">{category.name}</h1>
              <p className="lede mt-6">{category.description}</p>
            </Reveal>
          </div>
        </section>

        <section className="pb-16">
          <div className="shell">
            <Reveal className="flex flex-wrap gap-2">
              {category.applications.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-primary/20 bg-blue-soft px-4 py-2 text-xs font-medium text-blue-deep"
                >
                  {a}
                </span>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Product cards — same baby-blue canvas as Products landing */}
        <section className="engineering-atmosphere py-16 lg:py-20">
          <div className="shell grid gap-5 md:grid-cols-2">
            {category.products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <Link
                  to={`/products/${category.slug}/${p.slug}`}
                  className="lift group flex h-full flex-col rounded-[1.5rem] border border-border bg-card p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="display-md text-[1.35rem] text-foreground">{p.name}</h2>
                      <p className="mt-1.5 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        {p.form}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="mt-1 size-5 shrink-0 text-primary transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                      aria-hidden="true"
                    />
                  </div>
                  {p.standard ? (
                    <span className="mt-4 w-fit rounded-full bg-blue-soft px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-blue-deep">
                      {p.standard}
                    </span>
                  ) : null}
                  <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {p.summary}
                  </p>
                  <dl className="mt-7 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
                    <div>
                      <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                        Dosage
                      </dt>
                      <dd className="mt-1.5 text-sm text-foreground">{p.dosage}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                        Packing
                      </dt>
                      <dd className="mt-1.5 text-sm text-foreground">{p.packing}</dd>
                    </div>
                  </dl>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <ProductsCTA content={getCategoryCTA(category.slug) || undefined} />
      </main>
      <Footer />
    </>
  )
}
