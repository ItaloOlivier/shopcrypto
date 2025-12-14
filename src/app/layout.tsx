import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Providers } from '@/components/Providers'
import { OrganizationJsonLd, WebsiteJsonLd, LocalBusinessJsonLd } from '@/components/seo/JsonLd'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#171717',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://shopcrypto.co.za'),
  title: {
    default: 'ShopCrypto - Buy Cryptocurrency Mining Hardware in South Africa',
    template: '%s | ShopCrypto South Africa',
  },
  description: 'South Africa\'s leading supplier of cryptocurrency mining hardware. Buy ASIC miners from Bitmain, Whatsminer, IceRiver. New and second-hand miners, accessories, and professional hosting services. Best prices guaranteed.',
  keywords: [
    'crypto mining South Africa',
    'ASIC miners South Africa',
    'Bitcoin mining hardware',
    'Bitmain Antminer',
    'Whatsminer',
    'IceRiver',
    'cryptocurrency mining',
    'buy crypto miners',
    'mining equipment',
    'S21 miner',
    'S19 XP',
    'Kaspa miner',
    'SHA256 miner',
    'miner hosting Johannesburg',
    'crypto mining hosting South Africa',
  ],
  authors: [{ name: 'ShopCrypto', url: 'https://shopcrypto.co.za' }],
  creator: 'ShopCrypto',
  publisher: 'Outsourced CTO (PTY) LTD',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'ShopCrypto - Buy Cryptocurrency Mining Hardware in South Africa',
    description: 'South Africa\'s leading supplier of cryptocurrency mining hardware. ASIC miners from Bitmain, Whatsminer, IceRiver. Best prices guaranteed.',
    url: 'https://shopcrypto.co.za',
    siteName: 'ShopCrypto',
    type: 'website',
    locale: 'en_ZA',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ShopCrypto - Cryptocurrency Mining Hardware South Africa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShopCrypto - Cryptocurrency Mining Hardware South Africa',
    description: 'Buy ASIC miners in South Africa. Bitmain, Whatsminer, IceRiver. Best prices guaranteed.',
    images: ['/og-image.jpg'],
    creator: '@shopcrypto',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://shopcrypto.co.za',
  },
  category: 'technology',
  classification: 'Business',
  referrer: 'origin-when-cross-origin',
  other: {
    'geo.region': 'ZA-NW',
    'geo.placename': 'Broederstroom',
    'geo.position': '-25.7896;27.8589',
    'ICBM': '-25.7896, 27.8589',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-ZA">
      <head>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <LocalBusinessJsonLd />
      </head>
      <body className={inter.className}>
        <Providers>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-[100]">
            Skip to main content
          </a>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1" role="main">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
