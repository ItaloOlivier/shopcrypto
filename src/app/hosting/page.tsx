import Link from 'next/link'
import { Metadata } from 'next'
import { Zap, Shield, ThermometerSun, Server, Clock, MapPin, Phone, Mail } from 'lucide-react'
import { ServiceJsonLd, FAQJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Crypto Miner Hosting South Africa | R2/kWh | ShopCrypto',
  description: 'Professional cryptocurrency miner hosting in Johannesburg, South Africa. R2/kWh all-inclusive electricity, load shedding protection, cooling included. Host your ASIC miners with us.',
  keywords: [
    'miner hosting South Africa',
    'crypto hosting Johannesburg',
    'ASIC hosting',
    'Bitcoin miner hosting',
    'mining colocation',
    'load shedding protected mining',
  ],
  alternates: {
    canonical: 'https://shopcrypto.co.za/hosting',
  },
  openGraph: {
    title: 'Crypto Miner Hosting - R2/kWh | ShopCrypto',
    description: 'Professional miner hosting in Johannesburg. R2/kWh all-inclusive, load shedding protected.',
    url: 'https://shopcrypto.co.za/hosting',
  },
}

const hostingFaqs = [
  {
    question: 'What is the cost of miner hosting in South Africa?',
    answer: 'Our hosting rate is R2 per kWh, all-inclusive. This covers electricity, cooling, security, and 24/7 monitoring.',
  },
  {
    question: 'Is your facility protected from load shedding?',
    answer: 'Yes, our Johannesburg facility operates independently from the grid, ensuring your miners run 24/7 without interruption from load shedding.',
  },
  {
    question: 'Can I visit my miners at your facility?',
    answer: 'Yes, our facility is conveniently located in Johannesburg with easy access for site visits and equipment delivery.',
  },
  {
    question: 'What support do you provide for hosted miners?',
    answer: 'We provide professional installation, 24/7 monitoring, regular maintenance and cleaning, and remote access to your miners.',
  },
]

const features = [
  {
    icon: Zap,
    title: 'Competitive Electricity Rates',
    description: 'Only R2 per kilowatt-hour, including cooling and security. Lower your operational costs significantly.',
  },
  {
    icon: Shield,
    title: 'Load Shedding Protection',
    description: 'Our facility operates independently from the grid, ensuring your miners run 24/7 without interruption.',
  },
  {
    icon: ThermometerSun,
    title: 'Professional Cooling',
    description: 'State-of-the-art cooling systems to keep your miners running at optimal temperatures.',
  },
  {
    icon: Server,
    title: 'Unlimited Capacity',
    description: 'We have more than enough space to handle any amount of miners. Scale your operation with ease.',
  },
  {
    icon: Clock,
    title: 'Maximum Uptime',
    description: 'Industry-standard reliability with monitoring and maintenance to ensure your miners are always running.',
  },
  {
    icon: MapPin,
    title: 'Johannesburg Location',
    description: 'Conveniently located in Johannesburg with easy access for site visits and equipment delivery.',
  },
]

const breadcrumbItems = [
  { name: 'Home', url: 'https://shopcrypto.co.za' },
  { name: 'Miner Hosting', url: 'https://shopcrypto.co.za/hosting' },
]

export default function HostingPage() {
  return (
    <>
      <ServiceJsonLd
        name="Cryptocurrency Miner Hosting"
        description="Professional ASIC miner hosting in Johannesburg, South Africa. R2/kWh all-inclusive rate with load shedding protection, cooling, security, and 24/7 monitoring."
        price="R2 per kWh"
      />
      <FAQJsonLd faqs={hostingFaqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-neutral-900 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Crypto Miner Hosting South Africa
            </h1>
            <p className="text-xl text-neutral-300 mb-8">
              Host your ASIC miners in our state-of-the-art Johannesburg facility.
              Enjoy competitive electricity rates, load shedding protection, and professional management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn bg-white text-neutral-900 hover:bg-neutral-100 px-8 py-3">
                Get a Quote
              </Link>
              <a href="tel:+27791922423" className="btn border border-white text-white hover:bg-white/10 px-8 py-3">
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Highlight */}
      <section className="py-16 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Simple, Transparent Pricing</h2>
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="text-6xl font-bold text-neutral-900">R2</span>
              <span className="text-2xl text-neutral-600">per kWh</span>
            </div>
            <p className="text-neutral-600 max-w-xl mx-auto mb-6">
              All-inclusive rate that covers electricity, cooling, security, and 24/7 monitoring.
              No hidden fees or surprise charges.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-600">
              <span className="flex items-center gap-1">
                <Zap className="h-4 w-4 text-green-600" /> Electricity Included
              </span>
              <span className="flex items-center gap-1">
                <ThermometerSun className="h-4 w-4 text-blue-600" /> Cooling Included
              </span>
              <span className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-purple-600" /> Security Included
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Why Host With Us?</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Our Johannesburg facility is designed specifically for cryptocurrency mining,
              providing everything you need to maximize your mining profitability.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-neutral-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Miner Hosting</h3>
              <p className="text-neutral-600 mb-4">
                Bring your existing miners to our facility. We handle all the logistics -
                setup, cooling, monitoring, and maintenance. You focus on the returns.
              </p>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full"></span>
                  Professional installation and setup
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full"></span>
                  24/7 monitoring and support
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full"></span>
                  Regular maintenance and cleaning
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full"></span>
                  Remote access to your miners
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Farm Relocation</h3>
              <p className="text-neutral-600 mb-4">
                Already running a mining operation? We can help you relocate your entire farm
                to our facility for better rates and reliability.
              </p>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full"></span>
                  Full logistics support
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full"></span>
                  Safe transport and handling
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full"></span>
                  Quick turnaround time
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full"></span>
                  Bulk hosting discounts
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-neutral-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Hosting?</h2>
            <p className="text-neutral-300 mb-8">
              Contact us today for a custom hosting quote. Whether you have one miner or a hundred,
              we have the capacity and expertise to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-neutral-400" />
                <a href="tel:+27791922423" className="text-lg hover:text-neutral-300">
                  +27 79 192 2423
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-neutral-400" />
                <a href="mailto:connect@outsourcedcto.co.za" className="text-lg hover:text-neutral-300">
                  connect@outsourcedcto.co.za
                </a>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/contact" className="btn bg-white text-neutral-900 hover:bg-neutral-100 px-8 py-3">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
            Hosting FAQs
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {hostingFaqs.map((faq, index) => (
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
