import Link from 'next/link'
import { CheckCircle, Mail, ArrowRight } from 'lucide-react'

interface OrderConfirmationPageProps {
  searchParams: { order?: string }
}

export default function OrderConfirmationPage({ searchParams }: OrderConfirmationPageProps) {
  const orderNumber = searchParams.order

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />

        <h1 className="mt-6 text-3xl font-bold text-neutral-900">
          Order Confirmed!
        </h1>

        <p className="mt-4 text-lg text-neutral-600">
          Thank you for your order. We&apos;ve received your request and will process it shortly.
        </p>

        {orderNumber && (
          <div className="mt-8 p-6 bg-neutral-50 rounded-lg">
            <p className="text-sm text-neutral-600">Order Number</p>
            <p className="text-2xl font-bold text-neutral-900 mt-1">{orderNumber}</p>
          </div>
        )}

        <div className="mt-8 p-6 bg-primary-50 rounded-lg text-left">
          <h2 className="font-semibold text-neutral-900 flex items-center">
            <Mail className="h-5 w-5 mr-2 text-primary-600" />
            What&apos;s Next?
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-neutral-600">
            <li>1. You&apos;ll receive an order confirmation email shortly.</li>
            <li>2. We&apos;ll contact you with shipping cost and payment details.</li>
            <li>3. Once payment is confirmed, we&apos;ll ship your order.</li>
            <li>4. You&apos;ll receive tracking information via email.</li>
          </ul>
        </div>

        <div className="mt-8 p-6 bg-neutral-100 rounded-lg text-left">
          <h3 className="font-semibold text-neutral-900">Payment Information</h3>
          <p className="mt-2 text-sm text-neutral-600">
            Our team will send you an invoice with banking details for EFT payment.
            For card payments, we&apos;ll send a secure payment link.
          </p>
          <div className="mt-4 text-sm">
            <p className="font-medium">Contact us:</p>
            <p className="text-neutral-600">Email: connect@outsourcedcto.co.za</p>
            <p className="text-neutral-600">Phone: +27 79 192 2423</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products" className="btn btn-primary">
            Continue Shopping
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link href="/" className="btn btn-outline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
