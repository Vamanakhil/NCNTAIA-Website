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
import { Plus, Trash2, Upload, FileText, Users, Award, CheckCircle, MapPin, Phone, User, Mail, Building, AlertCircle } from 'lucide-react'

interface Author {
  id: string
  fullName: string
  email: string
  affiliation: string
  city: string
  countryCode: string
  contactNumber: string
  isCorresponding: boolean
}

export default function CFPSubmissionForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [paperTitle, setPaperTitle] = useState("")
  const [abstract, setAbstract] = useState("")
  const [keywords, setKeywords] = useState("")
  const [selectedTrack, setSelectedTrack] = useState("")
  const [otherTrack, setOtherTrack] = useState("")
  const [submissionType, setSubmissionType] = useState("")
  const [researchDomain, setResearchDomain] = useState("")
  const [paperFile, setPaperFile] = useState<File | null>(null)
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
      city: "",
      countryCode: "+91",
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
      city: "",
      countryCode: "+91",
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('paperTitle', paperTitle);
    formData.append('abstract', abstract);
    formData.append('keywords', JSON.stringify(keywords.split(',').map(k => k.trim())));
    formData.append('track', selectedTrack);
    formData.append('submissionType', submissionType);
    formData.append('researchDomain', researchDomain);
    formData.append('authors', JSON.stringify(authors));
    formData.append('otherTrack', otherTrack);
    if (paperFile) {
      formData.append('file', paperFile);
    }

    try {
      const response = await fetch('/api/submit_paper', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Submission failed');
      }

      const data = await response.json();
      alert(`Your response has been received. Thank you! Your Submission ID is: ${data.response.submissionId}`);
      // Optionally reset form or navigate to a confirmation page
      setCurrentStep(1); // Reset to first step
      setPaperTitle('');
      setAbstract('');
      setKeywords('');
      setSelectedTrack('');
      setOtherTrack('');
      setSubmissionType('');
      setResearchDomain('');
      setAuthors([
        {
          id: '1',
          fullName: '',
          email: '',
          affiliation: '',
          city: '',
          countryCode: '+91',
          contactNumber: '',
          isCorresponding: true,
        },
      ]);
      setChecklistItems({
        originality: false,
        guidelines: false,
        reviewProcess: false,
        contact: false,
      });
    } catch (error: unknown) {
      alert(`Error: ${(error as Error).message}`);
    }
  };

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

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
  }

  const getKeywordCount = () => {
    return keywords.trim() ? keywords.split(',').map(k => k.trim()).filter(k => k.length > 0).length : 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-blue-600 rounded-full">
              <Award className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Research Paper Submission
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Submit your research paper for review at the National Conference on Computer Science and Technology
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <MapPin className="h-3 w-3 mr-1" />
              National Conference
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Peer Reviewed
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium text-gray-700">
                <span>Submission Progress</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Paper Details</span>
                <span>Authors</span>
                <span>Upload</span>
                <span>Review</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Step 1: Paper Information */}
          {currentStep === 1 && (
            <Card className="border-l-4 border-l-blue-600 shadow-sm">
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Paper Information
                </CardTitle>
                <CardDescription>Provide details about your research paper</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-medium text-gray-700 flex items-center gap-2">
                    Paper Title
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={paperTitle}
                    onChange={(e) => setPaperTitle(e.target.value.slice(0, 200))}
                    placeholder="Enter your paper title"
                    className="text-base p-4 border-2 focus:border-blue-500"
                    required
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Maximum 200 characters</span>
                    <span className={`${paperTitle.length > 180 ? 'text-red-500' : 'text-gray-500'}`}>
                      {paperTitle.length}/200
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="abstract" className="text-base font-medium text-gray-700 flex items-center gap-2">
                    Abstract
                    <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="abstract"
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    placeholder="Provide a comprehensive abstract of your research work"
                    className="min-h-[120px] text-base border-2 focus:border-blue-500"
                    required
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">250-300 words required</span>
                    <span className={`${getWordCount(abstract) < 250 || getWordCount(abstract) > 300 ? 'text-red-500' : 'text-green-600'}`}>
                      {getWordCount(abstract)} words
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords" className="text-base font-medium text-gray-700 flex items-center gap-2">
                    Keywords
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="keywords"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="machine learning, neural networks, computer vision"
                    className="text-base p-4 border-2 focus:border-blue-500"
                    required
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Separate with commas. Minimum 3, Maximum 7 keywords</span>
                    <span className={`${getKeywordCount() < 3 || getKeywordCount() > 7 ? 'text-red-500' : 'text-green-600'}`}>
                      {getKeywordCount()}/7 keywords
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="track" className="text-base font-medium text-gray-700 flex items-center gap-2">
                      Research Track
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select value={selectedTrack} onValueChange={handleTrackChange} required>
                      <SelectTrigger className="p-4 border-2">
                        <SelectValue placeholder="Select research track" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="big-data-analytics">Big Data Analytics & Data Science Applications</SelectItem>
                        <SelectItem value="cloud-iot-smart">Cloud Computing, IoT & Smart Applications</SelectItem>
                        <SelectItem value="ai-ml">AI & ML</SelectItem>
                        <SelectItem value="cybersecurity-blockchain">Cybersecurity, Blockchain & Access Control</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>

                    {selectedTrack === "other" && (
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="other-track" className="text-base font-medium text-gray-700 flex items-center gap-2">
                          Specify Research Track
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="other-track"
                          value={otherTrack}
                          onChange={(e) => setOtherTrack(e.target.value)}
                          placeholder="Please specify your research track"
                          className="p-4 border-2 border-orange-300 focus:border-orange-500"
                          required
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="submission-type" className="text-base font-medium text-gray-700 flex items-center gap-2">
                      Type of Submission
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select value={submissionType} onValueChange={setSubmissionType} required>
                      <SelectTrigger className="p-4 border-2">
                        <SelectValue placeholder="Select submission type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="poster">Poster Presentation</SelectItem>
                        <SelectItem value="full-paper">Full Paper</SelectItem>
                        <SelectItem value="workshop">Workshop Proposal</SelectItem>
                        <SelectItem value="demo">Demo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="research-domain" className="text-base font-medium text-gray-700 flex items-center gap-2">
                    Research Domain
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select value={researchDomain} onValueChange={setResearchDomain} required>
                    <SelectTrigger className="p-4 border-2">
                      <SelectValue placeholder="Select research domain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="industry">Industry</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="ngo">NGO</SelectItem>
                      <SelectItem value="startup">Startup</SelectItem>
                      <SelectItem value="hobbyist">Hobbyist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Author Details */}
          {currentStep === 2 && (
            <Card className="border-l-4 border-l-purple-600 shadow-sm">
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Users className="h-5 w-5 text-purple-600" />
                  Author Information
                </CardTitle>
                <CardDescription>Provide details for all authors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {authors.map((author, index) => (
                  <div
                    key={author.id}
                    className="space-y-4 p-6 border-2 border-gray-200 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-purple-600 rounded-full">
                          <Users className="h-4 w-4 text-white" />
                        </div>
                        <h4 className="font-semibold text-lg text-gray-900">
                          {index === 0 ? "Lead Author" : `Co-Author ${index}`}
                          {author.isCorresponding && index > 0 && " (Corresponding)"}
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
                        <Label htmlFor={`name-${author.id}`} className="font-medium flex items-center gap-2 text-gray-700">
                          <User className="h-4 w-4" />
                          Full Name
                          <span className="text-red-500">*</span>
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
                        <Label htmlFor={`email-${author.id}`} className="font-medium flex items-center gap-2 text-gray-700">
                          <Mail className="h-4 w-4" />
                          Email Address
                          <span className="text-red-500">*</span>
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
                        <Label htmlFor={`affiliation-${author.id}`} className="font-medium flex items-center gap-2 text-gray-700">
                          <Building className="h-4 w-4" />
                          Institution
                          <span className="text-red-500">*</span>
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
                        <Label htmlFor={`city-${author.id}`} className="font-medium flex items-center gap-2 text-gray-700">
                          <MapPin className="h-4 w-4" />
                          City
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id={`city-${author.id}`}
                          value={author.city}
                          onChange={(e) => updateAuthor(author.id, "city", e.target.value)}
                          placeholder="Hyderabad"
                          className="border-2 focus:border-purple-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`contact-${author.id}`} className="font-medium flex items-center gap-2 text-gray-700">
                        <Phone className="h-4 w-4" />
                        Contact Number
                        <span className="text-red-500">*</span>
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
                            <SelectItem value="+91">+91</SelectItem>
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
                      <p className="text-sm text-gray-500">Enter exactly 10 digits (without country code)</p>
                    </div>

                    {index > 0 && (
                      <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                        <Checkbox
                          id={`corresponding-${author.id}`}
                          checked={author.isCorresponding}
                          onCheckedChange={() => setCorrespondingAuthor(author.id)}
                        />
                        <Label htmlFor={`corresponding-${author.id}`} className="font-medium text-gray-700">
                          Set as corresponding author
                        </Label>
                      </div>
                    )}
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addAuthor}
                  className="w-full p-6 border-2 border-dashed border-purple-300 hover:border-purple-500 hover:bg-purple-50 transition-all bg-transparent"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Co-Author
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 3: File Upload */}
          {currentStep === 3 && (
            <Card className="border-l-4 border-l-green-600 shadow-sm">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Upload className="h-5 w-5 text-green-600" />
                  Paper Upload
                </CardTitle>
                <CardDescription>Upload your research paper document</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="space-y-2">
                      <h4 className="font-semibold text-blue-900">Paper Format Requirements</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• File Format: Word Document (.doc, .docx)</li>
                        <li>• Page Length: 4-6 pages (including references)</li>
                        <li>• Font: Times New Roman, 12pt</li>
                        <li>• Margins: 1 inch on all sides</li>
                        <li>• Line Spacing: Single</li>
                        <li>• File Size: Maximum 2MB</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-8 border-2 border-dashed border-green-300 rounded-xl bg-green-50 text-center">
                    <Upload className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <Label htmlFor="paper-file" className="text-lg font-medium cursor-pointer text-gray-900">
                      Upload Research Paper (Word Document)
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input id="paper-file" type="file" accept=".doc,.docx" required className="mt-4" onChange={(e) => setPaperFile(e.target.files ? e.target.files[0] : null)} />
                    <p className="text-sm text-gray-600 mt-2">Word format only (.doc, .docx) • Maximum 2MB • 4-6 pages</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Final Review */}
          {currentStep === 4 && (
            <Card className="border-l-4 border-l-orange-600 shadow-sm">
              <CardHeader className="bg-orange-50">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <CheckCircle className="h-5 w-5 text-orange-600" />
                  Final Review
                </CardTitle>
                <CardDescription>Review and submit your paper</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-2">
                  <Label htmlFor="comments" className="text-base font-medium text-gray-700">
                    Additional Comments (Optional)
                  </Label>
                  <Textarea
                    id="comments"
                    placeholder="Any additional information for the review committee..."
                    className="min-h-[100px] border-2 focus:border-orange-500"
                  />
                  {selectedTrack === "other" && otherTrack === "custom" && (
                    <p className="text-sm text-orange-600 font-medium">
                      Please specify your custom research track in the comments above.
                    </p>
                  )}
                </div>

                <div className="space-y-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-lg mb-4 text-gray-900">Submission Checklist</h4>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="originality"
                        checked={checklistItems.originality}
                        onCheckedChange={(checked) => updateChecklistItem("originality", checked as boolean)}
                        required
                      />
                      <Label htmlFor="originality" className="font-medium text-gray-700">
                        This work is original and has not been published elsewhere
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="guidelines"
                        checked={checklistItems.guidelines}
                        onCheckedChange={(checked) => updateChecklistItem("guidelines", checked as boolean)}
                        required
                      />
                      <Label htmlFor="guidelines" className="font-medium text-gray-700">
                        I have read and followed all submission guidelines
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="review-process"
                        checked={checklistItems.reviewProcess}
                        onCheckedChange={(checked) => updateChecklistItem("reviewProcess", checked as boolean)}
                        required
                      />
                      <Label htmlFor="review-process" className="font-medium text-gray-700">
                        I understand the peer review process
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="contact"
                        checked={checklistItems.contact}
                        onCheckedChange={(checked) => updateChecklistItem("contact", checked as boolean)}
                        required
                      />
                      <Label htmlFor="contact" className="font-medium text-gray-700">
                        I am available for reviewer questions and revisions
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
              className="px-6"
            >
              Previous
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${i + 1 <= currentStep ? "bg-blue-600" : "bg-gray-300"}`}
                />
              ))}
            </div>

            {currentStep < totalSteps ? (
              <Button type="button" onClick={nextStep} className="px-6 bg-blue-600 hover:bg-blue-700">
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!allChecklistItemsChecked}
                className={`px-8 text-lg transition-all ${
                  allChecklistItemsChecked
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Submit Paper
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
