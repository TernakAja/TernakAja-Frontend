"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Can I switch between plans at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle, and we'll prorate any differences.",
  },
  {
    question: "Is there a free trial for the Premium plan?",
    answer:
      "Yes! We offer a 30-day free trial for the Premium plan. No credit card required to start, and you can cancel anytime during the trial period.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "Your data remains accessible for 90 days after cancellation. You can export all your data during this period. After 90 days, data is permanently deleted for security reasons.",
  },
  {
    question: "Do you offer discounts for annual payments?",
    answer:
      "Yes! Pay annually and save 20% on your Premium subscription. That's just $278.40 per year instead of $348 when paid monthly.",
  },
  {
    question: "Is there a limit to the number of users on Premium?",
    answer:
      "The Premium plan includes up to 5 user accounts. Additional users can be added for $5 per user per month.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "Free plan users get community support through our forums. Premium users get priority email support with 24-hour response time and phone support during business hours.",
  },
  {
    question: "Can I use my own IoT devices?",
    answer:
      "Our system is designed to work with TernakAja collars for optimal performance. However, we do offer API access for Premium users to integrate compatible third-party devices.",
  },
  {
    question: "Is my livestock data secure?",
    answer:
      "Absolutely. We use enterprise-grade encryption, secure cloud storage, and comply with industry security standards. Your data is never shared with third parties without your explicit consent.",
  },
];

export function PricingFAQ() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Got questions? We've got answers. If you can't find what you're
            looking for, feel free to contact our support team.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-lg border border-gray-200 px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#328E6E] transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
