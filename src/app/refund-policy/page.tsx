export default function RefundPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Refund & Exchange Policy</h1>

      <div className="prose prose-neutral max-w-none">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">General Refund Policy</h2>
          <p className="text-neutral-600 mb-4">
            We offer refunds or exchanges within <strong>1 day from the date of purchase</strong>,
            provided items are returned unused in their original sealed packaging (where applicable).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Non-Refundable Items</h2>
          <p className="text-neutral-600 mb-4">
            The following items are not eligible for refund or exchange:
          </p>
          <ul className="list-disc pl-6 text-neutral-600 space-y-2">
            <li>Items that have been opened and/or seals have been broken</li>
            <li>Software or games once opened, if they don&apos;t meet system requirements or age restrictions</li>
            <li>Items damaged due to abuse or misuse</li>
            <li>Items requiring online authentication/activation once opened</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Defective Electronics</h2>
          <p className="text-neutral-600 mb-4">
            If you receive a defective electronic item, we will test the product and exchange it for
            an identical replacement if found to be faulty.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Hardware & Accessories Warranty</h2>

          <h3 className="text-lg font-medium text-neutral-800 mt-6 mb-3">First 6 Months</h3>
          <p className="text-neutral-600 mb-4">
            Manufacturing defects are tested by the manufacturer or authorized distributor.
            If found faulty, items will receive repair, exchange, or refund.
          </p>

          <h3 className="text-lg font-medium text-neutral-800 mt-6 mb-3">After 6 Months (Within Manufacturer Warranty)</h3>
          <p className="text-neutral-600 mb-4">
            Outsourced CTO sends goods to the manufacturer or reseller for evaluation.
            No coverage applies to abused, misused, or accidentally damaged items.
          </p>

          <h3 className="text-lg font-medium text-neutral-800 mt-6 mb-3">Repair/Exchange Coverage</h3>
          <p className="text-neutral-600 mb-4">
            All repairs and exchanges carry a 3-month warranty or the remainder of the original warranty,
            whichever is longer.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Refund Processing</h2>
          <p className="text-neutral-600 mb-4">
            Refunds are processed using the original payment method. We reserve the right to charge
            a restocking fee in certain circumstances.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">How to Request a Return</h2>
          <ol className="list-decimal pl-6 text-neutral-600 space-y-2">
            <li>Contact us at connect@outsourcedcto.co.za or +27 79 192 2423</li>
            <li>Provide your order number and reason for return</li>
            <li>Wait for return authorization and instructions</li>
            <li>Ship the item back in original packaging</li>
            <li>Refund will be processed within 7-14 business days</li>
          </ol>
        </section>

        <section className="bg-neutral-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Contact Us</h2>
          <p className="text-neutral-600">
            For any questions regarding returns or refunds, please contact us:
          </p>
          <ul className="mt-4 text-neutral-600 space-y-1">
            <li><strong>Email:</strong> connect@outsourcedcto.co.za</li>
            <li><strong>Phone:</strong> +27 79 192 2423</li>
          </ul>
        </section>

        <p className="text-sm text-neutral-500 mt-8">
          This policy complies with the South African Consumer Protection Act requirements.
        </p>
      </div>
    </div>
  )
}
