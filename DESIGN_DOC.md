# Website Design Component Document
## Project: Luxury Real Estate (Marbella Twin Towers Style)

---

### 1. General Design System

#### Color Palette
- **Primary Brand Color:** `#c5a47e` (Luxury Gold/Beige)
- **Primary Dark:** `#1a1a1a` (Rich Black)
- **Primary Light:** `#ffffff` (White)
- **Background Light:** `#f5f5f5` or `#fafafa` (Off-White)
- **Text Primary:** `#333333` (Dark Gray)
- **Text Secondary:** `#666666` (Medium Gray)
- **Accent Border:** `#e0e0e0`

#### Typography
- **Headings:** `Playfair Display` or `Cormorant Garamond` (Serif, elegant, luxury feel)
- **Body Text:** `Poppins` or `Open Sans` (Sans-serif, clean, readable)
- `h1`: 48px-64px, Bold
- `h2`: 36px-48px, Semi-bold
- `h3`: 24px-32px, Medium
- `p`: 16px-18px, Regular, line-height 1.6

#### Spacing & Grid
- **Container Max Width:** 1200px - 1400px
- **Section Padding:** 80px - 120px vertical, 20px - 40px horizontal
- **Grid System:** 12-column grid or CSS Grid for layouts

---

### 2. Website Components Breakdown

#### Component: Header / Navigation Bar
- **Layout:** Fixed or Sticky at the top, full width.
- **Background:** Transparent initially, transitioning to solid `#ffffff` with subtle shadow on scroll.
- **Content:**
  - **Logo:** Top center or top left. Clean, minimal text-based logo or subtle icon.
  - **Primary Nav Links:** `Home`, `About`, `Floor Plan`, `Gallery`, `Contact`.
  - **CTA Button:** "Call Now" with phone icon.
- **Mobile Behavior:** Hamburger menu icon, off-canvas slide-out menu.
- **Typography:** Nav links uppercase, 14px, letter-spacing 1px.

#### Component: Floating Contact Bar (Top / Side)
- **Layout:** Fixed horizontal bar at the very top or fixed vertical bar on the left/right.
- **Content:**
  - Contact Numbers: `+91-99885-11177`, `+91-82890-11177`
  - Chat Link: "Click To Chat"
  - Project RERA Number: `PBRERA-SAS80-PR0616`
- **Styling:** Background `#1a1a1a`, text `#ffffff`.

#### Component: Hero Section
- **Layout:** Full viewport height (`100vh`), centered content over a background.
- **Background:** High-quality image carousel (slider) of the building exterior and lifestyle shots.
- **Overlay:** Subtle dark gradient overlay (`rgba(0,0,0,0.3)`) to ensure text readability.
- **Content:**
  - **Headline:** "Modern & Luxury / An Address of Eminence" (or similar).
  - **Sub-headline:** Brief tagline.
  - **Navigation Arrows:** Previous/Next controls for the carousel.
- **Animation:** Smooth fade or slide transitions between images (3-5 seconds interval).

#### Component: About Section
- **Layout:** Two-column grid (50/50). Image on one side, text on the other.
- **Content:**
  - **Label:** "About"
  - **Title:** "Marbella Twin Towers"
  - **Body Text:** Detailed paragraphs describing the location (Madhya Marg, Sector 2, New Chandigarh), the concept (edge of Chandigarh, 0 km away), and the prestige of the address.
  - **Key Selling Point:** "The First & The Iconic Twin Towers Development In Chandigarh TRI-CITY Region."
- **Image:** High-quality architectural render or real photo of the towers.
- **Styling:** Generous padding, max-width for text readability.

#### Component: Amenities / Features Grid
- **Layout:** 4-column grid (responsive to 2-column on tablet, 1 on mobile).
- **Content:** Feature cards with icons.
  - Pollution free environment
  - 24*7 power backup & water supply
  - Club House (swimming Pool, Gym)
  - Gated and secured society with CCTV
- **Styling:**
  - Cards: Background `#ffffff`, subtle border or shadow.
  - Icons: Simple line icons or solid icons in the primary brand color.
  - Text: Centered, 16px, clean.

#### Component: Location & Floor Plan Section
- **Layout:** Split section or tabbed interface.
- **Content:**
  - **Label:** "Location & Floor Plan"
  - **Title:** "Marbella Twin Towers"
  - **Media:** Interactive map (embed) and downloadable/viewable floor plan images.
- **Styling:** Map takes up full width or 50% of the container. Floor plans displayed as clickable thumbnails expanding into a lightbox.

#### Component: Why Choose Us (Details Section)
- **Layout:** Two-column layout (Image background + Text list).
- **Content:**
  - **Label:** "Why Choose"
  - **Title:** "Marbella Twin Towers - Luxurious Highrise Apartments"
  - **List:**
    - Pollution free environment
    - 24*7 power backup & water supply
    - Club House (swimming Pool, Gym)
    - Gated and secured society with CCTV
    - Kids play area
  - **Footer Text:** "Marbella Twin Towers is designed to offer the perfect blend of comfort and luxury..."
- **Styling:** Text aligned left or justified, bullet points or checkmark icons.

#### Component: Gallery Section
- **Layout:** CSS Grid or Masonry layout (e.g., 3 columns).
- **Content:**
  - **Label:** "Gallery"
  - **Title:** "Experience Marbella Twin Towers - A Visual Journey of Luxury"
  - **Images:** High-resolution photos of interiors, exteriors, amenities, and lifestyle.
- **Interaction:** Clicking an image opens a **Lightbox Modal** with navigation arrows.
- **Styling:** Small gap (10px-15px) between images. Images hover with a slight zoom and opacity change.

#### Component: Statistics / Counter Section
- **Layout:** 4-column horizontal row.
- **Content:** Animated numbers.
  - `4.36` Acres Total Area
  - `33` Floors Tallest Tower
  - `50,000` Sq. Ft. Clubhouse
  - `264` Super Luxury Residences
- **Styling:** Large bold numbers (48px+), small uppercase labels. Background can be the primary dark color or brand color.
- **Animation:** Numbers count up when scrolling into view.

#### Component: Contact Section
- **Layout:** Two-column (Form left, Info right) or centered form.
- **Content:**
  - **Label:** "Contact Us"
  - **Title:** "Do you have any question?"
  - **Description:** "Experience luxury living... Your dream home awaits!"
  - **Form Fields:**
    - Name (Text input)
    - Phone (Tel input)
    - Email (Email input)
    - Message (Textarea) - *optional*
  - **Button:** "Submit Now"
- **Background:** `#f5f5f5` or `#ffffff`.
- **Styling:** Input fields with bottom borders only (minimalist) or full bordered boxes. Primary brand color for the Submit button.

#### Component: Footer
- **Layout:** Full width, dark background (`#1a1a1a`).
- **Content:**
  - Copyright: `© Marbella Twin Towers 2025 | All Rights Reserved.`
  - Footer Links: `Terms & Condition`, `Privacy Policy`, `Contact Us`
- **Styling:** Text centered, small font size (14px), secondary gray color.

---

### 3. Global Interactive Elements

#### Modal / Popup (Get in Touch)
- **Trigger:** Floating button or a specific CTA.
- **Layout:** Centered on screen with a blurred or dimmed background overlay.
- **Content:** A compact version of the contact form (Name, Phone, Email).
- **Close:** 'X' icon or click outside to close.

#### Scroll-to-Top Button
- **Position:** Fixed bottom-right corner.
- **Behavior:** Appears after scrolling down 300px. Smooth scroll to top on click.

### 4. Responsive Breakpoints
- **Mobile:** < 768px (Stack all columns, reduce font sizes, hamburger menu)
- **Tablet:** 768px - 1024px (2-column grids)
- **Desktop:** > 1024px (Full layout as designed)

### 5. Assets Required
- **Images:** High-res architectural renders, interiors, amenities, landscape.
- **Icons:** SVG icons for amenities, navigation, and social media.
- **Fonts:** Playfair Display, Poppins (or similar Google Fonts).

---
*Document generated based on analysis of the source website structure and industry standards.*
