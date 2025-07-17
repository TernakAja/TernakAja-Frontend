"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Users,
  Building,
  Globe,
} from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch for partnership discussions",
    contact: "partnerships@ternakaja.com",
    action: "Send Email",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our business development team",
    contact: "+1 (555) 123-4567",
    action: "Call Now",
  },
  {
    icon: Calendar,
    title: "Schedule Meeting",
    description: "Book a consultation call at your convenience",
    contact: "Available Mon-Fri, 9AM-6PM EST",
    action: "Book Meeting",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Meet our team at our headquarters",
    contact: "123 Innovation Drive, Tech Valley, CA 94025",
    action: "Get Directions",
  },
];

const businessTypes = [
  { icon: Building, label: "Technology Partner" },
  { icon: Users, label: "Distribution Partner" },
  { icon: Globe, label: "International Partner" },
  { icon: FileText, label: "Investment Opportunity" },
];

export function BusinessContact() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Let's Build Something Great Together
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to explore partnership opportunities? Get in touch with our
            business development team to discuss how we can create mutual value
            and drive innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Send Us a Message
            </h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <Input placeholder="John" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <Input placeholder="Doe" className="w-full" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  placeholder="john@company.com"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <Input placeholder="Your Company" className="w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partnership Interest
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {businessTypes.map((type, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                      <type.icon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">
                        {type.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <Textarea
                  placeholder="Tell us about your partnership interest and how we can work together..."
                  className="w-full h-32"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#328E6E] hover:bg-[#2a7a5e] text-white"
              >
                Send Message
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h3>
              <p className="text-gray-600 mb-8">
                Choose the best way to reach our business development team.
                We're here to help you explore partnership opportunities and
                answer any questions.
              </p>
            </div>

            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#328E6E]/10 rounded-lg flex items-center justify-center">
                      <method.icon className="w-6 h-6 text-[#328E6E]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {method.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">
                      {method.description}
                    </p>
                    <p className="text-[#328E6E] font-medium text-sm mb-3">
                      {method.contact}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#328E6E] text-[#328E6E] hover:bg-[#328E6E] hover:text-white"
                    >
                      {method.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Resources */}
            <div className="bg-gradient-to-r from-[#328E6E] to-[#67AE6E] rounded-lg p-6 text-white">
              <h4 className="font-semibold mb-3">Partnership Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>• Partnership Guide & Requirements</li>
                <li>• Technical Integration Documentation</li>
                <li>• Market Analysis & Opportunity Assessment</li>
                <li>• Financial Projections & Business Case</li>
              </ul>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 border-white text-white hover:bg-white hover:text-[#328E6E]"
              >
                Download Resources
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
