# Dewy Korea — Design Guidelines

This document is the shared design reference for the Dewy Korea storefront and admin interface. Its purpose is to keep the experience consistent, mobile-friendly, and trustworthy for customers buying Korean beauty products.

## 1. Product Direction

Dewy Korea helps customers:

- Quickly purchase products that are in stock.
- Submit sourcing requests when the product they need is unavailable.
- Track orders and sourcing requests transparently.

Three principles guide every design decision:

1. **Clear:** Prices, availability, processing states, and next actions must be easy to understand.
2. **Fast:** Minimize steps, prioritize primary tasks, and support comfortable one-handed mobile use.
3. **Trustworthy:** Use specific language, expose relevant status information, and avoid pressure tactics or exaggerated promises.

## 2. Brand and Voice

### Personality

- Fresh, gentle, and practical.
- Modern without feeling clinical.
- Approachable for Vietnamese customers.
- Knowledgeable about beauty without relying on unnecessary jargon.

### Interface Copy

- Use natural, concise, and direct language.
- Prefer active phrases such as “Add to cart,” “Submit request,” and “Track order.”
- Button labels should begin with a verb and accurately describe the resulting action.
- Use specific status labels: “In stock,” “Low stock,” “Out of stock,” and “Sourcing.”
- Error messages should explain what happened and what the user can do next.
- Customer-facing copy should remain in Vietnamese unless the product requirements specify another language.

## 3. Design Foundations

### Color

The primary design tokens are defined in `src/app/globals.css`.

| Role | Token | Default value | Usage |
| --- | --- | --- | --- |
| Page background | `background` | `#f8fbf9` | Overall page background with a subtle green tint |
| Primary text | `foreground` | `#0f172a` | Headings and important content |
| Surface | `card` | `#ffffff` | Cards, dialogs, popovers, and input surfaces |
| Brand | `primary` | `#1f8a4d` | Primary CTAs, links, positive states, and focus indicators |
| Secondary surface | `secondary` | `#e8f6ee` | Soft highlighted sections, badges, and supporting areas |
| Neutral surface | `muted` | `#eef4f1` | Background states, placeholders, and low-priority areas |
| Secondary text | `muted-foreground` | `#475569` | Descriptions, metadata, and supporting content |
| Border | `border` | `#dde6e1` | Surface and control boundaries |
| Error | `destructive` | `#dc2626` | Errors, critical warnings, and destructive actions |

Usage principles:

- Reserve brand green for primary actions, links, and positive signals. Avoid using it across large surface areas.
- Never communicate status through color alone. Include a label or icon.
- Use only one visually dominant CTA in each action group.
- Use amber for mild warnings such as low stock and red for errors or destructive actions.

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
- Product images should generally use a `4:3` ratio, `object-cover`, clean backgrounds, and natural lighting.
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
- Limit product names to two lines in collection views to preserve the grid rhythm.
- Use brand color and bold type for the current price. Previous prices should be smaller, muted, and struck through.

### Badges and Statuses

- `in_stock`: brand green.
- `low_stock`: amber.
- `out_of_stock`: neutral gray.
- `sourcing`: emerald.
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

### Product Collections

- Show the current query and active filters, and make them easy to clear.
- Open filters in a sheet or drawer on mobile; a persistent panel may be used on desktop.
- Always provide a useful empty state with an option to remove filters or submit a sourcing request.
- Sorting must not discard the current filter state.

### Checkout and Sourcing Forms

- Clearly show the order summary and final price before confirmation.
- Group contact, delivery, and payment information into scannable sections.
- Do not hide fees until the final step.
- After completion, provide a tracking code and actions to copy it or open the tracking page.

### Admin

- Favor moderate information density, scannable tables, and clear row actions.
- Dashboards should show operationally meaningful metrics with links to detailed data.
- Keep filters, search, and pagination in consistent positions across modules.
- Destructive actions require confirmation and must identify the affected object.

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

