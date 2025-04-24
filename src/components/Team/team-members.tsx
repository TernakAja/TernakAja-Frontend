import { Github, Linkedin, Instagram } from "lucide-react"
import { AnimatedDiv, AnimatedSection, SectionHeading } from "../ui-components"
import { motion } from "framer-motion"

export default function TeamMembers() {
  const team = [
    {
      name: "Stanley Nathanael Wijaya",
      role: "Fullstack Developer",
      bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      image: "./images/Team/stanley.jpg",
      social: {
        instagram: "https://www.instagram.com/snw.77",
        linkedin: "https://www.linkedin.com/in/stanley-nathanael-wijaya",
        github: "https://github.com/StyNW7/",
      },
    },
    {
      name: "Nathaniel Alexander",
      role: "Fullstack Developer",
      bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      image: "./images/Team/stanley.png",
      social: {
        instagram: "https://www.instagram.com/nathaniel.alexander/",
        linkedin: "https://www.linkedin.com/in/nathaniel-alexander-a33530226/",
        github: "https://github.com/nathanielalex/",
      },
    },
    {
      name: "Jason Melvin Hartono",
      role: "IoT Engineer",
      bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      image: "./images/Team/stanley.png",
      social: {
        instagram: "https://www.instagram.com/jason689melvin/",
        linkedin: "https://www.linkedin.com/in/jason-melvin-hartono-07329328b/",
        github: "https://github.com/123jason689/",
      },
    },
    {
      name: "David Christian",
      role: "Backend Developer",
      bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      image: "./images/Team/stanley.png",
      social: {
        instagram: "https://www.instagram.com/davidchristian._/",
        linkedin: "https://www.linkedin.com/in/david-christian-933545293/",
        github: "https://github.com/Myaneeeee",
      },
    },
    {
      name: "Farrel Tobias Saputro",
      role: "AI Developer",
      bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      image: "./images/Team/stanley.png",
      social: {
        instagram: "https://www.instagram.com/farrel2407/",
        linkedin: "https://www.linkedin.com/in/farrel-tobias-saputro-41034b21a/",
        github: "https://github.com/F4E12",
      },
    },
  ]

  return (
    <AnimatedSection className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Leadership Team"
          subtitle="Meet the experts driving innovation in livestock monitoring"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <AnimatedDiv
              key={index}
              className={`bg-white rounded-xl overflow-hidden shadow-md group ${
                index === team.length - 1 && team.length % 2 !== 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
              direction="up"
              delay={index * 0.1}
            >
              <div className="relative overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-80 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#328E6E]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex gap-4">
                    <a
                      target="_blank"
                      href={member.social.instagram}
                      className="text-white hover:text-[#E1EEBC] transition-colors bg-black/20 p-2 rounded-full"
                    >
                      <Instagram size={20} />
                    </a>
                    <a
                      target="_blank"
                      href={member.social.linkedin}
                      className="text-white hover:text-[#E1EEBC] transition-colors bg-black/20 p-2 rounded-full"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      target="_blank"
                      href={member.social.github}
                      className="text-white hover:text-[#E1EEBC] transition-colors bg-black/20 p-2 rounded-full"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <div className="text-[#328E6E] font-medium mb-3">{member.role}</div>
                <p className="text-gray-600">{member.bio}</p>
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
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our team is constantly growing! We're always looking for talented individuals who are passionate about
            sustainable agriculture, technology innovation, and making a positive impact on the world.
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
