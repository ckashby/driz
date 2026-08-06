# WWorld1 Project Memory

Last updated: 2026-08-05

## Product direction

WWorld1 helps people discover holistic, wellness, and transformational events. The current milestone includes a polished public marketing experience, working email/password authentication, and an authenticated personal dashboard preview. Event discovery, facilitator tools, and live booking data remain postponed.

## Current application state

- Next.js 16 App Router application using React 19 and TypeScript.
- Application and package metadata use the `WWorld1` name.
- `/` contains the WWorld1 marketing homepage content.
- `/how-it-works` contains the four-step Discover, Book, Experience, and Review journey.
- Shared header and footer use the WWorld1 leaf mark and link the brand lockup to `/`.
- `How it Works` is the only active marketing navigation link.
- shadcn/ui is initialized with the Radix Nova style and the existing mist-and-fern theme.
- Better Auth 1.6.25 is connected to Neon Postgres through Drizzle.
- The Better Auth handler is mounted at `/api/auth/[...all]`.
- The required `user`, `session`, `account`, and `verification` tables and initial Drizzle migration exist.
- `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL` are present in local environment configuration. Secret values must never be committed or copied into this file.
- Email/password authentication is active through dedicated sign-up and sign-in pages and a session-aware navbar.
- `/dashboard` is server-protected with a full Better Auth session lookup and redirects anonymous visitors to `/sign-in`.
- The dashboard heading uses the authenticated account email and real signup date. Upcoming and past events are clearly labeled example data from `lib/sample-dashboard-events.ts`; they are not persisted reservations.
- Successful sign-up and sign-in redirect to `/dashboard`. Authenticated navbar state includes `Dashboard` and `Log out` actions.
- The previous hard-coded signup demo component has been removed.

## Approved authentication plan

1. Create `/sign-up` and `/sign-in` routes with focused, responsive shadcn forms.
2. Use `authClient.signUp.email()` and `authClient.signIn.email()` from client components.
3. Validate name, email, password, and password confirmation before requests.
4. Use generic authentication errors that do not disclose whether an account exists.
5. Redirect successful sign-up/sign-in to `/dashboard` and refresh the router.
6. Create an isolated client-side navbar auth-actions component using `authClient.useSession()` so the marketing pages can remain statically rendered.
7. Logged-out navbar state: show `Sign in` and `Sign up`.
8. Logged-in navbar state: hide guest actions and show `Dashboard` and `Log out`.
9. Use a stable loading placeholder to avoid showing incorrect auth actions while session state is loading.
10. Log out through `authClient.signOut()`, then return to `/` and refresh session-aware UI.
11. Set `appName: "WWorld1"` and explicit 12–256 character password limits in the Better Auth server configuration.
12. Preserve Better Auth's CSRF, origin, and secure-cookie defaults.
13. Verify the existing database migration, `/api/auth/ok`, lint, production build, responsive layout, sign-up, persisted session, logout, and sign-in.

## Auth UI direction

- Audience: wellness-event seekers creating or accessing a WWorld1 account.
- Single job: complete authentication with minimal distraction.
- Palette: existing Background `#f6f8f4`, Card `#fffef9`, Fern `#486b59`, Accent `#dce9df`, Ink `#171a18`, Muted `#68716b`.
- Typography: Manrope for headings and Geist for form/interface text.
- Layout: centered single-column card with generous whitespace and the shared header/footer.
- Signature: a restrained WWorld1 leaf seal above the form title.
- Accessibility: semantic labels, autocomplete attributes, visible focus, inline errors, disabled pending states, and mobile-safe controls.

## Scope boundaries and follow-ups

- Do not activate Events, Categories, Discover, For Facilitators, or account-management pages in this milestone.
- Email verification and password reset require a transactional email provider and are recommended before public registration, but are not part of this initial auth activation.
- Do not add social authentication until a provider and product requirements are selected.
- Any database migration against a shared or production Neon database must be confirmed before mutation.

## Implementation status

- [x] Marketing homepage, shared header/footer, and How it Works route
- [x] Better Auth API, Neon/Drizzle adapter, schema, and initial migration files
- [x] Sign-up page and form
- [x] Sign-in page and form
- [x] Session-aware navbar actions
- [x] Conditional logout behavior
- [x] Protected personal dashboard route
- [x] Account email and member-since heading
- [x] Example upcoming event list and past-events accordion
- [x] Post-authentication dashboard redirects
- [x] Auth configuration hardening
- [x] Removal of unsafe demo signup component
- [x] Database/API verification
- [x] Lint, build, and browser lifecycle verification

## Authentication implementation notes

- Auth routes are `/sign-up` and `/sign-in`.
- Authenticated users who request either auth route are redirected to `/dashboard` by a server-side session check.
- `components/auth/auth-actions.tsx` owns reactive navbar session state while the shared marketing header remains otherwise server-rendered.
- Password rules are centralized in `lib/auth-rules.ts` and shared by client validation and Better Auth server configuration.
- The navbar uses a stable loading placeholder, shows `Sign in` and `Sign up` to guests, and shows `Dashboard` and `Log out` to authenticated users.
- Sign-up automatically creates a session, following Better Auth's default behavior.
- Sign-out returns the user to `/` and refreshes session-aware UI.

## Dashboard implementation notes

- `/dashboard` validates the current session in its server component with `auth.api.getSession({ headers: await headers() })` and redirects missing sessions to `/sign-in`.
- The page heading includes the current account email and formats `session.user.createdAt` as the member-since date.
- Three upcoming and two past sample events demonstrate the intended dashboard information hierarchy.
- Past events use the shadcn Accordion component and remain collapsed until requested.
- Sample events have no detail links and do not imply live bookings. Replace `lib/sample-dashboard-events.ts` with event and registration database queries when the booking model is implemented.

## Verification completed 2026-08-05

- Existing Drizzle migration applied successfully to the configured Neon database.
- `GET /api/auth/ok` returned HTTP 200 with `{ "ok": true }`.
- Dedicated test account created: `codex.auth.20260805.0236@example.com`. Its password is intentionally not recorded. Remove the account from the development database when it is no longer useful.
- Sign-up, automatic sign-in, session persistence after reload, logout, invalid-credential handling, and subsequent sign-in all passed in agent-browser.
- Logged-out navbar shows `Sign in` and `Sign up`; authenticated navbar shows only `Log out`.
- Mobile verification passed at 390 × 844 with no horizontal overflow.
- axe-core audit passed with 0 violations and 0 incomplete checks.
- Browser console contained no application errors and no Next.js error overlay.
- ESLint, TypeScript, production build, and `git diff --check` passed.

## Dashboard verification completed 2026-08-05

- Anonymous requests to `/dashboard` redirect to `/sign-in`.
- Successful sign-up and later sign-in both redirect to `/dashboard`.
- Dashboard displays the authenticated email and the actual Better Auth `createdAt` value as `Member since August 5, 2026` for the test account.
- Three upcoming sample events render in date order; the past-events accordion starts collapsed and reveals two past sample events when expanded.
- Authenticated navigation shows `Dashboard` and `Log out`; logout restores the guest navbar and returns to `/`.
- Dedicated dashboard test account created: `codex.dashboard.20260805.0731@example.com`. Its password is intentionally not recorded. Remove the account from the development database when it is no longer useful.
- Desktop and 390 × 844 mobile verification passed with no horizontal overflow.
- axe-core reported 0 accessibility violations. One `link-in-text-block` item for the standalone footer brand link remains a manual-review/incomplete result rather than a violation.
- Browser page errors and framework error overlay checks were clear.

## Remaining production auth work

- Add transactional email delivery, email verification, and password reset before broad public registration.
- Revisit rate-limit storage before production scale; in-memory limits are not shared across serverless instances.
- Add production and preview origins to Better Auth trusted origins if authentication will run on more than the canonical application origin.
