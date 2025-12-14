import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import { ProductGrid } from '@/components/products/ProductGrid'

interface ProductsPageProps {
  searchParams: { category?: string; search?: string; sort?: string; page?: string }
}

async function getProducts(searchParams: ProductsPageProps['searchParams']) {
  const { category, search, sort } = searchParams

  const where: Record<string, unknown> = { isActive: true }

  if (category) {
    where.category = { slug: category }
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { vendor: { contains: search, mode: 'insensitive' } },
    ]
  }

  let orderBy: Record<string, string> = { createdAt: 'desc' }
  if (sort === 'price-asc') orderBy = { price: 'asc' }
  if (sort === 'price-desc') orderBy = { price: 'desc' }
  if (sort === 'name') orderBy = { name: 'asc' }

  try {
    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: { category: true },
    })
    return products
  } catch {
    return []
  }
}

async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    })
    return categories
  } catch {
    return []
  }
}

function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="card animate-pulse">
          <div className="aspect-square bg-neutral-200" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-neutral-200 rounded w-1/4" />
            <div className="h-5 bg-neutral-200 rounded w-3/4" />
            <div className="h-5 bg-neutral-200 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const [products, categories] = await Promise.all([
    getProducts(searchParams),
    getCategories(),
  ])

  const currentCategory = categories.find((c) => c.slug === searchParams.category)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">
          {currentCategory?.name || 'All Products'}
        </h1>
        {currentCategory?.description && (
          <p className="mt-2 text-neutral-600">{currentCategory.description}</p>
        )}
        {searchParams.search && (
          <p className="mt-2 text-neutral-600">
            Search results for: <span className="font-medium">&quot;{searchParams.search}&quot;</span>
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="card p-4 sticky top-24">
            <h3 className="font-semibold text-neutral-900 mb-4">Categories</h3>
            <nav className="space-y-2">
              <a
                href="/products"
                className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                  !searchParams.category
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                All Products
              </a>
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                    searchParams.category === cat.slug
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {cat.name}
                </a>
              ))}
            </nav>

            <hr className="my-4" />

            <h3 className="font-semibold text-neutral-900 mb-4">Sort By</h3>
            <nav className="space-y-2">
              {[
                { value: '', label: 'Newest' },
                { value: 'price-asc', label: 'Price: Low to High' },
                { value: 'price-desc', label: 'Price: High to Low' },
                { value: 'name', label: 'Name' },
              ].map((option) => (
                <a
                  key={option.value}
                  href={`/products?${new URLSearchParams({
                    ...(searchParams.category && { category: searchParams.category }),
                    ...(searchParams.search && { search: searchParams.search }),
                    ...(option.value && { sort: option.value }),
                  }).toString()}`}
                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                    (searchParams.sort || '') === option.value
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {option.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-4 text-sm text-neutral-600">
            {products.length} product{products.length !== 1 ? 's' : ''}
          </div>

          <Suspense fallback={<ProductsLoading />}>
            {products.length > 0 ? (
              <ProductGrid products={products} columns={3} />
            ) : (
              <div className="text-center py-12 bg-neutral-50 rounded-lg">
                <p className="text-neutral-600">
                  No products found. Try adjusting your filters.
                </p>
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  )
}
