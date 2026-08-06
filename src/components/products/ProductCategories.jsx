import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '../shared/Reveal'
import ProductMetricsStrip from './ProductMetricsStrip'
import ProductRowReveal from './ProductRowReveal'
import { filterProductCategories } from '../../lib/productSearch'
import { cn } from '../../lib/utils'

/** Matches `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` */
function useCategoryColumns() {
  const [columns, setColumns] = useState(3)

  useEffect(() => {
    const sm = window.matchMedia('(min-width: 640px)')
    const lg = window.matchMedia('(min-width: 1024px)')

    const update = () => {
      setColumns(lg.matches ? 3 : sm.matches ? 2 : 1)
    }

    update()
    sm.addEventListener('change', update)
    lg.addEventListener('change', update)
    return () => {
      sm.removeEventListener('change', update)
      lg.removeEventListener('change', update)
    }
  }, [])

  return columns
}

function chunkCategories(items, size) {
  const rows = []
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size))
  }
  return rows
}

function CategoryCard({ category }) {
  return (
    <Link
      to={`/products/${category.slug}`}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-black/[0.05] bg-white',
        'shadow-[0_8px_28px_rgba(45,70,110,0.06)]',
        'transition-[transform,box-shadow] duration-500 ease-out',
        'hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(45,70,110,0.11)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2',
      )}
    >
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
        <img
          src={category.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
        <h3
          className="font-display text-[1.125rem] font-bold tracking-[-0.02em]"
          style={{ color: '#101722', lineHeight: 1.3 }}
        >
          {category.title}
        </h3>

        <p
          className="mt-2.5 line-clamp-2 flex-1 text-[0.9375rem] leading-[1.55]"
          style={{ color: '#6d7684' }}
        >
          {category.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span
            className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]"
            style={{ color: '#2495ff' }}
          >
            {category.count} Products
          </span>
          <span
            className="inline-flex items-center gap-1 text-[0.875rem] font-medium underline-offset-4 transition-transform duration-500 ease-out group-hover:translate-x-1.5 group-hover:underline"
            style={{ color: '#2495ff' }}
          >
            View Products
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function EmptySearchState() {
  return (
    <div className="mx-auto max-w-md py-16 text-center sm:py-20">
      <p
        className="font-display text-[1.35rem] font-semibold tracking-[-0.02em]"
        style={{ color: '#101722' }}
      >
        No matching products found.
      </p>
      <p className="mt-3 text-[1.02rem] leading-[1.65]" style={{ color: '#5F6B7A' }}>
        Try searching by product name,
        <br />
        category or application.
      </p>
    </div>
  )
}

export default function ProductCategories({ searchQuery = '' }) {
  const columns = useCategoryColumns()
  const filtered = useMemo(
    () => filterProductCategories(searchQuery),
    [searchQuery],
  )
  const rows = useMemo(
    () => chunkCategories(filtered, columns),
    [filtered, columns],
  )
  const hasQuery = searchQuery.trim().length > 0
  const isEmpty = filtered.length === 0

  return (
    <section
      id="product-categories"
      aria-labelledby="product-categories-heading"
      className="relative bg-white"
    >
      {/* Light blue canvas — matches Home Engineering Solutions */}
      <div
        className="engineering-atmosphere"
        style={{
          paddingTop: '6rem',
          paddingBottom: '6rem',
          paddingLeft: '3rem',
          paddingRight: '3rem',
        }}
      >
        <div className="mx-auto w-full max-w-[92rem]">
          {/* Heading — keep existing gap before cards */}
          <div
            className="relative mx-auto max-w-3xl text-center"
            style={{ paddingBottom: '5rem' }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-6 bottom-0 opacity-[0.025]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(36,149,255,0.9) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(36,149,255,0.9) 1px, transparent 1px)
                `,
                backgroundSize: '28px 28px',
                maskImage:
                  'radial-gradient(ellipse 70% 75% at 50% 40%, black 20%, transparent 75%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse 70% 75% at 50% 40%, black 20%, transparent 75%)',
              }}
            />

            <Reveal>
              <div className="relative mb-5 flex items-center justify-center gap-3">
                <p className="kicker" style={{ color: '#2495ff' }}>
                  Explore Our Range
                </p>
                <span aria-hidden="true" className="h-px w-10 bg-[rgba(100,116,139,0.35)]" />
              </div>
              <h2
                id="product-categories-heading"
                className="font-display font-bold tracking-[-0.04em]"
                style={{
                  color: '#101722',
                  fontSize: 'clamp(2rem, 1.3rem + 1.8vw, 3.15rem)',
                  lineHeight: 1.05,
                }}
              >
                Solutions for Every Structure
              </h2>
              <p
                className="mx-auto mt-5 max-w-[34rem] text-[1.05rem] leading-[1.7]"
                style={{ color: '#5F6B7A' }}
              >
                From foundations to finishing, Gee Cee offers engineered construction chemical
                systems for every application.
              </p>
            </Reveal>
          </div>

          {isEmpty && hasQuery ? (
            <EmptySearchState />
          ) : (
            <div className="flex flex-col gap-7 sm:gap-8">
              {rows.map((row) => (
                <ProductRowReveal
                  key={row.map((c) => c.slug).join('-')}
                  className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
                >
                  {row.map((category, i) => (
                    <div
                      key={category.slug}
                      className="product-row-reveal-item h-full"
                      style={{ '--row-reveal-delay': `${i * 180}ms` }}
                    >
                      <CategoryCard category={category} />
                    </div>
                  ))}
                </ProductRowReveal>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stats strip stays on white */}
      <div className="mx-auto w-full max-w-[92rem] px-4 sm:px-5 lg:px-6 xl:px-8">
        <ProductMetricsStrip />
      </div>
    </section>
  )
}
