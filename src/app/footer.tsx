import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Conference Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">NAC 2025</h3>
            <p className="text-slate-300 mb-4">National Academic Conference on Research Excellence</p>
            <p className="text-slate-300">
              March 15-18, 2025
              <br />
              New Delhi, India
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href="#" className="hover:text-white">
                  Registration
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Call for Papers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Program Schedule
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Speakers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-slate-300">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@nac2025.org</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+91 11 1234 5678</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-slate-300 mb-4">Get the latest conference updates</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-slate-700 text-white rounded-l-md border border-slate-600 focus:outline-none focus:border-blue-500"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-l-none">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2025 National Academic Conference. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
