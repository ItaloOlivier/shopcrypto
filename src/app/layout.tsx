import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Providers } from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ShopCrypto - Cryptocurrency Mining Hardware | South Africa',
  description: 'South Africa\'s leading supplier of cryptocurrency mining hardware. ASIC miners, accessories, and hosting services. Bitmain, IceRiver, Whatsminer available.',
  keywords: 'crypto mining, ASIC miners, Bitcoin mining, South Africa, Bitmain, Antminer, Whatsminer, IceRiver',
  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
  openGraph: {
    title: 'ShopCrypto - Cryptocurrency Mining Hardware',
    description: 'South Africa\'s leading supplier of cryptocurrency mining hardware.',
    type: 'website',
    locale: 'en_ZA',
    images: ['/logo-large.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
