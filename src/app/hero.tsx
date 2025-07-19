import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] bg-repeat opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            National Conference 
            <span className="block text-blue-600 mt-2">on Next-Gen Technologies in AI Applications</span>
          </h1>

          {/* Conference Details */}
          <div className="text-xl lg:text-2xl text-slate-600 mb-8 space-y-2">
            <div className="font-semibold">September 11–12, 2025</div>
            <div>SNIST Hyderabad, India, and Online</div>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Get Registration Details
          </Button>

          {/* Subtitle */}
          <p className="text-lg text-slate-600 mt-12 font-medium">
            A Global Forum to Advance Academic Research and Innovation
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-200 rounded-full opacity-20"></div>
    </section>
  )
}
