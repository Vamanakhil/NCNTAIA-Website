import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Award, Video } from "lucide-react"

export default function ContentSections() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* About Section */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-slate-800">About NAC 2025</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                Join distinguished researchers, academicians and professionals at the largest national conference on
                academic research. Share theories, breakthroughs and best practices while exploring opportunities to
                accelerate your work and elevate your career.
              </p>
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent">
                Learn More
              </Button>
            </CardContent>
          </Card>

          {/* Scientific Program */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Calendar className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-slate-800">Academic Program</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                The NAC academic program is shaped by your work and for your work. Take a look at the{" "}
                <a href="#" className="text-blue-600 underline">
                  schedule at a glance
                </a>{" "}
                and the{" "}
                <a href="#" className="text-blue-600 underline">
                  full conference program
                </a>{" "}
                (PDF) for a peek at the hundreds of sessions.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Presentations and thousands of posters on the latest discoveries, research and practice techniques from
                around the globe.
              </p>
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent">
                View Program
              </Button>
            </CardContent>
          </Card>

          {/* Research Excellence */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Award className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-slate-800">Stay at the Forefront of Research</h2>
              </div>

              {/* Video Thumbnail */}
              <div className="relative mb-6 rounded-lg overflow-hidden bg-slate-100">
                <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
                  <div className="text-center">
                    <Video className="h-12 w-12 text-slate-500 mx-auto mb-2" />
                    <p className="text-slate-600 font-medium">Latest Research Highlights at NAC</p>
                    <Button size="sm" className="mt-3 bg-red-600 hover:bg-red-700 text-white">
                      ▶ Play Video
                    </Button>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
                  Think NAC honors
                </div>
              </div>

              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent">
                Explore Research
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
