# Marbella Twin Towers — Next.js Conversion Design

**Date:** 2026-06-02
**Status:** Approved — pending implementation
**Author:** Brainstorming session output

## Context

Marbella Twin Towers is a single-page luxury real estate marketing site. It is currently implemented as vanilla HTML/CSS/JS (one `index.html`, one 1600-line `style.css`, one 400-line `main.js`) served by a tiny Express server whose only job is forwarding contact-form submissions to a Gmail inbox via Nodemailer.

This spec describes converting the project to Next.js (App Router, TypeScript, Server Actions) deployed to Vercel, with the contact form reworked to use Resend and Zod. The visual design is locked in `DESIGN_DOC.md` and is preserved unchanged.

## Goals

- Modern, idiomatic Next.js codebase (App Router, Server Components, Server Actions).
- Type-safe end to end (TypeScript + Zod for runtime input validation).
- Replace the brittle Nodemailer/Gmail stack with Resend.
- Preserve the existing visual design exactly — no style changes.
- Ship as little JavaScript to the browser as possible.
- Be deployable to Vercel with no platform-specific code.

## Non-Goals

- Adding new pages, content, or features beyond what exists today.
- Visual redesign, copy changes, or new components.
- Migrating to a CMS, database, or any backend beyond the contact endpoint.
- Analytics, A/B testing, chat widgets, marketing pixels.
- Internationalization (English-only).

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15+ (App Router) |
| Language | TypeScript (strict) |
| Form submission | Server Actions |
| Runtime | Node.js (Vercel default) |
| Email | Resend |
| Validation | Zod |
| Styling | Existing CSS, moved to `app/globals.css` (no changes) |
| Fonts | `next/font/google` (Playfair Display + Poppins) |
| Images | Plain `<img>` tags with `loading="lazy"` / `fetchpriority="high"` |
| Testing | Vitest (unit tests for schema + Server Action) |
| Deployment | Vercel |

## Project Structure

```
marbella/
├── app/
│   ├── layout.tsx              # Root layout: <html>, fonts, metadata, global CSS
│   ├── page.tsx                # Server component. Composes all sections + islands.
│   ├── globals.css             # Moved from css/style.css (contents unchanged)
│   ├── icon.ico                # Moved from /favicon.ico
│   └── actions/
│       └── contact.ts          # Server Action: validate, send via Resend
│
├── components/
│   ├── sections/               # Server components, no client JS
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Amenities.tsx
│   │   ├── FloorPlan.tsx
│   │   ├── WhyChoose.tsx
│   │   ├── Gallery.tsx
│   │   ├── Stats.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── WhatsAppFloat.tsx
│   ├── islands/                # 'use client' — interactive bits only
│   │   ├── HeroCarousel.tsx           # carousel + parallax (combined)
│   │   ├── MobileMenu.tsx
│   │   ├── StickyHeader.tsx
│   │   ├── NavScrollSpy.tsx           # active-link highlighting
│   │   ├── FloorPlanTabs.tsx          # tab switching (Location / 4 BHK / 5 BHK / Master)
│   │   ├── GalleryTabs.tsx            # tab switching (Images / Videos)
│   │   ├── GalleryLightbox.tsx
│   │   ├── StatsCounter.tsx
│   │   ├── ScrollToTop.tsx
│   │   ├── FloatingForm.tsx           # collapsible "Get Best Deal" panel
│   │   ├── ContactForm.tsx
│   │   ├── DisclaimerModal.tsx
│   │   └── RevealOnScroll.tsx         # .fade-in-up on intersect
│   └── ui/
│       └── SectionLabel.tsx
│
├── lib/
│   ├── contact-schema.ts       # Zod schema for the form (single source of truth)
│   ├── resend.ts               # Resend client (single instance)
│   ├── env.ts                  # Zod-validated env access (fails fast on missing vars)
│   └── escape-html.ts          # Tiny helper for safe email-body rendering
│
├── public/                     # All images; renamed to semantic slugs (see below)
├── __tests__/                  # Vitest specs
│   ├── contact-schema.test.ts
│   └── contact-action.test.ts
│
├── .env.local                  # RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL (gitignored)
├── .env.example                # Template, committed
├── .gitignore
├── next.config.mjs
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

## Server vs Client Split

**Server components** (no `'use client'`, zero JS shipped):
`app/layout.tsx`, `app/page.tsx`, all files in `components/sections/` (including `WhatsAppFloat.tsx` — pure `<a>` tag, no JS), `components/ui/SectionLabel.tsx`, and `components/islands/FloatingContactBar.tsx` (CSS-only sticky; promoted to a client component later only if scroll-hide behaviour is added).

**Client islands** (`'use client'`):
- `HeroCarousel` — auto-advance + arrows + parallax (`setInterval`, scroll listener).
- `MobileMenu` — hamburger toggle + slide-out panel.
- `StickyHeader` — solid background after scroll > 100px (scroll listener).
- `NavScrollSpy` — IntersectionObserver-based active-link highlighting.
- `FloorPlanTabs` — switches between Location / 4 BHK / 5 BHK / Master Plan panels.
- `GalleryTabs` — switches between Images and Videos panels.
- `GalleryLightbox` — open/close modal, prev/next, escape-to-close.
- `StatsCounter` — count-up animation using `IntersectionObserver` + `requestAnimationFrame`.
- `ScrollToTop` — show after 300px scroll, smooth scroll on click.
- `FloatingForm` — collapsible "Get Best Deal" side panel; auto-collapses on mobile after 5s; calls Server Action without `message`.
- `ContactForm` — controlled inputs, live Zod validation, calls Server Action.
- `DisclaimerModal` — open/close on Disclaimer link click, X, overlay click, or Escape.
- `RevealOnScroll` — adds `.fade-in-up` to any direct child of any section that scrolls into view.

**Boundary placement rule:** islands are leaf-level — a server section embeds the relevant island as a child. Example: `Hero.tsx` (server) renders the static headline, then `<HeroCarousel images={...} />` for the auto-advancing background.

**Smooth scroll** (the 80px offset sticky-header behaviour) is implemented with CSS only:
- `html { scroll-behavior: smooth; }` in `globals.css`.
- `section[id], footer[id] { scroll-margin-top: 80px; }` in `globals.css`.
- The `<a href="#home">` style anchors just work; no JS handler required.

## Data Flow — Contact Form

### Zod schema (`lib/contact-schema.ts`)

```ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d\s()-]{7,20}$/, 'Please enter a valid phone number'),
  email: z.string().trim().email('Please enter a valid email'),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;
```

This schema is imported by both the Server Action (authoritative) and the client form (live feedback). The rules the user sees in the browser are exactly the rules the server enforces.

### Server Action (`app/actions/contact.ts`)

```ts
'use server';

import { contactSchema } from '@/lib/contact-schema';
import { resend } from '@/lib/resend';
import { env } from '@/lib/env';
import { escapeHtml } from '@/lib/escape-html';

export type ContactState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; message: string; fieldErrors?: Record<string, string> };

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    message: formData.get('message') ?? '',
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0] as string] = issue.message;
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

The action never throws to the client. All error paths return a typed `ContactState`.

### Resend client (`lib/resend.ts`)

```ts
import { Resend } from 'resend';
import { env } from './env';

export const resend = new Resend(env.RESEND_API_KEY);
```

### Env validation (`lib/env.ts`)

Validates at boot using Zod. Server crashes with a clear error on first run if any required var is missing. Required vars:

- `RESEND_API_KEY` — from Resend dashboard.
- `CONTACT_FROM_EMAIL` — verified sender in Resend (e.g. `Enquiries <enquiries@yourdomain.com>`).
- `CONTACT_TO_EMAIL` — recipient where leads land.

### Client form behavior (`components/islands/ContactForm.tsx`)

- `useActionState(submitContact, { status: 'idle' })` provides `state` and `formAction`.
- Local `useState` mirrors the four fields.
- On every keystroke, run `contactSchema.partial(...).safeParse(currentField)` and show an inline error if invalid **and** touched.
- Submit button disabled until all required fields pass Zod.
- `useFormStatus` shows "Sending…" spinner inside the button while the action is pending.
- On `state.status === 'success'`: replace the form with a thank-you message and reset state.
- On `state.status === 'error'`: show `state.message` at the top of the form, `state.fieldErrors` inline next to each field.
- The compact form inside `<FloatingForm>` reuses `<ContactForm>` with a `variant="compact"` prop that omits the `message` field (since the floating panel only collects name/phone/email).

## Styling, Fonts, Images, Metadata

### Styles

- `css/style.css` moves to `app/globals.css`, **contents unchanged**. Imported once in `app/layout.tsx`.
- Class names are global, matching current behavior. Collision risk is zero — single page, section-scoped class names.

### Fonts

`next/font/google` for Playfair Display and Poppins. Both are exposed as CSS variables (`--font-playfair`, `--font-poppins`) on `<body>`. The two relevant lines in `globals.css` change from `font-family: 'Playfair Display'` to `font-family: var(--font-playfair)` (and same for Poppins). No other style edits.

### Images

Plain `<img>` tags (not `next/image`). Reasons:
- Marketing site, no need for build-time optimization.
- Simpler configuration for `.avif` files.
- Less JS shipped.

Attributes:
- Hero images: `fetchpriority="high"`, no lazy loading.
- All other images: `loading="lazy"`, `decoding="async"`.

**Two image sources:**

1. **Local project images** (renamed in `public/`):
   - Hero banners: `Twin_tower_banner.jpg` → `hero-1.jpg`; `Twin_tower_banner_2.avif` → `hero-2.avif`; `Twin_tower_banner_3.avif` → `hero-3.avif`.
   - Gallery: the 12 `WhatsApp Image 2026-05-19 at ...` JPEGs map to `gallery-01.jpg` through `gallery-12.jpg`. The about section does **not** use a WhatsApp image — it uses the external Unsplash URL we're downloading (see below). The exact mapping is produced during implementation and reviewed by the user before files are renamed.

2. **External Unsplash images** (currently in `index.html` for the About, WhyChoose, and FloorPlan sections) are downloaded and re-hosted in `public/`. This avoids third-party network requests at runtime and the images become part of the deployment:
   - `public/about-exterior.jpg` (currently `https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?…`)
   - `public/why-choose-interior.jpg` (currently `https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?…`)
   - `public/floorplan-4bhk.jpg` (currently `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?…`)
   - `public/floorplan-5bhk.jpg` (currently `https://images.unsplash.com/photo-1600607687644-c7171b42498f?…`)
   - `public/master-plan.jpg` (currently `https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?…`)
   - The implementation plan includes a step to `curl` these to `public/`. (If any download fails due to Unsplash changing the URLs, the implementation falls back to a local placeholder JPG — a 1×1 brand-color image — with a TODO comment for later replacement.)

A complete rename + download mapping table is produced during implementation. The user reviews the mapping before any file is renamed or downloaded.

### Favicon

`favicon.ico` moves from project root to `app/icon.ico`. Next.js auto-detects and emits the right `<link>` tag.

### Metadata (`app/layout.tsx`)

```ts
export const metadata = {
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};
```

## Environment & Secrets

`.env.local` (gitignored):
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
CONTACT_FROM_EMAIL=Enquiries <enquiries@yourdomain.com>
CONTACT_TO_EMAIL=sales@yourdomain.com
```

`.env.example` (committed template) documents each var and points to Resend's dashboard for the API key. The README also notes that `onboarding@resend.dev` can be used as a temporary `CONTACT_FROM_EMAIL` for testing before a custom domain is verified.

## File Removals

| File | Action |
|---|---|
| `server.js` | Delete |
| `css/style.css` | Move to `app/globals.css` |
| `js/main.js` | Delete (logic split across islands) |
| `favicon.ico` (root) | Move to `app/icon.ico` |
| `package.json` | Rewrite (see below) |
| `package-lock.json` | Regenerate via `npm install` |
| `node_modules/` | Regenerate |
| `.env` (contains real Gmail app password) | Delete; user rotates the Gmail app password |

## Dependencies

`package.json` (final):

```json
{
  "dependencies": {
    "next": "^15",
    "react": "^19",
    "react-dom": "^19",
    "resend": "^4",
    "zod": "^3.23"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5.6",
    "vitest": "^2"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

Removed from current `package.json`: `dotenv`, `express`, `nodemailer`. None are needed in Next.js — env loading is built in, the server is Next.js itself, Resend replaces Nodemailer.

## `.gitignore`

```
.next/
node_modules/
.env
.env.local
.env*.local
.DS_Store
```

## Testing Strategy

### Unit tests (Vitest)

**`lib/contact-schema.test.ts`** — Zod schema:
- Valid input passes.
- Empty name fails with the right message.
- Invalid email fails.
- Phone with letters fails.
- Whitespace-only name fails (the `.trim()`).
- Optional message accepts empty string; undefined when blank.

**`app/actions/contact.test.ts`** — Server Action, with `lib/resend.ts` mocked via `vi.mock`:
- Happy path: valid input → `resend.emails.send` called once with correct `from` / `to` / `subject` / `replyTo` → returns `{ status: 'success' }`.
- Validation failure: bad email → `resend.emails.send` not called → returns `{ status: 'error', fieldErrors: { email: '...' } }`.
- Resend failure: `resend.emails.send` throws → action catches → returns `{ status: 'error', message: '...' }`, does not throw.

### Not tested

- UI components (pure presentational, low bug surface).
- Carousel, lightbox, modal islands (simple `useState` + `useEffect`; manual smoke test sufficient).
- Styles / layout (covered by visual design + unchanged CSS).

### Quality gates

`npm run lint && npm run typecheck && npm test && npm run build` — if all four pass, the change is shippable.

## Manual Smoke Test Checklist

Run after implementation, before declaring done:

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

## Migration Order

The implementation plan (next step) breaks the work into these phases, executed in order:

1. **Scaffold & cleanup** — `git init`, Next.js init, dependencies, TypeScript config, env files, `.gitignore`. Old `server.js` / `css/` / `js/` / `favicon.ico` / `.env` removed or moved. Old Nodemailer / Express / dotenv deps removed.
2. **Lib utilities + tests** — `lib/env.ts`, `lib/escape-html.ts`, `lib/contact-schema.ts`, `lib/resend.ts` with TDD.
3. **Server Action + tests** — `app/actions/contact.ts` with mocked-Resend tests.
4. **Static layout** — `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, fonts, metadata, all server-rendered section components. Page should render with no interactivity but look identical to the current site.
5. **Client islands (wave 1: nav & header)** — `StickyHeader`, `MobileMenu`, `NavScrollSpy`.
6. **Client islands (wave 2: hero & floor plan)** — `HeroCarousel` (with parallax), `FloorPlanTabs`.
7. **Client islands (wave 3: gallery & stats)** — `GalleryTabs`, `GalleryLightbox`, `StatsCounter`, `RevealOnScroll`.
8. **Client islands (wave 4: floating bits)** — `FloatingForm`, `ScrollToTop`, `DisclaimerModal`, `WhatsAppFloat` (server, included for completeness).
9. **Contact form wiring** — `ContactForm` client component, integrated with the Server Action and used by both the contact section and `FloatingForm`.
10. **Image assets** — rename local images, download Unsplash images, place in `public/`.
11. **Smooth scroll CSS** — add `scroll-behavior: smooth` and `scroll-margin-top: 80px` to `globals.css`.
12. **Tests** — Vitest specs for schema and action. Quality gates green.
13. **Manual smoke test** — Run the checklist above. Fix any visual or behavioural regressions.
14. **README + deployment notes** — Document local dev, env vars, Resend setup, Vercel deploy.

## Open Items (To Resolve During Implementation)

- **Image rename mapping** — the implementation plan includes a per-file mapping table for the WhatsApp images, reviewed by the user before files are renamed.
- **Image download mapping** — the implementation plan includes a per-URL list for the 5 Unsplash images to download, reviewed by the user before downloads run.
- **Domain for Resend** — user confirms whether they have a custom domain for `CONTACT_FROM_EMAIL` or will use `onboarding@resend.dev` initially.
- **Git history** — current project is not a git repository. User decides whether to `git init` at the start of implementation (recommended, but their call).

## Features Added After Initial Design

The following features were found in the existing `index.html` / `js/main.js` but not in the original `DESIGN_DOC.md` or first spec draft. They are now part of the spec and the plan:

- Floating "Get Best Deal" side form (with collapse/expand, mobile auto-collapse, name/phone/email only).
- Footer "Disclaimer" link → modal with the existing disclaimer text.
- Fixed WhatsApp float button (`wa.me/919478997378`).
- Active nav link highlighting (scroll-spy).
- Hero parallax on the active slide.
- Section reveal-on-scroll (`fade-in-up` class).
- Gallery tabs (Images / Videos, with YouTube iframes in the Videos panel).
- Floor plan tabs (Location / 4 BHK / 5 BHK / Master Plan — already mentioned but expanded).
- CSS-only smooth scroll with 80px sticky-header offset.
- Replacement of external Unsplash image URLs with locally hosted copies in `public/`.

## Security Notes

- The `.env` file containing the real Gmail app password must be deleted and the password rotated, since it was exposed during the design session.
- Server Action inputs are validated by Zod before any side effect.
- User-submitted strings are HTML-escaped before being interpolated into the email body.
- No SQL, no DB, no auth — attack surface is limited to the form endpoint.

## Out of Scope (Future Work)

- Playwright E2E tests (add when more pages/features exist).
- Real CMS integration.
- Multilingual content.
- Analytics / conversion tracking.
- A/B testing.
