/**
 * Category CTA copy derived from Lovable category pages
 * (geecee/src/routes/products.$categoryId.index.tsx CTABand props).
 *
 * Lovable used:
 *   title: `Specifying ${category.name.toLowerCase()}?`
 *   body:  shared technical support paragraph
 *
 * Rendered inside our typography ProductsCTA — design unchanged.
 */

const LOVABLE_BODY =
  'Send us the structure, exposure and programme. We will confirm the right product, dosage and pack size for your quantity.'

const LOVABLE_FEATURES = [
  'Latest TDS',
  'Dosage Guidance',
  'Product Recommendation',
  'Fast Response',
]

function buildCategoryCTA(name) {
  return {
    eyebrow: 'Technical Support',
    /** "Specifying" stays navy; category name is the blue highlight */
    headlineLead: 'Specifying',
    headlineHighlight: `${name.toLowerCase()}?`,
    body: LOVABLE_BODY,
    features: LOVABLE_FEATURES,
    primaryLabel: 'Start an Enquiry',
    phoneDisplay: '+91 98499 90061',
    phoneHref: 'tel:+919849990061',
    enquiryHref:
      'mailto:info@geeceechem.com?subject=' +
      encodeURIComponent(`Technical Support — ${name}`),
  }
}

export const categoryCTAs = {
  'concrete-admixtures': buildCategoryCTA('Concrete & Mortar Admixtures'),
  'integral-waterproofing': buildCategoryCTA('Integral Waterproofing Compounds'),
  'grouts-anchoring': buildCategoryCTA('Grouts & Anchoring Systems'),
  'waterproofing-systems': buildCategoryCTA('Waterproofing & Protective Coatings'),
  'bonding-agents': buildCategoryCTA('Bonding Agents'),
  'repairs-rehabilitation': buildCategoryCTA('Repairs & Rehabilitation'),
  'expansion-joints': buildCategoryCTA('Expansion Joints & Sealants'),
  'industrial-flooring': buildCategoryCTA('Industrial Flooring'),
  'epoxy-coatings': buildCategoryCTA('Epoxy Coatings'),
  'tile-adhesives-grouts': buildCategoryCTA('Tile Adhesives & Grouts'),
  'curing-mould-release': buildCategoryCTA('Curing Compounds & Mould Release'),
}

/** Landing-page Products CTA (approved copy — do not change). */
export const productsLandingCTA = {
  eyebrow: 'Technical Support',
  headlineLead: 'Need the right',
  headlineHighlight: 'technical data sheet',
  headlineTrail: 'for your project?',
  body: 'Tell us the product name, application and project requirements.\nOur engineering team will send the latest Technical Data Sheet, dosage recommendations and pricing suited to your required quantity.',
  features: LOVABLE_FEATURES,
  primaryLabel: 'Start an Enquiry',
  phoneDisplay: '+91 98499 90061',
  phoneHref: 'tel:+919849990061',
  enquiryHref: 'mailto:info@geeceechem.com?subject=Technical%20Data%20Sheet%20Request',
}

/** Industries page CTA */
export const industriesCTA = {
  eyebrow: 'Technical Support',
  headlineLead: 'Not sure which system',
  headlineHighlight: 'your structure needs?',
  body: 'Share your specification, drawings or site conditions. Our technical team will recommend the right system — and the dosage to go with it.',
  features: [],
  primaryLabel: 'Start an enquiry',
  phoneDisplay: '+91 98499 90061',
  phoneHref: 'tel:+919849990061',
  enquiryHref:
    'mailto:info@geeceechem.com?subject=' +
    encodeURIComponent('Industry System Enquiry'),
}

export function getCategoryCTA(slug) {
  return categoryCTAs[slug] || null
}

/**
 * Product detail CTA — migrates existing CTABand copy into the typography ProductsCTA.
 * Title, body, buttons and phone stay as on the old blue card; subject is product-specific.
 */
export function buildProductCTA(product) {
  return {
    eyebrow: 'Technical Support',
    headlineLead: 'Tell us what',
    headlineHighlight: "you're building.",
    body: "Share your specification, drawings or site conditions. Our technical team will recommend the right system — and the dosage to go with it.",
    features: LOVABLE_FEATURES,
    primaryLabel: 'Start an Enquiry',
    phoneDisplay: '+91 98499 90061',
    phoneHref: 'tel:+919849990061',
    enquiryHref:
      'mailto:info@geeceechem.com?subject=' +
      encodeURIComponent(`Enquiry — ${product.name}`),
  }
}
