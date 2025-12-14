import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateOrderNumber } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await request.json()

    const {
      email,
      name,
      phone,
      address,
      city,
      province,
      postalCode,
      notes,
      items,
      paymentMethod,
      subtotal,
    } = body

    // Validate required fields
    if (!email || !name || !address || !city || !province || !postalCode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    // Get or create user
    let userId = session?.user?.id

    if (!userId) {
      // Check if user exists
      let user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        // Create guest user with random password
        const randomPassword = Math.random().toString(36).slice(-12)
        const { hash } = await import('bcryptjs')
        const hashedPassword = await hash(randomPassword, 12)

        user = await prisma.user.create({
          data: {
            email,
            name,
            password: hashedPassword,
            phone,
            address,
            city,
            province,
            postalCode,
          },
        })
      }

      userId = user.id
    }

    // Create order
    const orderNumber = generateOrderNumber()

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        status: 'PENDING',
        subtotal,
        total: subtotal,
        shippingAddress: address,
        shippingCity: city,
        shippingProvince: province,
        shippingPostalCode: postalCode,
        paymentMethod,
        notes,
        items: {
          create: items.map((item: { id: string; name: string; price: number; quantity: number }) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    })

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      orderId: order.id,
    })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
