export function OrganizationJsonLd() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ShopCrypto',
    alternateName: 'ShopCrypto South Africa',
    url: 'https://shopcrypto.co.za',
    logo: 'https://shopcrypto.co.za/logo.jpg',
    description: 'South Africa\'s leading supplier of cryptocurrency mining hardware including ASIC miners, accessories, and hosting services.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '94 Woodlands Circle, Pecanwood',
      addressLocality: 'Broederstroom',
      addressRegion: 'North West',
      addressCountry: 'ZA',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+27-79-192-2423',
      contactType: 'sales',
      email: 'connect@outsourcedcto.co.za',
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://facebook.com/shopcrypto',
      'https://linkedin.com/company/shopcrypto',
    ],
    priceRange: 'R20,000 - R750,000',
    currenciesAccepted: 'ZAR',
    paymentAccepted: 'EFT, Credit Card, Crypto',
    areaServed: {
      '@type': 'Country',
      name: 'South Africa',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  )
}

export function WebsiteJsonLd() {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ShopCrypto',
    url: 'https://shopcrypto.co.za',
    description: 'Buy cryptocurrency mining hardware in South Africa. ASIC miners from Bitmain, Whatsminer, IceRiver. New and second-hand miners available.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://shopcrypto.co.za/products?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
    />
  )
}

export function LocalBusinessJsonLd() {
  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': 'https://shopcrypto.co.za/#store',
    name: 'ShopCrypto',
    image: 'https://shopcrypto.co.za/logo.jpg',
    url: 'https://shopcrypto.co.za',
    telephone: '+27791922423',
    email: 'connect@outsourcedcto.co.za',
    description: 'South Africa\'s premier cryptocurrency mining hardware store. We sell and host ASIC miners from Bitmain, Whatsminer, and IceRiver.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '94 Woodlands Circle, Pecanwood',
      addressLocality: 'Broederstroom',
      addressRegion: 'North West',
      postalCode: '0240',
      addressCountry: 'ZA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -25.7896,
      longitude: 27.8589,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    priceRange: '$$$$',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
    />
  )
}

interface ProductJsonLdProps {
  product: {
    name: string
    description: string
    image: string
    sku: string
    price: number
    compareAtPrice?: number
    stock: number
    vendor?: string
    category?: string
    hashrate?: string
    algorithm?: string
  }
}

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const productData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image.startsWith('http')
      ? product.image
      : `https://shopcrypto.co.za${product.image}`,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.vendor || 'ShopCrypto',
    },
    category: product.category || 'ASIC Miners',
    offers: {
      '@type': 'Offer',
      url: `https://shopcrypto.co.za/products/${product.sku}`,
      priceCurrency: 'ZAR',
      price: product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.stock > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'ShopCrypto',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'ZA',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          businessDays: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          },
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode: 'd',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 7,
            unitCode: 'd',
          },
        },
      },
    },
    ...(product.hashrate && {
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Hashrate',
          value: product.hashrate,
        },
        ...(product.algorithm ? [{
          '@type': 'PropertyValue',
          name: 'Algorithm',
          value: product.algorithm,
        }] : []),
      ],
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productData) }}
    />
  )
}

interface BreadcrumbJsonLdProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  )
}

interface FAQJsonLdProps {
  faqs: Array<{
    question: string
    answer: string
  }>
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  )
}

interface ServiceJsonLdProps {
  name: string
  description: string
  price?: string
}

export function ServiceJsonLd({ name, description, price }: ServiceJsonLdProps) {
  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: 'ShopCrypto',
      url: 'https://shopcrypto.co.za',
    },
    areaServed: {
      '@type': 'Country',
      name: 'South Africa',
    },
    ...(price && {
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency: 'ZAR',
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
    />
  )
}
