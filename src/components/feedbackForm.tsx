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
import { formSchema } from "@/lib/zod/schema";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { X } from "lucide-react";

export default function FeedbackForm() {
    const [keywords, setKeywords] = useState<string[]>([]);

    const addKeyword = (value: string) => {
        const trimmedValue = value.trim();
        if (trimmedValue && !keywords.includes(trimmedValue)) {
            const newKeywords = [...keywords, trimmedValue];
            setKeywords(newKeywords);
            // Update form value
            form.setValue("keywords", newKeywords.join(", "));
        }
    };

    const removeKeyword = (index: number) => {
        const newKeywords = keywords.filter((_, i) => i !== index);
        setKeywords(newKeywords);
        // Update form value
        form.setValue("keywords", newKeywords.join(", "));
    };

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        // console.log(data);
        const response = await axios.post("/api/submit_form", data);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            mobile: "",
            institution: "",
            designation: "",
            state: "",
            country: "",
        },
    });

    // console.log(form);

    return (
        <div>
            <div className="shadow-input mx-auto w-full min-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
                <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center">
                    Feedback Form
                </h2>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 text-center">
                    Fill the form to provide feedback
                </p>

                <form
                    className="my-8"
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto w-full max-w-screen px-2 md:max-w-4xl justify-center">
                        <div className="col-span-1 md:max-w-md">
                            <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                                <LabelInputContainer>
                                    <Label htmlFor="firstname">
                                        First name
                                    </Label>
                                    <Input
                                        id="firstname"
                                        placeholder=""
                                        type="text"
                                        {...form.register("firstname")}
                                    />
                                    {form.formState.errors.firstname && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {
                                                form.formState.errors.firstname
                                                    .message
                                            }
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
                                            {
                                                form.formState.errors.lastname
                                                    .message
                                            }
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
                                <Label htmlFor="institution">
                                    Institution / Organization
                                </Label>
                                <Input
                                    id="institution"
                                    placeholder=""
                                    type="text"
                                    {...form.register("institution")}
                                />
                                {form.formState.errors.institution && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {
                                            form.formState.errors.institution
                                                .message
                                        }
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
                                        {
                                            form.formState.errors.designation
                                                .message
                                        }
                                    </p>
                                )}
                            </LabelInputContainer>
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
                            <button
                                className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                                type="submit"
                            >
                                Submit &rarr;
                                <BottomGradient />
                            </button>
                        </div>
                        <div className="col-span-1 md:max-w-md">
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="email">Email</Label>
                                <Textarea
                                    id="email"
                                    placeholder=""
                                    {...form.register("email")}
                                    rows={4} // You can adjust the number of rows as needed
                                    className="resize-vertical" // Optional: allows vertical resizing only
                                />
                                {form.formState.errors.email && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {form.formState.errors.email.message}
                                    </p>
                                )}
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="keywords">Keywords</Label>
                                <Input
                                    id="keywords"
                                    placeholder="Add keyword and press Enter"
                                    className=""
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addKeyword(e.target.value);
                                            e.target.value = "";
                                        }
                                    }}
                                />
                                {/* Keywords display area below the input */}
                                {keywords.length > 0 && (
                                    <div className="border rounded-md p-2 min-h-[40px] flex flex-wrap gap-2 bg-gray-50">
                                        {keywords.map((keyword, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                                            >
                                                {keyword}
                                                <X
                                                    className="w-3 h-3 cursor-pointer hover:text-blue-600"
                                                    onClick={() =>
                                                        removeKeyword(index)
                                                    }
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
                            <LabelInputContainer className="mb-8">
                                <Label htmlFor="institution">
                                    Institution / Organization
                                </Label>
                                <Input
                                    id="institution"
                                    placeholder=""
                                    type="text"
                                    {...form.register("institution")}
                                />
                                {form.formState.errors.institution && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {
                                            form.formState.errors.institution
                                                .message
                                        }
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
                                        {
                                            form.formState.errors.designation
                                                .message
                                        }
                                    </p>
                                )}
                            </LabelInputContainer>
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
                            <button
                                className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                                type="submit"
                            >
                                Submit &rarr;
                                <BottomGradient />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
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
