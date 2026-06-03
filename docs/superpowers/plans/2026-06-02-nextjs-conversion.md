# Marbella Next.js Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the Marbella Twin Towers vanilla HTML/CSS/JS marketing site into a Next.js 15 (App Router, TypeScript) project deployed to Vercel, replacing the Nodemailer/Gmail contact form with a Resend-backed Server Action, with Zod-validated inputs and 1:1 visual parity with the current site.

**Architecture:** App Router with server-rendered section components and leaf-level client islands for interactivity. One Server Action for the contact form, validated by a single Zod schema. Plain `<img>` tags. Existing CSS moved unchanged to `app/globals.css`. `next/font/google` for Playfair Display + Poppins.

**Tech Stack:** Next.js 15+, React 19, TypeScript 5, Zod 3, Resend 4, Vitest 2, Vercel.

**Spec:** `docs/superpowers/specs/2026-06-02-nextjs-conversion-design.md`

---

## Table of Contents

- [Task 1: Scaffold project](#task-1)
- [Task 2: env.ts (TDD)](#task-2)
- [Task 3: escape-html.ts (TDD)](#task-3)
- [Task 4: contact-schema.ts (TDD)](#task-4)
- [Task 5: resend.ts](#task-5)
- [Task 6: Server Action (TDD)](#task-6)
- [Task 7: app/layout.tsx + globals.css + icon.ico + smooth scroll](#task-7)
- [Task 8: app/page.tsx + SectionLabel + WhatsAppFloat](#task-8)
- [Task 9: Header + FloatingContactBar + Footer](#task-9)
- [Task 10: Hero section (static shell)](#task-10)
- [Task 11: About + Amenities + WhyChoose](#task-11)
- [Task 12: FloorPlan + Gallery](#task-12)
- [Task 13: Stats + Contact](#task-13)
- [Task 14: StickyHeader](#task-14)
- [Task 15: MobileMenu](#task-15)
- [Task 16: NavScrollSpy](#task-16)
- [Task 17: HeroCarousel (with parallax)](#task-17)
- [Task 18: FloorPlanTabs](#task-18)
- [Task 19: GalleryTabs](#task-19)
- [Task 20: GalleryLightbox](#task-20)
- [Task 21: StatsCounter](#task-21)
- [Task 22: RevealOnScroll](#task-22)
- [Task 23: ScrollToTop](#task-23)
- [Task 24: DisclaimerModal](#task-24)
- [Task 25: ContactForm](#task-25)
- [Task 26: FloatingForm](#task-26)
- [Task 27: Wire ContactForm into Contact section](#task-27)
- [Task 28: Download Unsplash images](#task-28)
- [Task 29: Rename local images](#task-29)
- [Task 30: Run all quality gates](#task-30)
- [Task 31: Manual smoke test](#task-31)
- [Task 32: README + .env.example polish](#task-32)
- [Task 33: Remove .env + final commit](#task-33)

---

<a id="task-1"></a>
## Task 1: Scaffold project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `vitest.config.ts`, `.gitignore`, `.env.example`, `app/layout.tsx` (stub), `app/page.tsx` (stub)

- [ ] **Step 1: Initialize git and create `.gitignore`**

```bash
cd /Users/harmeet/Projects/marbella
git init
git config user.email "dev@marbella.local"
git config user.name "Marbella Dev"
```

Create `.gitignore`:

```gitignore
.next/
node_modules/
.env
.env.local
.env*.local
.DS_Store
*.log
coverage/
```

- [ ] **Step 2: Remove the old server and JS files**

The Express server and vanilla JS are replaced by the Next.js server and React islands. Removing them now (before the first commit) keeps the initial commit focused on the new project.

```bash
cd /Users/harmeet/Projects/marbella
rm -f server.js
rm -f js/main.js
rmdir js 2>/dev/null || true
ls -la
```

Expected: `server.js` and `js/main.js` are gone. The `js/` directory is gone (or empty).

- [ ] **Step 3: Create `package.json`**

```json
{
  "name": "marbella-twin-towers",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "resend": "^4.0.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/node": "^22.10.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.6.0",
    "vitest": "^2.1.0",
    "@vitejs/plugin-react": "^4.3.0"
  }
}
```

- [ ] **Step 4: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", ".next"]
}
```

- [ ] **Step 5: Create `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
export default nextConfig;
```

- [ ] **Step 6: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    globals: false,
    include: ['__tests__/**/*.test.ts', '__tests__/**/*.test.tsx'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
});
```

- [ ] **Step 7: Create `.env.example`**

```bash
# Resend — https://resend.com/api-keys
RESEND_API_KEY=

# Sender (must be a verified domain in Resend, or use onboarding@resend.dev for testing)
CONTACT_FROM_EMAIL=Enquiries <enquiries@yourdomain.com>

# Recipient for enquiry emails (where leads land)
CONTACT_TO_EMAIL=
```

- [ ] **Step 8: Create stub `app/layout.tsx` and `app/page.tsx`**

`app/layout.tsx`:
```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

`app/page.tsx`:
```tsx
export default function Home() {
  return <main>Marbella — scaffold</main>;
}
```

- [ ] **Step 9: Install dependencies**

Run: `npm install`
Expected: dependencies install without errors. Lock file generated.

- [ ] **Step 10: Verify the dev server boots**

Run: `npm run dev` (in background; `Ctrl+C` after 3s)
Expected: "Ready in ..." line in the output, no compile errors. Visit `http://localhost:3000`, see "Marbella — scaffold" text.

Run: `npm run typecheck`
Expected: exits 0 with no errors.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js project with TypeScript, Vitest, gitignore"
```

---

<a id="task-2"></a>
## Task 2: `lib/env.ts` (TDD)

**Files:**
- Create: `lib/env.ts`, `__tests__/env.test.ts`

- [ ] **Step 1: Write the failing test**

`__tests__/env.test.ts`:
```ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('env', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('returns parsed env when all required vars are set', async () => {
    process.env.RESEND_API_KEY = 're_test';
    process.env.CONTACT_FROM_EMAIL = 'Enquiries <a@b.com>';
    process.env.CONTACT_TO_EMAIL = 'sales@b.com';
    const { env } = await import('../lib/env');
    expect(env.RESEND_API_KEY).toBe('re_test');
    expect(env.CONTACT_FROM_EMAIL).toBe('Enquiries <a@b.com>');
    expect(env.CONTACT_TO_EMAIL).toBe('sales@b.com');
  });

  it('throws with a clear message when RESEND_API_KEY is missing', async () => {
    delete process.env.RESEND_API_KEY;
    process.env.CONTACT_FROM_EMAIL = 'a@b.com';
    process.env.CONTACT_TO_EMAIL = 'c@d.com';
    await expect(import('../lib/env')).rejects.toThrow(/RESEND_API_KEY/);
  });

  it('throws when CONTACT_FROM_EMAIL is missing', async () => {
    process.env.RESEND_API_KEY = 're_test';
    delete process.env.CONTACT_FROM_EMAIL;
    process.env.CONTACT_TO_EMAIL = 'c@d.com';
    await expect(import('../lib/env')).rejects.toThrow(/CONTACT_FROM_EMAIL/);
  });

  it('throws when CONTACT_TO_EMAIL is missing', async () => {
    process.env.RESEND_API_KEY = 're_test';
    process.env.CONTACT_FROM_EMAIL = 'a@b.com';
    delete process.env.CONTACT_TO_EMAIL;
    await expect(import('../lib/env')).rejects.toThrow(/CONTACT_TO_EMAIL/);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run __tests__/env.test.ts`
Expected: FAIL — `lib/env` module not found.

- [ ] **Step 3: Implement `lib/env.ts`**

```ts
import { z } from 'zod';

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is required'),
  CONTACT_FROM_EMAIL: z.string().min(1, 'CONTACT_FROM_EMAIL is required'),
  CONTACT_TO_EMAIL: z.string().min(1, 'CONTACT_TO_EMAIL is required'),
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
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run __tests__/env.test.ts`
Expected: 4 tests pass.

- [ ] **Step 5: Commit**

```bash
git add lib/env.ts __tests__/env.test.ts
git commit -m "feat(env): zod-validated env access with clear error messages"
```

---

<a id="task-3"></a>
## Task 3: `lib/escape-html.ts` (TDD)

**Files:**
- Create: `lib/escape-html.ts`, `__tests__/escape-html.test.ts`

- [ ] **Step 1: Write the failing test**

`__tests__/escape-html.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { escapeHtml } from '../lib/escape-html';

describe('escapeHtml', () => {
  it('escapes <, >, &, \", and \'', () => {
    expect(escapeHtml(`<script>alert("xss&'")</script>`)).toBe(
      '&lt;script&gt;alert(&quot;xss&amp;&#39;&quot;)&lt;/script&gt;',
    );
  });

  it('leaves safe strings alone', () => {
    expect(escapeHtml('Hello, world!')).toBe('Hello, world!');
  });

  it('returns an empty string for empty input', () => {
    expect(escapeHtml('')).toBe('');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run __tests__/escape-html.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `lib/escape-html.ts`**

```ts
const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function escapeHtml(input: string): string {
  return input.replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch] ?? ch);
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run __tests__/escape-html.test.ts`
Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add lib/escape-html.ts __tests__/escape-html.test.ts
git commit -m "feat(lib): add escapeHtml helper for safe email rendering"
```

---

<a id="task-4"></a>
## Task 4: `lib/contact-schema.ts` (TDD)

**Files:**
- Create: `lib/contact-schema.ts`, `__tests__/contact-schema.test.ts`

- [ ] **Step 1: Write the failing test**

`__tests__/contact-schema.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { contactSchema } from '../lib/contact-schema';

describe('contactSchema', () => {
  const valid = {
    name: 'Jane Doe',
    phone: '+91 94789 97378',
    email: 'jane@example.com',
    message: 'Interested in 4 BHK',
  };

  it('accepts a valid input', () => {
    const r = contactSchema.safeParse(valid);
    expect(r.success).toBe(true);
  });

  it('rejects a name shorter than 2 chars', () => {
    const r = contactSchema.safeParse({ ...valid, name: 'J' });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues.some((i) => i.path[0] === 'name')).toBe(true);
    }
  });

  it('rejects an invalid email', () => {
    const r = contactSchema.safeParse({ ...valid, email: 'not-an-email' });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues.some((i) => i.path[0] === 'email')).toBe(true);
    }
  });

  it('rejects a phone with letters', () => {
    const r = contactSchema.safeParse({ ...valid, phone: 'abcdefgh' });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues.some((i) => i.path[0] === 'phone')).toBe(true);
    }
  });

  it('trims whitespace from name and accepts it', () => {
    const r = contactSchema.safeParse({ ...valid, name: '  Jane Doe  ' });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.name).toBe('Jane Doe');
  });

  it('rejects a whitespace-only name', () => {
    const r = contactSchema.safeParse({ ...valid, name: '   ' });
    expect(r.success).toBe(false);
  });

  it('accepts an empty message (floating form variant)', () => {
    const r = contactSchema.safeParse({ ...valid, message: '' });
    expect(r.success).toBe(true);
  });

  it('accepts a missing message (compact form posts without it)', () => {
    const { message: _omit, ...rest } = valid;
    const r = contactSchema.safeParse(rest);
    expect(r.success).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run __tests__/contact-schema.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `lib/contact-schema.ts`**

```ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name')
    .max(80, 'Name is too long'),
  phone: z
    .string()
    .trim()
    .regex(
      /^[+\d\s()-]{7,20}$/,
      'Please enter a valid phone number (7–20 digits, may include +, spaces, -, parentheses)',
    ),
  email: z.string().trim().email('Please enter a valid email'),
  message: z
    .string()
    .trim()
    .max(2000, 'Message is too long (max 2000 characters)')
    .optional()
    .or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run __tests__/contact-schema.test.ts`
Expected: 8 tests pass.

- [ ] **Step 5: Commit**

```bash
git add lib/contact-schema.ts __tests__/contact-schema.test.ts
git commit -m "feat(contact): add zod schema for contact form validation"
```

---

<a id="task-5"></a>
## Task 5: `lib/resend.ts`

**Files:**
- Create: `lib/resend.ts`

- [ ] **Step 1: Implement `lib/resend.ts`**

```ts
import { Resend } from 'resend';
import { env } from './env';

export const resend = new Resend(env.RESEND_API_KEY);
```

(No test — `env.ts` already covers the failure mode. Importing this module will throw at boot if env is missing, which is the desired behavior.)

- [ ] **Step 2: Verify it imports without error**

Run: `node -e "require('child_process').execSync('npx tsc --noEmit', { stdio: 'inherit' })"`
Expected: typecheck passes.

- [ ] **Step 3: Commit**

```bash
git add lib/resend.ts
git commit -m "feat(lib): add Resend client singleton"
```

---

<a id="task-6"></a>
## Task 6: `app/actions/contact.ts` Server Action (TDD)

**Files:**
- Create: `app/actions/contact.ts`, `__tests__/contact-action.test.ts`

- [ ] **Step 1: Write the failing test**

`__tests__/contact-action.test.ts`:
```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';

const sendMock = vi.fn();

vi.mock('../lib/resend', () => ({
  resend: { emails: { send: sendMock } },
}));

vi.mock('../lib/env', () => ({
  env: {
    RESEND_API_KEY: 're_test',
    CONTACT_FROM_EMAIL: 'Enquiries <enq@marbella.example>',
    CONTACT_TO_EMAIL: 'sales@marbella.example',
  },
}));

import { submitContact } from '../app/actions/contact';

function makeFormData(data: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(data)) fd.append(k, v);
  return fd;
}

describe('submitContact', () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  it('sends an email and returns success on valid input', async () => {
    sendMock.mockResolvedValue({ id: 'msg_1' });
    const fd = makeFormData({
      name: 'Jane Doe',
      phone: '+91 94789 97378',
      email: 'jane@example.com',
      message: 'Interested in 4 BHK',
    });
    const result = await submitContact({ status: 'idle' }, fd);
    expect(sendMock).toHaveBeenCalledOnce();
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'Enquiries <enq@marbella.example>',
        to: 'sales@marbella.example',
        replyTo: 'jane@example.com',
        subject: 'New Enquiry — Jane Doe',
      }),
    );
    expect(result).toEqual({ status: 'success' });
  });

  it('returns fieldErrors and does NOT send on invalid input', async () => {
    const fd = makeFormData({
      name: 'J',
      phone: 'abc',
      email: 'not-email',
      message: '',
    });
    const result = await submitContact({ status: 'idle' }, fd);
    expect(sendMock).not.toHaveBeenCalled();
    expect(result.status).toBe('error');
    if (result.status === 'error') {
      expect(result.fieldErrors?.name).toBeDefined();
      expect(result.fieldErrors?.phone).toBeDefined();
      expect(result.fieldErrors?.email).toBeDefined();
    }
  });

  it('returns a generic error when Resend throws', async () => {
    sendMock.mockRejectedValue(new Error('Resend down'));
    const fd = makeFormData({
      name: 'Jane Doe',
      phone: '+91 94789 97378',
      email: 'jane@example.com',
      message: '',
    });
    const result = await submitContact({ status: 'idle' }, fd);
    expect(result.status).toBe('error');
    if (result.status === 'error') {
      expect(result.message).toMatch(/something went wrong/i);
      expect(result.fieldErrors).toBeUndefined();
    }
  });

  it('treats a missing message field as valid (floating form variant)', async () => {
    sendMock.mockResolvedValue({ id: 'msg_1' });
    const fd = makeFormData({
      name: 'Jane Doe',
      phone: '+91 94789 97378',
      email: 'jane@example.com',
    });
    const result = await submitContact({ status: 'idle' }, fd);
    expect(sendMock).toHaveBeenCalledOnce();
    expect(result).toEqual({ status: 'success' });
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run __tests__/contact-action.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `app/actions/contact.ts`**

```ts
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
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run __tests__/contact-action.test.ts`
Expected: 4 tests pass.

- [ ] **Step 5: Run all tests and the typecheck**

Run: `npx vitest run && npm run typecheck`
Expected: 19 tests pass (4 env + 3 escapeHtml + 8 schema + 4 action); typecheck exits 0.

- [ ] **Step 6: Commit**

```bash
git add app/actions/contact.ts __tests__/contact-action.test.ts
git commit -m "feat(actions): add submitContact Server Action with Resend + Zod"
```

---

<a id="task-7"></a>
## Task 7: `app/layout.tsx` + `app/globals.css` + `app/icon.ico` + smooth scroll

**Files:**
- Create: `app/globals.css` (moved from `css/style.css`), `app/icon.ico` (moved from `favicon.ico`)
- Modify: `app/layout.tsx` (full version)
- Delete: `css/style.css`, `favicon.ico` (root)

- [ ] **Step 1: Move `css/style.css` → `app/globals.css`**

```bash
mv /Users/harmeet/Projects/marbella/css/style.css /Users/harmeet/Projects/marbella/app/globals.css
```

- [ ] **Step 2: Update font-family declarations in `app/globals.css`**

Open `app/globals.css` and replace the two `font-family` lines that reference Google Fonts (search for `Playfair Display` and `Poppins` outside of comments). Replace them with the CSS variable versions.

Find:
```css
font-family: 'Playfair Display', serif;
```
Replace with:
```css
font-family: var(--font-playfair), serif;
```

Find:
```css
font-family: 'Poppins', sans-serif;
```
Replace with:
```css
font-family: var(--font-poppins), sans-serif;
```

(Use `replace_all: true` if there are multiple occurrences in different selectors.)

- [ ] **Step 3: Add smooth scroll + sticky-header offset to `app/globals.css`**

Append at the end of `app/globals.css`:
```css
html {
  scroll-behavior: smooth;
}

section[id],
footer[id] {
  scroll-margin-top: 80px;
}
```

- [ ] **Step 4: Move `favicon.ico` → `app/icon.ico`**

```bash
mv /Users/harmeet/Projects/marbella/favicon.ico /Users/harmeet/Projects/marbella/app/icon.ico
rmdir /Users/harmeet/Projects/marbella/css 2>/dev/null || true
```

- [ ] **Step 5: Replace the stub `app/layout.tsx` with the full version**

```tsx
import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Poppins } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Marbella Twin Towers — Luxury Apartments in New Chandigarh',
  description:
    'The first and the iconic twin towers development in the Chandigarh Tri-City region. Modern luxury residences with world-class amenities.',
  openGraph: {
    title: 'Marbella Twin Towers — Luxury Apartments in New Chandigarh',
    description:
      'The first and the iconic twin towers development in the Chandigarh Tri-City region. Modern luxury residences with world-class amenities.',
    type: 'website',
    images: ['/hero-1.jpg'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Verify build**

Run: `npm run typecheck && npm run build`
Expected: typecheck and build both succeed. Build may warn about `hero-1.jpg` not being present (the asset is renamed in Task 29; the warning is non-fatal).

- [ ] **Step 7: Commit**

```bash
git add app/globals.css app/icon.ico app/layout.tsx
git rm css/style.css favicon.ico 2>/dev/null || true
git commit -m "feat(layout): root layout with next/font, metadata, smooth scroll"
```

---

<a id="task-8"></a>
## Task 8: `app/page.tsx` + `SectionLabel` + `WhatsAppFloat`

**Files:**
- Create: `components/ui/SectionLabel.tsx`, `components/sections/WhatsAppFloat.tsx`, `lib/sections.tsx` (intermediate barrel)

Note: The page is built up incrementally as new sections are added. This task creates the page with placeholders for sections that don't exist yet, and a barrel file we can extend.

- [ ] **Step 1: Create `components/ui/SectionLabel.tsx`**

```tsx
type Props = {
  children: React.ReactNode;
  variant?: 'default' | 'light';
};

export function SectionLabel({ children, variant = 'default' }: Props) {
  return <span className={`section-label ${variant === 'light' ? 'light' : ''}`.trim()}>{children}</span>;
}
```

- [ ] **Step 2: Create `components/sections/WhatsAppFloat.tsx`**

```tsx
export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919478997378"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}
```

- [ ] **Step 3: Replace `app/page.tsx` with the starter composition**

```tsx
import { WhatsAppFloat } from '@/components/sections/WhatsAppFloat';

export default function Home() {
  return (
    <>
      <main>
        {/* Sections added in Tasks 9–13 */}
        <p style={{ padding: '4rem 0', textAlign: 'center' }}>
          Marbella — sections coming in Tasks 9–13
        </p>
      </main>
      <WhatsAppFloat />
    </>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npm run typecheck && npm run build`
Expected: typecheck and build succeed.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx components/ui/SectionLabel.tsx components/sections/WhatsAppFloat.tsx
git commit -m "feat(sections): add page composition, SectionLabel, WhatsAppFloat"
```

---

<a id="task-9"></a>
## Task 9: Header + FloatingContactBar + Footer

**Files:**
- Create: `components/sections/Header.tsx`, `components/sections/Footer.tsx`, `components/islands/FloatingContactBar.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/islands/FloatingContactBar.tsx`**

This is a server component (no JS). It's a "client island" in the file layout only because it sits in `components/islands/`. The class is server-rendered.

```tsx
export function FloatingContactBar() {
  return (
    <div className="top-bar">
      <div className="container">
        <div className="top-bar-content">
          <div className="contact-info">
            <a href="tel:+919478997378" className="contact-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +91-9478997378
            </a>
            <a href="tel:+918699805332" className="contact-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +91-8699805332
            </a>
          </div>
          <div className="top-bar-right">
            <span className="rera">RERA: PBRERA-SAS80-PR0616</span>
            <a href="https://wa.me/919478997378" target="_blank" rel="noopener noreferrer" className="chat-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Click To Chat
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `components/sections/Header.tsx`**

This is the static markup; the mobile menu and sticky behavior are added in Tasks 14–15 as islands. The hamburger button's onClick is wired later.

```tsx
import { MobileMenu } from '@/components/islands/MobileMenu';
import { StickyHeader } from '@/components/islands/StickyHeader';

export function Header() {
  return (
    <StickyHeader>
      <nav className="navbar" id="navbar">
        <div className="container">
          <div className="nav-wrapper">
            <a href="#" className="logo">
              <span className="logo-main">MARBELLA</span>
              <span className="logo-sub">TWIN TOWERS</span>
            </a>
            <ul className="nav-menu" id="navMenu">
              <li><a href="#home" className="nav-link active">Home</a></li>
              <li><a href="#about" className="nav-link">About</a></li>
              <li><a href="#floor-plan" className="nav-link">Floor Plan</a></li>
              <li><a href="#gallery" className="nav-link">Gallery</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
            <a href="tel:+919478997378" className="nav-cta">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call Now
            </a>
            <MobileMenu />
          </div>
        </div>
      </nav>
    </StickyHeader>
  );
}
```

Note: `MobileMenu` and `StickyHeader` are referenced but don't exist yet. They are added in Tasks 14 and 15. To avoid a build break in the meantime, create empty stub files for them now (they will be filled in later tasks).

`components/islands/MobileMenu.tsx` (stub):
```tsx
export function MobileMenu() {
  return (
    <button className="hamburger" id="hamburger" aria-label="Toggle menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}
```

`components/islands/StickyHeader.tsx` (stub):
```tsx
import type { ReactNode } from 'react';

export function StickyHeader({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
```

- [ ] **Step 3: Create `components/sections/Footer.tsx`**

```tsx
import { DisclaimerModal } from '@/components/islands/DisclaimerModal';

export function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-main-footer">MARBELLA</span>
            <span className="logo-sub">TWIN TOWERS</span>
          </div>
          <div className="footer-links">
            <DisclaimerModal />
            <a href="#contact">Contact Us</a>
          </div>
          <p className="copyright">© Marbella Twin Towers 2025 | All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

Note: `DisclaimerModal` is referenced but doesn't exist yet. Add a stub.

`components/islands/DisclaimerModal.tsx` (stub):
```tsx
export function DisclaimerModal() {
  return (
    <a href="#" id="disclaimerLink">Disclaimer</a>
  );
}
```

- [ ] **Step 4: Update `app/page.tsx` to compose the new sections**

```tsx
import { FloatingContactBar } from '@/components/islands/FloatingContactBar';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppFloat } from '@/components/sections/WhatsAppFloat';

export default function Home() {
  return (
    <>
      <FloatingContactBar />
      <Header />
      <main>
        {/* Hero, About, Amenities, WhyChoose, FloorPlan, Stats, Gallery, Contact — added in Tasks 10–13 */}
        <p style={{ padding: '4rem 0', textAlign: 'center' }}>
          Marbella — middle sections coming in Tasks 10–13
        </p>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
```

- [ ] **Step 5: Verify build**

Run: `npm run typecheck && npm run build`
Expected: typecheck and build succeed.

- [ ] **Step 6: Visually verify in the browser**

Run: `npm run dev` and open `http://localhost:3000`.
Expected: top bar (black with phone numbers + RERA + Click To Chat), navbar with logo, nav links, Call Now button, hamburger. Footer with logo, Disclaimer link, Contact Us link, copyright.

- [ ] **Step 7: Commit**

```bash
git add components/sections/Header.tsx components/sections/Footer.tsx components/islands/FloatingContactBar.tsx components/islands/MobileMenu.tsx components/islands/StickyHeader.tsx components/islands/DisclaimerModal.tsx app/page.tsx
git commit -m "feat(sections): add Header, Footer, FloatingContactBar with stubs for islands"
```

---

<a id="task-10"></a>
## Task 10: Hero section (static shell)

**Files:**
- Create: `components/sections/Hero.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/sections/Hero.tsx`**

```tsx
import { HeroCarousel } from '@/components/islands/HeroCarousel';

export function Hero() {
  return (
    <section className="hero" id="home">
      <HeroCarousel
        images={[
          { src: '/hero-1.jpg', alt: 'Marbella Twin Towers' },
          { src: '/hero-2.avif', alt: 'Marbella Twin Towers at night' },
          { src: '/hero-3.avif', alt: 'Marbella Twin Towers aerial' },
        ]}
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="container">
          <div className="hero-text">
            <p className="hero-label">Welcome to</p>
            <h1 className="hero-title">
              <span className="highlight">Modern</span> & <span className="highlight">Luxury</span>
            </h1>
            <p className="hero-subtitle">An Address of Eminence</p>
            <p className="hero-description">Premium 4+1/5 BHK Super Luxury Residences in New Chandigarh</p>
            <div className="hero-buttons">
              <a href="#contact" className="btn btn-primary">Enquire Now</a>
              <a href="#about" className="btn btn-outline">Explore More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/islands/HeroCarousel.tsx` (stub)**

```tsx
type Slide = { src: string; alt: string };

export function HeroCarousel({ images }: { images: Slide[] }) {
  return (
    <>
      <div className="hero-slider">
        {images.map((img, i) => (
          <div
            key={img.src}
            className={`slide ${i === 0 ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img.src})` }}
            role="img"
            aria-label={img.alt}
          />
        ))}
      </div>
      <div className="slider-controls">
        <button className="slider-btn prev" id="prevSlide" aria-label="Previous slide">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button className="slider-btn next" id="nextSlide" aria-label="Next slide">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
      <div className="slider-dots" id="sliderDots">
        {images.map((_, i) => (
          <span key={i} className={`dot ${i === 0 ? 'active' : ''}`} />
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 3: Add `<Hero />` to `app/page.tsx`**

Replace the placeholder paragraph in `app/page.tsx` with:

```tsx
import { Hero } from '@/components/sections/Hero';
// ... other imports

<main>
  <Hero />
  {/* About, Amenities, WhyChoose, FloorPlan, Stats, Gallery, Contact — added in Tasks 11–13 */}
</main>
```

- [ ] **Step 4: Verify build**

Run: `npm run typecheck && npm run build`
Expected: succeeds.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Hero.tsx components/islands/HeroCarousel.tsx app/page.tsx
git commit -m "feat(sections): add Hero section with static shell + HeroCarousel stub"
```

---

<a id="task-11"></a>
## Task 11: About + Amenities + WhyChoose

**Files:**
- Create: `components/sections/About.tsx`, `components/sections/Amenities.tsx`, `components/sections/WhyChoose.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/sections/About.tsx`**

```tsx
import { SectionLabel } from '@/components/ui/SectionLabel';

export function About() {
  return (
    <section className="about section-padding" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image">
            <div className="image-wrapper">
              <img
                src="/about-exterior.jpg"
                alt="Marbella Twin Towers Exterior"
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
              />
              <div className="experience-badge">
                <span className="number">33</span>
                <span className="text">Floors<br />Tallest Tower</span>
              </div>
            </div>
          </div>
          <div className="about-content">
            <SectionLabel>About</SectionLabel>
            <h2 className="section-title">Marbella Twin Towers</h2>
            <p className="about-text">
              Marbella Twin Towers is a premier luxury high-rise residential project located in New Chandigarh, Mullanpur. Positioned at the very edge of Chandigarh, just 0 km away, it offers an exclusive and desirable living experience. With direct access from the Madhya Marg road extension, Marbella Twin Towers stands as the first prestigious address of New Chandigarh.
            </p>
            <p className="about-text">
              <strong>The First &amp; The Iconic Twin Towers Development In Chandigarh TRI-CITY Region.</strong>
            </p>
            <p className="about-text">
              Marbella Twin Towers stands tall in the heart of New Chandigarh, a striking symbol of architectural brilliance and modern luxury living. This iconic high-rise offers an exclusive collection of 5 BHK residences (4 BHK + Multipurpose Room + Store + Pooja Room), meticulously designed with premium specifications to set new benchmarks in opulence.
            </p>
            <div className="about-features">
              <div className="feature-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                <span>Luxury Living</span>
              </div>
              <div className="feature-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                <span>24/7 Security</span>
              </div>
              <div className="feature-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                <span>Premium Quality</span>
              </div>
            </div>
            <a href="#contact" className="btn btn-primary">Schedule a Visit</a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/sections/Amenities.tsx`**

```tsx
import { SectionLabel } from '@/components/ui/SectionLabel';

const amenities = [
  {
    title: 'Pollution Free Environment',
    description: 'Breathe clean air in our meticulously planned green surroundings',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: '24/7 Power Backup',
    description: 'Uninterrupted electricity and water supply for hassle-free living',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: 'Club House',
    description: 'Exclusive clubhouse with swimming pool, gym, and recreational facilities',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    title: 'Gated & Secured Society',
    description: '24/7 CCTV surveillance and professional security personnel',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: 'Kids Play Area',
    description: 'Safe and fun environment for children to play and grow',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: 'Parking Facility',
    description: 'Spacious covered parking for residents and visitors',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
];

export function Amenities() {
  return (
    <section className="amenities section-padding bg-light">
      <div className="container">
        <div className="section-header text-center">
          <SectionLabel>Amenities</SectionLabel>
          <h2 className="section-title">World-Class Facilities</h2>
          <p className="section-subtitle">Experience luxury at every corner</p>
        </div>
        <div className="amenities-grid">
          {amenities.map((a) => (
            <div className="amenity-card" key={a.title}>
              <div className="amenity-icon">{a.icon}</div>
              <h3>{a.title}</h3>
              <p>{a.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `components/sections/WhyChoose.tsx`**

```tsx
import { SectionLabel } from '@/components/ui/SectionLabel';

const points = [
  'Pollution free environment',
  '24*7 power backup & water supply',
  'Club House (swimming Pool, Gym)',
  'Gated and secured society with CCTV',
  'Kids play area',
];

export function WhyChoose() {
  return (
    <section className="why-choose section-padding">
      <div className="container">
        <div className="why-choose-grid">
          <div className="why-choose-content">
            <SectionLabel>Why Choose</SectionLabel>
            <h2 className="section-title">Marbella Twin Towers<br />Luxurious Highrise Apartments</h2>
            <ul className="why-choose-list">
              {points.map((p) => (
                <li key={p}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="why-choose-text">
              Marbella Twin Towers is designed to offer the perfect blend of comfort and luxury, complemented by breathtaking views of the city. Each 5 BHK residence is a masterpiece of elegance, thoughtfully crafted to redefine upscale living.
            </p>
            <a href="#contact" className="btn btn-primary">Book a Site Visit</a>
          </div>
          <div className="why-choose-image">
            <img
              src="/why-choose-interior.jpg"
              alt="Luxury Interior"
              loading="lazy"
              decoding="async"
              width="800"
              height="600"
            />
            <div className="image-overlay">
              <div className="overlay-content">
                <span className="number">4.36</span>
                <span className="label">Acres Total Area</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add the three sections to `app/page.tsx`**

```tsx
import { About } from '@/components/sections/About';
import { Amenities } from '@/components/sections/Amenities';
import { WhyChoose } from '@/components/sections/WhyChoose';
// ... other imports

<main>
  <Hero />
  <About />
  <Amenities />
  <WhyChoose />
  {/* FloorPlan, Stats, Gallery, Contact — added in Tasks 12–13 */}
</main>
```

- [ ] **Step 5: Verify build**

Run: `npm run typecheck && npm run build`
Expected: succeeds.

- [ ] **Step 6: Commit**

```bash
git add components/sections/About.tsx components/sections/Amenities.tsx components/sections/WhyChoose.tsx app/page.tsx
git commit -m "feat(sections): add About, Amenities, WhyChoose"
```

---

<a id="task-12"></a>
## Task 12: FloorPlan + Gallery

**Files:**
- Create: `components/sections/FloorPlan.tsx`, `components/sections/Gallery.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/sections/FloorPlan.tsx`**

```tsx
import { SectionLabel } from '@/components/ui/SectionLabel';
import { FloorPlanTabs } from '@/components/islands/FloorPlanTabs';

export function FloorPlan() {
  return (
    <section className="floor-plan section-padding bg-light" id="floor-plan">
      <div className="container">
        <div className="section-header text-center">
          <SectionLabel>Location &amp; Floor Plan</SectionLabel>
          <h2 className="section-title">Marbella Twin Towers</h2>
          <p className="section-subtitle">Explore our thoughtfully designed spaces</p>
        </div>
        <FloorPlanTabs
          panels={[
            {
              id: 'location',
              label: 'Location',
              content: (
                <>
                  <div className="map-container">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3424.828580677721!2d76.7647!3d30.7046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDQyJzE2LjYiTiA3NsKwNDUnNDkuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Marbella Twin Towers location"
                    />
                  </div>
                  <div className="location-info">
                    <h3>Prime Location</h3>
                    <p><strong>Address:</strong> New Chandigarh, Mullanpur</p>
                    <p><strong>Landmark:</strong> 0 km from Chandigarh, direct access from Madhya Marg road extension</p>
                    <ul className="location-features">
                      <li>5 mins from Chandigarh City Centre</li>
                      <li>Close to International Airport</li>
                      <li>Near upcoming Metro Station</li>
                      <li>Surrounded by premium developments</li>
                    </ul>
                  </div>
                </>
              ),
            },
            {
              id: 'floor-plan-4',
              label: '4 BHK + Servant',
              content: (
                <div className="floor-plan-grid">
                  <div className="floor-plan-image">
                    <img
                      src="/floorplan-4bhk.jpg"
                      alt="4 BHK Floor Plan"
                      loading="lazy"
                      decoding="async"
                      width="1200"
                      height="800"
                    />
                  </div>
                  <div className="floor-plan-details">
                    <h3>4 BHK + Servant Room</h3>
                    <ul>
                      <li>Super Area: 3,200 sq. ft.</li>
                      <li>4 Bedrooms + Multipurpose Room</li>
                      <li>Servant Room + Store</li>
                      <li>Pooja Room</li>
                      <li>3 Balconies with City View</li>
                    </ul>
                    <a href="#contact" className="btn btn-primary">Enquire Now</a>
                  </div>
                </div>
              ),
            },
            {
              id: 'floor-plan-5',
              label: '5 BHK + Servant',
              content: (
                <div className="floor-plan-grid">
                  <div className="floor-plan-image">
                    <img
                      src="/floorplan-5bhk.jpg"
                      alt="5 BHK Floor Plan"
                      loading="lazy"
                      decoding="async"
                      width="1200"
                      height="800"
                    />
                  </div>
                  <div className="floor-plan-details">
                    <h3>5 BHK + Servant Room</h3>
                    <ul>
                      <li>Super Area: 4,200 sq. ft.</li>
                      <li>5 Bedrooms + Multipurpose Room</li>
                      <li>Servant Room + Store</li>
                      <li>Pooja Room</li>
                      <li>4 Balconies with Panoramic View</li>
                    </ul>
                    <a href="#contact" className="btn btn-primary">Enquire Now</a>
                  </div>
                </div>
              ),
            },
            {
              id: 'master-plan',
              label: 'Master Plan',
              content: (
                <div className="floor-plan-grid">
                  <div className="floor-plan-image">
                    <img
                      src="/master-plan.jpg"
                      alt="Master Plan"
                      loading="lazy"
                      decoding="async"
                      width="1200"
                      height="800"
                    />
                  </div>
                  <div className="floor-plan-details">
                    <h3>Master Plan</h3>
                    <ul>
                      <li>Total Area: 4.36 Acres</li>
                      <li>Tower A: 33 Floors</li>
                      <li>Tower B: 33 Floors</li>
                      <li>Clubhouse: 50,000 sq. ft.</li>
                      <li>Landscaped Gardens &amp; Open Spaces</li>
                    </ul>
                    <a href="#contact" className="btn btn-primary">Download Brochure</a>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/islands/FloorPlanTabs.tsx` (stub)**

```tsx
import { useState, type ReactNode } from 'react';

type Panel = { id: string; label: string; content: ReactNode };

export function FloorPlanTabs({ panels }: { panels: Panel[] }) {
  const [activeId, setActiveId] = useState(panels[0]?.id);
  return (
    <>
      <div className="floor-plan-tabs">
        {panels.map((p) => (
          <button
            key={p.id}
            className={`tab-btn ${p.id === activeId ? 'active' : ''}`}
            onClick={() => setActiveId(p.id)}
            data-tab={p.id}
          >
            {p.label}
          </button>
        ))}
      </div>
      {panels.map((p) => (
        <div key={p.id} className={`tab-content ${p.id === activeId ? '' : 'hidden'}`} id={p.id}>
          {p.content}
        </div>
      ))}
    </>
  );
}
```

- [ ] **Step 3: Create `components/sections/Gallery.tsx`**

```tsx
import { SectionLabel } from '@/components/ui/SectionLabel';
import { GalleryTabs } from '@/components/islands/GalleryTabs';
import { GalleryLightbox } from '@/components/islands/GalleryLightbox';

const galleryImages = [
  { src: '/gallery-01.jpg', alt: 'Marbella View 1', layout: 'pg-tall' },
  { src: '/gallery-02.jpg', alt: 'Marbella View 2', layout: '' },
  { src: '/gallery-03.jpg', alt: 'Marbella View 3', layout: '' },
  { src: '/gallery-04.jpg', alt: 'Marbella View 4', layout: 'pg-wide' },
  { src: '/gallery-05.jpg', alt: 'Marbella View 5', layout: 'pg-tall' },
  { src: '/gallery-06.jpg', alt: 'Marbella View 6', layout: '' },
  { src: '/gallery-07.jpg', alt: 'Marbella View 7', layout: '' },
  { src: '/gallery-08.jpg', alt: 'Marbella View 8', layout: 'pg-wide' },
  { src: '/gallery-09.jpg', alt: 'Marbella View 9', layout: '' },
  { src: '/gallery-10.jpg', alt: 'Marbella View 10', layout: 'pg-tall' },
  { src: '/gallery-11.jpg', alt: 'Marbella View 11', layout: '' },
  { src: '/gallery-12.jpg', alt: 'Marbella View 12', layout: '' },
];

const videos = [
  { id: 'xyivXjYBRzA', label: 'Marbella Twin Towers — Video 1' },
  { id: 'NXAm5WsfWX4', label: 'Marbella Twin Towers — Video 2' },
  { id: 'Q4pJ4bKwYOo', label: 'Marbella Twin Towers — Video 3' },
  { id: 'w1eXlrbjw4w', label: 'Marbella Twin Towers — Video 4' },
];

export function Gallery() {
  return (
    <section className="gallery section-padding" id="gallery">
      <div className="container">
        <div className="section-header text-center">
          <SectionLabel>Gallery</SectionLabel>
          <h2 className="section-title">Experience Marbella Twin Towers</h2>
          <p className="section-subtitle">A Visual Journey of Luxury</p>
        </div>
        <GalleryTabs
          panels={[
            {
              id: 'images',
              label: 'Images',
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              ),
              content: (
                <GalleryLightbox images={galleryImages}>
                  <div className="premium-gallery">
                    {galleryImages.map((img) => (
                      <div className={`pg-item ${img.layout}`.trim()} key={img.src}>
                        <img
                          src={img.src}
                          alt={img.alt}
                          loading="lazy"
                          decoding="async"
                          width="600"
                          height="400"
                        />
                        <div className="pg-overlay"><span>View</span></div>
                      </div>
                    ))}
                  </div>
                </GalleryLightbox>
              ),
            },
            {
              id: 'videos',
              label: 'Videos',
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" />
                </svg>
              ),
              content: (
                <div className="premium-videos">
                  {videos.map((v) => (
                    <div className="pv-item" key={v.id}>
                      <iframe
                        src={`https://www.youtube.com/embed/${v.id}`}
                        title={v.label}
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                      <div className="pv-label">{v.label}</div>
                    </div>
                  ))}
                </div>
              ),
            },
          ]}
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `components/islands/GalleryTabs.tsx` (stub)**

```tsx
import { useState, type ReactNode } from 'react';

type Panel = { id: string; label: string; icon?: ReactNode; content: ReactNode };

export function GalleryTabs({ panels }: { panels: Panel[] }) {
  const [activeId, setActiveId] = useState(panels[0]?.id);
  return (
    <>
      <div className="gallery-tabs">
        {panels.map((p) => (
          <button
            key={p.id}
            className={`gallery-tab ${p.id === activeId ? 'active' : ''}`}
            onClick={() => setActiveId(p.id)}
            data-filter={p.id}
          >
            {p.icon}
            {p.label}
          </button>
        ))}
      </div>
      {panels.map((p) => (
        <div
          key={p.id}
          className={`gallery-panel ${p.id === activeId ? 'active' : ''}`}
          id={`gallery-${p.id}`}
        >
          {p.content}
        </div>
      ))}
    </>
  );
}
```

- [ ] **Step 5: Create `components/islands/GalleryLightbox.tsx` (stub)**

```tsx
'use client';
import { useState, type ReactNode } from 'react';

type Image = { src: string; alt: string };

export function GalleryLightbox({
  images,
  children,
}: {
  images: Image[];
  children: ReactNode;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <>
      <div onClick={(e) => {
        const target = e.target as HTMLElement;
        const item = target.closest('.pg-item') as HTMLElement | null;
        if (!item) return;
        const all = Array.from(document.querySelectorAll('.pg-item'));
        const idx = all.indexOf(item);
        if (idx >= 0) setOpenIndex(idx);
      }}>
        {children}
      </div>
      {openIndex !== null && (
        <div
          className="lightbox active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpenIndex(null);
          }}
        >
          <button
            className="lightbox-close"
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
          <button
            className="lightbox-nav prev"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i! - 1 + images.length) % images.length);
            }}
            aria-label="Previous"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button
            className="lightbox-nav next"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i! + 1) % images.length);
            }}
            aria-label="Next"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
          <div className="lightbox-content">
            <img src={images[openIndex].src} alt={images[openIndex].alt} />
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 6: Add FloorPlan and Gallery to `app/page.tsx`**

```tsx
import { FloorPlan } from '@/components/sections/FloorPlan';
import { Gallery } from '@/components/sections/Gallery';
// ... other imports

<main>
  <Hero />
  <About />
  <Amenities />
  <WhyChoose />
  <FloorPlan />
  <Gallery />
  {/* Stats, Contact — added in Task 13 */}
</main>
```

- [ ] **Step 7: Verify build**

Run: `npm run typecheck && npm run build`
Expected: succeeds.

- [ ] **Step 8: Commit**

```bash
git add components/sections/FloorPlan.tsx components/sections/Gallery.tsx components/islands/FloorPlanTabs.tsx components/islands/GalleryTabs.tsx components/islands/GalleryLightbox.tsx app/page.tsx
git commit -m "feat(sections): add FloorPlan + Gallery with tab and lightbox islands"
```

---

<a id="task-13"></a>
## Task 13: Stats + Contact

**Files:**
- Create: `components/sections/Stats.tsx`, `components/sections/Contact.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/sections/Stats.tsx`**

```tsx
import { StatsCounter } from '@/components/islands/StatsCounter';

const stats = [
  { target: 4.36, label: 'Acres Total Area' },
  { target: 33, label: 'Floors Tallest Tower' },
  { target: 50000, label: 'Sq. Ft. Clubhouse' },
  { target: 264, label: 'Super Luxury Residences' },
];

export function Stats() {
  return (
    <section className="statistics">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s) => (
            <div className="stat-item" key={s.label}>
              <StatsCounter target={s.target} />
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/islands/StatsCounter.tsx` (stub)**

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';

function formatNumber(num: number, target: number): string {
  if (target >= 1000) return Math.floor(num).toLocaleString();
  if (target % 1 !== 0) return num.toFixed(2);
  return Math.floor(num).toString();
}

export function StatsCounter({ target }: { target: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const duration = 2000;
            const stepMs = 16;
            const totalSteps = duration / stepMs;
            const increment = target / totalSteps;
            let current = 0;
            const tick = () => {
              current += increment;
              if (current < target) {
                setValue(current);
                requestAnimationFrame(tick);
              } else {
                setValue(target);
              }
            };
            tick();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="stat-number" data-target={target} ref={ref}>
      {formatNumber(value, target)}
    </div>
  );
}
```

- [ ] **Step 3: Create `components/sections/Contact.tsx`**

This is the section shell with the form not yet wired (Task 25/27). The form is replaced with a placeholder div for now.

```tsx
import { SectionLabel } from '@/components/ui/SectionLabel';

export function Contact() {
  return (
    <section className="contact section-padding bg-dark" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info-section">
            <SectionLabel variant="light">Contact Us</SectionLabel>
            <h2 className="section-title light">Do you have any question?</h2>
            <p className="contact-desc">Experience luxury living at Marbella Twin Towers. Contact us today to learn more or schedule a visit. Your dream home awaits!</p>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h4>Address</h4>
                  <p>New Chandigarh, Mullanpur</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h4>Phone</h4>
                  <p><a href="tel:+919478997378">+91-9478997378</a></p>
                  <p><a href="tel:+918699805332">+91-8699805332</a></p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h4>Email</h4>
                  <p><a href="mailto:hvproperties26@gmail.com">hvproperties26@gmail.com</a></p>
                </div>
              </div>
            </div>
            <div className="rera-badge">
              <span>RERA Registration No:</span>
              <strong>PBRERA-SAS80-PR0616</strong>
            </div>
          </div>
          <div className="contact-form-section">
            <form className="contact-form" id="contactForm">
              <h3>Get In Touch</h3>
              <p className="form-note">Form wiring in Task 25/27</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add Stats and Contact to `app/page.tsx`**

```tsx
import { Stats } from '@/components/sections/Stats';
import { Contact } from '@/components/sections/Contact';
// ... other imports

<main>
  <Hero />
  <About />
  <Amenities />
  <WhyChoose />
  <Stats />
  <FloorPlan />
  <Gallery />
  <Contact />
</main>
```

- [ ] **Step 5: Verify build**

Run: `npm run typecheck && npm run build`
Expected: succeeds.

- [ ] **Step 6: Commit**

```bash
git add components/sections/Stats.tsx components/sections/Contact.tsx components/islands/StatsCounter.tsx app/page.tsx
git commit -m "feat(sections): add Stats (with counter) and Contact (shell only)"
```

---

<a id="task-14"></a>
## Task 14: StickyHeader (real implementation)

**Files:**
- Modify: `components/islands/StickyHeader.tsx`

- [ ] **Step 1: Replace the stub with the real implementation**

```tsx
'use client';
import { useEffect, useState, type ReactNode } from 'react';

export function StickyHeader({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={scrolled ? 'navbar-scrolled' : ''} data-scrolled={scrolled}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Verify the navbar still looks correct and the box-shadow appears after scrolling 100px**

Run: `npm run dev`. Visit `http://localhost:3000`. Scroll down.
Expected: at scroll > 100px, the navbar gains a box-shadow (driven by the existing CSS rule on `.navbar-scrolled` or a similar selector). If the existing CSS uses a different selector, the engineer adds a corresponding rule to `app/globals.css`.

If the original `main.js` set `navbar.style.boxShadow` directly, add this rule to `app/globals.css`:

```css
.navbar-scrolled #navbar {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
```

- [ ] **Step 3: Commit**

```bash
git add components/islands/StickyHeader.tsx app/globals.css
git commit -m "feat(islands): real StickyHeader with scroll listener"
```

---

<a id="task-15"></a>
## Task 15: MobileMenu (real implementation)

**Files:**
- Modify: `components/islands/MobileMenu.tsx`

- [ ] **Step 1: Replace the stub with the real implementation**

```tsx
'use client';
import { useState } from 'react';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <button
        className={`hamburger ${open ? 'active' : ''}`.trim()}
        id="hamburger"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <style>{`
        /* Scoped toggle: the existing CSS targets .nav-menu.active */
      `}</style>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.getElementById('navMenu')?.classList.toggle('active', ${open});`,
        }}
      />
    </>
  );
}
```

Wait — that approach is wrong (it imperatively mutates DOM on each render and doesn't compose well with React). Use the cleaner approach: render an inline class on the nav-menu via a portal-free prop, or use a separate "active" mechanism.

Replace the implementation with a clean React-friendly version that adds a class via state. Since the existing CSS uses `#navMenu.active`, we mirror that by having `MobileMenu` toggle a class on the same DOM node through a ref. But `MobileMenu` doesn't own the `<ul>` — that's in `Header.tsx`.

The cleanest fix: make the `<ul>` controlled by the menu state. Refactor `Header.tsx` slightly to render the menu and hamburger together with shared state. Simpler: keep the `<ul>` in `Header.tsx` and use a small `data-open` attribute on the parent. The CSS is updated to use `[data-open="true"] .nav-menu`.

**Final implementation** for `components/islands/MobileMenu.tsx`:

```tsx
'use client';
import { useState, type ReactNode } from 'react';
import type { ReactElement } from 'react';

type Props = { children: ReactNode };

export function MobileMenu({ children }: Props): ReactElement {
  const [open, setOpen] = useState(false);
  return (
    <div data-menu-open={open ? 'true' : 'false'} className="mobile-menu-wrapper">
      {children}
      <button
        className={`hamburger ${open ? 'active' : ''}`.trim()}
        id="hamburger"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  );
}
```

And refactor `components/sections/Header.tsx` to wrap the `<ul>` and the `<button>` together:

```tsx
import { MobileMenu } from '@/components/islands/MobileMenu';
import { StickyHeader } from '@/components/islands/StickyHeader';

export function Header() {
  return (
    <StickyHeader>
      <nav className="navbar" id="navbar">
        <div className="container">
          <div className="nav-wrapper">
            <a href="#" className="logo">
              <span className="logo-main">MARBELLA</span>
              <span className="logo-sub">TWIN TOWERS</span>
            </a>
            <MobileMenu>
              <ul className="nav-menu" id="navMenu">
                <li><a href="#home" className="nav-link active">Home</a></li>
                <li><a href="#about" className="nav-link">About</a></li>
                <li><a href="#floor-plan" className="nav-link">Floor Plan</a></li>
                <li><a href="#gallery" className="nav-link">Gallery</a></li>
                <li><a href="#contact" className="nav-link">Contact</a></li>
              </ul>
            </MobileMenu>
            <a href="tel:+919478997378" className="nav-cta">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call Now
            </a>
          </div>
        </div>
      </nav>
    </StickyHeader>
  );
}
```

- [ ] **Step 2: Add a CSS rule that toggles `.nav-menu.active` based on the wrapper's `data-menu-open`**

Append to `app/globals.css`:

```css
.mobile-menu-wrapper[data-menu-open="true"] .nav-menu {
  /* same as existing .nav-menu.active */
  display: block;
}

.mobile-menu-wrapper[data-menu-open="false"] .nav-menu {
  /* default: hidden on mobile */
}

@media (min-width: 769px) {
  .mobile-menu-wrapper[data-menu-open] .nav-menu {
    display: flex;
  }
}
```

(If the existing CSS already has media-query rules for `.nav-menu`, mirror them; the engineer inspects `app/globals.css` and applies the matching rules under the new selector.)

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev`. Click the hamburger.
Expected: nav menu opens/closes on mobile widths.

- [ ] **Step 4: Commit**

```bash
git add components/islands/MobileMenu.tsx components/sections/Header.tsx app/globals.css
git commit -m "feat(islands): real MobileMenu with state + refactored Header"
```

---

<a id="task-16"></a>
## Task 16: NavScrollSpy

**Files:**
- Create: `components/islands/NavScrollSpy.tsx`
- Modify: `components/sections/Header.tsx` (or a wrapper around the nav links)

- [ ] **Step 1: Create `components/islands/NavScrollSpy.tsx`**

```tsx
'use client';
import { useEffect, useState, type ReactNode } from 'react';

const SECTIONS = ['home', 'about', 'floor-plan', 'gallery', 'contact'];

export function NavScrollSpy({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const id = visible[0].target.id;
          if (SECTIONS.includes(id)) setActiveId(id);
        }
      },
      { rootMargin: '-100px 0px -50% 0px', threshold: [0, 0.1, 0.5, 1] },
    );

    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div data-active-section={activeId} className="nav-scroll-spy">
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Wrap the `<ul class="nav-menu">` with `<NavScrollSpy>` in `Header.tsx`**

Update `components/sections/Header.tsx` — wrap the `<ul>` (which is already inside `<MobileMenu>`) with `<NavScrollSpy>`:

```tsx
import { MobileMenu } from '@/components/islands/MobileMenu';
import { StickyHeader } from '@/components/islands/StickyHeader';
import { NavScrollSpy } from '@/components/islands/NavScrollSpy';

// ... inside the return:
<MobileMenu>
  <NavScrollSpy>
    <ul className="nav-menu" id="navMenu">
      {/* links as before */}
    </ul>
  </NavScrollSpy>
</MobileMenu>
```

- [ ] **Step 3: Add CSS that highlights the active link**

Append to `app/globals.css`:

```css
.nav-scroll-spy[data-active-section="home"] .nav-link[href="#home"],
.nav-scroll-spy[data-active-section="about"] .nav-link[href="#about"],
.nav-scroll-spy[data-active-section="floor-plan"] .nav-link[href="#floor-plan"],
.nav-scroll-spy[data-active-section="gallery"] .nav-link[href="#gallery"],
.nav-scroll-spy[data-active-section="contact"] .nav-link[href="#contact"] {
  /* mirror existing .nav-link.active styles */
  color: #c5a47e;
  font-weight: 600;
}
```

(Inspect `app/globals.css` for the existing `.nav-link.active` rule and copy its declarations into the block above.)

- [ ] **Step 4: Verify in the browser**

Run: `npm run dev`. Scroll through the page.
Expected: the matching nav link highlights as each section enters the viewport.

- [ ] **Step 5: Commit**

```bash
git add components/islands/NavScrollSpy.tsx components/sections/Header.tsx app/globals.css
git commit -m "feat(islands): NavScrollSpy via IntersectionObserver"
```

---

<a id="task-17"></a>
## Task 17: HeroCarousel (real implementation with parallax)

**Files:**
- Modify: `components/islands/HeroCarousel.tsx`

- [ ] **Step 1: Replace the stub with the real implementation**

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';

type Slide = { src: string; alt: string };

export function HeroCarousel({ images }: { images: Slide[] }) {
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 5000);
    return () => clearInterval(id);
  }, [images.length]);

  // Parallax
  useEffect(() => {
    const onScroll = () => {
      if (!sliderRef.current) return;
      const offset = window.scrollY * 0.5;
      const active = sliderRef.current.querySelector<HTMLElement>('.slide.active');
      if (active) active.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (i: number) => {
    setCurrent(((i % images.length) + images.length) % images.length);
  };

  return (
    <>
      <div className="hero-slider" ref={sliderRef}>
        {images.map((img, i) => (
          <div
            key={img.src}
            className={`slide ${i === current ? 'active' : ''}`.trim()}
            style={{ backgroundImage: `url(${img.src})`, willChange: 'transform' }}
            role="img"
            aria-label={img.alt}
            aria-hidden={i !== current}
          />
        ))}
      </div>
      <div className="slider-controls">
        <button className="slider-btn prev" aria-label="Previous slide" onClick={() => go(current - 1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button className="slider-btn next" aria-label="Next slide" onClick={() => go(current + 1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
      <div className="slider-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? 'active' : ''}`.trim()}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify in the browser**

Run: `npm run dev`. Load `http://localhost:3000`.
Expected: hero auto-advances every 5s; prev/next arrows and dots work; on scroll, the active slide translates down at half the scroll speed.

- [ ] **Step 3: Commit**

```bash
git add components/islands/HeroCarousel.tsx
git commit -m "feat(islands): real HeroCarousel with auto-advance, dots, parallax"
```

---

<a id="task-18"></a>
## Task 18: FloorPlanTabs (real)

**Files:**
- Modify: `components/islands/FloorPlanTabs.tsx`

- [ ] **Step 1: Add `'use client'` directive**

```tsx
'use client';
import { useState, type ReactNode } from 'react';

type Panel = { id: string; label: string; content: ReactNode };

export function FloorPlanTabs({ panels }: { panels: Panel[] }) {
  const [activeId, setActiveId] = useState(panels[0]?.id);
  return (
    <>
      <div className="floor-plan-tabs">
        {panels.map((p) => (
          <button
            key={p.id}
            className={`tab-btn ${p.id === activeId ? 'active' : ''}`}
            onClick={() => setActiveId(p.id)}
            data-tab={p.id}
          >
            {p.label}
          </button>
        ))}
      </div>
      {panels.map((p) => (
        <div key={p.id} className={`tab-content ${p.id === activeId ? '' : 'hidden'}`} id={p.id}>
          {p.content}
        </div>
      ))}
    </>
  );
}
```

- [ ] **Step 2: Verify in the browser**

Run: `npm run dev`. Click each tab.
Expected: only the selected tab's content is visible.

- [ ] **Step 3: Commit**

```bash
git add components/islands/FloorPlanTabs.tsx
git commit -m "feat(islands): FloorPlanTabs marked client (was already client-eligible stub)"
```

---

<a id="task-19"></a>
## Task 19: GalleryTabs (real)

**Files:**
- Modify: `components/islands/GalleryTabs.tsx`

- [ ] **Step 1: Add `'use client'` directive**

```tsx
'use client';
import { useState, type ReactNode } from 'react';

type Panel = { id: string; label: string; icon?: ReactNode; content: ReactNode };

export function GalleryTabs({ panels }: { panels: Panel[] }) {
  const [activeId, setActiveId] = useState(panels[0]?.id);
  return (
    <>
      <div className="gallery-tabs">
        {panels.map((p) => (
          <button
            key={p.id}
            className={`gallery-tab ${p.id === activeId ? 'active' : ''}`}
            onClick={() => setActiveId(p.id)}
            data-filter={p.id}
          >
            {p.icon}
            {p.label}
          </button>
        ))}
      </div>
      {panels.map((p) => (
        <div
          key={p.id}
          className={`gallery-panel ${p.id === activeId ? 'active' : ''}`}
          id={`gallery-${p.id}`}
        >
          {p.content}
        </div>
      ))}
    </>
  );
}
```

- [ ] **Step 2: Verify in the browser**

Click each tab.
Expected: panel switches; YouTube iframes lazy-load.

- [ ] **Step 3: Commit**

```bash
git add components/islands/GalleryTabs.tsx
git commit -m "feat(islands): GalleryTabs marked client"
```

---

<a id="task-20"></a>
## Task 20: GalleryLightbox (real — already implemented, polish)

**Files:**
- Modify: `components/islands/GalleryLightbox.tsx`

The implementation in Task 12 (stub) is already substantially correct. Polish it: add keyboard support (Escape closes, ArrowLeft/Right navigate), improve the click-outside-to-close logic, and ensure `body` overflow is locked while open.

- [ ] **Step 1: Replace with the polished version**

```tsx
'use client';
import { useEffect, useState, type ReactNode } from 'react';

type Image = { src: string; alt: string };

export function GalleryLightbox({
  images,
  children,
}: {
  images: Image[];
  children: ReactNode;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
      if (e.key === 'ArrowLeft') setOpenIndex((i) => (i! - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setOpenIndex((i) => (i! + 1) % images.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openIndex, images.length]);

  return (
    <>
      <div
        onClick={(e) => {
          const target = e.target as HTMLElement;
          const item = target.closest('.pg-item') as HTMLElement | null;
          if (!item) return;
          const all = Array.from(document.querySelectorAll('.pg-item'));
          const idx = all.indexOf(item);
          if (idx >= 0) setOpenIndex(idx);
        }}
      >
        {children}
      </div>
      {openIndex !== null && (
        <div
          className="lightbox active"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpenIndex(null);
          }}
        >
          <button className="lightbox-close" onClick={() => setOpenIndex(null)} aria-label="Close">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
          <button
            className="lightbox-nav prev"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i! - 1 + images.length) % images.length);
            }}
            aria-label="Previous"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button
            className="lightbox-nav next"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i! + 1) % images.length);
            }}
            aria-label="Next"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
          <div className="lightbox-content">
            <img src={images[openIndex].src} alt={images[openIndex].alt} />
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Verify in the browser**

Open a thumbnail, navigate with arrows, press Escape.
Expected: lightbox opens, keyboard nav works, Escape closes, body scroll is locked.

- [ ] **Step 3: Commit**

```bash
git add components/islands/GalleryLightbox.tsx
git commit -m "feat(islands): polished GalleryLightbox with keyboard + body-scroll lock"
```

---

<a id="task-21"></a>
## Task 21: StatsCounter (real — already implemented, verify)

**Files:** (no changes — already correct from Task 13)

- [ ] **Step 1: Verify in the browser**

Run: `npm run dev`. Scroll to the statistics section.
Expected: numbers count up from 0 to their target values over ~2 seconds when the section enters the viewport.

- [ ] **Step 2: No commit needed**

---

<a id="task-22"></a>
## Task 22: RevealOnScroll

**Files:**
- Create: `components/islands/RevealOnScroll.tsx`
- Modify: `app/page.tsx` (wrap each section's content)

- [ ] **Step 1: Create the island**

```tsx
'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export function RevealOnScroll({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={visible ? 'fade-in-up' : ''}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Wrap each section's content in `app/page.tsx`**

```tsx
import { RevealOnScroll } from '@/components/islands/RevealOnScroll';

// inside <main>:
<RevealOnScroll><Hero /></RevealOnScroll>
<RevealOnScroll><About /></RevealOnScroll>
<RevealOnScroll><Amenities /></RevealOnScroll>
<RevealOnScroll><WhyChoose /></RevealOnScroll>
<RevealOnScroll><Stats /></RevealOnScroll>
<RevealOnScroll><FloorPlan /></RevealOnScroll>
<RevealOnScroll><Gallery /></RevealOnScroll>
<RevealOnScroll><Contact /></RevealOnScroll>
```

(If wrapping a section breaks its layout, the engineer inspects the section and applies the `fade-in-up` class directly to its inner wrapper rather than the section root.)

- [ ] **Step 3: Verify the `.fade-in-up` rule exists in `app/globals.css`**

If the rule is missing, append to `app/globals.css`:

```css
.fade-in-up {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in-up {
  /* trigger state — the class IS the trigger, applied on intersect */
  animation: fadeInUp 0.6s ease both;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 4: Verify in the browser**

Scroll through the page.
Expected: each section fades in from below as it enters the viewport.

- [ ] **Step 5: Commit**

```bash
git add components/islands/RevealOnScroll.tsx app/page.tsx app/globals.css
git commit -m "feat(islands): RevealOnScroll adds fade-in-up to sections on intersect"
```

---

<a id="task-23"></a>
## Task 23: ScrollToTop

**Files:**
- Create: `components/islands/ScrollToTop.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create the island**

```tsx
'use client';
import { useEffect, useState } from 'react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`scroll-top ${visible ? 'visible' : ''}`.trim()}
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
import { ScrollToTop } from '@/components/islands/ScrollToTop';

// inside the fragment returned by Home():
<ScrollToTop />
```

- [ ] **Step 3: Verify in the browser**

Scroll past 300px.
Expected: button appears in the bottom-right; click scrolls to top smoothly.

- [ ] **Step 4: Commit**

```bash
git add components/islands/ScrollToTop.tsx app/page.tsx
git commit -m "feat(islands): ScrollToTop appears after 300px scroll"
```

---

<a id="task-24"></a>
## Task 24: DisclaimerModal (real)

**Files:**
- Modify: `components/islands/DisclaimerModal.tsx`

- [ ] **Step 1: Replace the stub with the real implementation**

```tsx
'use client';
import { useEffect, useState } from 'react';

const DISCLAIMER_PARAGRAPHS = [
  'This website is operated by a licensed real estate agency and is intended solely for informational purposes. It is not the official website of the developer or the property. All logos, images, and branding materials displayed herein remain the exclusive intellectual property of the respective developer, and all rights are reserved.',
  'By accessing or using this website, you acknowledge and agree to the terms of this Disclaimer without reservation. The content on this website, including brochures and marketing collaterals, is provided for general information only. Nothing on this website constitutes an advertisement, offer for sale, booking, or invitation to purchase any unit in any project.',
  'This website is currently being updated. Visitors are advised not to rely on any information presented here for the purpose of making any booking or purchase decision. The agency shall not be held liable for any consequences arising from reliance on the information contained on this website.',
  'Thank you for visiting our website.',
];

export function DisclaimerModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        Disclaimer
      </a>
      {open && (
        <div className="disclaimer-modal" role="dialog" aria-modal="true">
          <div className="disclaimer-modal-overlay" onClick={() => setOpen(false)} />
          <div className="disclaimer-modal-box">
            <button className="disclaimer-close" onClick={() => setOpen(false)} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <h2 className="disclaimer-title">Disclaimer</h2>
            <div className="disclaimer-body">
              {DISCLAIMER_PARAGRAPHS.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Verify in the browser**

Click the Disclaimer link in the footer.
Expected: modal opens; X, overlay, and Escape all close it; body scroll is locked.

- [ ] **Step 3: Commit**

```bash
git add components/islands/DisclaimerModal.tsx
git commit -m "feat(islands): real DisclaimerModal with open/close + body-scroll lock"
```

---

<a id="task-25"></a>
## Task 25: ContactForm

**Files:**
- Create: `components/islands/ContactForm.tsx`

This is the most logic-heavy island. Live Zod validation, `useActionState` for the Server Action, `useFormStatus` for the submit button, error display, success state.

- [ ] **Step 1: Create the island**

```tsx
'use client';
import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitContact, type ContactState } from '@/app/actions/contact';
import { contactSchema } from '@/lib/contact-schema';

type Props = {
  variant?: 'full' | 'compact';
};

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary btn-full" disabled={pending}>
      {pending ? 'Sending…' : children}
    </button>
  );
}

function validateField(name: 'name' | 'phone' | 'email', value: string): string | null {
  const partial = contactSchema.pick({ [name]: true } as Record<typeof name, true>);
  const r = partial.safeParse({ [name]: value });
  if (r.success) return null;
  return r.error.issues[0]?.message ?? 'Invalid';
}

const initialState: ContactState = { status: 'idle' };

export function ContactForm({ variant = 'full' }: Props) {
  const [state, formAction] = useActionState(submitContact, initialState);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const nameError = touched.name ? validateField('name', name) : null;
  const phoneError = touched.phone ? validateField('phone', phone) : null;
  const emailError = touched.email ? validateField('email', email) : null;

  const allValid =
    !validateField('name', name) &&
    !validateField('phone', phone) &&
    !validateField('email', email);

  if (state.status === 'success') {
    return (
      <div className="form-success" role="status">
        <h3>Thank you!</h3>
        <p>Our team will contact you within 24 hours.</p>
      </div>
    );
  }

  const fieldError = (key: 'name' | 'phone' | 'email') =>
    state.status === 'error' ? state.fieldErrors?.[key] : undefined;

  return (
    <form action={formAction} className="contact-form" noValidate>
      {variant === 'full' && <h3>Get In Touch</h3>}

      {state.status === 'error' && (
        <div className="form-error-banner" role="alert">
          {state.message}
        </div>
      )}

      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          aria-invalid={Boolean(nameError || fieldError('name'))}
        />
        {(nameError || fieldError('name')) && (
          <p className="field-error">{nameError || fieldError('name')}</p>
        )}
      </div>

      <div className="form-group">
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
          aria-invalid={Boolean(phoneError || fieldError('phone'))}
        />
        {(phoneError || fieldError('phone')) && (
          <p className="field-error">{phoneError || fieldError('phone')}</p>
        )}
      </div>

      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required={variant === 'full'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          aria-invalid={Boolean(emailError || fieldError('email'))}
        />
        {(emailError || fieldError('email')) && (
          <p className="field-error">{emailError || fieldError('email')}</p>
        )}
      </div>

      {variant === 'full' && (
        <div className="form-group">
          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      )}

      <SubmitButton>{variant === 'compact' ? 'Get Callback' : 'Submit Now'}</SubmitButton>
      {variant === 'full' && <p className="form-note">Our team will contact you within 24 hours</p>}
    </form>
  );
}
```

- [ ] **Step 2: Verify typecheck**

Run: `npm run typecheck`
Expected: passes.

- [ ] **Step 3: Commit (form is created but not yet wired into any section)**

```bash
git add components/islands/ContactForm.tsx
git commit -m "feat(islands): ContactForm with live Zod validation + Server Action wiring"
```

---

<a id="task-26"></a>
## Task 26: FloatingForm

**Files:**
- Create: `components/islands/FloatingForm.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create the island**

```tsx
'use client';
import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm';

export function FloatingForm() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 768) {
      const t = setTimeout(() => setCollapsed(true), 5000);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div className={`floating-form ${collapsed ? 'collapsed' : ''}`.trim()} id="floatingForm">
      <div className="form-header">
        <span>Get Best Deal</span>
        <button
          className="form-toggle"
          aria-label={collapsed ? 'Expand form' : 'Collapse form'}
          onClick={() => setCollapsed((c) => !c)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <polyline points={collapsed ? '6 9 12 15 18 9' : '18 15 12 9 6 15'} />
          </svg>
        </button>
      </div>
      {!collapsed && (
        <div className="form-body">
          <ContactForm variant="compact" />
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
import { FloatingForm } from '@/components/islands/FloatingForm';

// inside the fragment returned by Home(), after </Header>:
<FloatingForm />
```

- [ ] **Step 3: Verify in the browser**

Resize to mobile (or use DevTools), wait 5s.
Expected: form auto-collapses. Click the toggle: form expands/collapses. Submit: success message appears (no `message` field sent).

- [ ] **Step 4: Commit**

```bash
git add components/islands/FloatingForm.tsx app/page.tsx
git commit -m "feat(islands): FloatingForm with collapse toggle + mobile auto-collapse"
```

---

<a id="task-27"></a>
## Task 27: Wire ContactForm into Contact section

**Files:**
- Modify: `components/sections/Contact.tsx`

- [ ] **Step 1: Replace the placeholder form with `<ContactForm variant="full" />`**

In `components/sections/Contact.tsx`, replace:

```tsx
<form className="contact-form" id="contactForm">
  <h3>Get In Touch</h3>
  <p className="form-note">Form wiring in Task 25/27</p>
</form>
```

with:

```tsx
import { ContactForm } from '@/components/islands/ContactForm';

// inside the contact-form-section:
<ContactForm variant="full" />
```

- [ ] **Step 2: Verify in the browser**

Scroll to the contact section. Type a bad email; submit should remain disabled. Fix the email; submit enables; submit; success message appears. Confirm an email arrives at `CONTACT_TO_EMAIL` (Resend dashboard).

- [ ] **Step 3: Commit**

```bash
git add components/sections/Contact.tsx
git commit -m "feat(contact): wire ContactForm into the contact section"
```

---

<a id="task-28"></a>
## Task 28: Download Unsplash images

**Files:**
- Create: `public/about-exterior.jpg`, `public/why-choose-interior.jpg`, `public/floorplan-4bhk.jpg`, `public/floorplan-5bhk.jpg`, `public/master-plan.jpg`

⚠️ **Before running:** show the user the URL list below and confirm. Also: these URLs have query parameters that are essential to the dimensions; preserve them.

- [ ] **Step 1: Confirm the URL list with the user**

Display this list and wait for confirmation:

```
https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80
https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80
https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80
https://images.unsplash.com/photo-1600607687644-c7171b42498f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80
https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80
```

→ `public/about-exterior.jpg`
→ `public/why-choose-interior.jpg`
→ `public/floorplan-4bhk.jpg`
→ `public/floorplan-5bhk.jpg`
→ `public/master-plan.jpg`

- [ ] **Step 2: Download each file**

```bash
cd /Users/harmeet/Projects/marbella/public
curl -fL "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" -o about-exterior.jpg
curl -fL "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" -o why-choose-interior.jpg
curl -fL "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" -o floorplan-4bhk.jpg
curl -fL "https://images.unsplash.com/photo-1600607687644-c7171b42498f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" -o floorplan-5bhk.jpg
curl -fL "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" -o master-plan.jpg
ls -lh about-exterior.jpg why-choose-interior.jpg floorplan-4bhk.jpg floorplan-5bhk.jpg master-plan.jpg
```

Expected: 5 files present, each > 0 bytes, total ~500 KB. If any download fails, fall back: generate a 1×1 brand-color JPEG using ImageMagick or sips and add a TODO comment to replace later.

- [ ] **Step 3: Verify the images render in the browser**

Run: `npm run dev`. Visit `http://localhost:3000`. Scroll to About, WhyChoose, and FloorPlan.
Expected: images render correctly.

- [ ] **Step 4: Commit**

```bash
git add public/about-exterior.jpg public/why-choose-interior.jpg public/floorplan-4bhk.jpg public/floorplan-5bhk.jpg public/master-plan.jpg
git commit -m "chore(images): download Unsplash images locally"
```

---

<a id="task-29"></a>
## Task 29: Rename local images

**Files:**
- Rename: 3 hero banners + 12 WhatsApp JPEGs

⚠️ **Before running:** show the user the rename mapping and confirm.

- [ ] **Step 1: Confirm the rename mapping with the user**

```
public/Twin_tower_banner.jpg            →  public/hero-1.jpg
public/Twin_tower_banner_2.avif         →  public/hero-2.avif
public/Twin_tower_banner_3.avif         →  public/hero-3.avif

public/WhatsApp Image 2026-05-19 at 4.25.53 PM.jpeg    →  public/gallery-01.jpg
public/WhatsApp Image 2026-05-19 at 4.25.54 PM (1).jpeg →  public/gallery-02.jpg
public/WhatsApp Image 2026-05-19 at 4.25.54 PM (2).jpeg →  public/gallery-03.jpg
public/WhatsApp Image 2026-05-19 at 4.25.54 PM.jpeg    →  public/gallery-04.jpg
public/WhatsApp Image 2026-05-19 at 4.25.55 PM.jpeg    →  public/gallery-05.jpg
public/WhatsApp Image 2026-05-19 at 4.25.57 PM (1).jpeg →  public/gallery-06.jpg
public/WhatsApp Image 2026-05-19 at 4.25.57 PM (2).jpeg →  public/gallery-07.jpg
public/WhatsApp Image 2026-05-19 at 4.25.57 PM.jpeg    →  public/gallery-08.jpg
public/WhatsApp Image 2026-05-19 at 4.25.58 PM (1).jpeg →  public/gallery-09.jpg
public/WhatsApp Image 2026-05-19 at 4.25.58 PM (2).jpeg →  public/gallery-10.jpg
public/WhatsApp Image 2026-05-19 at 4.25.58 PM.jpeg    →  public/gallery-11.jpg
public/WhatsApp Image 2026-05-19 at 4.25.59 PM.jpeg    →  public/gallery-12.jpg
```

- [ ] **Step 2: Rename the files**

```bash
cd /Users/harmeet/Projects/marbella/public
mv "Twin_tower_banner.jpg" hero-1.jpg
mv "Twin_tower_banner_2.avif" hero-2.avif
mv "Twin_tower_banner_3.avif" hero-3.avif
mv "WhatsApp Image 2026-05-19 at 4.25.53 PM.jpeg" gallery-01.jpg
mv "WhatsApp Image 2026-05-19 at 4.25.54 PM (1).jpeg" gallery-02.jpg
mv "WhatsApp Image 2026-05-19 at 4.25.54 PM (2).jpeg" gallery-03.jpg
mv "WhatsApp Image 2026-05-19 at 4.25.54 PM.jpeg" gallery-04.jpg
mv "WhatsApp Image 2026-05-19 at 4.25.55 PM.jpeg" gallery-05.jpg
mv "WhatsApp Image 2026-05-19 at 4.25.57 PM (1).jpeg" gallery-06.jpg
mv "WhatsApp Image 2026-05-19 at 4.25.57 PM (2).jpeg" gallery-07.jpg
mv "WhatsApp Image 2026-05-19 at 4.25.57 PM.jpeg" gallery-08.jpg
mv "WhatsApp Image 2026-05-19 at 4.25.58 PM (1).jpeg" gallery-09.jpg
mv "WhatsApp Image 2026-05-19 at 4.25.58 PM (2).jpeg" gallery-10.jpg
mv "WhatsApp Image 2026-05-19 at 4.25.58 PM.jpeg" gallery-11.jpg
mv "WhatsApp Image 2026-05-19 at 4.25.59 PM.jpeg" gallery-12.jpg
ls gallery-*.jpg hero-*
```

Expected: 12 `gallery-*.jpg` files + 3 hero files, no WhatsApp files remaining.

- [ ] **Step 3: Verify the images render in the browser**

Run: `npm run dev`. Reload.
Expected: hero carousel and gallery show the renamed images; gallery-01.jpg is "pg-tall" (as configured in `components/sections/Gallery.tsx`).

- [ ] **Step 4: Commit**

```bash
cd /Users/harmeet/Projects/marbella
git add -A public/
git commit -m "chore(images): rename local images to semantic slugs"
```

---

<a id="task-30"></a>
## Task 30: Run all quality gates

**Files:** (no source changes — verification only)

- [ ] **Step 1: Lint**

Run: `npm run lint`
Expected: 0 errors. If there are warnings about unused imports or `'use client'` placement, fix them inline.

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: 0 errors.

- [ ] **Step 3: Tests**

Run: `npm test`
Expected: 19 tests pass (4 env + 3 escapeHtml + 8 schema + 4 action).

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: build succeeds; `npm start` boots the production server.

- [ ] **Step 5: Fix any failures inline**

If any gate fails, fix the underlying issue (do not silence the linter or use `as any`). Re-run the failing gate until it passes.

- [ ] **Step 6: Commit (if any fixes were made)**

```bash
git add -A
git commit -m "chore: quality gates green"
```

---

<a id="task-31"></a>
## Task 31: Manual smoke test

**Files:** (no source changes — verification only)

Run the full checklist from `docs/superpowers/specs/2026-06-02-nextjs-conversion-design.md` § "Manual Smoke Test Checklist". For each item, mark complete in the spec file (or in this task's checklist below) and fix any failures.

- [ ] Page loads at `http://localhost:3000` with no console errors.
- [ ] Hero carousel auto-advances; prev/next arrows work; active slide parallaxes on scroll.
- [ ] Mobile menu opens and closes.
- [ ] Header turns solid on scroll.
- [ ] Nav link highlights as you scroll through sections.
- [ ] All section content matches `DESIGN_DOC.md`.
- [ ] Sections reveal with fade-in-up as they enter the viewport.
- [ ] Stats counters animate when scrolled into view.
- [ ] Floor plan tabs switch between Location / 4 BHK / 5 BHK / Master Plan.
- [ ] Gallery tabs switch between Images and Videos; YouTube iframes load.
- [ ] Gallery thumbnails open in lightbox; prev/next/escape work.
- [ ] Floating "Get Best Deal" form: collapses/expands on header click; auto-collapses on mobile after 5s; submits successfully without `message` field.
- [ ] Contact form: type bad email → inline error → submit disabled.
- [ ] Fix the email → submit enables → submit → success message appears.
- [ ] Floating WhatsApp button is visible bottom-right and links to the right wa.me URL.
- [ ] Footer "Disclaimer" link opens disclaimer modal; closes on X, overlay click, or Escape.
- [ ] Smooth scroll: clicking nav links scrolls with 80px offset for the sticky header.
- [ ] Scroll-to-top button appears after 300px scroll; clicking it returns to top.
- [ ] Resend dashboard shows the test email arrived at `CONTACT_TO_EMAIL`.
- [ ] Build succeeds: `npm run build` produces a deployable `.next/`.
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 90.

If any item fails, fix the underlying code and re-run the checklist. Commit fixes as separate commits.

---

<a id="task-32"></a>
## Task 32: README + .env.example polish

**Files:**
- Create: `README.md`
- Modify: `.env.example`

- [ ] **Step 1: Polish `.env.example`**

```bash
# Resend — https://resend.com/api-keys
# Get your API key from the Resend dashboard.
RESEND_API_KEY=

# Sender address. Must be a verified domain in Resend, or use
# `onboarding@resend.dev` for testing (sends only to your Resend-account email).
CONTACT_FROM_EMAIL=Enquiries <enquiries@yourdomain.com>

# Recipient for enquiry emails (where leads land).
CONTACT_TO_EMAIL=
```

- [ ] **Step 2: Create `README.md`**

```markdown
# Marbella Twin Towers — Marketing Site

A single-page Next.js marketing site for the Marbella Twin Towers luxury
residential project in New Chandigarh. Built on Next.js 15 (App Router),
TypeScript, and Resend for the contact form.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the env template and fill in values:
   ```bash
   cp .env.example .env.local
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open <http://localhost:3000>.

## Environment Variables

| Var | Required | Notes |
|---|---|---|
| `RESEND_API_KEY` | yes | Get from <https://resend.com/api-keys> |
| `CONTACT_FROM_EMAIL` | yes | Verified sender in Resend. Use `onboarding@resend.dev` for testing. |
| `CONTACT_TO_EMAIL` | yes | Where enquiry emails are delivered. |

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server with HMR. |
| `npm run build` | Production build. |
| `npm run start` | Run the production build locally. |
| `npm run lint` | Lint with `next lint`. |
| `npm run typecheck` | Strict TypeScript check. |
| `npm test` | Run Vitest once. |
| `npm run test:watch` | Vitest watch mode. |

## Project Structure

```
app/                  Next.js App Router entrypoint (layout, page, Server Actions, global CSS)
components/sections/  Server components for each page section
components/islands/   Client components (interactive bits only)
components/ui/        Reusable presentational components
lib/                  Zod schemas, env access, Resend client, helpers
public/               Static images
__tests__/            Vitest specs
```

## Contact Form

The contact form submits to a Server Action
(`app/actions/contact.ts`) which:
1. Validates input with a Zod schema (`lib/contact-schema.ts`).
2. Sends an email via Resend with the user's details.

Failed validation returns typed errors that are rendered inline in the form.
The form is used twice — once in the contact section (full variant, with
message field) and once in the floating "Get Best Deal" panel (compact
variant, name/phone/email only).

## Deploy to Vercel

1. Push the repo to GitHub.
2. Import in Vercel.
3. Add the three env vars from `.env.example` in the Vercel project settings.
4. Deploy.

The Vercel build command is `next build`; the output is auto-detected.

## Image Assets

External Unsplash images used by the original site have been downloaded
into `public/` for self-hosting. Local image filenames are semantic
(`hero-1.jpg`, `gallery-01.jpg`, etc.).
```

- [ ] **Step 3: Commit**

```bash
git add README.md .env.example
git commit -m "docs: README and polished .env.example"
```

---

<a id="task-33"></a>
## Task 33: Remove `.env` and final commit

**Files:**
- Delete: `.env` (the original file with the real Gmail app password)

⚠️ **Important security step.** The original `.env` contains a real Gmail
app password that was exposed during the design session. It must be deleted
and the password rotated.

- [ ] **Step 1: Delete the file**

```bash
cd /Users/harmeet/Projects/marbella
rm -f .env
ls -la .env .env.local .env.example 2>&1
```

Expected: `.env` is gone. `.env.example` and `.env.local` (created by the
user from the example) remain.

- [ ] **Step 2: Rotate the Gmail app password**

Tell the user (do not do this for them): "Open <https://myaccount.google.com/apppasswords>, revoke the app password labelled for this project, and generate a new one. Update any other systems that used the old password."

- [ ] **Step 3: Commit a "no secrets" marker if the deletion changed tracked state**

If `.env` was tracked by git, remove it from the index and amend the
relevant commit, or add a fresh commit removing it.

```bash
git rm --cached .env 2>/dev/null || true
git add -A
git diff --cached --stat
```

If there are no changes to commit, that's fine — `.env` was already in
`.gitignore` (it is, from Task 1).

- [ ] **Step 4: Final verification**

Run: `npm run lint && npm run typecheck && npm test && npm run build`
Expected: all four pass. The build is deployable.

- [ ] **Step 5: Final commit (if any changes from Step 3)**

```bash
git commit -m "chore: remove .env containing exposed credentials" || echo "Nothing to commit"
```

- [ ] **Step 6: Tag the milestone**

```bash
git tag -a v2.0.0 -m "Next.js conversion complete"
git log --oneline | head -40
```

Expected: a clean history with ~33 commits corresponding to the tasks in
this plan. Tag `v2.0.0` marks the conversion milestone.

---

## Done

The conversion is complete. Recommended next steps for the user:
- Push to GitHub and import in Vercel.
- Configure the three env vars in Vercel.
- Verify a production deploy by submitting the form on the live URL.
- (Optional) Run Lighthouse on the production deploy.



