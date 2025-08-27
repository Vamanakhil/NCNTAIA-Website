"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Call for Papers", href: "/callforpapers" },
  { name: "Tracks", href: "/tracks" },
  { name: "Speakers", href: "/speakers" },
  { name: "Dates", href: "/dates" },
  { name: "Committee", href: "/committee" },
  { name: "Brochure", href: "/brochure" },
  { name: "Sponsors", href: "/sponsorship" },
]

export default function ConferenceHomepage() {
  const [showSplash, setShowSplash] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)

    const loadTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 3200)

    return () => {
      clearTimeout(splashTimer)
      clearTimeout(loadTimer)
    }
  }, [])

  if (showSplash) {
    return <SplashScreen />
  }

  const sponsors = [
    {
      name: "Smart Interviews",
      logo: "/IMG/imgs/smart interviews.jpeg",
      alt: "Smart Interview Logo",
    },
    {
      name: "Being Zero",
      logo: "/IMG/imgs/being0.jpeg",
      alt: "Being Zero Logo",
    },
    {
      name: "Sripadha Group",
      logo: "/IMG/imgs/1744450777215.jpeg",
      alt: "Sripadha Group Logo",
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-50">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/IMG/confhome.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/70 to-slate-900/80" />
      </div>

      <RenderBanner />
      <RenderNav isLoaded={isLoaded} />

      {/* Hero Section */}
      <main className="relative h-fit flex flex-col justify-center items-center px-4 mt-10">
        <div className="text-center mx-auto">
          <div
            className={`flex flex-col items-center justify-center gap-4 transform transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {/* Scrolling Text */}
            <div className="overflow-hidden whitespace-nowrap text-white py-2 rounded-md mb-4 w-full">
              <div className="animate-marquee inline-block">
                <span className="mx-4 font-semibold">📢 August 30 is the last date to submit Final Paper!</span>
                <span className="mx-4 font-semibold">📢 August 30 is the last date to submit Final Paper!</span>
                <span className="mx-4 font-semibold">📢 August 30 is the last date to submit Final Paper!</span>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/30 mb-4">
              <Image
                src="/IMG/anrf-logo.png"
                alt="ANRF - Anusandhan National Research Foundation"
                width={320}
                height={240}
                className="object-contain"
                priority
              />
            </div>
            <div className="text-white text-xl font-bold mb-2 drop-shadow-lg">
              <span className="text-blue-400">ANeRF</span> Sponsored Conference
            </div>
          </div>

          <h1
            className={`text-4xl md:text-xl lg:text-5xl font-bold text-white mb-6 leading-tight transform transition-all duration-1000  ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <span className="drop-shadow-2xl">
              National Conference on <br />
              <span className="text-blue-400">Next-Gen Technologies</span> in AI Applications
            </span>
          </h1>

          <div
            className={`mb-8 transform transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "700ms" }}
          >
            <p className="text-xl md:text-2xl text-slate-200 mb-3 drop-shadow-lg">September 11–12, 2025</p>
            <p className="text-lg md:text-xl text-slate-300 drop-shadow-lg">
              <strong>SNIST</strong> Hyderabad, India and Online
            </p>
          </div>

          <div
            className={`mb-12 transform transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "900ms" }}
          >
            <Link href="/callforpapers">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105 shadow-2xl">
                Get Registration Details
              </Button>
            </Link>
          </div>

          <p
            className={`text-lg md:text-xl text-slate-200 mb-5 drop-shadow-lg transform transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "1100ms" }}
          >
            A Global Forum to Advance Academic Research and Innovation
          </p>
        </div>

        {/* Sponsors */}
        <div className="mt-6 py-12 w-full max-w-4xl">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-white mb-6">Our Collaborative Sponsors</h3>
            <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-orange-500 mx-auto rounded-full"></div>
          </div>
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-10 shadow-xl border border-white/30">
            <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
              {sponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-center p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105 border border-gray-200"
                >
                  <Image
                    src={sponsor.logo || "/placeholder.svg"}
                    alt={sponsor.alt}
                    width={sponsor.name === "Smart Interviews" ? 120 : sponsor.name === "Being Zero" ? 150 : 190}
                    height={120}
                    className="h-20 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out opacity-80 group-hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function SplashScreen() {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`fixed inset-0 z-50 bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center animate-pulse">
        <div className="mb-8">
          <Image
            src="/IMG/anrf-logo.png"
            alt="ANRF - Anusandhan National Research Foundation"
            width={500}
            height={375}
            className="object-contain mx-auto drop-shadow-2xl"
            priority
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Proudly Sponsored by <span className="text-blue-600">ANRF</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto px-4">Anusandhan National Research Foundation</p>
          <div className="flex items-center justify-center mt-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-slate-500">Loading Conference...</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function RenderNav({ isLoaded }: { isLoaded: boolean }) {
  return (
    <nav
      className={`mt-20 transition-all duration-1000 ${
        isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      style={{ transitionDelay: "300ms" }}
    >
      <div className="container mx-auto px-4">
        <div className="bg-slate-800/20 backdrop-blur-lg rounded-lg border border-slate-700/30 shadow-2xl">
          <div className="flex items-center justify-between px-6 py-4">
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
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
              Register
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

function RenderBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b">
      <div className="bg-slate-900 text-white text-sm text-center py-2 px-4">
        National Conference on Next-Gen Technologies in AI Applications | September 11–12, 2025 | SNIST Hyderabad, India
        and Online
      </div>
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
  )
}
