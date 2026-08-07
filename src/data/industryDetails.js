/**
 * Industry detail content ported from Lovable (geecee/src/data/industries.ts).
 * Listing page data stays in industries.js — do not mix the two.
 *
 * Route slugs match Explore Solutions targets. Aliases cover Lovable IDs.
 */

/** @typedef {{ label: string, category: string, product?: string }} IndustrySystem */
/** @typedef {{
 *   slug: string,
 *   name: string,
 *   short: string,
 *   body: string,
 *   image: string,
 *   challenges: string[],
 *   systems: IndustrySystem[],
 * }} IndustryDetail */

/** @type {IndustryDetail[]} */
export const industryDetails = [
  {
    slug: 'roads-highways',
    name: 'Roads & Highways',
    short: 'Pavements that hold their line through heat, load and monsoon.',
    body: 'Highway concrete is placed fast, in the open, often far from the plant. Our slump-retaining admixtures keep long-haul mixes workable, curing compounds protect the surface in the first critical hours, and joint sealants absorb thermal movement across the carriageway.',
    image: '/media/industries/roads-highways.jpg',
    challenges: [
      'Long transit times and slump loss in hot weather',
      'Plastic shrinkage cracking on large exposed pours',
      'Thermal movement at expansion joints',
    ],
    systems: [
      {
        label: 'Cemcrete SRP & SSR slump retainers',
        category: 'concrete-admixtures',
        product: 'cemcrete-srp',
      },
      {
        label: 'Curewell curing compounds',
        category: 'curing-mould-release',
        product: 'curewell-wb',
      },
      {
        label: 'Expanseal joint sealants',
        category: 'expansion-joints',
        product: 'expanseal',
      },
    ],
  },
  {
    slug: 'bridges-flyovers',
    name: 'Bridges & Flyovers',
    short: 'Load paths engineered to outlast the traffic that uses them.',
    body: 'Bridge structures demand high early strength, non-shrink bedding under bearings and reliable anchorage for dowels and starter bars. Our epoxy and cementitious grouts transfer static and dynamic loads with full contact, while corrosion inhibitors protect reinforcement in aggressive exposure.',
    image: '/media/industries/bridges-flyovers.jpg',
    challenges: [
      'Full contact bedding beneath bearings and base plates',
      'Corrosion of reinforcement in coastal exposure',
      'Dowelling and tie-back anchorage',
    ],
    systems: [
      {
        label: 'High Grout EP & LVEP epoxy grouts',
        category: 'grouts-anchoring',
      },
      {
        label: 'Cemcrete CI corrosion inhibitor',
        category: 'concrete-admixtures',
        product: 'cemcrete-ci',
      },
      {
        label: 'EP Bond structural bonding agent',
        category: 'bonding-agents',
      },
    ],
  },
  {
    slug: 'railways-metro',
    name: 'Railways & Metro',
    short: 'Systems proven across East Coast and South Central Railway works.',
    body: 'Track-side and viaduct works run to unforgiving possession windows. Rapid setting plugging mortars, polyester anchor grouts for track fixings and high strength epoxy repair systems let crews restore structures and hand the line back on time.',
    image: '/media/industries/railways-metro.jpg',
    challenges: [
      'Short possession windows demanding fast strength gain',
      'Anchorage of railway track fixings',
      'Rehabilitation of ageing viaduct concrete',
    ],
    systems: [
      {
        label: 'Anchor Grout polyester anchoring',
        category: 'grouts-anchoring',
        product: 'anchor-grout',
      },
      {
        label: 'EP Mortar rapid epoxy repairs',
        category: 'repairs-rehabilitation',
      },
      {
        label: 'Plugcrete instant leak plugging',
        category: 'repairs-rehabilitation',
      },
    ],
  },
  {
    slug: 'dams-irrigation',
    name: 'Dams & Irrigation',
    short: 'Water retained where it should be — including at Polavaram.',
    body: 'Mass concrete and water-retaining structures combine heat of hydration, hydrostatic pressure and permanent immersion. Integral waterproofing, polysulphide movement joints and non-shrink grouting keep the structure tight across decades of service.',
    image: '/media/industries/dams-irrigation.jpg',
    challenges: [
      'Hydrostatic pressure and capillary absorption',
      'Movement joints in mass concrete and base rafts',
      'Heat of hydration in thick sections',
    ],
    systems: [
      {
        label: 'Aquaseal™ integral waterproofing',
        category: 'integral-waterproofing',
        product: 'aquaseal-liquid',
      },
      {
        label: 'Expanseal polysulphide sealant',
        category: 'expansion-joints',
        product: 'expanseal',
      },
      {
        label: 'Groutex non-shrink grouts',
        category: 'grouts-anchoring',
        product: 'groutex-one',
      },
    ],
  },
  {
    slug: 'water-sewage',
    name: 'Water & Sewage Structures',
    short: 'Potable-safe protection for tanks, sumps and treatment works.',
    body: 'Reservoirs, sumps and sewage systems need coatings that resist immersion, chemical attack and pressure from both faces. Polycoat is safe for potable water tanks; EP Coat systems handle aggressive effluent; Plugcrete stops active leaks on contact.',
    image: '/media/industries/water-sewage.jpg',
    challenges: [
      'Immersion and negative-side water pressure',
      'Chemical attack from effluent and treatment chemicals',
      'Active leaks in below-ground chambers',
    ],
    systems: [
      {
        label: 'Polycoat potable-safe coating',
        category: 'waterproofing-systems',
        product: 'polycoat',
      },
      {
        label: 'EP Coat FC food grade epoxy',
        category: 'industrial-flooring',
      },
      {
        label: 'Leaklock 2 C flexible membrane',
        category: 'waterproofing-systems',
        product: 'leaklock-2c',
      },
    ],
  },
  {
    slug: 'industrial-plants',
    name: 'Industrial Plants & Factories',
    short: 'Floors and foundations that survive the shift, every shift.',
    body: 'Plant floors take forklift traffic, chemical spillage and thermal cycling; machine foundations take dynamic load. Floor hardeners, self-levelling epoxy toppings and high strength grouts hold the plant together where downtime is measured in lakhs per hour.',
    image: '/media/industries/industrial-facilities.jpg',
    challenges: [
      'Abrasion from constant forklift and pallet traffic',
      'Chemical and oil spillage attack',
      'Dynamic load transfer at machine foundations',
    ],
    systems: [
      {
        label: 'Hard Floor non-metallic hardener',
        category: 'industrial-flooring',
        product: 'hard-floor',
      },
      {
        label: 'EP Coat SL self-levelling topping',
        category: 'industrial-flooring',
      },
      {
        label: 'Groutex Two high strength grout',
        category: 'grouts-anchoring',
        product: 'groutex-two',
      },
    ],
  },
  {
    slug: 'commercial-institutional',
    name: 'Commercial & Institutional',
    short: 'Finishes that stay presentable under public footfall.',
    body: 'Malls, hospitals and offices demand hygienic, seamless surfaces and facades that resist weathering. Tile adhesive systems conforming to IS: 15477, epoxy wall coatings and silicone water repellents deliver a building that still looks new in year ten.',
    image: '/media/industries/commercial-buildings.jpg',
    challenges: [
      'Hygienic, seamless surfaces in clean areas',
      'Facade weathering and efflorescence',
      'Large format tile fixing on walls and floors',
    ],
    systems: [
      {
        label: 'Tile Feb adhesive range',
        category: 'tile-adhesives-grouts',
        product: 'tile-feb-f',
      },
      {
        label: 'EP Coat W hygienic wall coating',
        category: 'epoxy-coatings',
      },
      {
        label: 'Super Seal water repellent',
        category: 'waterproofing-systems',
      },
    ],
  },
  {
    slug: 'residential',
    name: 'Residential Developments',
    short: 'The waterproofing a homeowner never has to think about.',
    body: 'Terraces, bathrooms and basements account for most callbacks in housing. Integral waterproofing in the mix, flexible membranes under tiles and colour-matched joint fillers remove the leak before the handover, not after it.',
    image: '/media/industries/residential-construction.jpg',
    challenges: [
      'Terrace and bathroom leakage after handover',
      'Shrinkage and plaster cracking',
      'Tile debonding in wet areas',
    ],
    systems: [
      {
        label: 'Engineers Choice integral waterproofing',
        category: 'integral-waterproofing',
      },
      {
        label: 'Leaklock 2 C under-tile membrane',
        category: 'waterproofing-systems',
        product: 'leaklock-2c',
      },
      {
        label: 'Magicfill & Acryseal crack fillers',
        category: 'repairs-rehabilitation',
      },
    ],
  },
]

/** Lovable / listing aliases → canonical detail slug */
const SLUG_ALIASES = {
  'water-retaining': 'water-sewage',
  commercial: 'commercial-institutional',
  'residential-developments': 'residential',
}

export function resolveIndustryDetailSlug(slug) {
  if (!slug) return null
  return SLUG_ALIASES[slug] || slug
}

export function getIndustryDetail(slug) {
  const resolved = resolveIndustryDetailSlug(slug)
  return industryDetails.find((item) => item.slug === resolved) || null
}

export function getRelatedIndustryDetails(slug, limit = 3) {
  const resolved = resolveIndustryDetailSlug(slug)
  return industryDetails.filter((item) => item.slug !== resolved).slice(0, limit)
}

/** Path for Explore Solutions / related cards */
export function industryDetailPath(slug) {
  const resolved = resolveIndustryDetailSlug(slug)
  return resolved ? `/industries/${resolved}` : '/industries'
}

export function systemHref(system) {
  if (system.product) {
    return `/products/${system.category}/${system.product}`
  }
  return `/products/${system.category}`
}
