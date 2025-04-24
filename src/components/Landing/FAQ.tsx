import { AnimatedDiv, AnimatedSection, SectionHeading } from "../ui-components"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Faq() {
  const faqs = [
    {
      question: "How does Moorgan's livestock monitoring system work?",
      answer:
        "Moorgan uses a combination of IoT sensors, wearable devices, and environmental monitors to collect real-time data about your livestock. This data is processed through our AI algorithms on Microsoft Azure to provide insights about health, behavior, and productivity.",
    },
    {
      question: "What kind of hardware is required for implementation?",
      answer:
        "Our system includes wearable sensors for animals, environmental monitoring stations, and a central hub that connects to the cloud. Our team handles the installation and setup process to ensure everything works seamlessly with your existing farm infrastructure.",
    },
    {
      question: "How long does it take to implement Moorgan on my farm?",
      answer:
        "Implementation time varies based on farm size and complexity, but typically takes 2-4 weeks from initial assessment to full deployment. Our team works closely with you throughout the process to minimize disruption to your operations.",
    },
    {
      question: "Can Moorgan integrate with my existing farm management software?",
      answer:
        "Yes, Moorgan is designed with open APIs that allow integration with most popular farm management systems. We also offer custom integration services for proprietary or legacy systems.",
    },
    {
      question: "What kind of ROI can I expect from implementing Moorgan?",
      answer:
        "Most farms see ROI within 6-12 months through reduced disease outbreaks, optimized feeding, improved productivity, and reduced labor costs. Our team can provide a customized ROI analysis based on your specific operation.",
    },
    {
      question: "Is my data secure and private?",
      answer:
        "Absolutely. Moorgan is built on Microsoft Azure's secure cloud infrastructure with enterprise-grade encryption and privacy controls. You maintain ownership of your data, and we adhere to strict data protection regulations.",
    },
  ]

  return (
    <AnimatedSection id="faq" className="py-20 bg-[#E1EEBC]/30">
      <div className="container mx-auto px-4">
        <SectionHeading title="Frequently Asked Questions" subtitle="Find answers to common questions about Moorgan" />

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedDiv
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
                direction="up"
                delay={index * 0.1}
              >
                <AccordionItem value={`item-${index}`} className="border-none">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                    <span className="text-left font-medium text-gray-800">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              </AnimatedDiv>
            ))}
          </Accordion>
        </div>

        <AnimatedDiv className="mt-12 text-center" direction="up" delay={0.3}>
          <p className="text-gray-700">
            Still have questions? Contact our support team at{" "}
            <a href="mailto:support@moorgan.com" className="text-[#328E6E] font-medium">
              support@moorgan.com
            </a>
          </p>
        </AnimatedDiv>
      </div>
    </AnimatedSection>
  )
}
