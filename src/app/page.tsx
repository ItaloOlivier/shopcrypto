import Link from 'next/link'
import { ArrowRight, Zap, Shield, Truck, Headphones, Cpu, RefreshCw, Cable } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { ProductGrid } from '@/components/products/ProductGrid'
import { FAQJsonLd } from '@/components/seo/JsonLd'

// Force dynamic rendering - don't cache at build time
export const dynamic = 'force-dynamic'

const homepageFaqs = [
  {
    question: 'Where can I buy cryptocurrency mining hardware in South Africa?',
    answer: 'ShopCrypto is South Africa\'s leading supplier of cryptocurrency mining hardware. We offer ASIC miners from Bitmain, Whatsminer, and IceRiver with delivery across South Africa.',
  },
  {
    question: 'What is the best Bitcoin miner to buy in South Africa?',
    answer: 'The Bitmain Antminer S21 series and Whatsminer M50 series are currently among the most efficient Bitcoin miners available. Contact us for current pricing and availability.',
  },
  {
    question: 'Do you offer miner hosting services in South Africa?',
    answer: 'Yes, we offer professional miner hosting in Johannesburg at R2 per kWh, including cooling, security, and 24/7 monitoring. Our facility is load-shedding protected.',
  },
  {
    question: 'What warranty do you offer on mining hardware?',
    answer: 'All new miners come with a 6-month warranty. We also offer technical support to help you get your mining operation running smoothly.',
  },
  {
    question: 'Can you beat competitor prices on new miners?',
    answer: 'Yes! We will beat any written price for any new miner. Contact us with a competitor quote and we\'ll match or beat it.',
  },
]

async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        isFeatured: true,
      },
      take: 8,
      orderBy: { createdAt: 'desc' },
    })
    return products
  } catch {
    return []
  }
}

async function getLatestProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      take: 8,
      orderBy: { createdAt: 'desc' },
    })
    return products
  } catch {
    return []
  }
}

const features = [
  {
    icon: Zap,
    title: 'Top Performance',
    description: 'Only the best ASIC miners from trusted manufacturers',
  },
  {
    icon: Shield,
    title: 'Warranty Included',
    description: '6-month warranty on all hardware purchases',
  },
  {
    icon: Truck,
    title: 'SA Delivery',
    description: 'Fast and secure delivery across South Africa',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: 'Technical support to get you mining quickly',
  },
]

const categories = [
  {
    name: 'New Miners',
    description: 'Latest ASIC miners from top manufacturers',
    href: '/products?category=new-miners',
    icon: Cpu,
    gradient: 'from-primary-600 to-primary-800',
    iconBg: 'bg-primary-500/30',
  },
  {
    name: 'Second Hand',
    description: 'Quality pre-owned miners at great prices',
    href: '/products?category=second-hand-miners',
    icon: RefreshCw,
    gradient: 'from-accent-500 to-accent-700',
    iconBg: 'bg-accent-400/30',
  },
  {
    name: 'Accessories',
    description: 'Cooling, cables, and mining essentials',
    href: '/products?category=accessories',
    icon: Cable,
    gradient: 'from-neutral-700 to-neutral-900',
    iconBg: 'bg-neutral-500/30',
  },
]

export default async function HomePage() {
  const [featuredProducts, latestProducts] = await Promise.all([
    getFeaturedProducts(),
    getLatestProducts(),
  ])

  const displayProducts = featuredProducts.length > 0 ? featuredProducts : latestProducts

  return (
    <>
      <FAQJsonLd faqs={homepageFaqs} />
      <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Crypto Mining Hardware
              <span className="text-primary-400"> for South Africa</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-neutral-300">
              We source and supply the best cryptocurrency mining equipment at competitive prices.
              From Bitmain to Whatsminer, we&apos;ve got you covered.
            </p>
            <p className="mt-4 text-accent-400 font-semibold text-lg">
              We will beat any written price for any new miner!
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="btn btn-primary px-6 py-3 text-base"
              >
                Shop All Miners
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="btn btn-outline border-white text-white hover:bg-white hover:text-neutral-900 px-6 py-3 text-base"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start space-x-3">
                <feature.icon className="h-6 w-6 text-primary-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-neutral-900">{feature.title}</h3>
                  <p className="text-sm text-neutral-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${category.gradient} aspect-[4/3] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
                </div>

                {/* Icon */}
                <div className="absolute top-6 right-6">
                  <div className={`${category.iconBg} p-4 rounded-xl backdrop-blur-sm`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm mt-2">
                    {category.description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-white font-medium text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg w-fit group-hover:bg-white/30 transition-colors">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-neutral-900">
              {featuredProducts.length > 0 ? 'Featured Products' : 'Latest Products'}
            </h2>
            <Link
              href="/products"
              className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          {displayProducts.length > 0 ? (
            <ProductGrid products={displayProducts} />
          ) : (
            <div className="text-center py-12 bg-neutral-50 rounded-lg">
              <p className="text-neutral-600">
                No products available yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            We can source any miner for you. Contact us with your requirements
            and we&apos;ll find the best deal.
          </p>
          <Link
            href="/contact"
            className="btn bg-white text-primary-600 hover:bg-neutral-100 px-8 py-3 text-base"
          >
            Get a Quote
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {homepageFaqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-neutral-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
