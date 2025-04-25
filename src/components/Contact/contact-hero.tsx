import {
  AnimatedDiv,
  AnimatedHeading,
  AnimatedSection,
} from "../ui-components";

export default function ContactHero() {
  return (
    <AnimatedSection className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-[#E1EEBC]/30 to-white">
      <div className="container mx-auto px-4 text-center">
        <AnimatedDiv
          className="inline-block px-4 py-2 bg-[#E1EEBC] rounded-full text-[#328E6E] font-medium mb-6"
          direction="down"
        >
          Get In Touch
        </AnimatedDiv>

        <AnimatedHeading
          as="h1"
          className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
          direction="up"
        >
          We'd Love to{" "}
          <span className="bg-gradient-to-r from-[#328E6E] to-[#90C67C] bg-clip-text text-transparent">
            Hear From You
          </span>
        </AnimatedHeading>

        <AnimatedDiv
          className="text-lg text-gray-600 max-w-3xl mx-auto"
          direction="up"
          delay={0.1}
        >
          Have questions about our livestock monitoring solutions? Need
          technical support? Or perhaps you're interested in partnering with us?
          Our team is here to help.
        </AnimatedDiv>
      </div>
    </AnimatedSection>
  );
}
