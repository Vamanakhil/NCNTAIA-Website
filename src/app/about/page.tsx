  import ConferenceLayout from "@/components/ui/layout/conf-layout"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Award, Users, Globe, Quote } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const testimonials = [
    {
      quote:
        "Attending NCNTAIA always rekindles my scientific energy and reminds me why I went into AI research. The quality of presentations and networking opportunities are unmatched.",
      author: "Dr. Rajesh Kumar",
      designation: "Professor of Computer Science",
      organization: "IIT Delhi",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "NCNTAIA is the preeminent conference in this area. Excellent relevant science and friendships bring me back every year. It's where the future of AI is discussed.",
      author: "Dr. Priya Sharma",
      designation: "Head of AI Research",
      organization: "Microsoft Research India",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "The conference provides an exceptional platform for researchers to showcase their work and collaborate on cutting-edge AI technologies. Truly inspiring!",
      author: "Prof. Amit Patel",
      designation: "Director, AI Lab",
      organization: "IISC Bangalore",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <ConferenceLayout
      title="About NCNTAIA 2025"
      subtitle="Exploring cutting-edge research and innovations in Artificial Intelligence, Big Data Analytics, and Smart Computing for a digital tomorrow"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Conference Overview */}
        <section>
          <Card className="shadow-lg border-0 bg-white rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#1D4ED8] to-[#1D4ED8]/80 text-white p-8">
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <Globe className="w-8 h-8" />
                Conference Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#1E293B]">NCNTAIA 2025</h3>
                  <p className="text-lg text-[#475569] leading-relaxed">
                    The National Conference on Next-Gen Technologies in AI Applications is a premier academic event that
                    brings together researchers, academicians, industry professionals, and students from around the
                    world to share their latest findings and innovations.
                  </p>
                  <p className="text-[#475569] leading-relaxed">
                    This conference serves as a global forum to advance academic research and innovation, fostering
                    collaboration between academia and industry. Participants will have the opportunity to present their
                    research, learn about cutting-edge developments, and network with peers in the field.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-[#F9FAFB] to-[#1D4ED8]/5 p-6 rounded-xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-[#1D4ED8]">500+</div>
                      <div className="text-sm text-[#475569]">Expected Participants</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-[#F97316]">8</div>
                      <div className="text-sm text-[#475569]">Technical Tracks</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-[#1D4ED8]">2</div>
                      <div className="text-sm text-[#475569]">Conference Days</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-[#F97316]">50+</div>
                      <div className="text-sm text-[#475569]">Expert Speakers</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Conference Objectives */}
        <section>
          <Card className="shadow-lg border-0 bg-white rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#F97316] to-[#F97316]/80 text-white p-8">
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <Award className="w-8 h-8" />
                Conference Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-[#1D4ED8]/10 to-[#1D4ED8]/5 rounded-2xl border border-[#1D4ED8]/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#1D4ED8] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#1E293B] mb-3">Promote Research and Innovation</h3>
                        <p className="text-[#475569] leading-relaxed">
                          To provide a dynamic platform for sharing innovative research, emerging trends, and practical
                          applications in Artificial Intelligence, Big Data Analytics, and Computer Applications.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-[#F97316]/10 to-[#F97316]/5 rounded-2xl border border-[#F97316]/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#F97316] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#1E293B] mb-3">Foster Collaboration</h3>
                        <p className="text-[#475569] leading-relaxed">
                          To encourage collaboration among researchers, industry experts, and academicians to present
                          cutting-edge research and discuss emerging trends in AI, Big Data, and Smart Computing
                          Applications.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-green-600/10 to-green-600/5 rounded-2xl border border-green-600/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#1E293B] mb-3">Promote Sustainable Solutions</h3>
                        <p className="text-[#475569] leading-relaxed">
                          To address how AI technologies can be leveraged for sustainable development, solving
                          challenges such as climate change, public health, and economic inequality.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-purple-600/10 to-purple-600/5 rounded-2xl border border-purple-600/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#1E293B] mb-3">Address National Challenges</h3>
                        <p className="text-[#475569] leading-relaxed">
                          Bring global perspectives to discuss national challenges and opportunities using AI and big
                          data for innovation, national policy, and technological equity.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center p-8 bg-gradient-to-r from-[#F9FAFB] to-[#1D4ED8]/5 rounded-2xl">
                <h3 className="text-2xl font-bold text-[#1E293B] mb-4">Our Vision</h3>
                <p className="text-lg text-[#475569] max-w-3xl mx-auto leading-relaxed">
                  To create a transformative platform where cutting-edge research meets practical innovation, fostering
                  a collaborative ecosystem that drives technological advancement and addresses real-world challenges
                  through AI and data science.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* About SNIST */}
        <section>
          <Card className="shadow-lg border-0 bg-white rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#F97316] to-[#F97316]/80 text-white p-8">
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <Building className="w-8 h-8" />
                About SNIST
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#1E293B] mb-4">
                      Sreenidhi Institute of Science & Technology
                    </h3>
                    <p className="text-lg text-[#475569] leading-relaxed mb-4">
                      An autonomous institution affiliated to JNTUH, accredited by NAAC with A grade and NBA. SNIST has
                      established itself as a leading center for technical education and research in India.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-[#1E293B] flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#1D4ED8]" />
                        Accreditations
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-lg">
                          <div className="w-2 h-2 bg-[#1D4ED8] rounded-full"></div>
                          <span className="text-[#475569]">NAAC A Grade Accreditation</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-lg">
                          <div className="w-2 h-2 bg-[#1D4ED8] rounded-full"></div>
                          <span className="text-[#475569]">NBA Accredited Programs</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-lg">
                          <div className="w-2 h-2 bg-[#1D4ED8] rounded-full"></div>
                          <span className="text-[#475569]">Autonomous Institution Status</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-[#1E293B] flex items-center gap-2">
                        <Users className="w-5 h-5 text-[#F97316]" />
                        Research Excellence
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-lg">
                          <div className="w-2 h-2 bg-[#F97316] rounded-full"></div>
                          <span className="text-[#475569]">Advanced AI Research Labs</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-lg">
                          <div className="w-2 h-2 bg-[#F97316] rounded-full"></div>
                          <span className="text-[#475569]">Industry Collaboration</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-lg">
                          <div className="w-2 h-2 bg-[#F97316] rounded-full"></div>
                          <span className="text-[#475569]">Innovation Centers</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-[#1D4ED8]/10 to-[#F97316]/10 p-6 rounded-xl">
                    <h4 className="font-semibold text-[#1E293B] mb-4">Mission</h4>
                    <p className="text-sm text-[#475569] leading-relaxed">
                      To provide quality technical education and foster innovation through cutting-edge research in
                      emerging technologies.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-[#F97316]/10 to-[#1D4ED8]/10 p-6 rounded-xl">
                    <h4 className="font-semibold text-[#1E293B] mb-4">Vision</h4>
                    <p className="text-sm text-[#475569] leading-relaxed">
                      To be a globally recognized institution for excellence in technical education, research, and
                      innovation.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Testimonials */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1E293B] mb-4">What Researchers Say</h2>
            <p className="text-xl text-[#475569] max-w-3xl mx-auto">
              Hear from distinguished researchers who have been part of our conference community
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="shadow-lg border-0 bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Quote className="w-8 h-8 text-[#1D4ED8] flex-shrink-0 mt-1" />
                      <p className="text-[#475569] leading-relaxed italic">"{testimonial.quote}"</p>
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-[#1D4ED8] to-[#F97316]">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1E293B]">{testimonial.author}</h4>
                        <p className="text-sm text-[#475569] font-medium">{testimonial.designation}</p>
                        <p className="text-sm text-[#1D4ED8]">{testimonial.organization}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Conference Objectives */}
        <section>
          <Card className="shadow-lg border-0 bg-gradient-to-r from-[#1D4ED8] to-[#F97316] text-white rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Conference Objectives</h2>
                <p className="text-xl opacity-90">Our mission to advance AI research and foster innovation</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-3">Research Advancement</h3>
                  <p className="text-sm opacity-90">
                    Promote cutting-edge research in AI, machine learning, and emerging technologies
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-3">Knowledge Sharing</h3>
                  <p className="text-sm opacity-90">
                    Facilitate exchange of ideas and best practices among researchers
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-3">Industry Collaboration</h3>
                  <p className="text-sm opacity-90">
                    Bridge the gap between academic research and industry applications
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-3">Innovation Showcase</h3>
                  <p className="text-sm opacity-90">
                    Provide platform for showcasing innovative solutions and technologies
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-3">Global Networking</h3>
                  <p className="text-sm opacity-90">
                    Create opportunities for professional networking and collaboration
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-3">Future Directions</h3>
                  <p className="text-sm opacity-90">
                    Discuss future trends and directions in AI and related technologies
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </ConferenceLayout>
  )
}
