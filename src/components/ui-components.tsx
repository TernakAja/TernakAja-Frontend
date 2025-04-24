import type { ReactNode } from "react"
import { motion } from "framer-motion"

// Animation variants
export const fadeIn = (direction: "up" | "down" | "left" | "right" = "up", delay = 0) => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        delay,
      },
    },
  }
}

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Animated components
export const AnimatedSection = ({
  children,
  className,
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) => {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export const AnimatedDiv = ({
  children,
  className,
  direction = "up",
  delay = 0,
}: {
  children: ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
}) => {
  return (
    <motion.div variants={fadeIn(direction, delay)} className={className}>
      {children}
    </motion.div>
  )
}

export const AnimatedHeading = ({
  children,
  className,
  direction = "up",
  delay = 0,
  as = "h2",
}: {
  children: ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}) => {
  const Component = motion[as]
  return (
    <Component variants={fadeIn(direction, delay)} className={className}>
      {children}
    </Component>
  )
}

export const AnimatedImage = ({
  src,
  alt,
  className,
  direction = "up",
  delay = 0,
}: {
  src: string
  alt: string
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
}) => {
  return <motion.img src={src} alt={alt} variants={fadeIn(direction, delay)} className={className} />
}

export const SectionHeading = ({
  title,
  subtitle,
  centered = true,
}: {
  title: string
  subtitle?: string
  centered?: boolean
}) => {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <AnimatedHeading
        className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#328E6E] to-[#90C67C] bg-clip-text text-transparent"
        direction="up"
      >
        {title}
      </AnimatedHeading>
      {subtitle && (
        <AnimatedDiv className="text-gray-600 max-w-2xl mx-auto" direction="up" delay={0.1}>
          {subtitle}
        </AnimatedDiv>
      )}
    </div>
  )
}

export const SectionHeadingWhite = ({
  title,
  subtitle,
  centered = true,
}: {
  title: string
  subtitle?: string
  centered?: boolean
}) => {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <AnimatedHeading
        className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[rgb(181,237,218)] to-[#c5dabd] bg-clip-text text-transparent"
        direction="up"
      >
        {title}
      </AnimatedHeading>
      {subtitle && (
        <AnimatedDiv className="text-white max-w-2xl mx-auto" direction="up" delay={0.1}>
          {subtitle}
        </AnimatedDiv>
      )}
    </div>
  )
}
