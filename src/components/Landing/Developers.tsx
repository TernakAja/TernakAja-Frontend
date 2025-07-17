import { Github } from "lucide-react";
import { AnimatedDiv, AnimatedSection, SectionHeading } from "../ui-components";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Developers() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const team = [
    {
      name: "Team: TernakAjaino",
      role: "Application: TernakAja",
      bio: t("landing.developers.team.bio"),
      image: "./images/Landing/team.png",
      social: {
        github: "#",
      },
    },
  ];

  return (
    <AnimatedSection id="developers" className="py-20 bg-[#E1EEBC]/30">
      <div className="container mx-auto px-4">
        <SectionHeading
          title={t("landing.developers.heading")}
          subtitle={t("landing.developers.subheading")}
        />
        <div className="justify-center items-center">
          {team.map((member, index) => (
            <AnimatedDiv
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md group"
              direction="up"
              delay={index * 0.1}
            >
              <div className="relative overflow-hidden">
                <img
                  src={member.image || "./images/Landing/team-png"}
                  alt={member.name}
                  className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#328E6E]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex gap-4">
                    <a
                      href={member.social.github}
                      className="text-white hover:text-[#E1EEBC] transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {member.name}
                </h3>
                <div className="text-[#328E6E] font-medium mb-3">
                  {member.role}
                </div>
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
          <Button
            variant="outline"
            className="border-[#328E6E] text-[#328E6E] hover:bg-[#328E6E] hover:text-white px-6 py-6 rounded-lg text-lg"
            onClick={() => navigate("/team")}
          >
            {t("landing.developers.button.viewDetails")}
          </Button>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
