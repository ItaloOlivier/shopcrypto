'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, ArrowRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingCart className="mx-auto h-16 w-16 text-neutral-300" />
          <h1 className="mt-4 text-2xl font-bold text-neutral-900">Your cart is empty</h1>
          <p className="mt-2 text-neutral-600">
            Looks like you haven&apos;t added any items yet.
          </p>
          <Link href="/products" className="btn btn-primary mt-6">
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="card divide-y divide-neutral-200">
            {items.map((item) => (
              <div key={item.id} className="p-4 sm:p-6 flex gap-4">
                {/* Product Image */}
                <Link
                  href={`/products/${item.slug}`}
                  className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-neutral-100 rounded-md overflow-hidden"
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                      <ShoppingCart className="h-8 w-8" />
                    </div>
                  )}
                </Link>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-medium text-neutral-900 hover:text-primary-600 line-clamp-2"
                  >
                    {item.name}
                  </Link>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="font-semibold">{formatPrice(item.price)}</span>
                    {item.compareAtPrice && item.compareAtPrice > item.price && (
                      <span className="text-sm text-neutral-500 line-through">
                        {formatPrice(item.compareAtPrice)}
                      </span>
                    )}
                  </div>

                  {/* Quantity & Actions */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center border border-neutral-300 rounded-md">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-neutral-100 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-3 py-1 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-neutral-100 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Item Total (Desktop) */}
                <div className="hidden sm:block text-right">
                  <span className="font-semibold text-neutral-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/products"
            className="inline-flex items-center mt-6 text-primary-600 hover:text-primary-700 font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal ({itemCount} items)</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Shipping</span>
                <span className="text-neutral-500">Calculated at checkout</span>
              </div>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <p className="mt-1 text-xs text-neutral-500">
              Taxes included. Shipping calculated at checkout.
            </p>

            <Link
              href="/checkout"
              className="btn btn-primary w-full mt-6 py-3"
            >
              Proceed to Checkout
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <p className="text-xs text-neutral-500 text-center">
                Secure checkout powered by industry-standard encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
