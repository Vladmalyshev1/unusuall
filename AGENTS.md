# UNUSUALL — Repository Instructions

## 1. Mission and scope
UNUSUALL is a clothing brand offering custom embroidery and its own clothing collections. Build a production-ready responsive website that faithfully implements the supplied desktop and mobile mockups and reliably delivers customer order requests to the brand owner.

Core routes: `/` (home), `/collection`, `/create-order`, `/about`.
Proposed MVP: collection catalog and purchase inquiries; custom embroidery requests with optional reference uploads; no checkout, payment, accounts, or admin dashboard unless explicitly approved. Exact fields, copy, pricing, collection behavior and legal text must come from approved requirements/assets. Do not invent them.

## 2. Source of truth
- Read relevant repository instructions and inspect actual files before editing.
- If present, consult `docs/PROJECT.md`, `docs/REQUIREMENTS.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN_SYSTEM.md`, `docs/ROADMAP.md` and `README.md`.
- Inspect `design/desktop/`, `design/mobile/`, `design/components/` and `public/` when available; use authorized Figma access if provided. The approved mockups govern visual decisions; requirements govern behavior. Never silently resolve conflicts that change scope, branding or data handling.
- Missing documents, assets or credentials are not permission to fabricate them. Record gaps and assumptions; continue with reversible work where feasible. Do not assert access to Figma or visual verification without evidence.

## 3. Proposed stack and boundaries
- Next.js App Router, React, strict TypeScript, Tailwind CSS; use the installed versions and lockfile. Motion only when needed by the approved experience.
- React Hook Form and Zod for forms; server-side validation remains mandatory.
- Next.js Route Handlers, PostgreSQL and Prisma; Cloudinary for reference uploads; Telegram Bot API for owner notifications. Email is optional only when approved.
- Playwright for browser and visual verification; Vitest for focused unit/integration tests; ESLint; Vercel deployment target. Do not add dependencies or change the stack without a concrete reason; get approval for major changes.
- Prefer `src/app/` for routes, `src/components/` for shared UI, `src/features/` for feature UI, `src/lib/` for shared utilities and validation, `src/services/` for server business logic, `prisma/` for schema/migrations, `tests/` for verification. Follow existing conventions where compatible. Avoid speculative abstractions.

## 4. Main agent and subagent orchestration
The primary Codex agent is the Tech Lead and owns the plan, file assignments, contracts, integration, final verification and user-facing report. Use real Codex subagents where available, not simulated role-play.

Custom agents in `.codex/agents/`:
- `architect`: read-only architecture, interfaces, data model and dependency analysis.
- `design_analyst`: read-only desktop/mobile mockup analysis, layout and token inventory.
- `frontend`: implementation of assigned UI and styles.
- `backend`: implementation of assigned server, database and integrations.
- `qa`: tests, browser screenshots, reproduction and validation; test files only if assigned.
- `reviewer`: read-only correctness, security, privacy and regression review.

Delegation rules:
1. For nontrivial multi-file, cross-layer, design-heavy or security-sensitive tasks, delegate independent work to relevant specialists. For trivial changes work directly. Never spawn all agents by default.
2. Give each agent the objective, relevant docs/mockups, exact file ownership or read-only scope, required deliverable, acceptance criteria and dependencies. Ask for concise evidence, file paths and unresolved issues.
3. Run independent read-only analysis in parallel. Wait for architecture/design decisions and API contracts before dependent implementation. Parallelize writers only when their file scopes do not overlap. If scopes overlap, serialize edits or use explicitly managed isolated worktrees and integrate deliberately.
4. The Tech Lead owns shared contracts, global configuration, package manifests/lockfiles, common tokens, and cross-feature files unless explicitly assigned to one writer. Do not let multiple agents start servers on the same port, run migrations against the same shared database, or modify the same test baselines concurrently.
5. Subagents must not spawn further agents unless explicitly requested by the Tech Lead. Read-only roles must not write code or execute destructive commands; this is an instruction boundary, not a separate permission sandbox.
6. Wait for necessary results; inspect actual diffs and resolve conflicts. Do not trust claims of success without checking evidence. Run QA/review after implementation; fix and recheck material findings. Close completed agent threads when supported.
7. If subagent tools are unavailable, report the limitation and complete feasible work directly. Never claim a subagent was used when it was not.

Suggested sequences:
- Initial project analysis: architect + design_analyst in parallel; lead consolidates plan; no implementation unless requested.
- UI task: design_analyst (if needed), frontend, then qa and reviewer.
- Order flow: architect defines contract, backend and frontend implement independent scopes, then qa and reviewer.

## 5. Implementation standards
- Use Server Components by default; add `use client` only for interactive/browser-dependent components. Keep database, secrets and external integrations server-only. Keep route handlers thin and business logic testable.
- Use semantic HTML, accessible labels, keyboard navigation, visible focus, meaningful alternative text and reduced-motion support. Preserve the approved layout while addressing accessibility blockers; report material design deviations.
- Derive responsive sizes, spacing, typography, grid, colors and assets from actual mockups. Use reusable tokens and shared components; avoid hardcoded desktop-only positions, horizontal overflow and duplicating whole pages for mobile.
- Use `next/image` and appropriate sizes for photos, approved local fonts when licensed, stable image dimensions and semantic metadata. Do not substitute brand assets with generated or stock images without approval.
- Verify exact reference viewport dimensions and intermediate widths. Match composition, alignment, type, crop, navigation and states; do not claim pixel-perfect fidelity based on code inspection alone.
- Use typed contracts; avoid `any`, unsafe assertions, unnecessary client state, broad refactors and unused code. Respect the existing package manager and scripts. Do not overwrite user changes.

## 6. Orders and security
- Confirm actual form fields against approved mockups/requirements. Proposed fields include name, contact, garment, size/color, embroidery description and optional reference. Do not demand unnecessary personal data.
- Validate and normalize inputs on the server using Zod, enforce file size/type/content limits, reject unsafe uploads, and use non-public or access-controlled storage for customer reference files. Do not trust client metadata or expose signed credentials.
- Prevent spam and accidental duplicate requests using appropriate rate limits and a persisted idempotency strategy. Disabling the submit button alone is insufficient.
- Persist a valid order and its notification state before attempting delivery. Use a durable retry mechanism (e.g. persisted outbox and a configured scheduled worker) with bounded retries and operational visibility; do not rely on in-memory timers after a serverless response.
- If Telegram delivery fails, preserve the order and retry without recreating it. Use stable order IDs and account for ambiguous delivery/possible duplicate notifications. Do not falsely claim the owner has received a message. A successful order receipt and a successful notification are distinct states.
- The form must support idle, pending, validation error, server error and success states; show success only after persistence. Display safe messages and preserve appropriate input on recoverable failure.
- Never print tokens or personal data, expose server keys in `NEXT_PUBLIC_*`, commit `.env.local`, or send test orders to real recipients. Use mocks or isolated test services. Real external notifications, production migrations, deployments and destructive operations require explicit approval.
- Limit stored data, restrict access, define retention and privacy requirements before launch. Do not invent legal compliance claims or policies.
- Keep `.env.example` documented with empty/sample non-secret values. Missing secrets must be reported, not invented. Do not weaken safety checks to make tests pass.

## 7. Workflow and quality gates
1. Inspect repository status, docs, assets, scripts and applicable instructions. Identify gaps, constraints and acceptance criteria.
2. For substantial changes, make a short plan and delegate according to section 4. Keep edits focused. Update existing roadmap for completed work when applicable; create it only when requested or agreed in the plan.
3. Check actual scripts before running. Expected npm commands when defined: `npm run lint`, `npm run typecheck` (or local `tsc --noEmit`), `npm run test`, `npm run test:e2e`, `npm run build`. Use the project's equivalents. Never silently skip failures or install arbitrary tooling just to run a check.
4. Run relevant targeted tests and final integration checks. For UI changes use real browser screenshots at reference widths and intermediate sizes if tooling/assets exist. Inspect console errors, network failures, keyboard behavior and layout overflow. Store evidence in an agreed non-public location; do not overwrite approved reference images or update baselines just to pass.
5. For order changes test invalid/valid input, unsafe/oversized files, duplicate requests, persistence failure, notification failure and retry. Use test database and mocked notifications; check successful flow through API and UI. Do not touch production data.
6. Review diff for regressions, secrets and unrelated changes. No commit, push, deploy, destructive migration or data deletion unless requested. Preserve existing work.

## 8. Definition of done and final report
A task is done only when requested behavior is implemented, relevant checks pass, no known critical defects remain, and any unverified requirements are explicitly listed. For UI, compare with supplied mockups; for orders, verify persistence and owner notification path, with real delivery verification separately identified if not performed.

Report in the user's language (Russian by default):
- What changed and why; important file paths.
- Which subagents actually ran and what each delivered.
- Commands/tests actually run and their outcomes; screenshots when applicable.
- Remaining risks, missing assets/credentials, assumptions and skipped checks.
- Suggested next step if useful.
Keep identifiers and code in English; website copy follows the approved design language.


## Brand Logo

- Primary logo: /logo/logo-white.svg
- Brand color logo: /logo/logo-blue.svg
- Monochrome logo: /logo/logo-black.svg
- Favicon: /logo/favicon.svg
- Fallback favicon: /logo/favicon.ico
- Apple touch icon: /logo/apple-touch-icon.png

### Logo Rules

- Prefer SVG assets.
- Use the white logo on dark backgrounds.
- Preserve the original aspect ratio.
- Never stretch, distort or rotate the logo.
- Do not apply additional shadows or effects.
- Do not modify the logo geometry.
- Do not generate alternative brand logos.