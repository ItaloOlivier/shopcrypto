'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2, Plus, X } from 'lucide-react'
import Link from 'next/link'

interface Category {
  id: string
  name: string
  slug: string
}

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([''])

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    price: '',
    compareAtPrice: '',
    categoryId: '',
    vendor: '',
    sku: '',
    stock: '1',
    isActive: true,
    isFeatured: false,
    hashrate: '',
    algorithm: '',
    powerConsumption: '',
  })

  useEffect(() => {
    fetch('/api/admin/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(console.error)
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    if (name === 'name' && !formData.slug) {
      setFormData({
        ...formData,
        name: value,
        slug: value
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-'),
      })
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      })
    }
  }

  const handleImageChange = (index: number, value: string) => {
    const newUrls = [...imageUrls]
    newUrls[index] = value
    setImageUrls(newUrls)
  }

  const addImageField = () => {
    setImageUrls([...imageUrls, ''])
  }

  const removeImageField = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          compareAtPrice: formData.compareAtPrice
            ? parseFloat(formData.compareAtPrice)
            : null,
          stock: parseInt(formData.stock),
          images: imageUrls.filter((url) => url.trim() !== ''),
        }),
      })

      if (res.ok) {
        router.push('/admin/products')
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to create product')
      }
    } catch {
      alert('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Link
        href="/admin/products"
        className="inline-flex items-center text-sm text-neutral-600 hover:text-primary-600 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Link>

      <h1 className="text-2xl font-bold text-neutral-900 mb-8">Add New Product</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                Basic Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="label">Product Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="input mt-1"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="slug" className="label">URL Slug</label>
                  <input
                    id="slug"
                    name="slug"
                    type="text"
                    value={formData.slug}
                    onChange={handleChange}
                    className="input mt-1"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="shortDescription" className="label">
                    Short Description
                  </label>
                  <input
                    id="shortDescription"
                    name="shortDescription"
                    type="text"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    className="input mt-1"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="label">
                    Full Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    className="input mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                Images
              </h2>
              <p className="text-sm text-neutral-500 mb-4">
                Add image URLs. First image will be the main product image.
              </p>

              <div className="space-y-3">
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="input flex-1"
                    />
                    {imageUrls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="btn btn-outline text-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Image
                </button>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                Mining Specifications
              </h2>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="hashrate" className="label">Hashrate</label>
                  <input
                    id="hashrate"
                    name="hashrate"
                    type="text"
                    value={formData.hashrate}
                    onChange={handleChange}
                    placeholder="e.g., 110 TH/s"
                    className="input mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="algorithm" className="label">Algorithm</label>
                  <input
                    id="algorithm"
                    name="algorithm"
                    type="text"
                    value={formData.algorithm}
                    onChange={handleChange}
                    placeholder="e.g., SHA-256"
                    className="input mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="powerConsumption" className="label">
                    Power Consumption
                  </label>
                  <input
                    id="powerConsumption"
                    name="powerConsumption"
                    type="text"
                    value={formData.powerConsumption}
                    onChange={handleChange}
                    placeholder="e.g., 3250W"
                    className="input mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                Pricing
              </h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="price" className="label">Price (ZAR)</label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    className="input mt-1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="compareAtPrice" className="label">
                    Compare at Price (Optional)
                  </label>
                  <input
                    id="compareAtPrice"
                    name="compareAtPrice"
                    type="number"
                    step="0.01"
                    value={formData.compareAtPrice}
                    onChange={handleChange}
                    className="input mt-1"
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    Used to show sale price
                  </p>
                </div>
              </div>
            </div>

            {/* Organization */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                Organization
              </h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="categoryId" className="label">Category</label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="input mt-1"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="vendor" className="label">Vendor/Brand</label>
                  <input
                    id="vendor"
                    name="vendor"
                    type="text"
                    value={formData.vendor}
                    onChange={handleChange}
                    placeholder="e.g., Bitmain"
                    className="input mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="sku" className="label">SKU</label>
                  <input
                    id="sku"
                    name="sku"
                    type="text"
                    value={formData.sku}
                    onChange={handleChange}
                    className="input mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                Inventory
              </h2>

              <div>
                <label htmlFor="stock" className="label">Stock Quantity</label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  className="input mt-1"
                  required
                />
              </div>
            </div>

            {/* Status */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                Status
              </h2>

              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm">Active (visible on store)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm">Featured on homepage</span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Product'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
