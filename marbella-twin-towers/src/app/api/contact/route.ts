import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^[+]?[\d\s-]+$/, "Please enter a valid phone number"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // Log the submission (replace with actual email/database logic)
    console.log("=== New Contact Form Submission ===");
    console.log("Name:", data.name);
    console.log("Email:", data.email);
    console.log("Phone:", data.phone);
    console.log("Time:", new Date().toISOString());
    console.log("===================================");

    // TODO: Implement your preferred method:
    // 1. Send email via Nodemailer/Resend/SendGrid
    // 2. Save to database (Prisma/Supabase/MongoDB)
    // 3. Send to CRM (HubSpot/Salesforce)
    // 4. Send to Google Sheets

    // Example: Send notification email
    // await sendEmail({
    //   to: "info@tangentpromoters.com",
    //   subject: `New Inquiry from ${data.name}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${data.name}</p>
    //     <p><strong>Email:</strong> ${data.email}</p>
    //     <p><strong>Phone:</strong> ${data.phone}</p>
    //   `,
    // });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your inquiry. We will contact you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          errors: error.issues,
          message: "Validation failed",
        },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
