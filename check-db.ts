import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const productCount = await prisma.product.count()
  const activeCount = await prisma.product.count({ where: { isActive: true } })
  const categoryCount = await prisma.category.count()
  const userCount = await prisma.user.count()

  console.log('Database status:')
  console.log('- Products (total):', productCount)
  console.log('- Products (active):', activeCount)
  console.log('- Categories:', categoryCount)
  console.log('- Users:', userCount)

  // Show a sample product
  const sample = await prisma.product.findFirst()
  console.log('\nSample product:', JSON.stringify(sample, null, 2))
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
