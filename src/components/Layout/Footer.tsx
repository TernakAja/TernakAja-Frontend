import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslation } from "react-i18next";

export default function Footer() {

  const { t } = useTranslation();

  return (
    <footer className="bg-[#328E6E] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Moorgan</h3>
            <p className="mb-4 text-[#E1EEBC]">
              {t(
                "footer.title"
              )}
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
            <h4 className="text-lg font-semibold mb-4">{t(
                "footer.quick.title"
              )}</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-[#E1EEBC] hover:text-white transition-colors">
                  {t(
                "footer.quick.home"
              )}
                </a>
              </li>
              <li>
                <a href="/about" className="text-[#E1EEBC] hover:text-white transition-colors">
                  {t(
                "footer.quick.about"
              )}
                </a>
              </li>
              <li>
                <a href="/article" className="text-[#E1EEBC] hover:text-white transition-colors">
                  {t(
                "footer.quick.article"
              )}
                </a>
              </li>
              <li>
                <a href="/forum" className="text-[#E1EEBC] hover:text-white transition-colors">
                  {t(
                "footer.quick.forum"
              )}
                </a>
              </li>
              <li>
                <a href="/marketplace" className="text-[#E1EEBC] hover:text-white transition-colors">
                  {t(
                "footer.quick.marketplace"
              )}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t(
                "footer.contact"
              )}</h4>
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
            <h4 className="text-lg font-semibold mb-4">{t(
                "footer.subscribe.title"
              )}</h4>
            <p className="mb-4 text-[#E1EEBC]">{t(
                "footer.subscribe.description"
              )}</p>
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
