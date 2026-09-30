import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, MapPin, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs, Button } from '../components/ui/Primitives';
import { submitContactInquiry } from '../services/backendService';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'Product Inquiry',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitContactInquiry({
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: form.topic,
      message: form.message
    });
    setSubmitted(true);
  };

  return (
    <>
      <SEOHead
        title="Contact Us — AARANYA SPICES"
        description="Have a question about our spices? We'd love to hear from you. Reach out to Aaranya Spices via email, phone, WhatsApp, or our contact form."
        canonicalPath="/contact"
      />

      <section className="bg-[#EFECE3] border-b border-[#E2DDD2] py-14 md:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
          <div className="max-w-2xl mt-4 space-y-3">
            <p className="text-xs uppercase tracking-[0.22em] text-[#6D4C38] font-medium">
              Correspondence
            </p>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl text-[#1C1B18]">
              Have a question about our spices? We&apos;d love to hear from you.
            </h1>
            <p className="text-sm md:text-base text-[#5A564E] leading-relaxed">
              Whether you are looking for culinary guidance, order assistance, or hospitality partnerships, our team responds within one business day.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Direct Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-[#EFECE3] border border-[#E2DDD2] space-y-5">
              <div className="flex items-start gap-4">
                <Mail size={18} className="text-[#182B21] mt-1 shrink-0" />
                <div>
                  <h2 className="text-xs uppercase tracking-[0.18em] text-[#6D4C38] font-semibold">
                    Email
                  </h2>
                  <p className="font-mono-spec text-sm text-[#1C1B18] mt-1">
                    [CONTACT EMAIL]
                  </p>
                  <p className="text-xs text-[#5A564E] mt-0.5">
                    For customer care, press & trade enquiries
                  </p>
                </div>
              </div>

              <div className="pt-5 border-t border-[#D5CFC2] flex items-start gap-4">
                <Phone size={18} className="text-[#182B21] mt-1 shrink-0" />
                <div>
                  <h2 className="text-xs uppercase tracking-[0.18em] text-[#6D4C38] font-semibold">
                    Phone
                  </h2>
                  <p className="font-mono-spec text-sm text-[#1C1B18] mt-1">
                    [PHONE]
                  </p>
                  <p className="text-xs text-[#5A564E] mt-0.5">
                    Monday to Saturday · 10:00 AM – 6:30 PM IST
                  </p>
                </div>
              </div>

              <div className="pt-5 border-t border-[#D5CFC2] flex items-start gap-4">
                <MessageCircle size={18} className="text-[#182B21] mt-1 shrink-0" />
                <div>
                  <h2 className="text-xs uppercase tracking-[0.18em] text-[#6D4C38] font-semibold">
                    WhatsApp Concierge
                  </h2>
                  <p className="font-mono-spec text-sm text-[#1C1B18] mt-1">
                    [PHONE]
                  </p>
                  <p className="text-xs text-[#5A564E] mt-0.5">
                    Quick assistance with orders & spice recommendations
                  </p>
                </div>
              </div>

              <div className="pt-5 border-t border-[#D5CFC2] flex items-start gap-4">
                <MapPin size={18} className="text-[#182B21] mt-1 shrink-0" />
                <div>
                  <h2 className="text-xs uppercase tracking-[0.18em] text-[#6D4C38] font-semibold">
                    Business Address
                  </h2>
                  <p className="font-mono-spec text-sm text-[#1C1B18] mt-1">
                    AARANYA SPICES — [BUSINESS ADDRESS]
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#F7F4ED] border border-[#E2DDD2]">
              <h3 className="text-xs uppercase tracking-[0.18em] text-[#6D4C38] font-semibold mb-3">
                Social Channels
              </h3>
              <div className="flex items-center gap-6 text-xs uppercase tracking-[0.16em] text-[#182B21] font-medium">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:underline">
                  Instagram
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:underline">
                  Pinterest
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:underline">
                  YouTube
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-[#EFECE3] border border-[#E2DDD2] p-8 sm:p-10">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 size={36} className="mx-auto text-[#182B21]" />
                <h2 className="font-serif-editorial text-3xl text-[#1C1B18]">
                  Thank you for writing to Aaranya
                </h2>
                <p className="text-sm text-[#5A564E] max-w-md mx-auto">
                  We have received your message and will respond to{' '}
                  <strong>{form.email}</strong> shortly.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="font-serif-editorial text-3xl text-[#1C1B18] pb-3 border-b border-[#D5CFC2]">
                  Send Us a Note
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#F7F4ED] border border-[#D5CFC2] px-4 py-3 text-sm focus:outline-none focus:border-[#182B21]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#F7F4ED] border border-[#D5CFC2] px-4 py-3 text-sm focus:outline-none focus:border-[#182B21]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-2"
                    >
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#F7F4ED] border border-[#D5CFC2] px-4 py-3 text-sm focus:outline-none focus:border-[#182B21]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-topic"
                      className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-2"
                    >
                      Subject
                    </label>
                    <select
                      id="contact-topic"
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      className="w-full bg-[#F7F4ED] border border-[#D5CFC2] px-4 py-3 text-sm focus:outline-none focus:border-[#182B21]"
                    >
                      <option value="Product Inquiry">Product & Spice Inquiry</option>
                      <option value="Order Status">Order & Delivery Support</option>
                      <option value="Bulk / Gifting">Festive Gifting & Bulk Orders</option>
                      <option value="Sourcing">Sourcing & Partnerships</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help you today?"
                    className="w-full bg-[#F7F4ED] border border-[#D5CFC2] p-4 text-sm focus:outline-none focus:border-[#182B21]"
                  />
                </div>

                <Button type="submit" variant="primary" size="lg">
                  SEND MESSAGE
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
