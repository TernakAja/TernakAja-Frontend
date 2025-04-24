import { AnimatedDiv, AnimatedSection, SectionHeading } from "../ui-components"

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Information We Collect",
      content:
        "We collect information that you provide directly to us, information we collect automatically when you use our services, and information from third-party sources. This may include personal information, usage data, and device information.",
    },
    {
      title: "2. How We Use Your Information",
      content:
        "We use the information we collect to provide, maintain, and improve our services, to communicate with you, to comply with legal obligations, and for other purposes with your consent.",
    },
    {
      title: "3. Information Sharing",
      content:
        "We may share your information with service providers, business partners, and other third parties as necessary to provide our services. We may also share information when required by law or to protect our rights.",
    },
    {
      title: "4. Data Security",
      content:
        "We implement appropriate technical and organizational measures to protect the security of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.",
    },
    {
      title: "5. Your Rights and Choices",
      content:
        "Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. You can also opt out of certain data collection and use.",
    },
    {
      title: "6. International Data Transfers",
      content:
        "Your information may be transferred to, and processed in, countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country.",
    },
    {
      title: "7. Children's Privacy",
      content:
        "Our services are not directed to children under the age of 16. We do not knowingly collect personal information from children under 16. If we learn that we have collected personal information from a child under 16, we will take steps to delete such information.",
    },
    {
      title: "8. Changes to Privacy Policy",
      content:
        "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website and updating the 'Last Updated' date.",
    },
    {
      title: "9. Contact Us",
      content:
        "If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@moorgan.com.",
    },
  ]

  return (
    <AnimatedSection className="py-20 bg-[#E1EEBC]/20">
      <div className="container mx-auto px-4">
        <SectionHeading title="Privacy Policy" subtitle="Last updated: April 24, 2023" />

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
            <p className="text-gray-600 mb-8">
              This Privacy Policy describes how Moorgan ("we", "us", or "our") collects, uses, and shares information
              about you when you use our website, products, and services. We respect your privacy and are committed to
              protecting your personal information.
            </p>

            <div className="space-y-6">
              {sections.map((section, index) => (
                <AnimatedDiv key={index} className="border-b border-gray-100 pb-6" direction="up" delay={index * 0.05}>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{section.title}</h3>
                  <p className="text-gray-600">{section.content}</p>
                </AnimatedDiv>
              ))}
            </div>

            <AnimatedDiv className="mt-8 text-gray-600" direction="up" delay={0.5}>
              <p>
                By using our services, you consent to the collection, use, and sharing of your information as described
                in this Privacy Policy. If you do not agree with our policies and practices, do not use our services.
              </p>
            </AnimatedDiv>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
