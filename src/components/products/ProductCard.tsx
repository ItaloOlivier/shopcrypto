'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  id: string
  name: string
  slug: string
  price: number
  compareAtPrice?: number
  image?: string
  vendor?: string
  inStock?: boolean
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  compareAtPrice,
  image,
  vendor,
  inStock = true,
}: ProductCardProps) {
  const { addItem } = useCart()
  const isOnSale = compareAtPrice && compareAtPrice > price
  const discount = isOnSale
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id,
      name,
      price,
      compareAtPrice,
      image,
      slug,
    })
  }

  return (
    <Link href={`/products/${slug}`} className="group">
      <div className="card overflow-hidden">
        {/* Image */}
        <div className="relative aspect-square bg-neutral-100">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
              <ShoppingCart className="h-12 w-12" />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isOnSale && (
              <span className="badge badge-sale">-{discount}%</span>
            )}
            {!inStock && (
              <span className="badge bg-neutral-800 text-white">Sold Out</span>
            )}
          </div>

          {/* Quick Add Button */}
          {inStock && (
            <button
              onClick={handleAddToCart}
              className="absolute bottom-2 right-2 p-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary-600 hover:text-white"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Details */}
        <div className="p-4">
          {vendor && (
            <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
              {vendor}
            </p>
          )}
          <h3 className="font-medium text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
            {name}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            <span className="font-semibold text-neutral-900">
              {formatPrice(price)}
            </span>
            {isOnSale && (
              <span className="text-sm text-neutral-500 line-through">
                {formatPrice(compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
