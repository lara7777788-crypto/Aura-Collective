

# AuraCollective.io — Updated Plan

## Design Direction Change
Inspired by Hugging Face's recognizable yellow branding. Mostly white/light backgrounds with bright yellow as the signature color, plus one complementary accent.

### Color Palette
- **Background**: White (#FFFFFF) and light gray (#F8FAFC) surfaces
- **Primary accent**: Bright yellow (#FACC15 / #EAB308) — buttons, badges, highlights, logo mark
- **Secondary accent**: Deep navy/charcoal (#0F172A) — text, headers, contrast elements
- **Supporting**: Slate grays for secondary text, borders, cards
- **Subtle gradients**: Yellow-to-amber for featured sections

### Typography
- Inter for body, clean sans-serif display font for headings
- Dark navy text on white for maximum readability

### UI Feel
- Clean, white, airy — professional but friendly
- Yellow used boldly but not overwhelmingly (CTAs, active states, badges, brand marks)
- Navy for strong contrast on headers and key UI elements
- Rounded corners, generous spacing, smooth micro-interactions

## Messaging
- **Hero**: "The Open Infrastructure for Web4 Developers"
- **Subtitle**: "Ship models, share code, and collaborate on the decentralized web — no gatekeepers."

## Build Order (Phase 1)

### 1. Design system
Update CSS variables: white bg, yellow primary (#FACC15), navy foreground (#0F172A), slate muted tones. Install Inter font.

### 2. Shared layout
Top navbar with AuraCollective logo (yellow mark), nav links, auth buttons. Clean footer.

### 3. Landing page
- Hero with bold Web4 tagline, yellow CTA buttons, subtle background pattern
- Three pillars: Models / Code / Datasets
- Stats bar (members, projects, contributions)
- Membership tiers (Free / Pro $9 / Team $29)
- Footer

### 4. Explore page
Search + filters, card grid with project thumbnails, stars, tags

### 5. Project detail page
README, stats, tags, contributors, comments

### 6. User profile page
Avatar, bio, portfolio grid, activity

### 7. Auth pages (sign up / sign in)

### 8. Dashboard & Community page

All mock data initially. Supabase backend in Phase 2.

## Technical Details
- React Router with shared layout component
- shadcn/ui primitives restyled with yellow/navy palette
- Framer Motion for animations
- Mobile-first (user viewport: 393px)
- 8 route pages total

