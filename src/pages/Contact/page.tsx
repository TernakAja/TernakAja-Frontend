import ContactHero from "@/components/Contact/contact-hero"
import ContactForm from "@/components/Contact/contact-form"
import ContactInfo from "@/components/Contact/contact-info"
import ContactFaq from "@/components/Contact/contact-faq"

export default function ContactPage() {
  return (
    <main className="overflow-hidden">
      <ContactHero />
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
      <ContactFaq />
    </main>
  )
}
