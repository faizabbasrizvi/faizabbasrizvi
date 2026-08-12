# Fayzo launch checklist

Pending merchant/store-admin actions called out during the theme build,
organized by PRD section. Theme-code items are done; everything below needs
either a real business decision (a number, a phone number) or a Shopify
admin/app action that can't be done from code.

## Blocking — must be done before removing the storefront password

- [ ] **Real logo files** — send the approved PNG/SVG (light, dark, and
  square icon variants) and upload via Settings > Design > Logo. Until then
  the header shows a coded text wordmark (bold "FAYZO", terracotta "A")
  standing in for the real artwork.
- [ ] **FAQ page** (`/pages/faq`, currently unpublished) — the Returns &
  Refunds section has a `[TODO]` placeholder for the actual return window
  and condition (PRD Section 10 requires this stated plainly; no window was
  given, so none was invented). Fill it in, then publish the page.
- [ ] **Contact page** (`/pages/contact`, currently unpublished) — has
  `[TODO]` placeholders for the real WhatsApp number and a stated response
  time (e.g. "we reply within 24 hours" — Brand Book Section 10: an explicit
  promise beats an implied one). Fill in, then publish.
- [ ] **Featured collections on the homepage** — the "Shop by category"
  section has 3 empty collection slots (Theme editor > Home > Featured
  collections) waiting on real rotating categories once the catalog has more
  than the one placeholder product.

## Apps & integrations (Section 6/7 — can't be installed via code)

- [ ] **Reviews app** (e.g. Judge.me) — install and add its review-list app
  block to the product template. Star ratings already render everywhere
  (product page, collection grid, homepage, search) via the
  `reviews.rating` metafield; only the full written review list needs the
  app block once reviews exist.
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

- [ ] For every new product: fill in the `fayzo.benefit_statement`,
  `fayzo.specifics` (dimensions, battery life, box contents), and
  `fayzo.benefits` (checklist of specific claims — real specifics, not
  vague superlatives) metafields, plus real image alt text — this is what
  keeps the product template reusable without custom code per listing.
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
  under 2.5s on product pages before spending on paid traffic.

## Confirmed facts already reflected in the theme

- Cash on delivery is live (Theme settings > Fayzo > "Show COD badge").
- Delivery promise: 2–4 days across the UAE (Theme settings > Fayzo >
  delivery promise text) — also shown in the header announcement bar and
  home trust bar.
- Storefront is English-only for the UAE launch; Arabic/GCC expansion is
  out of scope for now (non-English locale files were removed).
- Product JSON-LD structured data, dynamic per-page meta title/description,
  and Shopify's default sitemap.xml/robots.txt are all already in place
  (Section 9) — no theme override blocking them.
- Navigation: main menu (Home, Catalog, Our Story, Contact) and footer menu
  (Our Story, FAQ, Track My Order, Contact, Search) are wired up in Shopify
  admin already.
