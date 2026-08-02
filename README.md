# Dewy Frontend

Dewy is an e-commerce application built with Next.js App Router, React, TypeScript, and Tailwind CSS. This document describes the project architecture and engineering conventions so that every contributor can build features consistently.

## Technology Stack

- Next.js 16 with App Router
- React 19 and TypeScript in strict mode
- Tailwind CSS 4
- Radix UI and shared primitives in `src/components/ui`
- React Hook Form and Zod for forms and validation
- ESLint and Prettier for code quality
- pnpm for dependency management

## Getting Started

Node.js 20+ and pnpm are required.

```bash
pnpm install
pnpm dev
```

Available commands:

```bash
pnpm dev           # Start the development server
pnpm lint          # Run ESLint
pnpm lint:fix      # Fix safe lint violations
pnpm format:check  # Verify formatting
pnpm format        # Format the codebase
pnpm build         # Create a production build
pnpm start         # Start the production server
```

Before opening a pull request, run at least `pnpm lint`, `pnpm format:check`, and `pnpm build`.

## Project Structure

```text
dewy-fe/
├── public/                       # Images, icons, and static assets
├── src/
│   ├── app/                      # Routes, layouts, and Next.js conventions
│   │   ├── (auth)/               # Authentication route group and shared layout
│   │   │   ├── dang-nhap/
│   │   │   │   └── page.tsx
│   │   │   ├── dang-ky/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (website)/            # Public storefront
│   │   ├── admin/                # Administration area
│   │   ├── layout.tsx            # Root layout
│   │   ├── error.tsx             # Application error boundary
│   │   ├── loading.tsx           # Application loading UI
│   │   └── not-found.tsx         # 404 page
│   ├── components/
│   │   ├── ui/                   # Business-agnostic UI primitives
│   │   ├── common/               # Application-wide shared components
│   │   ├── website/              # Storefront shell components
│   │   └── admin/                # Admin shell components
│   ├── features/                 # Independent business modules
│   │   ├── account/
│   │   │   └── components/       # Account overview, navigation, orders, and security UI
│   │   └── auth/
│   │       ├── components/       # Auth-specific UI
│   │       ├── constants/        # Auth endpoints, messages, and constants
│   │       ├── schemas/          # Zod schemas and inferred input types
│   │       └── services/         # Auth API integration
│   ├── config/                   # Application and navigation configuration
│   ├── constants/                # Cross-feature constants
│   ├── hooks/                    # Cross-feature hooks
│   ├── lib/                      # UI-independent infrastructure and utilities
│   │   ├── api/                  # HTTP clients and response/error helpers
│   │   ├── auth/                 # Session and token infrastructure
│   │   ├── db/                   # Server-side database infrastructure
│   │   └── storage/              # Cookie and local-storage abstractions
│   └── types/                    # Types shared by multiple features
├── DESIGN.md                     # Design system and UX guidelines
└── package.json
```

Route groups such as `(auth)` and `(website)` organize source code without appearing in the URL. For example, `src/app/(auth)/dang-nhap/page.tsx` creates the `/dang-nhap` route.

## Architecture Principles

### 1. Keep `app` focused on routing

Files in `src/app` should remain small and handle Next.js responsibilities:

- Define page metadata.
- Read `params` and `searchParams`.
- Perform authorization or redirects at the appropriate boundary.
- Fetch server-side data when necessary.
- Compose feature components into pages.

Do not place schemas, HTTP clients, business rules, or large components directly in `page.tsx`.

```tsx
// src/app/(auth)/dang-nhap/page.tsx
import { LoginForm } from "@/features/auth/components/login-form"

export default function LoginPage() {
  return <LoginForm />
}
```

### 2. Organize business logic by feature

Each business domain belongs in `src/features/<feature-name>`. Create only the directories a feature actually needs.

```text
features/example/
├── components/       # Feature UI and component-specific hooks
├── constants/        # Feature-only constants
├── schemas/          # Validation schemas and inferred types
├── services/         # API calls and external integrations
├── hooks/            # Reusable feature hooks
├── utils/            # Pure feature-specific helpers
└── index.ts           # Optional public API; do not add without a need
```

A feature should not import another feature's internal implementation. Move genuinely shared abstractions to the application-level `components`, `hooks`, `lib`, or `types` directories.

### 3. Maintain one-way dependency flow

Dependencies should flow in one direction:

```text
app → features → shared components/lib/config
```

- `app` may import from `features`, `components`, `config`, and `lib`.
- `features` may import UI primitives and shared infrastructure.
- `components/ui` must never import business features.
- `lib` must not import React components.
- Avoid circular dependencies between features.

### 4. Prefer Server Components

Do not add `"use client"` unless a component requires state, effects, browser APIs, or event handlers.

- Keep `page.tsx` and `layout.tsx` as Server Components whenever possible.
- Push client boundaries down to the smallest interactive component.
- Do not pass non-serializable values from Server Components to Client Components.
- Handle secrets and sensitive data exclusively on the server.

## Naming Conventions

| Item                 | Convention            | Example             |
| -------------------- | --------------------- | ------------------- |
| Folder or file       | `kebab-case`          | `register-form.tsx` |
| React component      | `PascalCase`          | `RegisterForm`      |
| Function or variable | `camelCase`           | `registerUser`      |
| Constant object      | `UPPER_SNAKE_CASE`    | `AUTH_ENDPOINTS`    |
| Zod schema           | `<name>Schema`        | `loginSchema`       |
| Input type           | `<Action>Input`       | `LoginInput`        |
| Service file         | `<domain>.service.ts` | `auth.service.ts`   |
| Hook file            | `use-<name>.ts`       | `use-session.ts`    |
| Dynamic route        | `[param]`             | `[slug]/page.tsx`   |

- A file should have one primary responsibility.
- Prefer named exports for components, services, and utilities.
- Use default exports only where Next.js requires them, such as `page.tsx`, `layout.tsx`, and `error.tsx`.
- Use the `@/` alias instead of long relative import chains.
- Avoid large generic files such as `utils.ts`, `helpers.ts`, or `types.ts` containing unrelated code.

## Forms and Validation

Forms with business logic should use React Hook Form and Zod:

1. Place the schema in `features/<feature>/schemas`.
2. Infer input types with `z.infer`; do not duplicate them manually.
3. Connect the schema with `zodResolver`.
4. Associate field errors with inputs using `components/ui/form`.
5. Always validate again on the server. Client-side validation exists for user experience, not security.

```ts
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export type LoginInput = z.infer<typeof loginSchema>
```

Do not scatter validation expressions and error messages throughout JSX.

## API and Error Handling

- UI components should not call `fetch` directly for domain requests. Put requests in feature services.
- Declare feature endpoints centrally in the feature's constants.
- Send and receive JSON unless uploading files.
- Services must check `response.ok` and normalize failures.
- Never expose raw backend errors directly to users.
- Never log tokens, passwords, cookies, or personal data.
- As API usage grows, introduce a shared HTTP client in `src/lib/api` for base URLs, timeouts, parsing, and error mapping.

The current authentication flow is:

```text
LoginForm
  → loginSchema
  → auth.service.login()
  → POST /api/auth/login
  → redirect after the session is established
```

The backend must implement `/api/auth/login`, `/api/auth/register`, and `/api/auth/google`. Google OAuth secrets must never use the `NEXT_PUBLIC_*` prefix.

## State Management

Choose the narrowest appropriate state scope:

1. Use URL/search parameters for filters, searches, sorting, and shareable state.
2. Keep API data as server state.
3. Use local component state for temporary UI state such as toggles and dialogs.
4. Use context or a store only for state shared across distant component branches, such as the cart or session.

Do not place all state in a global store. Avoid copying server data into local state unless the user needs to edit a temporary draft.

## Components and UI

- `components/ui` contains reusable primitives with no business knowledge.
- Components using business language belong to a feature.
- Headers, footers, and application shells belong to `components/website` or `components/admin`.
- Keep page-level feature components focused on composition. Split independent screen regions into
  named files when they own separate state, user flows, or loading and empty states.
- Keep state beside the component that uses it. For example, order lookup form state belongs in an
  `order-lookup.tsx` component instead of the parent account page shell.
- Follow the tokens, spacing, typography, and accessibility guidance in `DESIGN.md`.
- Every input needs a label, every icon-only button needs an accessible name, and actionable errors should use `role="alert"` where appropriate.
- Test mobile-first layouts, keyboard navigation, and visible focus states.

## Environment Variables and Security

Never commit `.env.local` or secrets. When environment variables are introduced, provide an `.env.example` containing only variable names and safe example values.

- Server-only variables must not use the `NEXT_PUBLIC_` prefix.
- Use `NEXT_PUBLIC_` only for values that are safe to expose in browser bundles.
- Parse and validate environment variables centrally instead of reading `process.env` throughout the codebase.
- Fail early with a clear message when required configuration is missing.

## Adding a Feature

Example workflow for a `wishlist` feature:

1. Define the route and user flow.
2. Create `src/features/wishlist` with only the directories that are needed.
3. Define schemas and domain types.
4. Implement the API boundary in a service.
5. Build feature components and keep client boundaries small.
6. Add a thin `page.tsx` in `src/app`.
7. Add shared URLs to `src/constants/routes.ts`.
8. Handle loading, empty, error, and success states.
9. Verify responsive behavior, keyboard access, and screen-reader semantics.
10. Run linting, formatting checks, and a production build.

Do not introduce abstractions before there is a real reuse requirement. Similar-looking code may still represent different business rules.

For a multi-section feature such as the customer account area, organize components by responsibility:

```text
features/account/components/
├── profile-page-client.tsx       # Page shell and section composition
├── account-navigation.tsx        # Account section navigation
├── account-overview.tsx          # Session and profile summary
├── order-lookup.tsx              # Order lookup form and local state
├── tracking-result.tsx           # Lookup result presentation
├── account-addresses.tsx         # Saved-address state
└── account-security.tsx          # Session security and logout action
```

Small supporting components may remain separate when they establish a consistent feature-level UI
pattern. Avoid both extremes: one file containing the whole screen and a large number of trivial
one-line wrappers.

## Testing

When a test runner is added, colocate tests with the code they cover:

```text
register.schema.ts
register.schema.test.ts

register-form.tsx
register-form.test.tsx
```

Prioritize tests for:

- Pure business logic and schema validation.
- User-visible behavior instead of implementation details.
- API and error mapping at service boundaries.
- Critical flows such as authentication, cart, checkout, and order tracking.

Do not rely exclusively on snapshot tests for interactive UI.

## Git and Pull Requests

- Each commit should represent one intentional change.
- Do not commit `.next`, build artifacts, logs, or secrets.
- Do not reformat unrelated files.
- Pull requests should describe the goal, key changes, verification steps, and include screenshots or recordings for UI changes.
- Document breaking changes and architectural decisions explicitly.

Pre-merge checklist:

- [ ] No new TypeScript errors.
- [ ] ESLint and Prettier pass.
- [ ] The production build passes.
- [ ] The diff and logs contain no secrets or user data.
- [ ] Loading, empty, error, and success states are handled.
- [ ] The UI works on mobile and desktop.
- [ ] Labels, focus states, and semantic HTML are present.
- [ ] Navigation does not lead to unintended 404 pages.
- [ ] Documentation reflects architecture or convention changes.

## Anti-Patterns to Avoid

- Placing all logic in `page.tsx`.
- Calling the same API directly from multiple components.
- Defining the same type in multiple locations.
- Using `any` to bypass TypeScript errors.
- Adding `"use client"` to an entire page or layout without a requirement.
- Importing business features from `components/ui`.
- Hard-coding routes, endpoints, or messages across multiple files.
- Creating global stores for state used by one component.
- Simulating successful authentication in production UI without backend verification.
- Storing sensitive access tokens in `localStorage` when secure HTTP-only cookies are available.

## Related Documentation

- [`DESIGN.md`](./DESIGN.md): design system, responsive behavior, and accessibility.
- [Next.js App Router](https://nextjs.org/docs/app): routing, layouts, and Server Components.
- [React Hook Form](https://react-hook-form.com/): form state management.
- [Zod](https://zod.dev/): schema validation and type inference.
