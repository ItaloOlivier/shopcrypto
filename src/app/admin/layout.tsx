import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { Package, ShoppingBag, Users, MessageSquare, LayoutDashboard, Settings } from 'lucide-react'

const adminNav = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/login?callbackUrl=/admin')
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-neutral-900 min-h-screen fixed left-0 top-0 hidden lg:block">
          <div className="p-6">
            <Link href="/admin" className="text-xl font-bold text-white">
              ShopCrypto Admin
            </Link>
          </div>

          <nav className="px-4 space-y-1">
            {adminNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-3 text-neutral-300 hover:bg-neutral-800 hover:text-white rounded-lg transition-colors"
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Link
              href="/"
              className="flex items-center px-4 py-3 text-neutral-400 hover:text-white transition-colors"
            >
              Back to Store
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
