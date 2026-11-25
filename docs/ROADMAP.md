# UNUSUALL — Development Roadmap

Status: v0.9, updated 2026-11-25. Phases 0–2 and 3.1–3.5 are complete. Create Order remains pending. Owner decisions remain open at the gates below.

## Phase 0 — Project analysis
- [x] Read `AGENTS.md`, all six files in `docs/` and the relevant settings and role files in `.codex/`. At the start of Phase 0 the working folder contained documentation, mockups and assets. It had no Git repository, application scaffold or project test setup.
- [x] Run `architect` and `design_analyst` concurrently as read-only Codex subagents. The architect reviewed scope, order contracts and provider constraints. The design analyst compared all eight mockups with the local assets and inventoried reusable patterns and missing states. The lead verified findings against the local files and consolidated them here.
- [x] Open all desktop and mobile PNGs and inspect the public assets by subject, decoded format, dimensions and transparency. Use the real paths below. [ASSETS.md](ASSETS.md) takes precedence over the preliminary inventory in [DESIGN_SYSTEM.md §9](DESIGN_SYSTEM.md#9-assets-and-preparation). Several entries in both files describe intended destinations.
- [x] Record owner decisions and separate the conditions for bootstrap, individual UI and backend work, and launch.

### Verified mockups and assets

| Route | Desktop under `design/desktop/` | Mobile under `design/mobile/` | Responsive composition |
|---|---|---|---|
| `/` | `home.PNG` | `home.PNG` | Copy beside jacket → copy above jacket; horizontal process → vertical list; two order links |
| `/collection` | `collection.PNG` | `collection.PNG` | Six filters across → two rows of three where they fit; four cards across → two columns; separate hero tagline shown on desktop |
| `/create-order` | `create_order.PNG` | `create_order.PNG` | Five groups on one page; five garment choices across → 3+2; paired detail/contact fields → stacked; submit shifts from right to center |
| `/about` | `about.png` | `about.PNG` | Idea heading, copy and machine photo in one row → photo below copy; process horizontal → vertical; benefits strip → 2×2 |

- Desktop PNGs are 1536×864. Mobile PNGs are 941×1672 including the phone frame. Compare the website to the screen interior. Use 390×844 as the proposed mobile QA viewport and allow vertical scrolling. Check narrow/intermediate layouts from 320px and adjust based on content fit.
- Five backgrounds under `public/images/backgrounds/` and `public/images/process/embroidery-machine.webp` match the intended subjects. Phase 0 found PNG bytes under their `.webp` suffixes. Phase 2 records the conversion and source archive. Check responsive crops and readability during UI implementation, accounting for ornaments already in the imagery.
- `public/logo/` contains 15 files, including logo variants and the favicon and Apple touch icon assets. Use the existing white SVG on dark backgrounds with its original proportions. The derived sign lacks the separate `unusual` wordmark visible in headers. Confirm the public spelling and supply or approve the missing wordmark without redrawing the sign.
- The four transparent concepts in `public/images/products/` depict dark logo-branded garments. They differ from the mountain TERRAIN hoodie, white koi FLOW tee, floral BOTANICA jacket and mountain MINIMAL cap. The catalog needs approved product images and matching metadata.
- Phase 0 found no licensed Cyrillic display/body fonts or interface icons. Phase 2 adds specimens and SVG candidates for review. `design/components/` and editable component/layer sources are unavailable locally. `public/images/portfolio/` is empty. Its two listed photos are reserve assets outside the MVP.

### Decisions required by feature

- **Brand and UI.** Public spelling `UNUSUALL` versus artwork `UNUSUAL`/`unusual`, wordmark, fonts, line icons, coordinates and visible marketing claims. Review how to render the open mobile menu, focus/hover, empty catalog, open selects and upload/form feedback.
- **Catalog.** Confirm what each card represents, where its arrow leads, whether purchase inquiries are in scope, and the actual collection categories, limited flags and approved images. Implement filters against verified metadata.
- **Order form.** Confirm required fields and defaults, size and placement values and applicability (especially for accessories and «Другое»), reference optionality, phone regions and any required description. «Худи», M and «На спине» are visible examples. The broader field examples in `AGENTS.md` do not add color or a new description field to the current form.
- **Upload and response copy.** The references advertise PNG/JPG/SVG/AI up to 20 MB and a response within two hours. The requirements propose PNG/JPEG with a limit to be agreed. Agree the exact byte limit, formats, handling and published hint together. Confirm response hours and customer-facing wording. Define success as a stored request and track notification delivery separately.
- **Operations and privacy.** Confirm notice/contact, data access, retention and deletion, provider plans, isolated service credentials and Telegram recipients. Production deployment, migrations and real messages require the owner's explicit approval.

### Architecture baseline for planning

- Keep Next.js App Router, strict TypeScript and Tailwind as the proposed foundation. Use Server Components for page composition and client components for menu, filter and form interactions. Share shell/navigation, hero structure, bracketed CTA, process timeline, decor and the line-icon style. Keep page art direction and copy local. Reuse typed field primitives and the five-group form structure within the order feature.
- Start with typed static collection data after metadata approval. Use one order contract for the UI and Route Handler, with shared Zod validation and server-only persistence/integration services.
- Use PostgreSQL/Prisma to persist order, eligible upload claim and notification outbox in one transaction. Scope the idempotency key to the session and compare normalized payloads. On replay, return the existing result before attempting to claim its upload again. Use database constraints for concurrent submits.
- Prefer direct-to-storage upload with an expiring session-bound authorization and validation of the stored object before it can be claimed. Verify byte and dimension limits, actual type/content and scanning, quotas, expiration/cleanup, and privacy of originals and derivatives on the selected plan. Vercel's default request-body cap is 4.5 MB, with 20 MiB available through an opt-in beta. Cloudinary's `authenticated` delivery protects originals and derivatives. [Vercel Functions limits](https://vercel.com/docs/functions/limitations) · [Cloudinary delivery types](https://cloudinary.com/documentation/upload_parameters#delivery_types)
- Use an authenticated scheduled worker with durable rate limits for public endpoints, atomic job leases, bounded retries and authorized recovery. Reuse the order ID in Telegram to identify possible duplicates after ambiguous delivery. Choose a scheduler against the required cadence. Vercel's legacy Cron Jobs on Hobby run daily. [Vercel Cron Jobs usage and pricing](https://vercel.com/docs/schedules/cron-jobs/usage-and-pricing)

Phase 0 used static verification. Phase 1 covers runtime checks of the scaffold. Browser comparison with the mockups and service integration checks are separate gates.

## Phase 1 — Bootstrap

Owner: lead. Reviewed independently by `bootstrap_architect` and `bootstrap_reviewer`.

- [x] Initialize a local Git repository on `main` and verify ignore rules for secrets and generated files. The repository has no commits or remotes.
- [x] Add a Next.js App Router scaffold in the existing root, with strict TypeScript, the `@/*` alias, Tailwind 4 through PostCSS, ESLint, npm lockfile, README and a safe `.env.example`.
- [x] Add a minimal layout and working server-rendered placeholders for `/`, `/collection`, `/create-order`, `/about`. Preserve `AGENTS.md`, `.codex/`, `design/`, `public/` and other documents. Disable Next.js agent-rule generation to protect the original `AGENTS.md`.
- [x] On Windows x64 with Node 24.11.1 and npm 11.6.2, verify `npm ci`, `npm run lint`, `npm run typecheck` and `npm run build`. Verify HTTP 200 and the expected headings on all four routes through `npm run dev` and `npm run start`. Playwright found no page errors or horizontal overflow at widths 320, 390, 768 and 1536px. Browser styling confirmed Tailwind utilities are applied.
- [x] Review the final bootstrap configuration and source. The reviewer verified the README correction and the Next.js setting that protects existing agent rules. ESLint 9 was selected for compatibility with current Next.js lint plugins. npm reports the ESLint branch as out of support.

Gate passed for the minimal scaffold. The browser smoke check used the existing Playwright tool.

## Phase 2 — Asset preparation

Owner: lead. Design analysis by `assets_design`, SVG work by `assets_frontend`, independent checks by `assets_qa` and `assets_reviewer`.

- [x] Record the Git state and SHA-256 of existing project files. Archive six original PNGs outside `public/` and convert their public versions to lossless WebP. Verify format, dimensions, exact RGB and original hashes. See [asset inventory](ASSETS.md#supplied-photographs).
- [x] Inspect all supplied logo/favicon variants and use one root App Router metadata declaration for SVG favicon, ICO fallback and Apple Touch Icon. Preserve logo geometry and record the missing wordmark.
- [x] Prepare and validate 17 project-authored SVG icons. Inspect all four product concepts against desktop and mobile references and preserve their supplied bytes. [Product comparison](../design/review/products.html)
- [x] Analyze typography in eight references. Verify six Cyrillic/Latin candidates, archive their notices and prepare a local WOFF2 comparison. Record a proposed pair, weight, spacing and line-height. [Typography comparison](../design/review/typography.html)
- [x] Run independent asset QA and review. Run lint, typecheck and production build. Verify all four routes, all three icon links, six WebPs and 17 UI SVGs via the production server. Verify local specimen assets render in Playwright and stay outside Next.js routes.
- [ ] Approve the production font pair, wordmark, brand spelling, product images and final UI icon appearance with the owner.

Gate passed for technical asset preparation. Approvals and responsive crop verification remain open for UI and catalog sign-off.

## Phase 3 — UI

### Phase 3.1 — Design System & UI Kit

- [x] Enable local Unbounded 200 and Manrope 400/500/600 with Cyrillic and Latin subsets and OFL notices.
- [x] Implement Tailwind CSS 4 theme tokens, responsive gutters and typography, accessible primitives, and decorative elements.
- [x] Add the development-only `/ui-kit` showcase. The production route returns 404.
- [x] Run lint, typecheck and build. Verify the showcase with Playwright at 320, 390, 768, 1024 and 1536 px. Capture full-page screenshots at 390, 768 and 1536 px outside the public asset tree.

### Phase 3.2 — Header & Navigation

- [x] Add a shared header to the four site routes, with the supplied white SVG, the working text wordmark `unusuall` and the studio descriptor.
- [x] Implement desktop links and an accessible mobile disclosure with the current route, visible focus, Escape dismissal and reduced-motion support.
- [x] Verify navigation, browser history, keyboard use and responsive layout in Playwright. Compare desktop 1536×864 and mobile 390×844 to the mockup headers. Check intermediate widths around the 1024 px switch and capture desktop, tablet and both mobile menu states outside the repository.
- [x] Run lint, typecheck and production build.

The open mobile menu uses an anchored dark panel with the four existing links. The references show the closed state. The working title is `UNUSUALL`. The existing mark retains its geometry and the lowercase wordmark is rendered as text.

### Phase 3.3 — Home Page

- [x] Implement the hero, responsive process strip and final order CTA on `/` using the existing header, UI Kit and supplied WebP assets.
- [x] Review desktop and mobile Home mockups with `design_analyst` and compare the implementation with the originals. The supplied hero photo places the copper embroidery lower relative to the collar than the desktop mockup.
- [x] Verify heading breaks, image loading, both order links, keyboard focus, site navigation and overflow with Playwright in the production build at 320, 390, 768, 1024 and 1536 px. Capture screenshots at 1536×864 and 390×844, plus the full mobile page, outside the repository.
- [x] Run lint, typecheck and production build.

### Phase 3.4 — Collection Page

- [x] Implement the collection hero, four-card catalog and responsive filters on `/collection`, using the shared header, UI Kit and local assets.
- [x] Filter typed static data by category. The limited filter shows an empty state until limited status is confirmed.
- [x] Use the supplied product PNGs as provisional photos. Crop the front views in CSS and preserve the originals. The card arrow and its action await approval.
- [x] Compare desktop 1536×864 and mobile 390×844 against the supplied mockups. Verify keyboard and touch filtering, image loading and overflow with Playwright at 320, 390, 768, 1024 and 1536 px. Save desktop and mobile screenshots outside the repository.
- [x] Run lint, typecheck and production build.

### Phase 3.5 — About Page

- [x] Implement the hero, studio philosophy, machine image panel, process, benefits and order CTA on `/about`. Preserve the sequence and copy from the mockups.
- [x] Reuse the supplied WebP artwork and responsive CSS crops. Preserve `UNUSUAL` in the hero as shown in the mockups. Final public spelling remains an owner decision.
- [x] Compare desktop 1536×864 and mobile 390×844 to the originals. Verify images, overflow, navigation and keyboard/touch CTA in the Playwright production check at 320, 390, 768, 1024 and 1536 px. Capture desktop and mobile screenshots outside the repository.
- [x] Run lint, typecheck and production build.

### Phase 3.6 — Create Order Page

- [x] Implement the hero and five order groups on `/create-order` using the shared Header, order controls, fonts, design tokens and embroidery artwork. The garment picker shows five cards on desktop and rows of three and two on mobile.
- [x] Review the future API structure with `architect`. Decode the typed order fields separately from the local reference file. Validate inputs, check local PNG/JPEG metadata and signatures, and support file removal, accessible errors, pending state and duplicate-click protection.
- [x] Exercise the isolated form outcomes with `npm run dev` using `/create-order?orderDemo=success` or `/create-order?orderDemo=error`. The public form reports that sending is unavailable. Browser checks confirmed zero submission requests in both builds.
- [x] Compare the production page to the original desktop and mobile mockups. Verify Chromium at 1536×864, 390×844 and widths 320, 768 and 1024, including keyboard use, selections, input and file errors, file removal and no horizontal overflow. Capture desktop and mobile screenshots outside the repository.
- [x] Run lint, typecheck and production build.

The mockup examples M and «На спине» are selectable with no preselection. The mobile form preserves 44 px controls, so it extends lower than the reference. PNG/JPEG describes the local check only. File requirements, supported formats and limits, option lists and applicability, defaults, phone regions and the response window remain open. API wiring, server validation, persisted idempotency and private uploads are Phase 4 work.

### Phase 3.7 — Visual QA & Frontend Audit

- [x] Run independent read-only audits. `qa` compared the four routes against all eight original screenshots and tested the flows in Playwright. `reviewer` audited the frontend code, rendering boundaries, accessibility and image loading.
- [x] Fix the root favicon fallback, add distinct page titles and prevent narrow-layout overflow with 200% root text sizing. Keep order submission focus during the local pending/retry cycle, associate field errors before focusing them and require correction or removal of a rejected file before validating the form.
- [x] Refine the About hero and machine crops, restore the desktop hero decoration, improve mobile order input readability and match responsive image hints to rendered widths. Use lower priority for Home and About CTA artwork.
- [x] Pass lint, typecheck and build. Recheck the production build in Playwright Chromium at 320, 390, 768, 1024 and 1536 px. Check menu, focus and history, CTAs, filters, form validation, file removal, overflow, console and network requests. Verify isolated order success, error and retry in development. Confirm zero submission requests.
- [x] Save eight full-page screenshots in [`design/review/final/`](../design/review/final/), with desktop viewport 1536×864 and mobile viewport 390×844.

**Frontend technical gate passed** for the current local flows. Owner visual sign-off remains open for the final screenshots, including crop, typography and decorative details. The Home hero uses the supplied jacket photo with a different embroidery placement from the mockup. Collection uses provisional product photos and awaits approved card actions. The taller mobile order form preserves readable text and 44 px controls. Brand spelling, catalog and claims, order rules, response window and privacy remain in the open decision register.

## Phase 4 — Order backend and integration
Owner: architect for contract; lead assigns disjoint frontend/backend files. Backend implements, QA/reviewer verify.
- [ ] Finalize order fields/options, upload policy and notification contract early enough for the Phase 3 form mock. Select isolated DB/storage, scheduler, shared rate-limit mechanism and test notification channel before integration.
- [ ] Configure isolated PostgreSQL and Prisma migrations; transactional order/outbox and idempotency.
- [ ] Secure private upload init/complete, validation/scanning, quotas, expiry/cleanup.
- [ ] Implement API and connect form; server validation, rate limits and accessible feedback.
- [ ] Configure Telegram and authenticated scheduled worker; durable retries, expired lease recovery, failure monitoring and authorized manual recovery.
- [ ] Test valid/invalid orders, duplicate and concurrent requests, upload abuse, storage/DB failures, Telegram failure, retry/exhaustion; verify no data leaks.
Gate: synthetic order persisted and delivered through mocked/isolated channel; retry demonstrated. Actual owner delivery not claimed until approved smoke test.

## Phase 5 — Release verification
Owner: QA + reviewer independently; lead fixes/integrates and reruns checks.
- [ ] Lint, typecheck, unit/integration/e2e and production build; report exact commands/results.
- [ ] Full visual comparison and accessibility checks at target widths; validate images, fonts, metadata and links.
- [ ] Confirm actual catalog, commercial behavior, final copy, privacy notice, retention and provider/data-access rules; resolve all critical defects and launch blockers.
- [ ] Validate staging environment, DB migrations, secrets, backup/restore and operational recovery; verify hosting/upload/scheduler limits.

## Phase 6 — Launch (owner approval required)
- [ ] Configure domain, production env, database, storage, worker and indexing policy.
- [ ] Explicit approval before production migrations, deployment and real messages; smoke test with authorized recipient and synthetic request, remove test data per policy.
- [ ] Confirm owner can receive and recover orders; document monitoring and rollback, update README and roadmap.

## Working method
Lead delegates independent tasks to relevant specialists, not all agents by default. No overlapping writes, parallel migrations or unapproved commits/deployments. For each task record status, owner/agent, paths, actual tests, screenshots if relevant, decisions, and blockers. Report in Russian. Do not set a model or reasoning effort in project docs.

## Open decision register
| Decision | Status and gate |
|---|---|
| Existing Git repository or new initialization | Resolved in Phase 1. Local Git on `main` |
| Spelling/wordmark, icon and state sign-off | Working forms: `UNUSUALL` and `unusuall`. Confirm the open mobile menu, original vector wordmark if supplied, and final page typography and icons |
| Card destinations, purchase inquiries, actual product metadata and approved photos | Open before functional catalog sign-off |
| Required reference, form defaults, size/placement applicability, exact upload policy and phone regions | Open before finalizing the order contract |
| Two-hour response and hours, marketing claims and coordinates | Open before publishing copy |
| Private storage and scanning, managed DB, durable scheduler/rate limits, isolated credentials | Open before integration |
| Privacy notice, controller/contact, access, retention and deletion | Open before public submissions |
| Telegram recipient and approval for real delivery, production migration/deployment | Open before launch |
