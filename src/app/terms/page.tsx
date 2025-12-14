export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Terms of Service</h1>

      <div className="prose prose-neutral max-w-none">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">1. Acceptance of Terms</h2>
          <p className="text-neutral-600 mb-4">
            Your access to and use of Outsourced CTO (PTY) LTD trading as ShopCrypto is subject
            exclusively to these Terms and Conditions. You will not use this website for any purpose
            that is unlawful or prohibited by these Terms and Conditions. By using this website you
            are fully accepting the terms, conditions and disclaimers contained in this notice. If
            you do not accept these Terms and Conditions you must immediately stop using this website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">2. Modifications</h2>
          <p className="text-neutral-600 mb-4">
            We reserve the right to change these terms at any time. Your continued use of the website
            after changes are posted constitutes your acceptance of the modified terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">3. Products and Pricing</h2>
          <ul className="list-disc pl-6 text-neutral-600 space-y-2">
            <li>All prices are displayed in South African Rand (ZAR) and include VAT where applicable.</li>
            <li>Prices are subject to change without notice.</li>
            <li>We reserve the right to limit quantities and refuse sales.</li>
            <li>Product images are for illustration purposes and may differ from actual products.</li>
            <li>Technical specifications are provided by manufacturers and may be subject to change.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">4. Orders and Payment</h2>
          <ul className="list-disc pl-6 text-neutral-600 space-y-2">
            <li>All orders are subject to acceptance and availability.</li>
            <li>We reserve the right to cancel orders for any reason.</li>
            <li>Payment must be received in full before goods are dispatched.</li>
            <li>We accept EFT/Bank Transfer and card payments.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">5. Delivery</h2>
          <ul className="list-disc pl-6 text-neutral-600 space-y-2">
            <li>Delivery times are estimates and not guaranteed.</li>
            <li>Risk of loss passes to the buyer upon delivery.</li>
            <li>Shipping costs are calculated separately and communicated before payment.</li>
            <li>We deliver throughout South Africa.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">6. Intellectual Property</h2>
          <p className="text-neutral-600 mb-4">
            All copyright, trademarks, and intellectual property rights in the website and its
            content are owned by or licensed to Outsourced CTO (PTY) LTD. You may not reproduce,
            distribute, or create derivative works without written permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">7. Disclaimer of Warranties</h2>
          <p className="text-neutral-600 mb-4">
            The website is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of
            any kind. We do not warrant that the website will be uninterrupted, error-free, or
            free of viruses or other harmful components.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">8. Limitation of Liability</h2>
          <p className="text-neutral-600 mb-4">
            To the maximum extent permitted by law, we shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages arising out of or relating
            to your use of the website or products purchased.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">9. Indemnification</h2>
          <p className="text-neutral-600 mb-4">
            You agree to indemnify and hold harmless Outsourced CTO (PTY) LTD from any claims,
            damages, losses, or expenses arising from your violation of these terms or misuse
            of the website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">10. Privacy</h2>
          <p className="text-neutral-600 mb-4">
            Your use of this website is also governed by our Privacy Policy. We collect and
            process personal information in accordance with the Protection of Personal Information
            Act (POPIA).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">11. Governing Law</h2>
          <p className="text-neutral-600 mb-4">
            These Terms and Conditions shall be governed by and construed in accordance with
            the laws of South Africa. Any disputes shall be subject to the exclusive jurisdiction
            of the courts of South Africa.
          </p>
        </section>

        <section className="bg-neutral-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Contact Information</h2>
          <p className="text-neutral-600">Outsourced CTO (PTY) LTD</p>
          <ul className="mt-4 text-neutral-600 space-y-1">
            <li><strong>Address:</strong> 94 Woodlands Circle, Pecanwood, Broederstroom, North West, South Africa</li>
            <li><strong>Email:</strong> connect@outsourcedcto.co.za</li>
            <li><strong>Phone:</strong> +27 79 192 2423</li>
          </ul>
        </section>

        <p className="text-sm text-neutral-500 mt-8">
          Last updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
    </div>
  )
}
