import { allProducts, getCategory, getProduct } from '../data/productsCatalog'

/**
 * Display labels used on Featured Projects → existing catalogue routes.
 * Keys match the pill text exactly (including trademark symbols).
 * Prefer product detail routes; category-only when the label is a family/range.
 */
const PROJECT_PRODUCT_ALIASES = {
  'Aquaseal™': { category: 'integral-waterproofing', product: 'aquaseal-liquid' },
  'Leaklock 2C': { category: 'waterproofing-systems', product: 'leaklock-2c' },
  'Groutex One': { category: 'grouts-anchoring', product: 'groutex-one' },
  'Groutex Two': { category: 'grouts-anchoring', product: 'groutex-two' },
  Expanseal: { category: 'expansion-joints', product: 'expanseal' },
  Polycoat: { category: 'waterproofing-systems', product: 'polycoat' },
  'Anchor Grout': { category: 'grouts-anchoring', product: 'anchor-grout' },
  'Bond Aid': { category: 'bonding-agents', product: 'bond-aid' },
  'EP Bond': { category: 'bonding-agents', product: 'ep-bond' },
  'Cemcrete SP1': { category: 'concrete-admixtures', product: 'cemcrete-sp-1' },
  'High Grout EP': { category: 'grouts-anchoring', product: 'high-grout-ep' },
  'Cemcrete SRP': { category: 'concrete-admixtures', product: 'cemcrete-srp' },
  // No "Cemseal" SKU in catalogue — Super Seal is the waterproofing seal product.
  Cemseal: { category: 'waterproofing-systems', product: 'super-seal' },
  'Hard Floor': { category: 'industrial-flooring', product: 'hard-floor' },
  'EP Coat': { category: 'industrial-flooring', product: 'ep-coat-fc' },
  'Tile Grout': { category: 'tile-adhesives-grouts', product: 'tile-grout' },
  'Tile Feb': { category: 'tile-adhesives-grouts', product: 'tile-feb-f' },
  'Bond SBR': { category: 'bonding-agents', product: 'bond-sbr' },
  Magicfill: { category: 'repairs-rehabilitation', product: 'magicfill' },
  'Tile Adhesives': { category: 'tile-adhesives-grouts' },
}

function normalizeLabel(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[™®©]/g, '')
    .replace(/[^a-z0-9]+/g, '')
    .trim()
}

function hrefForRef(ref) {
  if (!ref?.category) return null
  if (ref.product) {
    const { category, product } = getProduct(ref.category, ref.product)
    if (category && product) {
      return `/products/${category.slug}/${product.slug}`
    }
    return null
  }
  const category = getCategory(ref.category)
  return category ? `/products/${category.slug}` : null
}

function findCatalogMatch(label) {
  const key = normalizeLabel(label)
  if (!key) return null

  const exact = allProducts.find((p) => normalizeLabel(p.name) === key)
  if (exact) {
    return { category: exact.category.slug, product: exact.slug }
  }

  // Allow short labels that uniquely prefix a catalogue name (e.g. "Aquaseal" → Aquaseal™ Liquid)
  const prefixed = allProducts.filter((p) => {
    const nameKey = normalizeLabel(p.name)
    return nameKey.startsWith(key) || key.startsWith(nameKey)
  })
  if (prefixed.length === 1) {
    return { category: prefixed[0].category.slug, product: prefixed[0].slug }
  }

  return null
}

/**
 * Resolve a Featured Projects "Products Used" label to an existing route.
 * @param {string} label
 * @returns {string | null}
 */
export function getProjectProductHref(label) {
  const alias = PROJECT_PRODUCT_ALIASES[label]
  if (alias) {
    const href = hrefForRef(alias)
    if (href) return href
  }

  const match = findCatalogMatch(label)
  return match ? hrefForRef(match) : null
}
