"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2500); // Start fading out 500ms before the 3s mark
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center">
        <Image
          src="/IMG/anrf_logo.png"
          alt="ANRF Logo"
          width={320}
          height={240}
          className="object-contain mx-auto"
          priority
        />
        <p className="mt-4 text-xl font-semibold text-gray-700">
          Proudly Sponsored by ANRF
        </p>
        <div className="mt-8 h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
      </div>
    </div>
  );
}
