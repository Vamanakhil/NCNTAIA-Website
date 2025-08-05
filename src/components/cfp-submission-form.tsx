"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  Trash2,
  Upload,
  FileText,
  Users,
  Award,
  Sparkles,
  CheckCircle,
  MapPin,
  Phone,
  User,
  Mail,
  Building,
  Globe,
} from "lucide-react"

interface Author {
  id: string
  fullName: string
  email: string
  affiliation: string
  country: string
  countryCode: string
  contactNumber: string
  isCorresponding: boolean
}

export default function CFPSubmissionForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTrack, setSelectedTrack] = useState("")
  const [otherTrack, setOtherTrack] = useState("")
  const [checklistItems, setChecklistItems] = useState({
    originality: false,
    guidelines: false,
    reviewProcess: false,
    contact: false,
  })
  const [authors, setAuthors] = useState<Author[]>([
    {
      id: "1",
      fullName: "",
      email: "",
      affiliation: "",
      country: "",
      countryCode: "+1",
      contactNumber: "",
      isCorresponding: true,
    },
  ])

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const addAuthor = () => {
    const newAuthor: Author = {
      id: Date.now().toString(),
      fullName: "",
      email: "",
      affiliation: "",
      country: "",
      countryCode: "+1",
      contactNumber: "",
      isCorresponding: false,
    }
    setAuthors([...authors, newAuthor])
  }

  const removeAuthor = (id: string) => {
    if (authors.length > 1) {
      setAuthors(authors.filter((author) => author.id !== id))
    }
  }

  const updateAuthor = (id: string, field: keyof Author, value: string | boolean) => {
    setAuthors(authors.map((author) => (author.id === id ? { ...author, [field]: value } : author)))
  }

  const setCorrespondingAuthor = (id: string) => {
    setAuthors(
      authors.map((author) => ({
        ...author,
        isCorresponding: author.id === id,
      })),
    )
  }

  const updateChecklistItem = (item: keyof typeof checklistItems, checked: boolean) => {
    setChecklistItems((prev) => ({ ...prev, [item]: checked }))
  }

  const allChecklistItemsChecked = Object.values(checklistItems).every(Boolean)

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleTrackChange = (value: string) => {
    setSelectedTrack(value)
    if (value !== "other") {
      setOtherTrack("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Award className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Submit Your Research
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join leading researchers from across the nation. Share your groundbreaking work with the national academic
            community.
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              <MapPin className="h-3 w-3 mr-1" />
              National Conference
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              <Sparkles className="h-3 w-3 mr-1" />
              Peer Reviewed
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="border-2 border-dashed border-blue-200">
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Submission Progress</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Paper Info</span>
                <span>Authors</span>
                <span>Upload</span>
                <span>Review</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <form className="space-y-8">
          {/* Step 1: Paper Information */}
          {currentStep === 1 && (
            <Card className="border-l-4 border-l-blue-500 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Tell Us About Your Research
                </CardTitle>
                <CardDescription>Let's start with the basics of your groundbreaking work</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-medium">
                    What's your paper title? ✨
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Revolutionary AI Approach to Climate Change Prediction"
                    className="text-lg p-4 border-2 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="track" className="text-base font-medium">
                      Which track fits your research? 🎯
                    </Label>
                    <Select value={selectedTrack} onValueChange={handleTrackChange} required>
                      <SelectTrigger className="p-4 border-2">
                        <SelectValue placeholder="Choose your research area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ai-ml">🤖 Artificial Intelligence & Machine Learning</SelectItem>
                        <SelectItem value="software-eng">💻 Software Engineering</SelectItem>
                        <SelectItem value="data-science">📊 Data Science & Analytics</SelectItem>
                        <SelectItem value="cybersecurity">🔒 Cybersecurity</SelectItem>
                        <SelectItem value="hci">👥 Human-Computer Interaction</SelectItem>
                        <SelectItem value="networks">🌐 Networks & Distributed Systems</SelectItem>
                        <SelectItem value="blockchain">⛓️ Blockchain & Cryptocurrency</SelectItem>
                        <SelectItem value="iot">📡 Internet of Things (IoT)</SelectItem>
                        <SelectItem value="cloud-computing">☁️ Cloud Computing</SelectItem>
                        <SelectItem value="mobile-computing">📱 Mobile Computing</SelectItem>
                        <SelectItem value="computer-vision">👁️ Computer Vision</SelectItem>
                        <SelectItem value="nlp">🗣️ Natural Language Processing</SelectItem>
                        <SelectItem value="robotics">🤖 Robotics</SelectItem>
                        <SelectItem value="quantum-computing">⚛️ Quantum Computing</SelectItem>
                        <SelectItem value="bioinformatics">🧬 Bioinformatics</SelectItem>
                        <SelectItem value="game-development">🎮 Game Development</SelectItem>
                        <SelectItem value="web-technologies">🌐 Web Technologies</SelectItem>
                        <SelectItem value="database-systems">🗄️ Database Systems</SelectItem>
                        <SelectItem value="algorithms">📐 Algorithms & Data Structures</SelectItem>
                        <SelectItem value="other">🔬 Other</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Other Track Dropdown */}
                    {selectedTrack === "other" && (
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="other-track" className="text-base font-medium">
                          Please specify your research track:
                        </Label>
                        <Select value={otherTrack} onValueChange={setOtherTrack} required>
                          <SelectTrigger className="p-4 border-2 border-orange-300 focus:border-orange-500">
                            <SelectValue placeholder="Select your specific research area" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="theoretical-cs">🧮 Theoretical Computer Science</SelectItem>
                            <SelectItem value="computational-biology">🧬 Computational Biology</SelectItem>
                            <SelectItem value="digital-forensics">🔍 Digital Forensics</SelectItem>
                            <SelectItem value="embedded-systems">⚡ Embedded Systems</SelectItem>
                            <SelectItem value="parallel-computing">⚡ Parallel Computing</SelectItem>
                            <SelectItem value="computer-graphics">🎨 Computer Graphics</SelectItem>
                            <SelectItem value="information-retrieval">🔍 Information Retrieval</SelectItem>
                            <SelectItem value="multimedia-systems">🎬 Multimedia Systems</SelectItem>
                            <SelectItem value="social-computing">👥 Social Computing</SelectItem>
                            <SelectItem value="educational-technology">📚 Educational Technology</SelectItem>
                            <SelectItem value="healthcare-informatics">🏥 Healthcare Informatics</SelectItem>
                            <SelectItem value="financial-technology">💰 Financial Technology</SelectItem>
                            <SelectItem value="environmental-computing">🌱 Environmental Computing</SelectItem>
                            <SelectItem value="augmented-reality">🥽 Augmented Reality</SelectItem>
                            <SelectItem value="virtual-reality">🌐 Virtual Reality</SelectItem>
                            <SelectItem value="edge-computing">📡 Edge Computing</SelectItem>
                            <SelectItem value="green-computing">♻️ Green Computing</SelectItem>
                            <SelectItem value="accessibility-computing">♿ Accessibility Computing</SelectItem>
                            <SelectItem value="privacy-engineering">🔐 Privacy Engineering</SelectItem>
                            <SelectItem value="custom">✏️ Custom (Please specify in comments)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="submission-type" className="text-base font-medium">
                      Nature of submission? 📝
                    </Label>
                    <Select required>
                      <SelectTrigger className="p-4 border-2">
                        <SelectValue placeholder="Select nature of submission" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="demo1">🎯 Demo1</SelectItem>
                        <SelectItem value="demo2">🎪 Demo2</SelectItem>
                        <SelectItem value="demo3">🚀 Demo3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords" className="text-base font-medium">
                    Keywords that describe your work 🏷️
                  </Label>
                  <Input
                    id="keywords"
                    placeholder="machine learning, neural networks, deep learning, computer vision"
                    className="p-4 border-2 focus:border-blue-500"
                    required
                  />
                  <p className="text-sm text-muted-foreground">Separate with commas • Help reviewers find your work</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Author Details */}
          {currentStep === 2 && (
            <Card className="border-l-4 border-l-purple-500 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  Meet the Research Team
                </CardTitle>
                <CardDescription>Who are the brilliant minds behind this research?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {authors.map((author, index) => (
                  <div
                    key={author.id}
                    className="space-y-4 p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-white"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                          <Users className="h-4 w-4 text-white" />
                        </div>
                        <h4 className="font-semibold text-lg">
                          {index === 0 ? "Lead Researcher" : `Co-Researcher ${index}`}
                          {author.isCorresponding && index > 0 && " (Main Contact)"}
                        </h4>
                      </div>
                      {authors.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeAuthor(author.id)}
                          className="hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`name-${author.id}`} className="font-medium flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Full Name
                        </Label>
                        <Input
                          id={`name-${author.id}`}
                          value={author.fullName}
                          onChange={(e) => updateAuthor(author.id, "fullName", e.target.value)}
                          placeholder="Dr. Jane Smith"
                          className="border-2 focus:border-purple-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`email-${author.id}`} className="font-medium flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address
                        </Label>
                        <Input
                          id={`email-${author.id}`}
                          type="email"
                          value={author.email}
                          onChange={(e) => updateAuthor(author.id, "email", e.target.value)}
                          placeholder="jane.smith@university.edu"
                          className="border-2 focus:border-purple-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`affiliation-${author.id}`} className="font-medium flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          Institution
                        </Label>
                        <Input
                          id={`affiliation-${author.id}`}
                          value={author.affiliation}
                          onChange={(e) => updateAuthor(author.id, "affiliation", e.target.value)}
                          placeholder="Stanford University"
                          className="border-2 focus:border-purple-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`country-${author.id}`} className="font-medium flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Country
                        </Label>
                        <Input
                          id={`country-${author.id}`}
                          value={author.country}
                          onChange={(e) => updateAuthor(author.id, "country", e.target.value)}
                          placeholder="United States"
                          className="border-2 focus:border-purple-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`contact-${author.id}`} className="font-medium flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Contact Number (10 digits)
                      </Label>
                      <div className="flex gap-2">
                        <Select
                          value={author.countryCode}
                          onValueChange={(value) => updateAuthor(author.id, "countryCode", value)}
                        >
                          <SelectTrigger className="w-24 border-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+1">🇺🇸 +1</SelectItem>
                            <SelectItem value="+91">🇮🇳 +91</SelectItem>
                            <SelectItem value="+44">🇬🇧 +44</SelectItem>
                            <SelectItem value="+86">🇨🇳 +86</SelectItem>
                            <SelectItem value="+81">🇯🇵 +81</SelectItem>
                            <SelectItem value="+49">🇩🇪 +49</SelectItem>
                            <SelectItem value="+33">🇫🇷 +33</SelectItem>
                            <SelectItem value="+61">🇦🇺 +61</SelectItem>
                            <SelectItem value="+55">🇧🇷 +55</SelectItem>
                            <SelectItem value="+7">🇷🇺 +7</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          id={`contact-${author.id}`}
                          value={author.contactNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "").slice(0, 10)
                            updateAuthor(author.id, "contactNumber", value)
                          }}
                          placeholder="1234567890"
                          className="flex-1 border-2 focus:border-purple-500"
                          maxLength={10}
                          pattern="[0-9]{10}"
                          required
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">Enter exactly 10 digits (without country code)</p>
                    </div>

                    {index > 0 && (
                      <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                        <Checkbox
                          id={`corresponding-${author.id}`}
                          checked={author.isCorresponding}
                          onCheckedChange={() => setCorrespondingAuthor(author.id)}
                        />
                        <Label htmlFor={`corresponding-${author.id}`} className="font-medium">
                          Make this person the main contact
                        </Label>
                      </div>
                    )}
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addAuthor}
                  className="w-full p-6 border-2 border-dashed border-blue-300 hover:border-blue-500 hover:bg-blue-50 transition-all bg-transparent"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Another Brilliant Mind to Your Team
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 3: File Upload */}
          {currentStep === 3 && (
            <Card className="border-l-4 border-l-green-500 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-green-600" />
                  Share Your Research Files
                </CardTitle>
                <CardDescription>Upload your research paper</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-4">
                  <div className="p-8 border-2 border-dashed border-green-300 rounded-xl bg-gradient-to-r from-green-50 to-white text-center">
                    <Upload className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <Label htmlFor="paper-file" className="text-lg font-medium cursor-pointer">
                      📄 Upload Your Research Paper (Word Document)
                    </Label>
                    <Input id="paper-file" type="file" accept=".doc,.docx" required className="mt-4" />
                    <p className="text-sm text-muted-foreground mt-2">Maximum 2MB • Word format only (.doc, .docx)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Final Review */}
          {currentStep === 4 && (
            <Card className="border-l-4 border-l-orange-500 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-600" />
                  Almost There!
                </CardTitle>
                <CardDescription>Just a few final details before we submit your amazing work</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-2">
                  <Label htmlFor="comments" className="text-base font-medium">
                    Any special notes for our reviewers? 💭
                  </Label>
                  <Textarea
                    id="comments"
                    placeholder="Share any context, special considerations, or messages for the review committee..."
                    className="min-h-[100px] border-2 focus:border-orange-500"
                  />
                  {selectedTrack === "other" && otherTrack === "custom" && (
                    <p className="text-sm text-orange-600 font-medium">
                      Please specify your custom research track in the comments above.
                    </p>
                  )}
                </div>

                <div className="space-y-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <h4 className="font-semibold text-lg mb-4">📋 Final Checklist</h4>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="originality"
                        checked={checklistItems.originality}
                        onCheckedChange={(checked) => updateChecklistItem("originality", checked as boolean)}
                        required
                      />
                      <Label htmlFor="originality" className="font-medium">
                        ✅ This work is original and hasn't been published elsewhere
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="guidelines"
                        checked={checklistItems.guidelines}
                        onCheckedChange={(checked) => updateChecklistItem("guidelines", checked as boolean)}
                        required
                      />
                      <Label htmlFor="guidelines" className="font-medium">
                        📖 I've read and followed all submission guidelines
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="review-process"
                        checked={checklistItems.reviewProcess}
                        onCheckedChange={(checked) => updateChecklistItem("reviewProcess", checked as boolean)}
                        required
                      />
                      <Label htmlFor="review-process" className="font-medium">
                        🔍 I understand the peer review process
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="contact"
                        checked={checklistItems.contact}
                        onCheckedChange={(checked) => updateChecklistItem("contact", checked as boolean)}
                        required
                      />
                      <Label htmlFor="contact" className="font-medium">
                        📧 I'm available for reviewer questions and revisions
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 bg-transparent"
            >
              ← Previous
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${i + 1 <= currentStep ? "bg-blue-500" : "bg-gray-200"}`}
                />
              ))}
            </div>

            {currentStep < totalSteps ? (
              <Button type="button" onClick={nextStep} className="px-6 bg-gradient-to-r from-blue-500 to-purple-600">
                Next →
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!allChecklistItemsChecked}
                className={`px-8 text-lg transition-all ${
                  allChecklistItemsChecked
                    ? "bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                🚀 Submit My Research!
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
