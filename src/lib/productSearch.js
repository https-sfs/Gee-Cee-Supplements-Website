import { getCategory } from '../data/productsCatalog'
import { productCategories } from '../data/productCategories'

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[™®©]/g, '')
    .replace(/[^a-z0-9\s+/.-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function categorySearchBlob(category) {
  const catalog = getCategory(category.slug)
  const parts = [
    category.title,
    category.description,
    category.slug,
    catalog?.name,
    catalog?.short,
    catalog?.description,
    ...(catalog?.applications || []),
  ]

  for (const product of catalog?.products || []) {
    parts.push(
      product.name,
      product.summary,
      product.form,
      product.standard,
      ...(product.advantages || []),
    )
  }

  return normalize(parts.filter(Boolean).join(' '))
}

/**
 * Live filter for Products page category cards.
 * Matches query against category fields, product names, and keywords.
 */
export function filterProductCategories(query) {
  const q = normalize(query)
  if (!q) return productCategories

  const terms = q.split(' ').filter(Boolean)

  return productCategories.filter((category) => {
    const blob = categorySearchBlob(category)
    return terms.every((term) => blob.includes(term))
  })
}
