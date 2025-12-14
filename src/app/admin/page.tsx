import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'
import { Package, ShoppingBag, Users, DollarSign, TrendingUp, MessageSquare } from 'lucide-react'

async function getStats() {
  try {
    const [
      productCount,
      orderCount,
      customerCount,
      messageCount,
      recentOrders,
      totalRevenue,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.user.count({ where: { role: 'CUSTOMER' } }),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { user: true },
      }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] } },
      }),
    ])

    return {
      productCount,
      orderCount,
      customerCount,
      messageCount,
      recentOrders,
      totalRevenue: totalRevenue._sum.total || 0,
    }
  } catch {
    return {
      productCount: 0,
      orderCount: 0,
      customerCount: 0,
      messageCount: 0,
      recentOrders: [],
      totalRevenue: 0,
    }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const statCards = [
    {
      name: 'Total Products',
      value: stats.productCount,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      name: 'Total Orders',
      value: stats.orderCount,
      icon: ShoppingBag,
      color: 'bg-green-500',
    },
    {
      name: 'Customers',
      value: stats.customerCount,
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      name: 'Revenue',
      value: formatPrice(Number(stats.totalRevenue)),
      icon: DollarSign,
      color: 'bg-yellow-500',
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">{stat.name}</p>
                <p className="text-2xl font-bold text-neutral-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-neutral-900 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Recent Orders
            </h2>
          </div>
          <div className="p-6">
            {stats.recentOrders.length > 0 ? (
              <div className="space-y-4">
                {stats.recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between py-3 border-b last:border-0"
                  >
                    <div>
                      <p className="font-medium">{order.orderNumber}</p>
                      <p className="text-sm text-neutral-500">
                        {order.user?.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatPrice(Number(order.total))}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'DELIVERED'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 text-center py-8">No orders yet</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-neutral-900">
              Quick Actions
            </h2>
          </div>
          <div className="p-6 space-y-3">
            <a
              href="/admin/products/new"
              className="block p-4 border border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
            >
              <div className="flex items-center">
                <Package className="h-5 w-5 text-primary-600 mr-3" />
                <div>
                  <p className="font-medium">Add New Product</p>
                  <p className="text-sm text-neutral-500">Create a new product listing</p>
                </div>
              </div>
            </a>
            <a
              href="/admin/orders"
              className="block p-4 border border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
            >
              <div className="flex items-center">
                <ShoppingBag className="h-5 w-5 text-primary-600 mr-3" />
                <div>
                  <p className="font-medium">View All Orders</p>
                  <p className="text-sm text-neutral-500">Manage and process orders</p>
                </div>
              </div>
            </a>
            {stats.messageCount > 0 && (
              <a
                href="/admin/messages"
                className="block p-4 border border-orange-200 bg-orange-50 rounded-lg hover:border-orange-400 transition-colors"
              >
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 text-orange-600 mr-3" />
                  <div>
                    <p className="font-medium text-orange-900">
                      {stats.messageCount} Unread Messages
                    </p>
                    <p className="text-sm text-orange-700">Check customer inquiries</p>
                  </div>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
