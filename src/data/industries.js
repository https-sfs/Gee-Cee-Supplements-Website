/**
 * Industry catalogue for the Industries page.
 * Each entry powers the reusable IndustrySection card.
 * `applications[].icon` keys map to Lucide icons in IndustrySection.
 */
export const industries = [
  {
    slug: 'roads-highways',
    number: '01',
    name: 'Roads & Highways',
    description:
      'High-performance construction chemical solutions engineered for roads, highways, expressways and transportation infrastructure. Designed to improve durability, strength and long-term performance under heavy traffic and extreme environmental conditions.',
    image: '/media/industries/roads-highways.jpg',
    imageAlt: 'Centered multi-lane highway vanishing toward mountains — roads and highways',
    applications: [
      { icon: 'road', label: 'Pavements' },
      { icon: 'waypoints', label: 'Flyovers' },
      { icon: 'route', label: 'Expressways' },
      { icon: 'map', label: 'Toll Roads' },
    ],
    href: '/projects?industry=roads-highways',
    imageObjectPosition: 'center center',
  },
  {
    slug: 'bridges-flyovers',
    number: '02',
    name: 'Bridges & Flyovers',
    description:
      'High-performance construction chemical solutions engineered for bridges, flyovers, elevated corridors and transportation structures. Designed to enhance structural durability, load-bearing performance and long-term protection against weathering and corrosion.',
    image: '/media/industries/bridges-flyovers.jpg',
    imageAlt: 'Elevated flyover with blue barriers sweeping toward the city skyline',
    applications: [
      { icon: 'waypoints', label: 'Bridges' },
      { icon: 'road', label: 'Flyovers' },
      { icon: 'route', label: 'Elevated Corridors' },
      { icon: 'map', label: 'Transport Structures' },
    ],
    href: '/projects?industry=bridges-flyovers',
    imageObjectPosition: 'center center',
  },
  {
    slug: 'railways-metro',
    number: '03',
    name: 'Railways & Metro',
    description:
      'High-performance construction chemical solutions engineered for railway networks, metro corridors, elevated stations and transport infrastructure. Designed to enhance structural durability, vibration resistance and long-term protection for high-frequency transit systems.',
    image: '/media/industries/railways-metro.jpg',
    imageAlt: 'Metro train on elevated viaduct with urban skyline — railways and metro infrastructure',
    applications: [
      { icon: 'road', label: 'Railway Tracks' },
      { icon: 'route', label: 'Metro Corridors' },
      { icon: 'waypoints', label: 'Elevated Stations' },
      { icon: 'map', label: 'Transit system' },
    ],
    href: '/projects?industry=railways-metro',
  },
  {
    slug: 'dams-irrigation',
    number: '04',
    name: 'Dams & Irrigation',
    description:
      'High-performance construction chemical solutions engineered for dams, canals, spillways and irrigation infrastructure. Designed to improve water resistance, structural integrity and long-term durability in demanding hydraulic environments.',
    image: '/media/industries/dams-irrigation.jpg',
    imageAlt: 'Hydroelectric dam with active spillways and forested hills — dams and irrigation',
    applications: [
      { icon: 'waypoints', label: 'Dams' },
      { icon: 'road', label: 'Spillways' },
      { icon: 'route', label: 'Canals' },
      { icon: 'map', label: 'Irrigation Projects' },
    ],
    href: '/projects?industry=dams-irrigation',
  },
  {
    slug: 'water-sewage',
    number: '05',
    name: 'Water & Sewage Structures',
    description:
      'Construction chemical solutions for water treatment plants, sewage infrastructure, reservoirs and utility networks—engineered for waterproofing, chemical resistance and durable performance in continuously wet environments.',
    image: '/media/industries/water-sewage.jpg',
    imageAlt: 'Aerial view of water treatment plant clarifiers — water and sewage structures',
    applications: [
      { icon: 'waypoints', label: 'Treatment Plants' },
      { icon: 'route', label: 'Sewage Systems' },
      { icon: 'road', label: 'Reservoirs' },
      { icon: 'map', label: 'Utilities' },
    ],
    href: '/projects?industry=water-sewage',
  },
  {
    slug: 'industrial-plants',
    number: '06',
    name: 'Industrial Plants & Factories',
    description:
      'High-performance construction chemical solutions engineered for industrial plants, manufacturing facilities, processing units and factory infrastructure. Designed to enhance structural durability, chemical resistance and long-term performance in demanding industrial environments.',
    image: '/media/industries/industrial-facilities.jpg',
    imageAlt: 'Industrial processing plant with towers and piping — industrial plants and factories',
    applications: [
      { icon: 'waypoints', label: 'Manufacturing Plants' },
      { icon: 'route', label: 'Processing Units' },
      { icon: 'road', label: 'Industrial Floors' },
      { icon: 'map', label: 'Factory Infrastructure' },
    ],
    href: '/projects?industry=industrial-plants',
    imageObjectPosition: 'center center',
  },
  {
    slug: 'commercial-institutional',
    number: '07',
    name: 'Commercial & Institutional',
    description:
      'Construction chemical solutions for commercial buildings, corporate campuses, educational institutions and public infrastructure—engineered for structural durability, waterproofing, aesthetic finishes and lasting performance in high-traffic built environments.',
    image: '/media/industries/commercial-buildings.jpg',
    imageAlt: 'Modern commercial building at twilight — commercial and institutional construction',
    applications: [
      { icon: 'waypoints', label: 'Commercial Buildings' },
      { icon: 'route', label: 'Office Complexes' },
      { icon: 'road', label: 'Educational Institutions' },
      { icon: 'map', label: 'Public Facilities' },
    ],
    href: '/projects?industry=commercial-institutional',
    imageObjectPosition: 'center center',
  },
  {
    slug: 'residential-developments',
    number: '08',
    name: 'Residential Developments',
    description:
      'Construction chemical solutions for residential apartments, villas, gated communities and housing developments—engineered for waterproofing, crack protection, structural durability and lasting performance in modern residential construction.',
    image: '/media/industries/residential-construction.jpg',
    imageAlt: 'Modern residential apartment buildings at sunset — residential developments',
    applications: [
      { icon: 'waypoints', label: 'Apartments' },
      { icon: 'route', label: 'Villas' },
      { icon: 'road', label: 'Housing Projects' },
      { icon: 'map', label: 'Residential Complexes' },
    ],
    href: '/projects?industry=residential-developments',
    imageObjectPosition: 'center center',
  },
]

export function getIndustryBySlug(slug) {
  return industries.find((item) => item.slug === slug) || null
}
