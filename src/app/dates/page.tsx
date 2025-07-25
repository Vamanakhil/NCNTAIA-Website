import ConferenceLayout from "@/components/ui/layout/conf-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, AlertCircle, CheckCircle, FileText, Users, Bell } from "lucide-react"

export default function ImportantDatesPage() {
  const importantDates = [
    {
      event: "Abstract Submission Deadline",
      date: "August 8, 2025",
      time: "11:59 PM IST",
      status: "upcoming",
      icon: FileText,
      description: "Submit your 1-page abstract in PDF format with Times New Roman font",
      category: "submission",
    },
  
    {
      event: "Acceptance Notification",
      date: "August 14, 2025",
      time: "By 6:00 PM IST",
      status: "upcoming",
      icon: Bell,
      description: "Authors will be notified about paper acceptance via email",
      category: "notification",
    },

      {
      event: "Full Paper Submission Deadline",
      date: "August 30, 2025",
      time: "11:59 PM IST",
      status: "upcoming",
      icon: FileText,
      description: "Submit complete paper in IEEE format (6 pages max + 2 additional pages with extra fee)",
      category: "submission",
    },
  
    {
      event: "Final Registration Deadline",
      date: "September 5, 2025",
      time: "11:59 PM IST",
      status: "upcoming",
      icon: Users,
      description: "Last date for conference registration and payment",
      category: "registration",
    },
    {
      event: "Conference Day 1",
      date: "September 11, 2025",
      time: "9:00 AM IST",
      status: "conference",
      icon: Calendar,
      description: "Opening ceremony, keynote sessions, and technical presentations",
      category: "conference",
    },
    {
      event: "Conference Day 2",
      date: "September 12, 2025",
      time: "9:00 AM IST",
      status: "conference",
      icon: Calendar,
      description: "Technical sessions, panel discussions, and closing ceremony",
      category: "conference",
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "submission":
        return "bg-[#1D4ED8] text-white"
      case "notification":
        return "bg-[#F97316] text-white"
      case "registration":
        return "bg-purple-600 text-white"
      case "conference":
        return "bg-green-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const getCategoryBg = (category: string) => {
    switch (category) {
      case "submission":
        return "from-[#1D4ED8]/10 to-[#1D4ED8]/5"
      case "notification":
        return "from-[#F97316]/10 to-[#F97316]/5"
      case "registration":
        return "from-purple-600/10 to-purple-600/5"
      case "conference":
        return "from-green-600/10 to-green-600/5"
      default:
        return "from-gray-600/10 to-gray-600/5"
    }
  }

  return (
    <ConferenceLayout
      title="Important Dates"
      subtitle="Mark your calendar with these crucial deadlines and conference dates for NCNTAIA 2025"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Timeline Overview */}
        <section>
          <Card className="shadow-lg border-0 bg-white rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#1D4ED8] to-[#F97316] text-white p-8">
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <Calendar className="w-8 h-8" />
                Conference Timeline
              </CardTitle>
              <p className="text-xl opacity-90 mt-2">All times are in Indian Standard Time (IST) - UTC+5:30</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {importantDates.map((item, index) => {
                  const IconComponent = item.icon
                  return (
                    <div
                      key={index}
                      className={`relative p-6 bg-gradient-to-r ${getCategoryBg(item.category)} rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
                    >
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                          <div
                            className={`w-16 h-16 ${getCategoryColor(item.category)} rounded-2xl flex items-center justify-center shadow-lg`}
                          >
                            <IconComponent className="w-8 h-8" />
                          </div>
                        </div>

                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                            <h3 className="text-xl font-bold text-[#1E293B]">{item.event}</h3>
                            <Badge
                              className={`${getCategoryColor(item.category)} border-0 px-3 py-1 text-sm font-medium`}
                            >
                              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                            </Badge>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-5 h-5 text-[#1D4ED8]" />
                              <span className="text-lg font-semibold text-[#1E293B]">{item.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5 text-[#F97316]" />
                              <span className="text-lg font-semibold text-[#1E293B]">{item.time}</span>
                            </div>
                          </div>

                          <p className="text-[#475569] leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Reference Cards */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#1E293B] mb-4">Quick Reference</h2>
            <p className="text-lg text-[#475569]">Key deadlines at a glance</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-[#1D4ED8] to-[#1D4ED8]/80 text-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-lg font-bold mb-2">Abstract Deadline</h3>
                <p className="text-2xl font-bold mb-1">Aug 08</p>
                <p className="text-sm opacity-90">2025</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-600 to-purple-600/80 text-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <Bell className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-lg font-bold mb-2">Notification of Acceptance</h3>
                <p className="text-2xl font-bold mb-1">Aug 14</p>
                <p className="text-sm opacity-90">2025</p>
              </CardContent>
            </Card>            

            <Card className="shadow-lg border-0 bg-gradient-to-br from-[#F97316] to-[#F97316]/80 text-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-lg font-bold mb-2">Full Paper Deadline</h3>
                <p className="text-2xl font-bold mb-1">Aug 30</p>
                <p className="text-sm opacity-90">2025</p>
              </CardContent>
            </Card>

            

            <Card className="shadow-lg border-0 bg-gradient-to-br from-green-600 to-green-600/80 text-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-lg font-bold mb-2">Registration Deadline</h3>
                <p className="text-2xl font-bold mb-1">Sep 05</p>
                <p className="text-sm opacity-90">2025</p>
              </CardContent>
            </Card>


            <Card className="shadow-lg border-0 bg-gradient-to-br from-green-600 to-green-600/80 text-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-lg font-bold mb-2">Conference</h3>
                <p className="text-2xl font-bold mb-1">Sep 11-12</p>
                <p className="text-sm opacity-90">2025</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Time Zone & Contact Info */}
        <section>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-lg border-0 bg-white rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                  <Clock className="w-6 h-6" />
                  Time Zone Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-[#1E293B] mb-2">Important Note</h4>
                        <p className="text-[#475569] text-sm">
                          All deadlines are based on <strong>Indian Standard Time (IST)</strong> - UTC+5:30
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between items-center p-3 bg-[#F9FAFB] rounded-lg">
                      <span className="font-medium text-[#1E293B]">IST (India)</span>
                      <span className="text-[#475569]">UTC+5:30</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#F9FAFB] rounded-lg">
                      <span className="font-medium text-[#1E293B]">EST (US East)</span>
                      <span className="text-[#475569]">UTC-5:00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#F9FAFB] rounded-lg">
                      <span className="font-medium text-[#1E293B]">GMT (London)</span>
                      <span className="text-[#475569]">UTC+0:00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#1D4ED8] to-[#F97316] text-white p-6">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                  <CheckCircle className="w-6 h-6" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-[#475569]">For any questions regarding deadlines, submissions, or scheduling:</p>

                  <div className="bg-[#1D4ED8]/5 p-4 rounded-xl border border-[#1D4ED8]/20">
                    <div className="text-center">
                      <p className="text-sm text-[#475569] mb-2">Contact Email:</p>
                      <p className="font-mono text-[#1D4ED8] text-lg font-semibold">ncntaia-2025@sreenidhi.edu.in</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-[#475569]">
                      We typically respond within 24-48 hours during business days
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </ConferenceLayout>
  )
}
