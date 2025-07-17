import { useTranslation } from "react-i18next";
import { AnimatedDiv, AnimatedSection, SectionHeading } from "../ui-components";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("landing.faq.q1.question"),
      answer: t("landing.faq.q1.answer"),
    },
    {
      question: t("landing.faq.q2.question"),
      answer: t("landing.faq.q2.answer"),
    },
    {
      question: t("landing.faq.q3.question"),
      answer: t("landing.faq.q3.answer"),
    },
    {
      question: t("landing.faq.q4.question"),
      answer: t("landing.faq.q4.answer"),
    },
    {
      question: t("landing.faq.q5.question"),
      answer: t("landing.faq.q5.answer"),
    },
    {
      question: t("landing.faq.q6.question"),
      answer: t("landing.faq.q6.answer"),
    },
  ];

  return (
    <AnimatedSection id="faq" className="py-20 bg-[#E1EEBC]/30">
      <div className="container mx-auto px-4">
        <SectionHeading
          title={t("landing.faq.heading")}
          subtitle={t("landing.faq.subheading")}
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

        <AnimatedDiv className="mt-12 text-center" direction="up" delay={0.3}>
          <p className="text-gray-700">
            {t("landing.faq.footer.text")}&nbsp;
            <a
              href="mailto:support@ternakaja.com"
              className="text-[#328E6E] font-medium"
            >
              support@ternakaja.com
            </a>
          </p>
        </AnimatedDiv>
      </div>
    </AnimatedSection>
  );
}
