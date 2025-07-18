"use client"
import Link from "next/link";
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"




const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Call for Papers", href: "/callforpapers" },
  { name: "Tracks", href: "/tracks" },
  { name: "Speakers", href: "/speakers" },
  { name: "Dates", href: "/dates" },
  { name: "Committee", href: "/committee" },
  { name: "Brochure", href: "/brochure" },
];


export default function ConferenceHomepage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/IMG/confhome.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/70 to-slate-900/80" />
      </div>







    {/* Combined Top Banner with Logo Strip */}
<div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b">
  {/* Announcement Bar */}
  <div className="bg-slate-900 text-white text-sm text-center py-2 px-4">
    National Conference on Next-Gen Technologies in AI Applications | September 24–25, 2025 | SNIST Hyderabad, India and Online
  </div>

  {/* Logo Strip */}
  <div className="flex justify-center items-center gap-6 py-2 px-4 bg-white">
    <Image
      src="https://sreenidhi.edu.in/wp-content/uploads/2020/09/logo-snist.jpg"
      alt="SNIST"
      width={215}
      height={215}
    />
    <Image
      src="https://sreenidhi.edu.in/wp-content/uploads/2020/09/nirf-logo-1.png"
      alt="NIRF"
      width={55}
      height={50}
    />
    <Image
      src="https://sreenidhi.edu.in/wp-content/uploads/2020/09/logo-strip.jpg"
      alt="Approvals"
      width={290}
      height={80}
    />
  </div>
</div>



      {/* Navigation Header */}
      <nav
        className={`fixed top-21 left-0 right-0 z-40 transform transition-all duration-1000 ${
          isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
        style={{ transitionDelay: "300ms" }}
      >
        <div className="container mx-auto px-4">
          <div className="bg-slate-800/20 backdrop-blur-lg rounded-lg border border-slate-700/30 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4">
              {/* Logo and Title */}
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    <span className="text-blue-400">NCNTAIA</span>25
                  </h1>
                  <p className="text-xs text-slate-300 hidden md:block">
                    National Conference on Next-Gen Technologies in AI Applications
                  </p>
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="hidden lg:flex items-center space-x-6">
                {navLinks.map((link) => (
                    <Link
                         key={link.name}
                         href={link.href}
                         className="text-slate-200 hover:text-blue-400 transition-colors duration-300 text-sm font-medium"
                         >
                        {link.name}
                    </Link>
                    ))}

                
              </div>

              {/* Register Button */}
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
                Register
              </Button>
            </div>
          </div>
        </div>
      </nav>

      
      {/* Hero Section */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight transform transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <span className="drop-shadow-2xl">
              National Conference on{" "}
              <span className="text-blue-400">Next-Gen Technologies</span> in AI Applications
            </span>
          </h1>

          {/* Conference Details */}
          <div
            className={`mb-8 transform transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "700ms" }}
          >
            <p className="text-xl md:text-2xl text-slate-200 mb-3 drop-shadow-lg">September 24–25, 2025</p>
            <p className="text-lg md:text-xl text-slate-300 drop-shadow-lg">
              <strong>SNIST</strong> Hyderabad, India and Online
            </p>
          </div>

          {/* CTA Button */}
          <div
            className={`mb-12 transform transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "900ms" }}
          >
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105 shadow-2xl">
              Get Registration Details
            </Button>
          </div>

          {/* Subtitle */}
          <p
            className={`text-lg md:text-xl text-slate-200 mb-16 drop-shadow-lg transform transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "1100ms" }}
          >
            A Global Forum to Advance Academic Research and Innovation
          </p>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "1500ms" }}
        >
          <div className="flex flex-col items-center text-slate-300">
            <span className="text-sm mb-2">Scroll Down</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </div>
        </div>
      </main>
    </div>
  )
}