# Fayzo launch checklist

Pending merchant actions called out during the theme build. None of these block
publishing — each item degrades gracefully to a safe default until it's done.

- [ ] **Logo** — Settings > Design > Logo. Until a file is uploaded, the header
  shows a coded wordmark (bold "FAYZO", terracotta "A") standing in for the
  approved logo.
- [ ] **Tabby** — approve the Tabby merchant account and install/enable the
  Tabby app in Settings > Payments, then turn on Theme settings > Fayzo >
  "Show Tabby badge". Off by default.
- [ ] **Tamara** — same as above for Tamara: approve the account, enable the
  app in Settings > Payments, then turn on Theme settings > Fayzo > "Show
  Tamara badge". Off by default.
- [ ] **Reviews** — install the Judge.me app and add its review-list app block
  to the product template. Star ratings already display everywhere
  (product page, collection grid, homepage, search) via the
  `reviews.rating` metafield; only the full written review list needs the
  app block.

## Confirmed facts already reflected in the theme

- Cash on delivery is live (Theme settings > Fayzo > "Show COD badge").
- Delivery promise: 2–4 days across the UAE (Theme settings > Fayzo >
  delivery promise text) — also shown in the header announcement bar.
- Storefront is English-only for the UAE launch; Arabic/GCC expansion is
  out of scope for now (non-English locale files were removed).
