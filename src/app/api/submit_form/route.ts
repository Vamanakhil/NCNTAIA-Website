import { NextRequest, NextResponse } from "next/server";
import { formSchema } from "@/lib/zod/schema";
import feedback from "@/lib/db";

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log(body);
    const result = await formSchema.safeParse(body);
    if (!result.success) {
        return NextResponse.json({
            message: "Form submission failed",
            error: result.error,
        });
    }
    try {
        const response = await feedback.create({
            firstname: body.firstname,
            lastname: body.lastname,
            email: body.email,
            mobile: body.mobile,
            institution: body.institution,
            designation: body.designation,
            state: body.state,
            country: body.country,
        });
        return NextResponse.json({
            message: "Form submitted successfully",
            response,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Form submission failed",
            error:
                error instanceof Error ? error.message : "Unknown error at db",
        });
    }
}
