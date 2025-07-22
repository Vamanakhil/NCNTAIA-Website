import { z } from "zod";

export const formSchema = z.object({
    firstname: z.string().min(2, "First name must be at least 2 characters long"),
    lastname: z.string().min(2, "Last name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    mobile: z.string().min(10, "Mobile number must be at least 10 characters long"),
    institution: z.string().min(2, "Institution name must be at least 2 characters long"),
    designation: z.string().min(1, "Please select a designation"),
    state: z.string().min(2, "State must be at least 2 characters long"),
    country: z.string().min(2, "Country must be at least 2 characters long"),
    keywords: z.string().min(1, "Please enter at least one keyword"),
});