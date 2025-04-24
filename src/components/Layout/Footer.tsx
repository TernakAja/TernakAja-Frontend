import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-[#328E6E] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Moorgan</h3>
            <p className="mb-4 text-[#E1EEBC]">
              Revolutionizing livestock monitoring with AI and IoT technology built on Microsoft Azure.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-[#E1EEBC] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#E1EEBC] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#E1EEBC] transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick as</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-[#E1EEBC] hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-[#E1EEBC] hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#features" className="text-[#E1EEBC] hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#products" className="text-[#E1EEBC] hover:text-white transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#faq" className="text-[#E1EEBC] hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span className="text-[#E1EEBC]">123 Innovation Drive, Tech Valley, CA 94043</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="flex-shrink-0" />
                <span className="text-[#E1EEBC]">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="flex-shrink-0" />
                <span className="text-[#E1EEBC]">info@moorgan.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Subscribe</h4>
            <p className="mb-4 text-[#E1EEBC]">Stay updated with our latest news and updates.</p>
            <div className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="bg-[#E1EEBC] text-[#328E6E] hover:bg-white">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-6 text-center text-[#E1EEBC]">
          <p>© {new Date().getFullYear()} Moorgan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
