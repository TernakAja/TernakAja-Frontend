import { useTranslation } from "react-i18next";
import { AnimatedDiv, AnimatedSection, SectionHeading } from "../ui-components";
import { motion } from "framer-motion";

const Vision = () => {
  const { t } = useTranslation();
  const sdgGoals = [
    {
      number: 2,
      title: t("landing.vision.sdg.2.title"),
      description: t("landing.vision.sdg.2.description"),
      color: "#DDA63A",
    },
    {
      number: 3,
      title: t("landing.vision.sdg.3.title"),
      description: t("landing.vision.sdg.3.description"),
      color: "#4CA146",
    },
    {
      number: 9,
      title: t("landing.vision.sdg.9.title"),
      description: t("landing.vision.sdg.9.description"),
      color: "#F26A2D",
    },
  ];
  return (
    <AnimatedSection id="vision" className="py-20 bg-[#E1EEBC]/30">
      <div className="container mx-auto px-4">
        <SectionHeading
          title={t("landing.vision.heading")}
          subtitle={t("landing.vision.subheading")}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <AnimatedDiv direction="right">
            <h3 className="text-2xl font-bold mb-4 text-[#328E6E]">
              {t("landing.vision.visionTitle")}
            </h3>
            <p className="text-gray-700 mb-8">
              {t("landing.vision.visionText")}
            </p>
            <h3 className="text-2xl font-bold mb-4 text-[#328E6E]">
              {t("landing.vision.missionTitle")}
            </h3>
            <p className="text-gray-700">{t("landing.vision.missionText")}</p>
          </AnimatedDiv>
          <AnimatedDiv
            direction="left"
            className="relative flex justify-center items-center"
          >
            {" "}
            {/* Added flex and justify-center for better centering */}
            <img
              src="https://res.cloudinary.com/dqvlnzw9f/image/upload/v1754203859/happy_bro_owuztj.png"
              alt="Sustainable Farming"
              className="w-full max-w-lg object-cover rounded-2xl shadow-lg aspect-video" // Changed to aspect-video (16:9)
            />
            <motion.div
              className="absolute -z-10 w-full h-full border-4 border-[#90C67C] rounded-2xl -left-6 -bottom-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            />
          </AnimatedDiv>
        </div>
        <h3 className="text-2xl font-bold mb-8 text-center text-[#328E6E]">
          {t("landing.vision.sdgHeading")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sdgGoals.map((goal, index) => (
            <AnimatedDiv
              key={index}
              className="bg-white rounded-xl p-6 shadow-md border-t-4"
              direction="up"
              delay={index * 0.1}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: goal.color }}
                >
                  {goal.number}
                </div>
                <h4 className="font-bold text-gray-800">{goal.title}</h4>
              </div>
              <p className="text-gray-600">{goal.description}</p>
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Vision;
