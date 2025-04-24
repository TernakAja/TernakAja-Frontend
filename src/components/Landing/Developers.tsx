"use client"

import { Github, Linkedin, Twitter } from "lucide-react"
import { AnimatedDiv, AnimatedSection, SectionHeading } from "../ui-components"
import { motion } from "framer-motion"

export default function Developers() {
  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief AI Scientist",
      bio: "PhD in Machine Learning with 10+ years experience in agricultural AI applications",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Michael Rodriguez",
      role: "IoT Systems Architect",
      bio: "Expert in designing scalable IoT solutions for agricultural applications",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Aisha Patel",
      role: "Lead Software Engineer",
      bio: "Full-stack developer specializing in Azure cloud solutions and data visualization",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Dr. James Wilson",
      role: "Veterinary Consultant",
      bio: "Veterinarian with expertise in livestock health monitoring and preventive care",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
  ]

  return (
    <AnimatedSection id="developers" className="py-20 bg-[#E1EEBC]/30">
      <div className="container mx-auto px-4">
        <SectionHeading title="Meet Our Team" subtitle="The experts behind Moorgan's innovative technology" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <AnimatedDiv
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md group"
              direction="up"
              delay={index * 0.1}
            >
              <div className="relative overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#328E6E]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex gap-4">
                    <a href={member.social.twitter} className="text-white hover:text-[#E1EEBC] transition-colors">
                      <Twitter size={20} />
                    </a>
                    <a href={member.social.linkedin} className="text-white hover:text-[#E1EEBC] transition-colors">
                      <Linkedin size={20} />
                    </a>
                    <a href={member.social.github} className="text-white hover:text-[#E1EEBC] transition-colors">
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <div className="text-[#328E6E] font-medium mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            </AnimatedDiv>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our diverse team combines expertise in artificial intelligence, IoT engineering, veterinary science, and
            software development to create innovative solutions for livestock management challenges.
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
