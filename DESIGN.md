# Dewy — Design Guidelines

This document is the shared design reference for the Dewy storefront and admin interface. Dewy is a commerce platform focused exclusively on fashion and cosmetics. Its purpose is to keep the experience consistent, mobile-friendly, and trustworthy across both product categories.

## 1. Product Direction

Dewy helps customers:

- Discover and compare fashion and cosmetic products.
- Select important variants such as clothing size, color, cosmetic shade, or volume.
- Quickly purchase products that are available.
- Track orders and fulfillment status transparently.

Three principles guide every design decision:

1. **Clear:** Prices, availability, processing states, and next actions must be easy to understand.
2. **Fast:** Minimize steps, prioritize primary tasks, and support comfortable one-handed mobile use.
3. **Trustworthy:** Use specific language, expose relevant status information, and avoid pressure tactics or exaggerated promises.

## 2. Brand and Voice

### Personality

- Refined, composed, and confident.
- Elegant without feeling distant or ceremonial.
- Approachable for Vietnamese customers.
- Fashion-led and expressive without sacrificing usability.
- Knowledgeable about fashion and cosmetics without relying on unnecessary jargon.

### Interface Copy

- Use natural, concise, and direct language.
- Prefer active phrases such as “Add to cart,” “Choose options,” and “Track order.”
- Button labels should begin with a verb and accurately describe the resulting action.
- Use specific status labels: “In stock,” “Low stock,” “Out of stock,” and “Pre-order.”
- Error messages should explain what happened and what the user can do next.
- Customer-facing copy should remain in Vietnamese unless the product requirements specify another language.
- Use category-specific terms where they help customers decide, such as “fit” and “size” for fashion or “shade” and “skin type” for cosmetics.

## 3. Design Foundations

### Color

The palette combines clean white, soft black, pastel rose, and light gray. This neutral-first system gives fashion and cosmetic photography room to lead, while the restrained rose accent adds warmth and recognizability. It should feel refined, contemporary, and luxurious without reducing commerce usability. The implementation in `src/app/globals.css` must mirror these target values.

| Role              | Token                  | Default value | Usage                                                                            |
| ----------------- | ---------------------- | ------------- | -------------------------------------------------------------------------------- |
| Page background   | `background`           | `#FAFAFA`     | Clean off-white canvas that reduces glare while keeping the storefront bright    |
| Primary text      | `foreground`           | `#18181B`     | Soft near-black for headings, prices, and important content                      |
| Surface           | `card`                 | `#FFFFFF`     | Pure white for cards, dialogs, popovers, and input surfaces                      |
| Primary action    | `primary`              | `#18181B`     | Near-black for the single dominant CTA, selected controls, and strong emphasis   |
| On-primary text   | `primary-foreground`   | `#FFFFFF`     | Text and icons placed on primary actions                                         |
| Secondary surface | `secondary`            | `#F1F1F2`     | Light gray for supporting sections and understated controls                      |
| Secondary text    | `secondary-foreground` | `#27272A`     | Dark neutral text on secondary surfaces                                          |
| Neutral surface   | `muted`                | `#F4F4F5`     | Placeholders, skeletons, and low-priority areas                                  |
| Muted text        | `muted-foreground`     | `#66666E`     | Supporting copy and metadata with accessible contrast                            |
| Brand accent      | `accent`               | `#F6DEE7`     | Pastel rose for highlights, chips, editorial details, and subtle selected states |
| Accent text       | `accent-foreground`    | `#71364D`     | Deep rose text and icons on pastel rose surfaces                                 |
| Border            | `border`               | `#E4E4E7`     | Light gray separation between white surfaces                                     |
| Focus ring        | `ring`                 | `#9F4868`     | Deep rose focus indicator that remains visible on light surfaces                 |
| Error             | `destructive`          | `#B4232D`     | Errors, critical warnings, and destructive actions                               |

Usage principles:

- Use white, off-white, and light gray for roughly 80% of the interface so product photography remains the visual focus.
- Reserve near-black for the primary CTA and strongest information. Use only one dominant black CTA in each action group.
- Use pastel rose as a supporting brand accent, not as the default CTA color or body text. Pair it with `accent-foreground` whenever it contains text or icons.
- Prefer neutral borders and restrained shadows. Do not use colored shadows around product imagery or cards.
- Never communicate status through color alone. Include a label or icon.
- Use only one visually dominant CTA in each action group.
- Use status colors sparingly and keep them slightly muted so they do not compete with the brand palette.
- Use amber for mild warnings, muted green for successful states, and red for errors or destructive actions.
- Avoid neon colors, saturated hot pink, cool corporate blue, large dark surfaces, and excessive gradients; they weaken the refined editorial character and compete with product color.

### Typography

- Primary typeface: **Be Vietnam Pro**.
- Supported weights: `400`, `500`, `600`, and `700`.
- Default body text: `15px` with a `1.6` line height.
- Page or hero heading: `28px` on mobile, up to approximately `40px` on desktop.
- Section heading: `22px`, approximately `1.35` line height, weight `700`.
- Card heading: `16–18px`, weight `600`.
- Captions and metadata: `12–14px`.

Do not use uppercase for long text. Avoid more than three levels of typographic emphasis within one region.

### Spacing and Layout

- Use a spacing rhythm based on multiples of `4px`.
- Common values: `8`, `12`, `16`, `20`, `24`, `32`, `48`, and `56px`.
- Storefront content container: `max-w-6xl`, centered, with `16px` horizontal padding.
- Sections: `32px` vertical padding on mobile and `48px` on desktop.
- Product grids: one column on mobile, two on small tablets, and three to four on desktop.
- Keep form content at a comfortable reading width. Avoid stretching text inputs unnecessarily.

### Radius, Borders, and Shadows

- Small controls: `8px` radius.
- Inputs and buttons: `8–10px` radius.
- Cards: `12–16px` radius.
- Badges and chips: fully rounded where appropriate.
- Default border: `1px solid border`.
- Default card shadows should be subtle; increase elevation on hover only to indicate interactivity.
- Avoid combining a strong shadow, heavy border, and colored background on the same surface.

### Icons and Images

- Use Lucide React with consistent strokes. Common sizes are `16`, `20`, and `24px`.
- Icons inside buttons should support meaning, not replace labels when the action could be ambiguous.
- Use a consistent image ratio within each collection. Fashion imagery should generally use `3:4` to show silhouette and fit; cosmetics may use `1:1` or `4:3` for clear product presentation.
- Use accurate color and natural lighting. Do not apply filters that misrepresent a garment's color or a cosmetic product's shade and finish.
- Fashion imagery should show fit, material, and scale where possible. Cosmetic imagery should show texture, shade, or application when relevant.
- Every content image must have alt text that accurately describes the product or the image's purpose.

## 4. Interface Components

### Buttons

- Target height: `44px` (`h-11`) for comfortable touch interaction.
- `default`: the primary action for a screen or region.
- `outline`: a clearly secondary action.
- `ghost`: utility actions such as header icons.
- Disabled buttons must appear less prominent and must not respond to hover or click.
- When two adjacent buttons become cramped on mobile, stack them vertically.

### Inputs and Forms

- Always display labels; do not use placeholders as replacements for labels.
- Use placeholders only to demonstrate the expected data format.
- Display errors next to the relevant field and preserve previously entered data.
- Mark optional fields with “(optional)” instead of marking every required field.
- Divide long forms into groups with headings and short descriptions.

### Cards

- A card should group information that belongs to the same object or action.
- Product cards include an image, availability, no more than one secondary tag, name, price, and actions.
- Show category-specific comparison details only when useful, such as available sizes, color count, shade count, material, or volume.
- Limit product names to two lines in collection views to preserve the grid rhythm.
- Use near-black and bold type for the current price. Previous prices should be smaller, muted, and struck through.
- Products with required variants must prompt customers to choose them before adding to the cart. Never silently select a size or shade.

### Badges and Statuses

- `in_stock`: muted forest green.
- `low_stock`: muted amber.
- `out_of_stock`: neutral gray.
- `preorder`: pastel rose tint with deep rose text.
- Badge labels should be short, easy to scan, and less visually prominent than the object name.

### Navigation

- The storefront header is `64px` high, sticky, and uses a translucent background with subtle blur.
- Desktop shows search, navigation, and cart access.
- Mobile uses an expandable menu while keeping the cart readily accessible.
- Admin pages use a persistent sidebar. The selected item must change both its background and its text or icon color.

### Dialogs, Toasts, and Feedback

- Use toasts for brief confirmations, not for information users must read or act on later.
- Use dialogs only when focus or explicit confirmation is necessary.
- After a product is added to the cart, feedback must be immediate and the header count must update.
- Skeletons should approximate the final content dimensions to prevent layout shift.

## 5. Layout Patterns

### Storefront

A typical priority order is:

1. Header and search.
2. Primary value proposition or page context.
3. Categories or filters.
4. Product content or the main task.
5. Guidance, trust signals, and FAQs.
6. Footer.

A hero should contain one primary message, one primary CTA, one secondary CTA, and one supporting image. Do not use an auto-playing carousel for critical content.

### Catalog and Product Collections

- Show the current query and active filters, and make them easy to clear.
- Open filters in a sheet or drawer on mobile; a persistent panel may be used on desktop.
- Keep Fashion and Cosmetics as the two stable top-level departments. Use subcategories such as Clothing, Shoes, Bags, Accessories, Skincare, Makeup, Haircare, and Fragrance.
- Shared filters may include price, brand, availability, rating, and promotion.
- Fashion filters may include size, color, fit, material, style, and gender or collection when applicable.
- Cosmetic filters may include product type, shade, skin type, concern, finish, ingredients, and volume.
- Do not show irrelevant filters merely to keep both departments structurally identical.
- Always provide a useful empty state with options to remove filters, browse a related subcategory, or search again.
- Sorting must not discard the current filter state.

### Product Detail

- Keep the title, price, availability, variant selection, and primary purchase action easy to find.
- Fashion pages should prioritize size guidance, fit, color, material, model measurements, and care instructions.
- Cosmetic pages should prioritize shade, volume, ingredients, skin suitability, usage guidance, and relevant safety information.
- Use swatches where visual selection matters, but always include a text label for color and shade accessibility.
- Show shipping, returns, and exchange expectations before the customer commits to purchase.

### Checkout and Order Forms

- Clearly show the order summary and final price before confirmation.
- Group contact, delivery, and payment information into scannable sections.
- Do not hide fees until the final step.
- After completion, provide a tracking code and actions to copy it or open the tracking page.
- Preserve size, color, shade, volume, and other selected variants throughout cart, checkout, confirmation, and tracking.

### Admin

- Favor moderate information density, scannable tables, and clear row actions.
- Dashboards should show operationally meaningful metrics with links to detailed data.
- Keep filters, search, and pagination in consistent positions across modules.
- Destructive actions require confirmation and must identify the affected object.
- Product management must support separate attribute sets for fashion and cosmetics without forcing both into one rigid form.

## 6. Responsive Behavior

Design mobile-first.

- Mobile: `< 640px` — single-column layouts, full-width actions where appropriate, and minimum `44 × 44px` touch targets.
- Tablet: `640–1023px` — use two-column grids where useful and avoid overcrowded horizontal navigation.
- Desktop: `>= 1024px` — use three- to four-column grids and persistent sidebars or filters when useful.
- Do not depend on hover to reveal essential information or actions.
- Test long Vietnamese content and dynamic data at every breakpoint.

## 7. Accessibility

- Prefer semantic HTML before adding ARIA.
- Each page must have one `h1`; subsequent headings must follow a logical hierarchy.
- Every control must be keyboard-accessible and have a visible focus ring.
- Icon-only buttons require an accessible name through `aria-label` or equivalent text.
- Form errors should be programmatically associated with their inputs.
- Meet WCAG AA contrast requirements for text and important controls.
- Respect `prefers-reduced-motion`; animation should clarify state rather than distract.

## 8. Required States

Every screen that loads data or accepts an action should consider:

- Loading: use a skeleton or spinner appropriate to the affected area.
- Empty: explain why no data is available and offer a meaningful next step.
- Error: use clear language, preserve entered data, and provide a retry path.
- Success: confirm the result, include a reference code when applicable, and show the next action.
- Offline or timeout: never claim that a transaction succeeded without confirmation.

## 9. Implementation Conventions

- Reuse components from `src/components/ui` before introducing new primitives.
- Use semantic tokens such as `bg-background`, `text-primary`, and `border-border` instead of repeating raw color values.
- Place broadly shared components in `src/components` and domain-specific logic in `src/features`.
- Reuse values from `src/constants` and `src/config` for routes and configuration when available.
- Keep components server-rendered by default. Add `"use client"` only when state, effects, or browser APIs are required.
- Use `next/image` for content images and `next/link` for internal navigation.
- Do not create a new component variant for minor class differences that the existing component API can express.

## 10. Delivery Checklist

- [ ] Each screen or region has one clear primary action.
- [ ] The interface works on mobile, tablet, and desktop.
- [ ] Long content does not overflow or break the layout.
- [ ] Loading, empty, error, disabled, and success states are covered.
- [ ] Color, typography, and spacing tokens are used consistently.
- [ ] Every control has an appropriate label, focus state, and touch target.
- [ ] Images have stable dimensions and suitable alt text.
- [ ] Purchase flows display prices, fees, and statuses transparently.
- [ ] Run `pnpm lint`, `pnpm format:check`, and `pnpm build` after broad changes.
