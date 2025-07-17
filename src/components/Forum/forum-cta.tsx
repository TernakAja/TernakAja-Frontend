import { Button } from "@/components/ui/button";
import { AnimatedDiv, AnimatedSection } from "../ui-components";
import { motion } from "framer-motion";
import { MessageSquarePlus, Users } from "lucide-react";

export default function ForumCta() {
  return (
    <AnimatedSection className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-[#328E6E] to-[#67AE6E] rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatedDiv className="p-8 md:p-12 text-white" direction="right">
              <h2 className="text-3xl font-bold mb-6">
                Join Our Growing Community
              </h2>
              <p className="text-lg mb-8 text-white/90">
                Connect with thousands of livestock farmers and experts from
                around the world. Share knowledge, ask questions, and grow
                together.
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Button className="bg-white text-[#328E6E] hover:bg-[#E1EEBC] hover:text-[#328E6E]">
                  <MessageSquarePlus className="mr-2 h-5 w-5" />
                  Start a Discussion
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-black hover:bg-white/20"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Browse Community
                </Button>
              </motion.div>

              <motion.div
                className="mt-12 grid grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-white/80">Community Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">5K+</div>
                  <div className="text-white/80">Monthly Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-white/80">Active Discussions</div>
                </div>
              </motion.div>
            </AnimatedDiv>

            <AnimatedDiv className="relative hidden lg:block" direction="left">
              <img
                src="/images/Livestocks/dairy-cow-1.png"
                alt="TernakAja Community"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#328E6E]/80"></div>
            </AnimatedDiv>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
