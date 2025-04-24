import Hero from "@/components/Landing/Hero"
import About from "@/components/Landing/About"
import Statistics from "@/components/Landing/Statistics"
import Vision from "@/components/Landing/Vision"
import Features from "@/components/Landing/Features"
import MarqueeSection from "@/components/Landing/Marquee"
import Products from "@/components/Landing/Products"
import Developers from "@/components/Landing/Developers"
import Testimonials from "@/components/Landing/Testimonials"
import Faq from "@/components/Landing/FAQ"
import Cta from "@/components/Landing/CTA"

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <About />
      <Statistics />
      <Vision />
      <Features />
      <MarqueeSection />
      <Products />
      <Developers />
      <Testimonials />
      <Faq />
      <Cta />
    </main>
  )
}
