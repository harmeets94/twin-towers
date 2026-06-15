import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "Name is too long"),
  phone: z
    .string()
    .trim()
    .regex(
      /^[+\d\s()-]{7,20}$/,
      "Please enter a valid phone number (7–20 digits, may include +, spaces, -, parentheses)",
    ),
  email: z.string().trim().email("Please enter a valid email"),
  message: z
    .string()
    .trim()
    .max(2000, "Message is too long (max 2000 characters)")
    .optional()
    .or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactSchema>;
