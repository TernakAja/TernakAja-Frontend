import { AnimatedDiv, AnimatedSection, SectionHeading } from "../ui-components";

export default function TermsOfService() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing or using TernakAja's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
    },
    {
      title: "2. Description of Service",
      content:
        "TernakAja provides a livestock monitoring platform that uses AI and IoT technology to help farmers monitor and manage their livestock. Our services include hardware devices, software applications, and data analytics tools.",
    },
    {
      title: "3. User Accounts",
      content:
        "To use certain features of our services, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.",
    },
    {
      title: "4. User Responsibilities",
      content:
        "You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for ensuring that your use of our services complies with all applicable laws and regulations.",
    },
    {
      title: "5. Intellectual Property",
      content:
        "All content, features, and functionality of our services, including but not limited to text, graphics, logos, and software, are owned by TernakAja and are protected by intellectual property laws.",
    },
    {
      title: "6. Data Usage",
      content:
        "We collect and process data in accordance with our Privacy Policy. By using our services, you consent to our collection and use of data as described in our Privacy Policy.",
    },
    {
      title: "7. Limitation of Liability",
      content:
        "TernakAja shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.",
    },
    {
      title: "8. Termination",
      content:
        "We may terminate or suspend your access to our services at any time, without prior notice or liability, for any reason, including without limitation if you breach these Terms.",
    },
    {
      title: "9. Changes to Terms",
      content:
        "We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the new Terms on our website or through other communication channels.",
    },
    {
      title: "10. Governing Law",
      content:
        "These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which TernakAja is established, without regard to its conflict of law provisions.",
    },
  ];

  return (
    <AnimatedSection className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Terms of Service"
          subtitle="Last updated: April 24, 2023"
        />

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
            <p className="text-gray-600 mb-8">
              These Terms of Service ("Terms") govern your access to and use of
              TernakAja's website, products, and services. Please read these
              Terms carefully before using our services.
            </p>

            <div className="space-y-6">
              {sections.map((section, index) => (
                <AnimatedDiv
                  key={index}
                  className="border-b border-gray-100 pb-6"
                  direction="up"
                  delay={index * 0.05}
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {section.title}
                  </h3>
                  <p className="text-gray-600">{section.content}</p>
                </AnimatedDiv>
              ))}
            </div>

            <AnimatedDiv
              className="mt-8 text-gray-600"
              direction="up"
              delay={0.5}
            >
              <p>
                If you have any questions about these Terms, please contact us
                at{" "}
                <a
                  href="mailto:legal@ternakaja.com"
                  className="text-[#328E6E] hover:underline"
                >
                  legal@ternakaja.com
                </a>
                .
              </p>
            </AnimatedDiv>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
