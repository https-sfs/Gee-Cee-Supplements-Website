import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Reveal from '../components/shared/Reveal'
import ProductsCTA from '../components/products/ProductsCTA'
import Button from '../components/ui/Button'
import { getProduct } from '../data/productsCatalog'
import { buildProductCTA } from '../data/categoryCTAs'

const WHATSAPP = '919849990061'

/**
 * Lovable product detail page — full specification view for a single product.
 */
export default function ProductDetailPage() {
  const { categoryId, productId } = useParams()
  const { category, product } = getProduct(categoryId, productId)

  useEffect(() => {
    window.scrollTo(0, 0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [categoryId, productId])

  if (!category || !product) {
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
            <h1 className="display-md mt-10 text-foreground">Product not found</h1>
            <p className="lede mt-4">
              The product you're looking for isn't available. Return to the catalogue to continue
              browsing.
            </p>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  const siblings = category.products.filter((p) => p.slug !== product.slug).slice(0, 4)

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <section className="sky pt-[4.5rem]">
          <div className="shell pb-14 pt-14 lg:pb-20 lg:pt-20">
            <Reveal>
              <Link
                to={`/products/${category.slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-blue-deep"
              >
                <ArrowLeft className="size-4" aria-hidden="true" /> {category.name}
              </Link>
            </Reveal>

            <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
              <Reveal>
                <h1 className="display-xl text-foreground">{product.name}</h1>
                <p className="mt-4 text-sm uppercase tracking-[0.16em] text-muted-foreground">
                  {product.form}
                </p>
                {product.standard ? (
                  <span className="mt-6 inline-block rounded-full bg-blue-soft px-4 py-1.5 text-xs font-semibold text-blue-deep">
                    {product.standard}
                  </span>
                ) : null}
                <p className="lede mt-7">{product.summary}</p>
              </Reveal>

              <Reveal delay={140}>
                <div className="panel p-8">
                  <dl className="space-y-6">
                    <div>
                      <dt className="text-[0.78rem] uppercase tracking-[0.16em] text-muted-foreground">
                        Recommended dosage
                      </dt>
                      <dd className="mt-2 text-[1.0625rem] leading-[1.7] text-foreground sm:text-[1.125rem]">
                        {product.dosage}
                      </dd>
                    </div>
                    <div className="hairline" />
                    <div>
                      <dt className="text-[0.78rem] uppercase tracking-[0.16em] text-muted-foreground">
                        Available packing
                      </dt>
                      <dd className="mt-2 text-[1.0625rem] leading-[1.7] text-foreground sm:text-[1.125rem]">
                        {product.packing}
                      </dd>
                    </div>
                  </dl>
                  <Button asChild variant="hero" size="lg" className="mt-8 w-full">
                    <a
                      href={`mailto:info@geeceechem.com?subject=${encodeURIComponent(
                        `Enquiry — ${product.name}`,
                      )}`}
                    >
                      Enquire about {product.name}
                    </a>
                  </Button>
                  <a
                    href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                      `Hello Gee Cee, I'd like details on ${product.name}.`,
                    )}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-3 block text-center text-sm font-medium text-blue-deep hover:underline"
                  >
                    Ask on WhatsApp
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section-y">
          <div className="shell grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Reveal>
              <h2 className="display-md text-[2.2rem] text-foreground sm:text-[2.4rem]">
                Advantages
              </h2>
              <ul className="mt-8 space-y-6 sm:space-y-7">
                {product.advantages.map((a) => (
                  <li key={a} className="flex gap-4">
                    <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-[1.125rem] leading-[1.7] text-muted-foreground sm:text-[1.1875rem]">
                      {a}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="display-md text-[2.2rem] text-foreground sm:text-[2.4rem]">
                Typical applications
              </h2>
              <ul className="mt-8 space-y-6 sm:space-y-7">
                {category.applications.map((a) => (
                  <li key={a} className="flex gap-4">
                    <span
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                    <span className="text-[1.125rem] leading-[1.7] text-muted-foreground sm:text-[1.1875rem]">
                      {a}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {siblings.length ? (
          <section className="pb-8">
            <div className="shell">
              <h2 className="display-md text-[1.6rem] text-foreground">
                More in {category.name}
              </h2>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {siblings.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 70}>
                    <Link
                      to={`/products/${category.slug}/${p.slug}`}
                      className="lift group flex h-full flex-col rounded-2xl border border-border bg-blue-soft p-6"
                    >
                      <h3 className="text-[1.125rem] font-semibold leading-snug text-foreground sm:text-[1.1875rem]">
                        {p.name}
                      </h3>
                      <p className="mt-2 flex-1 text-base leading-[1.7] text-muted-foreground">
                        {p.summary}
                      </p>
                      <ArrowRight
                        className="mt-5 size-4 text-primary transition-transform duration-500 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <ProductsCTA content={buildProductCTA(product)} />
      </main>
      <Footer />
    </>
  )
}
