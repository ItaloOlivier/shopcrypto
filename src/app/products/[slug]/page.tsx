import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart, Check, X } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'
import { AddToCartButton } from '@/components/products/AddToCartButton'

interface ProductPageProps {
  params: { slug: string }
}

async function getProduct(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    })
    return product
  } catch {
    return null
  }
}

async function getRelatedProducts(categoryId: string, currentId: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId,
        id: { not: currentId },
        isActive: true,
      },
      take: 4,
    })
    return products
  } catch {
    return []
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.categoryId, product.id)

  const isOnSale = product.compareAtPrice && Number(product.compareAtPrice) > Number(product.price)
  const discount = isOnSale
    ? Math.round(
        ((Number(product.compareAtPrice) - Number(product.price)) /
          Number(product.compareAtPrice)) *
          100
      )
    : 0

  const specs = product.specs as Record<string, string> | null

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          href="/products"
          className="inline-flex items-center text-sm text-neutral-600 hover:text-primary-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-neutral-100 rounded-lg overflow-hidden">
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                <ShoppingCart className="h-24 w-24" />
              </div>
            )}
            {isOnSale && (
              <span className="absolute top-4 left-4 badge badge-sale text-sm px-3 py-1">
                -{discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((image, i) => (
                <button
                  key={i}
                  className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 border-neutral-200 hover:border-primary-500 transition-colors"
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          {product.vendor && (
            <p className="text-sm text-neutral-500 uppercase tracking-wide mb-2">
              {product.vendor}
            </p>
          )}

          <h1 className="text-3xl font-bold text-neutral-900 mb-4">{product.name}</h1>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-neutral-900">
              {formatPrice(Number(product.price))}
            </span>
            {isOnSale && (
              <span className="text-xl text-neutral-500 line-through">
                {formatPrice(Number(product.compareAtPrice))}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2 mb-6">
            {product.stock > 0 ? (
              <>
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-green-600 font-medium">In Stock</span>
                {product.stock < 5 && (
                  <span className="text-neutral-500 text-sm">
                    (Only {product.stock} left)
                  </span>
                )}
              </>
            ) : (
              <>
                <X className="h-5 w-5 text-red-600" />
                <span className="text-red-600 font-medium">Out of Stock</span>
              </>
            )}
          </div>

          {/* Add to Cart */}
          <div className="mb-8">
            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: Number(product.price),
                compareAtPrice: product.compareAtPrice
                  ? Number(product.compareAtPrice)
                  : undefined,
                image: product.images[0],
              }}
              disabled={product.stock === 0}
            />
          </div>

          {/* Quick Specs */}
          {(product.hashrate || product.algorithm || product.powerConsumption) && (
            <div className="bg-neutral-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-neutral-900 mb-3">Quick Specs</h3>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                {product.hashrate && (
                  <>
                    <dt className="text-neutral-600">Hashrate</dt>
                    <dd className="font-medium">{product.hashrate}</dd>
                  </>
                )}
                {product.algorithm && (
                  <>
                    <dt className="text-neutral-600">Algorithm</dt>
                    <dd className="font-medium">{product.algorithm}</dd>
                  </>
                )}
                {product.powerConsumption && (
                  <>
                    <dt className="text-neutral-600">Power</dt>
                    <dd className="font-medium">{product.powerConsumption}</dd>
                  </>
                )}
              </dl>
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div className="prose prose-neutral max-w-none mb-8">
              <h3 className="font-semibold text-neutral-900 mb-3">Description</h3>
              <p className="text-neutral-600 whitespace-pre-line">{product.description}</p>
            </div>
          )}

          {/* Full Specs */}
          {specs && Object.keys(specs).length > 0 && (
            <div className="border-t pt-6">
              <h3 className="font-semibold text-neutral-900 mb-4">Specifications</h3>
              <dl className="divide-y divide-neutral-200">
                {Object.entries(specs).map(([key, value]) => (
                  <div key={key} className="py-3 flex justify-between text-sm">
                    <dt className="text-neutral-600">{key}</dt>
                    <dd className="font-medium text-neutral-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 border-t pt-16">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((related) => (
              <Link
                key={related.id}
                href={`/products/${related.slug}`}
                className="card overflow-hidden group"
              >
                <div className="relative aspect-square bg-neutral-100">
                  {related.images[0] ? (
                    <Image
                      src={related.images[0]}
                      alt={related.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                      <ShoppingCart className="h-12 w-12" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {related.name}
                  </h3>
                  <p className="mt-2 font-semibold">
                    {formatPrice(Number(related.price))}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
