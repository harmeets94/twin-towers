import { z } from 'zod';

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is required'),
  CONTACT_FROM_EMAIL: z.string().min(1, 'CONTACT_FROM_EMAIL is required'),
  CONTACT_TO_EMAIL: z.string().email('CONTACT_TO_EMAIL must be a valid email').min(1, 'CONTACT_TO_EMAIL is required'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const missing = parsed.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
  throw new Error(
    `Invalid environment variables:\n${missing}\n` +
      `Copy .env.example to .env.local and fill in the values.`,
  );
}

export const env = parsed.data;