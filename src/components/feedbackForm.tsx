"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "./ui/radio-group";
import { FileUpload } from "./ui/file-upload";
import { MultiSelect } from "./ui/multi-select";
import { SubmitButton } from "./ui/stateful-button";

const frameworksList = [
    { value: "AI in Health", label: "AI in Health" },
    { value: "CV", label: "CV" },
    { value: "NLP", label: "NLP" },
    { value: "ML", label: "ML" },
    { value: "DS", label: "DS" },
];
// Step-specific schemas
const step1Schema = z.object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    mobile: z.string().min(10, "Mobile number must be at least 10 digits").max(10, "Mobile number must be at most 10 digits"),
    designation: z.string().min(1, "Please select a designation"),
    institution: z.string().min(1, "Institution is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
});

const step2Schema = z.object({
    paper_title: z
        .string()
        .min(10, "Paper title must be at least 10 characters"),

    abstract: z.string().min(10, "Abstract must be at least 10 characters"),

    keywords: z.array(z.string()).min(3, "Please enter at least 3 keywords").max(7, "Please enter at most 7 keywords"),
    track: z.array(z.string()).min(1, "Please select a track"),
    type_of_submission: z.string().min(1, "Please select a type of submission"),
    research_domain: z.string().min(1, "Please select a research domain"),
    
});

const step3Schema = z.object({
    github: z
        .string()
        .url("Please enter a valid GitHub URL")
        .optional()
        .or(z.literal("")),
    author_links: z
        .string()
        .url("Please enter a valid LinkedIn URL")
        .optional()
        .or(z.literal("")),
    publish_journal: z.boolean().optional(),
    upload_paper: z.boolean().optional(),
    accept_terms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions",
      })
});

// Combined schema for final submission
const fullFormSchema = step1Schema.merge(step2Schema).merge(step3Schema);

export default function FeedbackForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [keywords, setKeywords] = useState<string[]>([]);
    const [tracks, setTracks] = useState<string[]>([]);

    const form = useForm<z.infer<typeof fullFormSchema>>({
        // Remove resolver to prevent automatic validation
        mode: "onSubmit",
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            mobile: "",
            designation: "",
            institution: "",
            state: "",
            country: "",
            paper_title: "",
            abstract: "",
            keywords: [],
            track: ["nlp",],
            type_of_submission: "",
            research_domain: "",
            github: "",
            author_links: "",
            publish_journal: false,
            upload_paper: false,
            accept_terms: false,
        },
    });

    const addKeyword = (value: string) => {
        const trimmedValue = value.trim();
        if (trimmedValue && !keywords.includes(trimmedValue)) {
            const newKeywords = [...keywords, trimmedValue];
            setKeywords(newKeywords);
            form.setValue("keywords", newKeywords);
        }
    };

    const removeKeyword = (index: number) => {
        const newKeywords = keywords.filter((_, i) => i !== index);
        setKeywords(newKeywords);
        form.setValue("keywords", newKeywords);
    };

    const addTrack = (value: string) => {
        const trimmedValue = value.trim();
        if (trimmedValue && !tracks.includes(trimmedValue)) {
            const newTracks = [...tracks, trimmedValue];
            setTracks(newTracks);
            form.setValue("track", newTracks);
        }
    };

    const removeTrack = (index: number) => {
        const newTracks = tracks.filter((_, i) => i !== index);
        setTracks(newTracks);
        form.setValue("track", newTracks);
    };

    const validateCurrentStep = async () => {
        const formData = form.getValues();

        // Clear previous errors first
        form.clearErrors();

        try {
            if (currentStep === 1) {
                step1Schema.parse(formData);
            } else if (currentStep === 2) {
                step2Schema.parse(formData);
            } else if (currentStep === 3) {
                step3Schema.parse(formData);
            }
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                error.issues.forEach((issue) => {
                    form.setError(issue.path[0] as any, {
                        type: "manual",
                        message: issue.message,
                    });
                });
            }
            return false;
        }
    };

    const handleNext = async () => {
        const isValid = await validateCurrentStep();
        if (true) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        // Clear errors when going back
        form.clearErrors();
        setCurrentStep((prev) => prev - 1);
    };

    const handleSubmit = async (data: z.infer<typeof fullFormSchema>) => {
        // Validate the complete form before submission
        try {
            const validatedData = fullFormSchema.parse(data);
            const response = await axios.post(
                "/api/submit_form",
                validatedData
            );
            console.log("Form submitted successfully:", response.data);
            // Handle successful submission (e.g., show success message, redirect)
        } catch (error) {
            if (error instanceof z.ZodError) {
                error.issues.forEach((issue) => {
                    form.setError(issue.path[0] as any, {
                        type: "manual",
                        message: issue.message,
                    });
                });
            } else {
                console.error("Error submitting form:", error);
                // Handle network or other errors
            }
        }
    };

    const renderStepIndicator = () => (
        <div className="flex justify-center mb-8 mt-5">
            <div className="flex items-center space-x-0">
                {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                step <= currentStep ?
                                    "bg-blue-600 text-white"
                                :   "bg-gray-200 text-gray-600"
                            }`}
                        >
                            {step}
                        </div>
                        {step < 3 && (
                            <div>
                                <ChevronsRight className={`mx-2 ${
                                    step < currentStep ? "text-blue-600" : (
                                        "text-gray-200"
                                    )
                                }`} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderStep1 = () => (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-6">
                Personal Information
            </h3>

            <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                <LabelInputContainer>
                    <Label htmlFor="firstname">First name</Label>
                    <Input
                        id="firstname"
                        placeholder=""
                        type="text"
                        {...form.register("firstname")}
                    />
                    {form.formState.errors.firstname && (
                        <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.firstname.message}
                        </p>
                    )}
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label htmlFor="lastname">Last name</Label>
                    <Input
                        id="lastname"
                        placeholder=""
                        type="text"
                        {...form.register("lastname")}
                    />
                    {form.formState.errors.lastname && (
                        <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.lastname.message}
                        </p>
                    )}
                </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                    id="email"
                    placeholder=""
                    type="email"
                    {...form.register("email")}
                />
                {form.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.email.message}
                    </p>
                )}
            </LabelInputContainer>
            <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                        id="mobile"
                        placeholder="+91"
                        type="number"
                        {...form.register("mobile")}
                    />
                    {form.formState.errors.mobile && (
                        <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.mobile.message}
                        </p>
                    )}
                </LabelInputContainer>

                <LabelInputContainer className="mb-8">
                    <Label htmlFor="designation">Designation</Label>
                    <Controller
                        name="designation"
                        control={form.control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger
                                    id="designation"
                                    className="w-full"
                                >
                                    <SelectValue placeholder="eg. Student" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="student">
                                        Student
                                    </SelectItem>
                                    <SelectItem value="researcher">
                                        Researcher
                                    </SelectItem>
                                    <SelectItem value="faculty">
                                        Faculty
                                    </SelectItem>
                                    <SelectItem value="industry-professional">
                                        Industry Professional
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {form.formState.errors.designation && (
                        <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.designation.message}
                        </p>
                    )}
                </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-8">
                <Label htmlFor="institution">Institution / Organization</Label>
                <Input
                    id="institution"
                    placeholder=""
                    type="text"
                    {...form.register("institution")}
                />
                {form.formState.errors.institution && (
                    <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.institution.message}
                    </p>
                )}
            </LabelInputContainer>
            <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="state">State</Label>
                    <Input
                        id="state"
                        placeholder=""
                        type="text"
                        {...form.register("state")}
                    />
                    {form.formState.errors.state && (
                        <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.state.message}
                        </p>
                    )}
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="country">Country</Label>
                    <Input
                        id="country"
                        placeholder=""
                        type="text"
                        {...form.register("country")}
                    />
                    {form.formState.errors.country && (
                        <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.country.message}
                        </p>
                    )}
                </LabelInputContainer>
            </div>
        </div>
    );
    
    const renderStep2 = () => (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-6">
                Paper Information
            </h3>

            <LabelInputContainer>
                <Label htmlFor="paper-title">Paper Title</Label>
                <Input
                    id="paper-title"
                    placeholder="Enter your paper title"
                    type="text"
                    {...form.register("paper_title")}
                />
                {form.formState.errors.paper_title && (
                    <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.paper_title.message}
                    </p>
                )}
            </LabelInputContainer>
            <LabelInputContainer>
                <Label htmlFor="abstract">Abstract / Description</Label>
                <Textarea
                    id="abstract"
                    placeholder="Describe your work, research, or interests"
                    {...form.register("abstract")}
                    rows={4}
                    className="resize-vertical"
                />
                {form.formState.errors.abstract && (
                    <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.abstract.message}
                    </p>
                )}
            </LabelInputContainer>
            <LabelInputContainer>
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                    id="keywords"
                    placeholder="Add keyword and press Enter"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            addKeyword((e.target as HTMLInputElement).value);
                            (e.target as HTMLInputElement).value = "";
                        }
                    }}
                />
                {keywords.length > 0 && (
                    <div className="border rounded-md p-2 min-h-[40px] flex flex-wrap gap-2 bg-gray-50 mt-2">
                        {keywords.map((keyword, index) => (
                            <span
                                key={index}
                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                            >
                                {keyword}
                                <X
                                    className="w-3 h-3 cursor-pointer hover:text-blue-600"
                                    onClick={() => removeKeyword(index)}
                                />
                            </span>
                        ))}
                    </div>
                )}
                {form.formState.errors.keywords && (
                    <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.keywords.message}
                    </p>
                )}
            </LabelInputContainer>

            <LabelInputContainer>
                <Label htmlFor="track">Track / Theme</Label>
                <div className="">
                    <MultiSelect
                        value={tracks}
                        options={frameworksList}
                        onValueChange={(value) => setTracks(value)}
                        defaultValue={[]}
                        placeholder="Select frameworks"
                        variant="inverted"
                        animation={2}
                        maxCount={3}
                    />
                </div>
                {form.formState.errors.track && (
                    <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.track.message}
                    </p>
                )}
            </LabelInputContainer>
            <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                <LabelInputContainer className="mb-8">
                    <Label htmlFor="designation">Type of Submission</Label>
                    <Controller
                        name="type_of_submission"
                        control={form.control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger
                                    id="type_of_submission"
                                    className="w-full"
                                >
                                    <SelectValue placeholder="" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="poster">
                                        Poster
                                    </SelectItem>
                                    <SelectItem value="full-paper">
                                        Full Paper
                                    </SelectItem>
                                    <SelectItem value="workshop-proposal">
                                        Workshop Proposal
                                    </SelectItem>
                                    <SelectItem value="demo">Demo</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {form.formState.errors.type_of_submission && (
                        <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.type_of_submission.message}
                        </p>
                    )}
                </LabelInputContainer>
                <LabelInputContainer className="mb-8">
                    <Label htmlFor="designation">Research Domain</Label>
                    <Controller
                        name="research_domain"
                        control={form.control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger
                                    id="research_domain"
                                    className="w-full"
                                >
                                    <SelectValue placeholder="" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="academic">
                                        Academic
                                    </SelectItem>
                                    <SelectItem value="industry">
                                        Industry
                                    </SelectItem>
                                    <SelectItem value="govt">Govt</SelectItem>
                                    <SelectItem value="ngo">NGO</SelectItem>
                                    <SelectItem value="startup">
                                        Startup
                                    </SelectItem>
                                    <SelectItem value="hobbyist">
                                        Hobbyist
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {form.formState.errors.research_domain && (
                        <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.research_domain.message}
                        </p>
                    )}
                </LabelInputContainer>
            </div>
            {/* <div
                className={cn(
                    "hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3"
                )}
            >
                <FileUpload />
            </div> */}
            <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3">

                <FileUpload />
            </Label>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-6">
                Professional Links & Skills
            </h3>

            <LabelInputContainer>
                <Label htmlFor="github">GitHub Repository/ Project Link</Label>
                <Input
                    id="github"
                    placeholder="https://github.com/username"
                    type="url"
                    {...form.register("github")}
                />
                {form.formState.errors.github && (
                    <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.github.message}
                    </p>
                )}
            </LabelInputContainer>

            <LabelInputContainer>
                <Label htmlFor="author_links">
                    ORCID iD / Google Scholar / LinkedIn
                </Label>
                <Input
                    id="author_links"
                    placeholder=""
                    type="url"
                    {...form.register("author_links")}
                />
                {form.formState.errors.author_links && (
                    <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.author_links.message}
                    </p>
                )}
            </LabelInputContainer>

            <LabelInputContainer>
                <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-3">
                        <Checkbox id="interested_in_publishing" />
                        <div className="grid gap-2">
                            <Label htmlFor="interested_in_publishing">
                                Interested in publishing in journal?
                            </Label>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Checkbox id="accept_terms_and_conditions" />
                        <div className="grid gap-2">
                            <Label htmlFor="accept_terms_and_conditions">
                                Accept terms and conditions
                            </Label>
                            <p className="text-muted-foreground text-sm">
                                By clicking this checkbox, you agree to
                                uploading to YouTube proceedings or publishing
                                papers
                            </p>
                        </div>
                    </div>

                    <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                        <Checkbox
                            id="accept_terms_and_conditions"
                            required
                            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                        />
                        <div className="grid gap-1.5 font-normal">
                            <p className="text-sm leading-none font-medium">
                                Accept terms and conditions
                            </p>
                            <p className="text-muted-foreground text-sm">
                                I confirm that this work is original and has not
                                been submitted elsewhere.
                            </p>
                        </div>
                    </Label>
                </div>
            </LabelInputContainer>
        </div>
    );

    const renderNavigationButtons = () => (
        <div className="flex justify-between mt-8">
            <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`flex items-center px-4 py-2 rounded-md font-medium ${
                    currentStep === 1 ?
                        "bg-gray-200 text-gray-400 cursor-not-allowed"
                    :   "bg-gray-600 text-white hover:bg-gray-700"
                }`}
            >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
            </button>

            {currentStep < 3 ?
                <button 
                type="button"
                    onClick={handleNext}
                    className="flex justify-center items-center px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            :  
            
            <SubmitButton
                type="submit"
                className="group/btn relative px-6 py-2 rounded-md font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            >
                Submit Form &rarr;
                {/* <BottomGradient /> */}
            </SubmitButton>
            }
        </div>
    );

    return (
        <div className="shadow-input mx-auto w-full max-w-2xl rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center">
                Feedback Form
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 text-center">
                Fill the form to provide feedback
            </p>

            {renderStepIndicator()}

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}

                {renderNavigationButtons()}
            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};

// 1. Author Details

// Collect info for corresponding author and allow adding co-authors:

// Field Type Required Notes
// Full Name Text ✅ First & Last Name
// Email ID Email ✅ For communication
// Mobile Number Text ✅ WhatsApp preferred
// Institution / Organization Text ✅ e.g., SNIST, IIITH, TCS
// Designation Dropdown/Text ✅ Student / Researcher / Faculty / Industry Professional
// Country Dropdown ✅ For international reach
// State / City Text ✅ Optional but useful

// ✅ Allow multiple co-author entries (min 1, max 5)

// 📄 2. Paper Information

// Field Type Required Notes
// Paper Title Text ✅ Max 200 characters
// Abstract Textarea ✅ 250–300 words
// Keywords Tag input ✅ Min 3, Max 7
// Track / Theme Dropdown / Multiselect ✅ Choose from defined tracks (AI in Health, CV, NLP, etc.)
// Type of Submission Dropdown ✅ Poster / Full Paper / Workshop Proposal / Demo
// Research Domain Dropdown ✅ Academic / Industry / Govt / NGO / Startup / Hobbyist
// PDF Upload File upload ✅ PDF only (4–6 pages)

// 🧠 3. Metadata for Future Use (Unique Features)

// a. GitHub Repo / Project Link (Optional)
// • For applied research or system demos

// b. ORCID iD / Google Scholar / LinkedIn
// • Optional field to help you assess author credibility or track impact

// c. Presentation Preference

// Field Type Required Notes
// Will you attend physically or virtually? Radio ✅ Physical / Virtual
// Consent for recording/publication? Checkbox ✅ For uploading to YouTube proceedings or publishing papers
// Interested in publishing in journal? Checkbox ✅ Flag for best-paper shortlisting

// d. Unique Submission ID (Auto-generated)
// • e.g., NCNTAIA25-0421
// • Generated in backend for tracking

// e. Comments / Notes (Optional)
// • Let authors add any notes for the reviewer

// 🧾 Final Section
// • ✅ Checkbox: “I confirm that this work is original and has not been submitted elsewhere.”
// • ✅ Submit button
// • ⏳ Loader with confirmation message + unique submission ID
// • 📧 Send confirmation email with:
// • Title
// • Submission ID
// • Summary of details
// • PDF uploaded
