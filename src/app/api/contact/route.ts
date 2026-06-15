import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { resend } from "@/lib/resend";
import { escapeHtml } from "@/lib/escape-html";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // Send email via Resend
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Enquiries <enquiries@mail.hvproperties.in>",
      to: process.env.CONTACT_TO_EMAIL || "info@hvproperties.in",
      replyTo: data.email,
      subject: `New Enquiry — ${data.name}`,
      html: `
        <h2>New Lead from Website</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        ${data.message ? `<p><strong>Message:</strong> ${escapeHtml(data.message)}</p>` : ""}
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your inquiry. We will contact you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          errors: [],
          message: "Validation failed",
        },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again or call us.",
      },
      { status: 500 }
    );
  }
}
