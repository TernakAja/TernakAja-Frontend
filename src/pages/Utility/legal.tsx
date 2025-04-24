import LegalHero from "@/components/Legal/legal-hero"
import TermsOfService from "@/components/Legal/terms-of-service"
import PrivacyPolicy from "@/components/Legal/privacy-policy"

export default function LegalPage() {
  return (
    <main className="overflow-hidden">
      <LegalHero />
      <TermsOfService />
      <PrivacyPolicy />
    </main>
  )
}
