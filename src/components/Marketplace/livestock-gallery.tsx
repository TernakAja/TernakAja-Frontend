import { useState } from "react"
import { AnimatedDiv } from "../ui-components"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"

// export default function LivestockGallery({ id }: { id: string }) {
export default function LivestockGallery() {
  const [activeImage, setActiveImage] = useState(0)

  // Mock data - in a real app, this would come from an API based on the ID
  const images = [
    "/images/Livestocks/dairy-cow-1.png",
    "/images/Livestocks/dairy-cow-2.png",
    "/images/Livestocks/dairy-cow-1.png",
    "/images/Livestocks/dairy-cow-2.png",
  ]

  const nextImage = () => {
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  return (
    <AnimatedDiv direction="right" className="space-y-4">
      <div className="relative rounded-xl overflow-hidden bg-gray-100">
        <img
          src={images[activeImage] || "/images/logo.png"}
          alt={`Livestock image ${activeImage + 1}`}
          className="w-full h-[400px] md:h-[500px] object-cover object-center"
        />

        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
        >
          <ChevronLeft className="h-6 w-6 text-gray-800" />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
        >
          <ChevronRight className="h-6 w-6 text-gray-800" />
        </button>

        <button className="absolute right-4 bottom-4 bg-white/80 hover:bg-white p-2 rounded-full transition-colors">
          <Expand className="h-5 w-5 text-gray-800" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={`rounded-lg overflow-hidden cursor-pointer border-2 ${
              activeImage === index ? "border-[#328E6E]" : "border-transparent"
            }`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveImage(index)}
          >
            <img
              src={image || "/images/logo.png"}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-20 object-cover object-center"
            />
          </motion.div>
        ))}
      </div>
    </AnimatedDiv>
  )
}
