import {
  AnimatedDiv,
  AnimatedHeading,
  AnimatedSection,
} from "../ui-components";

export default function LegalHero() {
  return (
    <AnimatedSection className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-[#E1EEBC]/30 to-white">
      <div className="container mx-auto px-4 text-center">
        <AnimatedDiv
          className="inline-block px-4 py-2 bg-[#E1EEBC] rounded-full text-[#328E6E] font-medium mb-6"
          direction="down"
        >
          Legal Information
        </AnimatedDiv>

        <AnimatedHeading
          as="h1"
          className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
          direction="up"
        >
          Terms of Service &{" "}
          <span className="bg-gradient-to-r from-[#328E6E] to-[#90C67C] bg-clip-text text-transparent">
            Privacy Policy
          </span>
        </AnimatedHeading>

        <AnimatedDiv
          className="text-lg text-gray-600 max-w-3xl mx-auto"
          direction="up"
          delay={0.1}
        >
          This page contains important information about your rights and
          responsibilities when using TernakAja's services. Please read these
          documents carefully.
        </AnimatedDiv>
      </div>
    </AnimatedSection>
  );
}
