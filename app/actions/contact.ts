'use server';

import { contactSchema } from '@/lib/contact-schema';
import { resend } from '@/lib/resend';
import { env } from '@/lib/env';
import { escapeHtml } from '@/lib/escape-html';

export type ContactState =
  | { status: 'idle' }
  | { status: 'success' }
  | {
      status: 'error';
      message: string;
      fieldErrors?: Record<string, string>;
    };

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: formData.get('name') ?? '',
    phone: formData.get('phone') ?? '',
    email: formData.get('email') ?? '',
    message: formData.get('message') ?? '',
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === 'string' && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      status: 'error',
      message: 'Please fix the highlighted fields.',
      fieldErrors,
    };
  }

  try {
    const { name, phone, email, message } = parsed.data;
    await resend.emails.send({
      from: env.CONTACT_FROM_EMAIL,
      to: env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New Enquiry — ${name}`,
      html: `
        <h2>New Lead from Website</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong> ${escapeHtml(message || 'N/A')}</p>
      `,
    });
    return { status: 'success' };
  } catch (err) {
    console.error('Resend error:', err);
    return {
      status: 'error',
      message: 'Something went wrong. Please try again or call us.',
    };
  }
}