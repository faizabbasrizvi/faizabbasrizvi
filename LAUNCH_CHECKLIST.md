# Fayzo launch checklist

Pending merchant/store-admin actions, organized by PRD section. Theme-code
items are done; everything below needs either a real business decision (a
number, a phone number) or a Shopify admin/app action that can't be done
from code.

## Blocking — must be done before removing the storefront password

- [ ] **Contact page** (`/pages/contact`, currently unpublished) — has
  `[TODO]` placeholders for the real WhatsApp number and a stated response
  time (e.g. "we reply within 24 hours" — Brand Book Section 10: an explicit
  promise beats an implied one). The design's own WhatsApp link
  (`971500000000`) is a placeholder number, not a real one, so it wasn't
  reused. Fill in, then publish — and set Theme settings > Fayzo: brand
  voice > WhatsApp number so the button appears on product pages too (it's
  hidden while blank).
- [ ] **Featured collections on the homepage** — the "Shop by category"
  section has 3 empty collection slots (Theme editor > Home > Featured
  collections) waiting on real rotating categories.
- [ ] **Founder name** (Theme settings > Fayzo: brand voice) — currently
  blank, so the founder story on product pages signs off as "Founder,
  Fayzo." Add a real name or leave anonymous on purpose.
- [ ] **Review the 3 pre-existing placeholder products** (Chair-Clip Neck &
  Shoulder Massager, Foldable Aluminum Phone Stand, Car Trunk Collapsible
  Organizer) — created earlier in the build, before the v2.1 redesign, and
  don't have the new pain-points/features/deep-dive metafields the 4 new
  demo products do. Keep, update, or remove them.

## Apps & integrations (Section 6/7 — can't be installed via code)

- [ ] **Shopify Product Reviews app** — the design's product/home page
  reviews sections are built assuming Shopify's own free Product Reviews
  app specifically (its `spr-` CSS classes are styled in the theme
  already). Install it and add its review-list app block to the product
  template. Star ratings already render everywhere via the
  `reviews.rating` metafield; only the full written review list needs the
  app block once real reviews exist.
- [ ] **Tabby** — approve the merchant account, enable the app in Settings >
  Payments, then turn on Theme settings > Fayzo > "Show Tabby badge" (off by
  default).
- [ ] **Tamara** — same as Tabby: approve, enable in Settings > Payments,
  then turn on Theme settings > Fayzo > "Show Tamara badge" (off by
  default).
- [ ] **Shopify Markets** (or equivalent) — needed for the currency switcher
  in the footer/header to actually offer more than AED; the selector UI is
  already on, it just has nothing to switch to yet.
- [ ] **Meta Pixel + Conversions API** — install via Shopify's Meta channel
  app (not hand-rolled theme code, since checkout.liquid script injection is
  deprecated on non-Plus plans). Confirm PageView, ViewContent, AddToCart,
  InitiateCheckout, and Purchase all fire, and that Purchase fires exactly
  once per order (test by refreshing the order confirmation page).
- [ ] **Google Ads conversion tracking + Google Tag + GA4** — install via
  Shopify's Google & YouTube channel app; enable GA4 e-commerce events.
- [ ] **UTM parameter convention** (source/medium/campaign/content) —
  document before the first ad campaign launches, so Shopify order
  attribution can be cross-checked against ad platform reporting.
- [ ] **Acceptance test (Section 7)** — place one real test order and
  confirm the Purchase event appears correctly, with matching value, in Meta
  Events Manager, Google Ads, and GA4. Don't launch paid traffic before this
  passes.

## Ongoing content workflow (Section 8/9 — per product, not one-time)

- [ ] For every new product: fill in `fayzo.benefit_statement`,
  `fayzo.specifics`, `fayzo.benefits` (checklist), `fayzo.in_box`,
  `fayzo.deep_dive_headline/_body/_cta_label`, `fayzo.comparison_category`,
  and `fayzo.hero_badges` — the 4 new demo products (NeckEase, GripCharge,
  DeskGlow, SnapSort) show what a fully-populated product looks like.
- [ ] **Pain points, features, and extra FAQ** (`fayzo.pain_points`,
  `fayzo.features`, `fayzo.faq_extra`) use repeatable metaobject entries
  (Content > Metaobjects in Shopify admin) rather than a simple list —
  these three sections were left empty on the 4 demo products to keep this
  build session bounded (each entry is a separate admin action), so they
  currently don't render on any product page. Fill them in per product;
  the sections render automatically once data exists.
- [ ] Real image alt text on every product photo.
- [ ] Photography: lifestyle-first hero shot (not white-background), 4-6
  supporting images, at least one in-use/scale-reference shot per product.
- [ ] Unique, in-voice title tag + meta description per product/collection/
  page — the theme already renders whatever's set in Shopify's SEO fields
  dynamically; the copy itself is a per-page content task.
- [ ] Social media links (Theme settings > Social media) are currently
  blank, so footer/header icons stay hidden — add the real profile URLs
  once accounts exist.

## Performance (Section 6)

- [ ] Run Lighthouse mobile on the home and product pages once real
  photography/products are in place; target performance score 85+ and LCP
  under 2.5s on product pages before spending on paid traffic. Poppins
  (headline font) now loads via Shopify's native font library rather than
  a third-party host, to keep this budget realistic.

## Confirmed facts already reflected in the theme

- Cash on delivery is live (Theme settings > Fayzo > "Show COD badge").
- Delivery promise: 2–4 days across the UAE — shown in the header
  announcement bar, home trust strip, and product FAQ.
- Return window: 14 days, no interrogation — shown in the announcement bar,
  home trust strip/guarantee banner, product checklist/comparison sections,
  and now published on the FAQ page.
- Storefront is English-only for the UAE launch; Arabic/GCC expansion is
  out of scope for now (non-English locale files were removed).
- Product JSON-LD structured data, dynamic per-page meta title/description,
  and Shopify's default sitemap.xml/robots.txt are all already in place
  (Section 9) — no theme override blocking them.
- Navigation: main menu (Home, Catalog, Our Story, Contact) and footer menu
  (Our Story, FAQ, Track My Order, Contact, Search) are wired up in Shopify
  admin already.
- **Brand Book v2.1 rebrand applied**: Deep Plum / Fayzo Violet / Vivid
  Magenta / Sky Blue / Warm Cream palette, Poppins ExtraBold headlines,
  pill-shaped buttons/inputs/badges (all intentional per Brand Book Section
  5 — this reverses the earlier v1.0 "no pills" rule). Real locked logo
  (Concept 2) shipped as a theme asset — no upload needed. This session's
  Shopify API access couldn't reach `stagedUploadsCreate` (file-write scope
  not granted), so the logo lives as a bundled SVG asset rather than a
  Settings > Logo upload; functionally identical, just not editable from
  the Files admin.
- Quantity/bulk-discount tier selector from the design (buy 1/2/3 units at
  a per-unit discount) was **not** implemented — it would need either
  Shopify's native quantity price breaks (uncertain availability on the
  Basic plan) or real variant-based bundles, and was out of scope for this
  session. Product pages currently show single-unit pricing only.
