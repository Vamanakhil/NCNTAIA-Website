"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

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
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 -z-50">
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/IMG/confhome.jpg')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/70 to-slate-900/80" />
            </div>

            <RenderBanner />
            <RenderNav isLoaded={isLoaded} />

            {/* Hero Section */}
            <main className="relative h-fit flex flex-col justify-center items-center px-4 mt-10">
                <div className="text-center  mx-auto ">
                    {/* //TODO: nserb and dart science logos */}
                    <div
                        className={`flex flex-row items-center justify-center   bg yellow-500  gap-4 transform transition-all duration-1000 ${
                            isLoaded
                                ? "translate-y-0 opacity-100"
                                : "translate-y-8 opacity-0"
                        }`}
                    >
                        <Image
                            src="/IMG/nserb.jpg"
                            alt="NCNTAIA"
                            width={125}
                            height={125}
                        />
                        <Image
                            src="/IMG/dart-science.jpg"
                            alt="NCNTAIA"
                            width={125}
                            height={125}
                        />
                    </div>
                    <div className="text-white mt-5 text-lg font-semibold">ANRF Sponsered</div>
                    <h1
                        className={`text-4xl md:text-xl lg:text-5xl font-bold text-white mb-6 leading-tight transform transition-all duration-1000  ${
                            isLoaded
                                ? "translate-y-0 opacity-100"
                                : "translate-y-8 opacity-0"
                        }`}
                        style={{ transitionDelay: "500ms" }}
                    >
                        <span className="drop-shadow-2xl">
                            National Conference on{" "}
                            <br />
                            <span className="text-blue-400">
                                Next-Gen Technologies
                            </span>{" "}
                            in AI Applications
                        </span>
                    </h1>

                    {/* Conference Details */}
                    <div
                        className={`mb-8 transform transition-all duration-1000 ${
                            isLoaded
                                ? "translate-y-0 opacity-100"
                                : "translate-y-8 opacity-0"
                        }`}
                        style={{ transitionDelay: "700ms" }}
                    >
                        <p className="text-xl md:text-2xl text-slate-200 mb-3 drop-shadow-lg">
                            September 24–25, 2025
                        </p>
                        <p className="text-lg md:text-xl text-slate-300 drop-shadow-lg">
                            <strong>SNIST</strong> Hyderabad, India and Online
                        </p>
                    </div>

                    {/* CTA Button */}
                    <div
                        className={`mb-12 transform transition-all duration-1000 ${
                            isLoaded
                                ? "translate-y-0 opacity-100"
                                : "translate-y-8 opacity-0"
                        }`}
                        style={{ transitionDelay: "900ms" }}
                    >
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105 shadow-2xl">
                            Get Registration Details
                        </Button>
                    </div>

                    {/* Subtitle */}
                    <p
                        className={`text-lg md:text-xl text-slate-200 mb-5 drop-shadow-lg transform transition-all duration-1000 ${
                            isLoaded
                                ? "translate-y-0 opacity-100"
                                : "translate-y-8 opacity-0"
                        }`}
                        style={{ transitionDelay: "1100ms" }}
                    >
                        A Global Forum to Advance Academic Research and
                        Innovation
                    </p>
                </div>
                {/* <ScrollDownIndicator isLoaded={isLoaded} /> */}
            </main>
        </div>
    );
}

function RenderNav({ isLoaded }: { isLoaded: boolean }) {
    return (
        <nav
            className={`mt-20 transition-all duration-1000 ${
                isLoaded
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-full opacity-0"
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
                                    <span className="text-blue-400">
                                        NCNTAIA
                                    </span>
                                    25
                                </h1>
                                <p className="text-xs text-slate-300 hidden md:block">
                                    National Conference on Next-Gen Technologies
                                    in AI Applications
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
    );
}

function RenderBanner() {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b">
            {/* Announcement Bar */}
            <div className="bg-slate-900 text-white text-sm text-center py-2 px-4">
                National Conference on Next-Gen Technologies in AI Applications
                | September 24–25, 2025 | SNIST Hyderabad, India and Online
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
    );
}

