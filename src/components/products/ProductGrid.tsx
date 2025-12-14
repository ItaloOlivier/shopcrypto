import { Decimal } from '@prisma/client/runtime/library'
import { ProductCard } from './ProductCard'

interface Product {
  id: string
  name: string
  slug: string
  price: number | Decimal
  compareAtPrice?: number | Decimal | null
  images: string[]
  vendor?: string | null
  stock: number
}

interface ProductGridProps {
  products: Product[]
  columns?: 2 | 3 | 4
}

export function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          slug={product.slug}
          price={Number(product.price)}
          compareAtPrice={product.compareAtPrice ? Number(product.compareAtPrice) : undefined}
          image={product.images[0]}
          vendor={product.vendor || undefined}
          inStock={product.stock > 0}
        />
      ))}
    </div>
  )
}
