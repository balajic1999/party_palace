# Party Palace — private theatre website

Front-end demo for **Party Palace (Private Theater)**, American Towers,
Leela Mahal Circle, Tirupati.

A single-page marketing site (eight sections, anchor navigation) plus a working
four-step booking flow with a simulated advance payment. No backend —
everything runs in the browser.

---

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm start            # serve the production build
npm test             # pricing engine unit tests
npm run lint
```

Requires Node 20+ (built and tested on Node 24).

---

## The page

One scrolling homepage, in this order:

1. **Hero** — “Celebrate. Watch. Experience.” + Book / WhatsApp / Call
2. **Our Experiences** — four cards, each linking to its package
3. **Popular Packages** — three cards with price, features, View Details / Book Now
4. **Gallery** — five-photo preview → full gallery page
5. **Why Choose Party Palace?** — five differentiators (this is the `About Us` anchor)
6. **What Our Clients Say** — three reviews
7. **FAQ** — six questions in two columns
8. **Footer** — links, contact block, map, socials, legal (the `Contact Us` anchor)

Nav links are anchors (`/#packages`, `/#faq` …) and the active section
highlights as you scroll.

### Routes

```
/                      homepage (all eight sections)
/packages/[slug]       birthday · movie-night · couple
/gallery               full gallery with filters + lightbox
/book                  4-step booking wizard
/book/confirm          simulated advance payment
/booking/[ref]         ticket confirmation
/my-bookings           lookup by phone number
/policies/[slug]       refund · terms · privacy
```

---

## Where the content lives

Everything a non-developer would change sits in **`src/content/`**.

| File | Controls |
|---|---|
| `site.ts` | Name, address, phone, email, WhatsApp, hours, advance amount |
| `packages.ts` | The three packages — prices, capacity, features, inclusions |
| `experiences.ts` | The four experience cards **and** the five why-choose-us points |
| `slots.ts` | The four daily slots |
| `addons.ts` | Optional extras, food & drinks, and coupon codes |
| `faqs.ts` | The six FAQ entries |
| `testimonials.ts` | Reviews — **placeholders, replace before launch** |
| `gallery.ts` | Photo slots (first five feed the homepage preview) |
| `policies.ts` | Refund, terms and privacy text |

Photos go in `public/images/` — see the README in that folder.

### Numbers that still need confirming

**Everything except the address and phone number is a placeholder.** Package
prices (₹2,999 / ₹1,999 / ₹2,499), capacities, extra-guest rates, slot timings,
opening hours, add-on prices and the ₹750 advance all came from the design
brief, not from the owner. Confirm them and edit `src/content/`.

Testimonials and policy text are placeholders too. Do not ship invented reviews
as real ones.

---

## How it is put together

- **Next.js 16** (App Router) · **React 19** · **TypeScript** · **Tailwind v4**
- Icons from `lucide-react`; the crown and social glyphs are drawn in-repo
- Design tokens live in `src/app/globals.css` under `@theme` — colours, radii,
  fonts. Change them there, not per-component.

### Rules the codebase follows

- Every rupee figure goes through `formatINR()` in `src/lib/utils.ts`.
- Every total is computed by `quote()` in `src/lib/pricing.ts`. No page does its
  own arithmetic.
- Only `--color-gold-700` is safe for small gold text on white (contrast); the
  lighter golds are for fills and large numerals.
- **Critical content is never hidden behind an entrance animation.** See the
  note in `src/components/ui/reveal.tsx` — scroll-reveal was removed on purpose
  because opacity-0 content stays invisible whenever the animation driver does
  not tick. Hover motion is CSS-only (`.lift`) and degrades safely.

### The three swappable seams

There is no server. These are where one would attach:

| File | Currently | Replace with |
|---|---|---|
| `src/lib/availability.ts` | Seeded pseudo-random slot states | A real availability API |
| `src/lib/storage.ts` | `localStorage` / `sessionStorage` | Real booking endpoints |
| `src/lib/pricing.ts` | Pure local calculation | Keep, or move server-side |

Availability is **seeded, not random** — hashing `date + package + slot` means
the calendar looks alive but shows the same thing on every reload, so a demo is
repeatable.

---

## Demo controls

`src/lib/demo.ts`:

```ts
export const DEMO = {
  showFailureToggle: true,   // set false before a client presentation
  processingMs: 2100,
};
```

There is **no payment gateway**. `/book/confirm` simulates the ₹750 advance and
writes the booking to `localStorage`.

Working coupon codes: `PALACE10` (10% off, capped ₹700) · `WEEKDAY15`
(15% off, capped ₹1,000).
