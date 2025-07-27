'use client';

import React, { useState } from "react";
import ConferenceLayout from "@/components/ui/layout/conf-layout"; // Assuming this path is correct
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Upload, CheckCircle, AlertCircle, Hourglass, DollarSign, User, FileUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea"; // Ensure Textarea is imported

// Define the shape of the form data
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  affiliation: string;
  department: string;
  city: string;
  state: string;
  country: string;
  paperTitle: string;
  keywords: string;
  domain: string;
  abstractText: string;
  file: File | null; // For file upload
  agreeTerms: boolean;
}

// Define the shape of the form errors
interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  affiliation?: string;
  city?: string;
  state?: string;
  country?: string;
  paperTitle?: string;
  keywords?: string;
  domain?: string;
  abstractText?: string;
  agreeTerms?: string;
  file?: string; // Add error for file if needed
}

// Define the submission status type
type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

export default function CallForPapers() {
  // State to manage form data
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    affiliation: '',
    department: '',
    city: '',
    state: '',
    country: '',
    paperTitle: '',
    keywords: '',
    domain: '',
    abstractText: '',
    file: null,
    agreeTerms: false,
  });

  // State to manage form validation errors
  const [errors, setErrors] = useState<FormErrors>({});
  // State to manage submission status and messages
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [submissionMessage, setSubmissionMessage] = useState<string>('');

  // List of research domains for the select input
  const domains = [
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Natural Language Processing",
    "Computer Vision",
    "Internet of Things (IoT)",
    "Cloud Computing",
    "Healthcare Technology",
    "Cybersecurity",
    "Data Science",
    "Robotics",
    "Blockchain",
    "Edge Computing",
    "Other",
  ];

  // Handles changes for all input types (text, select, checkbox, file)
  const handleInputChange = (
    name: keyof FormData,
    value: string | boolean | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for the current field when it changes
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Client-side form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate Author Information
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email Address is invalid.";
    }
    if (!formData.affiliation.trim()) newErrors.affiliation = "Affiliation is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
    if (!formData.country.trim()) newErrors.country = "Country is required.";

    // Validate Paper Details
    if (!formData.paperTitle.trim()) newErrors.paperTitle = "Paper Title is required.";
    const keywordsArray = formData.keywords.split(',').map(k => k.trim()).filter(k => k.length > 0);
    if (keywordsArray.length < 3 || keywordsArray.length > 6) {
      newErrors.keywords = "Please provide 3-6 keywords separated by commas.";
    }
    if (!formData.domain) newErrors.domain = "Research Domain is required.";
    const abstractWordCount = formData.abstractText.trim().split(/\s+/).filter(word => word.length > 0).length;
    if (!formData.abstractText.trim()) {
      newErrors.abstractText = "Abstract Text is required.";
    } else if (abstractWordCount < 200 || abstractWordCount > 300) {
      newErrors.abstractText = "Abstract should be between 200 and 300 words.";
    }

    // Validate Terms and Conditions
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms of submission.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('loading');
    setSubmissionMessage('');

    // Validate the form before submission
    if (!validateForm()) {
      setSubmissionStatus('error');
      setSubmissionMessage('Please correct the errors in the form.');
      return;
    }

    try {
      // Create FormData object for sending multi-part data (including file)
      const submitFormData = new FormData();

      // Map frontend fields to backend expected fields
      submitFormData.append('name', formData.fullName); // Map fullName to name
      submitFormData.append('email', formData.email);
      submitFormData.append('phone', formData.phone);
      submitFormData.append('affiliation', formData.affiliation);
      submitFormData.append('department', formData.department);
      // Combine city, state, country into a single 'location' field for the backend
      submitFormData.append('location', `${formData.city}, ${formData.state}, ${formData.country}`);
      submitFormData.append('paperTitle', formData.paperTitle);
      submitFormData.append('keywords', formData.keywords);
      submitFormData.append('domain', formData.domain);
      submitFormData.append('abstractText', formData.abstractText);
      if (formData.file) {
        submitFormData.append('file', formData.file);
      }
      // agreeTerms is not directly used by backend for submission, but can be sent if needed
      // submitFormData.append('agreeTerms', String(formData.agreeTerms));


      // Fetch API call to the backend - Corrected URL
      const response = await fetch('http://localhost:5000/submit', { // Changed from /api/submit to /submit
        method: 'POST',
        // 'Content-Type': 'application/json' is NOT set when using FormData,
        // as the browser will automatically set it to 'multipart/form-data'
        body: submitFormData,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmissionStatus('success');
        setSubmissionMessage('Submission successful! You will be notified via email.');
        // Optionally reset form after successful submission
        setFormData({
          fullName: '', email: '', phone: '', affiliation: '', department: '',
          city: '', state: '', country: '', paperTitle: '', keywords: '',
          domain: '', abstractText: '', file: null, agreeTerms: false,
        });
        setErrors({}); // Clear any lingering errors
      } else {
        setSubmissionStatus('error');
        setSubmissionMessage(`Error: ${result.message || 'Something went wrong.'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionStatus('error');
      setSubmissionMessage('Submission failed due to a network error. Please try again.');
    }
  };

  return (
    <ConferenceLayout
      title="Call for Papers"
      subtitle="Submit your research contributions to NCNTAIA 2025 and be part of advancing AI technologies"
    >
      <div className="max-w-6xl mx-auto space-y-12 py-12">
        {/* Submission Guidelines */}
        <section>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800 flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-600" />
                Submission Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Abstract Submission */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-blue-600" />
                    Abstract Submission
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-slate-800">Format Requirements</p>
                        <p className="text-sm text-slate-600">PDF format, Times New Roman font, 1 page maximum</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-slate-800">Required Information</p>
                        <p className="text-sm text-slate-600">Title, Authors Names, Affiliations, Email IDs</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-slate-800">Submission Deadline</p>
                        <p className="text-sm text-slate-600 font-semibold">August 10, 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Full Paper Submission */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Full Paper Submission
                  </h3>
                  <div className="bg-green-50 p-4 rounded-lg space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-slate-800">Format Requirements</p>
                        <p className="text-sm text-slate-600">IEEE format (Word or PDF), 6 pages maximum</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-slate-800">Additional Pages</p>
                        <p className="text-sm text-slate-600">+2 additional pages allowed with ₹250/page extra</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-slate-800">Submission Deadline</p>
                        <p className="text-sm text-slate-600 font-semibold">August 25, 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Plagiarism Policy */}
        <section>
          <Card className="shadow-lg border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
                Plagiarism Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 p-6 rounded-lg">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800">Plagiarism Threshold</p>
                      <p className="text-slate-600">Less than 10% plagiarism allowed</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800">Detection Tools</p>
                      <p className="text-slate-600">
                        All submissions will be checked using reliable plagiarism detection tools
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800">Consequences</p>
                      <p className="text-slate-600">Violations will lead to immediate rejection</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-slate-600 text-sm">
                <strong>Important:</strong> All submissions must be original, unpublished, and plagiarism-free. Authors
                are responsible for ensuring their work meets these requirements.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Publication Information */}
        <section>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                Publications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-3">Peer Review Process</h4>
                  <p className="text-slate-600 text-sm mb-4">
                    All accepted papers will undergo a rigorous peer-review process by experts in the field.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      Double-blind review process
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      Expert reviewers from academia and industry
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      Comprehensive feedback provided
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-3">Journal Publications</h4>
                  <p className="text-slate-600 text-sm mb-4">
                    Selected papers will be recommended for publication in SCOPUS/WoS indexed journals.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      SCOPUS indexed journals
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      Web of Science indexed journals
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      High impact factor publications
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Abstract Submission Form */}
        <section>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800 flex items-center gap-3">
                <FileUp className="w-6 h-6 text-blue-600" />
                Submit Abstract
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Author Information */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Author Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName" className="text-sm font-medium text-slate-700">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className={`mt-1 ${errors.fullName ? "border-red-500" : ""}`}
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={`mt-1 ${errors.phone ? "border-red-500" : ""}`}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <Label htmlFor="affiliation" className="text-sm font-medium text-slate-700">
                        Affiliation / Institution <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="affiliation"
                        type="text"
                        value={formData.affiliation}
                        onChange={(e) => handleInputChange("affiliation", e.target.value)}
                        className={`mt-1 ${errors.affiliation ? "border-red-500" : ""}`}
                        placeholder="University or Organization"
                      />
                      {errors.affiliation && <p className="text-red-500 text-xs mt-1">{errors.affiliation}</p>}
                    </div>

                    <div>
                      <Label htmlFor="department" className="text-sm font-medium text-slate-700">
                        Department / Designation
                      </Label>
                      <Input
                        id="department"
                        type="text"
                        value={formData.department}
                        onChange={(e) => handleInputChange("department", e.target.value)}
                        className="mt-1"
                        placeholder="Computer Science Department"
                      />
                    </div>

                    <div>
                      <Label htmlFor="city" className="text-sm font-medium text-slate-700">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="city"
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className={`mt-1 ${errors.city ? "border-red-500" : ""}`}
                        placeholder="Your city"
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <Label htmlFor="state" className="text-sm font-medium text-slate-700">
                        State <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="state"
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        className={`mt-1 ${errors.state ? "border-red-500" : ""}`}
                        placeholder="Your state"
                      />
                      {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                    </div>

                    <div>
                      <Label htmlFor="country" className="text-sm font-medium text-slate-700">
                        Country <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="country"
                        type="text"
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        className={`mt-1 ${errors.country ? "border-red-500" : ""}`}
                        placeholder="Your country"
                      />
                      {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                    </div>
                  </div>
                </div>

                {/* Paper Details */}
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-600" />
                    Paper Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="paperTitle" className="text-sm font-medium text-slate-700">
                        Paper Title <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="paperTitle"
                        type="text"
                        value={formData.paperTitle}
                        onChange={(e) => handleInputChange("paperTitle", e.target.value)}
                        className={`mt-1 ${errors.paperTitle ? "border-red-500" : ""}`}
                        placeholder="Enter your paper title"
                      />
                      {errors.paperTitle && <p className="text-red-500 text-xs mt-1">{errors.paperTitle}</p>}
                    </div>

                    <div>
                      <Label htmlFor="keywords" className="text-sm font-medium text-slate-700">
                        Keywords <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="keywords"
                        type="text"
                        value={formData.keywords}
                        onChange={(e) => handleInputChange("keywords", e.target.value)}
                        className={`mt-1 ${errors.keywords ? "border-red-500" : ""}`}
                        placeholder="keyword1, keyword2, keyword3 (3-6 keywords)"
                      />
                      {errors.keywords && <p className="text-red-500 text-xs mt-1">{errors.keywords}</p>}
                      <p className="text-xs text-slate-500 mt-1">
                        Separate keywords with commas (3-6 keywords maximum)
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="domain" className="text-sm font-medium text-slate-700">
                        Domain / Track <span className="text-red-500">*</span>
                      </Label>
                      <Select value={formData.domain} onValueChange={(value) => handleInputChange("domain", value)}>
                        <SelectTrigger className={`mt-1 ${errors.domain ? "border-red-500" : ""}`}>
                          <SelectValue placeholder="Select your research domain" />
                        </SelectTrigger>
                        <SelectContent>
                          {domains.map((domain) => (
                            <SelectItem key={domain} value={domain}>
                              {domain}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.domain && <p className="text-red-500 text-xs mt-1">{errors.domain}</p>}
                    </div>

                    <div>
                      <Label htmlFor="abstractText" className="text-sm font-medium text-slate-700">
                        Abstract Text <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="abstractText"
                        value={formData.abstractText}
                        onChange={(e) => handleInputChange("abstractText", e.target.value)}
                        className={`mt-1 min-h-[120px] ${errors.abstractText ? "border-red-500" : ""}`}
                        placeholder="Enter your abstract (200-300 words recommended)"
                      />
                      {errors.abstractText && <p className="text-red-500 text-xs mt-1">{errors.abstractText}</p>}
                      <p className="text-xs text-slate-500 mt-1">
                        Word count:{" "}
                        {
                          formData.abstractText
                            .trim()
                            .split(" ")
                            .filter((word) => word.length > 0).length
                        }
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="file" className="text-sm font-medium text-slate-700">
                        Upload Abstract (PDF/DOCX) - Optional
                      </Label>
                      <Input
                        id="file"
                        type="file"
                        accept=".pdf,.docx"
                        onChange={(e) => handleInputChange("file", e.target.files?.[0] || null)}
                        className="mt-1"
                      />
                      {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
                      <p className="text-xs text-slate-500 mt-1">Max file size: 2MB. Supported formats: PDF, DOCX</p>
                    </div>
                  </div>
                </div>

                {/* Terms and Submit */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                      className={errors.agreeTerms ? "border-red-500" : ""}
                    />
                    <Label htmlFor="agreeTerms" className="text-sm text-slate-700 leading-relaxed">
                      I declare this is original work and I agree to the terms of submission.{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                  </div>
                  {errors.agreeTerms && <p className="text-red-500 text-xs">{errors.agreeTerms}</p>}

                  {/* Submission Status Message */}
                  {submissionStatus !== 'idle' && submissionMessage && (
                    <div
                      className={`p-3 rounded-lg text-center font-medium ${
                        submissionStatus === 'success' ? 'bg-green-100 text-green-700' :
                        submissionStatus === 'error' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {submissionStatus === 'loading' && <Hourglass className="inline-block w-4 h-4 mr-2 animate-spin" />}
                      {submissionMessage}
                    </div>
                  )}

                  <div className="text-center pt-4">
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                      disabled={submissionStatus === 'loading'} // Disable button during submission
                    >
                      {submissionStatus === 'loading' ? 'Submitting...' : 'Submit Abstract'}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Post-Submission Process */}
        <section>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800 flex items-center gap-3">
                <Hourglass className="w-6 h-6 text-orange-500" />
                Post-Submission Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-orange-50 p-6 rounded-lg">
                <p className="text-slate-700 text-base leading-relaxed">
                  After sending your abstract, our internal peer review team will verify the submission. You will be
                  notified about the status of your abstract via email within 2-3 working days. Upon acceptance, you
                  will receive further instructions on full paper submission and conference registration.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Registration Details */}
        <section>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800 flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-green-600" />
                Conference Registration Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Research Scholars / Students */}
                <div className="bg-blue-50 p-6 rounded-lg shadow-md flex flex-col h-full">
                  <h4 className="font-bold text-blue-700 text-xl mb-2">Research Scholars / Students</h4>
                  <p className="text-3xl font-extrabold text-blue-600 mb-4">₹500</p>
                  <ul className="space-y-2 text-sm text-slate-700 flex-grow">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      Access to all sessions
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      Conference kit
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      Lunch & refreshments
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      Certificate of participation
                    </li>
                  </ul>
                </div>

                {/* Faculty & Scientist */}
                <div className="bg-green-50 p-6 rounded-lg shadow-md flex flex-col h-full">
                  <h4 className="font-bold text-green-700 text-xl mb-2">Faculty & Scientist</h4>
                  <p className="text-3xl font-extrabold text-green-600 mb-4">₹1000</p>
                  <ul className="space-y-2 text-sm text-slate-700 flex-grow">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      Access to all sessions
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-1" />
                      Conference kit
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      Lunch & refreshments
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      Certificate of participation
                    </li>
                  </ul>
                </div>

                {/* Industry Persons */}
                <div className="bg-orange-50 p-6 rounded-lg shadow-md flex flex-col h-full">
                  <h4 className="font-bold text-orange-700 text-xl mb-2">Industry Persons</h4>
                  <p className="text-3xl font-extrabold text-orange-600 mb-4">₹2500</p>
                  <ul className="space-y-2 text-sm text-slate-700 flex-grow">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      Access to all sessions
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      Conference kit
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      Lunch & refreshments
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      Certificate of participation
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      Networking opportunities
                    </li>
                  </ul>
                </div>

                {/* Foreign Participants */}
                <div className="bg-purple-50 p-6 rounded-lg shadow-md flex flex-col h-full">
                  <h4 className="font-bold text-purple-700 text-xl mb-2">Foreign Participants</h4>
                  <p className="text-3xl font-extrabold text-purple-600 mb-4">$100</p>
                  <ul className="space-y-2 text-sm text-slate-700 flex-grow">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      Access to all sessions
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      Conference kit
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      Lunch & refreshments
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      Certificate of participation
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      Networking opportunities
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </ConferenceLayout>
  );
}
