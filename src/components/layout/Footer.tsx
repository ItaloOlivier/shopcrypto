import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/products' },
    { name: 'New Miners', href: '/products?category=new-miners' },
    { name: 'Second Hand Miners', href: '/products?category=second-hand-miners' },
    { name: 'Accessories', href: '/products?category=accessories' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Miner Hosting', href: '/hosting' },
    { name: 'Contact', href: '/contact' },
    { name: 'Refund Policy', href: '/refund-policy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.jpg"
                alt="ShopCrypto"
                width={50}
                height={50}
                className="rounded grayscale invert"
              />
              <h3 className="text-xl font-bold text-white">ShopCrypto</h3>
            </div>
            <p className="text-neutral-400 text-sm">
              South Africa&apos;s leading supplier of cryptocurrency mining hardware.
              We source the best miners at competitive prices.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:connect@outsourcedcto.co.za"
                  className="text-neutral-400 hover:text-white text-sm transition-colors"
                >
                  connect@outsourcedcto.co.za
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+27791922423"
                  className="text-neutral-400 hover:text-white text-sm transition-colors"
                >
                  +27 79 192 2423
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                <span className="text-neutral-400 text-sm">
                  94 Woodlands Circle, Pecanwood,<br />
                  Broederstroom, North West,<br />
                  South Africa
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-neutral-800 mt-8 pt-8">
          <div className="max-w-md">
            <h4 className="font-semibold mb-2">Subscribe to our newsletter</h4>
            <p className="text-neutral-400 text-sm mb-4">
              Get updates on new miners and special offers.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 text-sm"
              />
              <button
                type="submit"
                className="btn btn-primary"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Outsourced CTO (PTY) LTD. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Powered by ShopCrypto</p>
        </div>
      </div>
    </footer>
  )
}
