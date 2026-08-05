const fs = require('fs')
const src = fs.readFileSync(
  'C:/Users/Dell/OneDrive/Attachments/Desktop/geecee/src/data/products.ts',
  'utf8',
)

let out = src
  .replace(/^import .+;\r?\n/gm, '')
  .replace(/export type Product = \{[\s\S]*?\};\r?\n\r?\n/, '')
  .replace(/export type Category = \{[\s\S]*?\};\r?\n\r?\n/, '')
  .replace(/: Category\[\]/g, '')
  .replace(/image: admixturesImg,/g, "image: '/media/solutions/concrete-admixtures.jpg',")
  .replace(/image: waterproofingImg,/g, "image: '/media/solutions/integral-waterproofing.jpg',")
  .replace(/image: groutsImg,/g, "image: '/media/solutions/grouts-anchoring.jpg',")
  .replace(/image: bondingImg,/g, "image: '/media/solutions/bonding-agents.jpg',")
  .replace(/image: repairsImg,/g, "image: '/media/solutions/repair-rehabilitation.jpg',")
  .replace(/image: sealantsImg,/g, "image: '/media/products/categories/sealants.jpg',")
  .replace(/image: flooringImg,/g, "image: '/media/solutions/industrial-flooring.jpg',")
  .replace(/image: epoxyImg,/g, "image: '/media/products/categories/epoxy-coatings.png',")
  .replace(/image: tileImg,/g, "image: '/media/products/categories/tile-adhesives.jpg',")
  .replace(/image: curingImg,/g, "image: '/media/industries/roads-highways.jpg',")
  .replace(/\(slug: string\)/g, '(slug)')
  .replace(/\(categorySlug: string, productSlug: string\)/g, '(categorySlug, productSlug)')
  .replace(/\n{3,}/g, '\n\n')

// Waterproofing & Protective Coatings should use coatings image (Lovable reused waterproofingImg for both)
out = out.replace(
  /(slug: "waterproofing-systems",[\s\S]*?)image: '\/media\/solutions\/integral-waterproofing\.jpg',/,
  "$1image: '/media/solutions/waterproofing-coatings.jpg',",
)

const header = `/**
 * Full product catalogue ported from the Lovable reference (geecee/src/data/products.ts).
 * Used by category and product detail routes. Do not use for the Products landing cards.
 */

`

fs.writeFileSync(
  'C:/Users/Dell/OneDrive/Attachments/Desktop/Gee Cee/website/src/data/productsCatalog.js',
  header + out.trim() + '\n',
)
console.log('OK', out.length)
