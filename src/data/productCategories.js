/**
 * Product category catalogue for the Products page.
 *
 * Image paths are centralized here — swap assets by updating `image` only.
 * Categories that appear on Home (Engineering Solutions) reuse those exact
 * `/media/solutions/*` files for visual consistency across the site.
 */
export const productCategories = [
  {
    title: 'Concrete & Mortar Admixtures',
    description: 'Workability, strength and control — engineered into the mix.',
    count: 10,
    image: '/media/solutions/concrete-admixtures.jpg',
    icon: 'FlaskConical',
    slug: 'concrete-admixtures',
  },
  {
    title: 'Integral Waterproofing Compounds',
    description: 'Waterproofing built into the concrete, not painted onto it.',
    count: 3,
    image: '/media/solutions/integral-waterproofing.jpg',
    icon: 'ShieldCheck',
    slug: 'integral-waterproofing',
  },
  {
    title: 'Grouts & Anchoring Systems',
    description: 'Load paths that stay exactly where the engineer put them.',
    count: 6,
    image: '/media/solutions/grouts-anchoring.jpg',
    icon: 'Anchor',
    slug: 'grouts-anchoring',
  },
  {
    title: 'Waterproofing & Protective Coatings',
    description: 'Surfaces that keep water, heat and corrosion outside.',
    count: 4,
    image: '/media/solutions/waterproofing-coatings.jpg',
    icon: 'Layers',
    slug: 'waterproofing-coatings',
  },
  {
    title: 'Bonding Agents',
    description: 'New concrete that behaves as though it were always there.',
    count: 3,
    image: '/media/solutions/bonding-agents.jpg',
    icon: 'Link2',
    slug: 'bonding-agents',
  },
  {
    title: 'Repairs & Rehabilitation',
    description: 'Bringing structures back to their design intent.',
    count: 5,
    image: '/media/solutions/repair-rehabilitation.jpg',
    icon: 'Wrench',
    slug: 'repairs-rehabilitation',
  },
  {
    title: 'Expansion Joints & Sealants',
    description: 'Movement, accommodated. Water, excluded.',
    count: 3,
    image: '/media/products/categories/sealants.jpg',
    icon: 'Spline',
    slug: 'expansion-joints-sealants',
  },
  {
    title: 'Industrial Flooring',
    description: 'Floors engineered for traffic, chemicals and hygiene.',
    count: 3,
    image: '/media/solutions/industrial-flooring.jpg',
    icon: 'Factory',
    slug: 'industrial-flooring',
  },
  {
    title: 'Epoxy Coatings',
    description: 'Chemical resistance where the environment is unforgiving.',
    count: 2,
    image: '/media/products/categories/epoxy-coatings.png',
    icon: 'Beaker',
    slug: 'epoxy-coatings',
  },
  {
    title: 'Tile Adhesives & Grouts',
    description: 'Fixings that stay fixed, joints that stay sealed.',
    count: 6,
    image: '/media/products/categories/tile-adhesives.jpg',
    icon: 'Grid3x3',
    slug: 'tile-adhesives-grouts',
  },
  {
    title: 'Curing Compounds & Mould Release',
    description: 'Protecting concrete in the hours that decide its life.',
    count: 3,
    image: '/media/industries/roads-highways.jpg',
    icon: 'Timer',
    slug: 'curing-mould-release',
  },
]

export function getCategoryBySlug(slug) {
  return productCategories.find((c) => c.slug === slug) || null
}
