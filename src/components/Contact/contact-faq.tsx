import { AnimatedDiv, AnimatedSection, SectionHeading } from "../ui-components";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ContactFaq() {
  const faqs = [
    {
      question: "How quickly can I expect a response to my inquiry?",
      answer:
        "We strive to respond to all inquiries within 24 hours during business days. For urgent technical support issues, we aim to get back to you within 4 hours.",
    },
    {
      question: "Do you offer technical support outside of business hours?",
      answer:
        "Yes, we offer 24/7 emergency technical support for critical issues through our premium support plan. Standard support is available during regular business hours.",
    },
    {
      question: "Can I schedule a demo of your livestock monitoring system?",
      answer:
        "You can request a demo through our contact form or by emailing sales@moorgan.com. We'll arrange a personalized demonstration of our platform tailored to your specific needs.",
    },
    {
      question: "How do I report a bug or technical issue?",
      answer:
        "Technical issues can be reported through our support portal, by emailing support@moorgan.com, or by calling our technical support line. Please include as much detail as possible about the issue you're experiencing.",
    },
    {
      question: "Do you offer on-site installation and training?",
      answer:
        "Yes, we provide on-site installation and comprehensive training services for our enterprise clients. Our team will ensure your system is properly set up and your staff is fully trained on how to use it effectively.",
    },
  ];

  return (
    <AnimatedSection className="py-20 bg-[#E1EEBC]/20">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Quick answers to common inquiries"
        />

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
                    <span className="text-left font-medium text-gray-800">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </AnimatedDiv>
            ))}
          </Accordion>
        </div>

        <AnimatedDiv className="mt-12 text-center" direction="up" delay={0.5}>
          <p className="text-gray-700">
            Still have questions? Contact our support team directly at{" "}
            <a
              href="mailto:support@moorgan.com"
              className="text-[#328E6E] font-medium"
            >
              support@moorgan.com
            </a>
          </p>
        </AnimatedDiv>
      </div>
    </AnimatedSection>
  );
}
