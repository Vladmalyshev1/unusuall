# UNUSUALL — Technical Architecture

Status: v0.1 — proposed design, not an implementation report. Inspect existing repo, dependencies and provider capabilities before adopting. No AI model settings.

## Stack and structure
Next.js App Router + React + strict TypeScript + Tailwind CSS; server components by default. React Hook Form + shared Zod schemas for form interaction; Route Handlers + server-only services; PostgreSQL + Prisma for durable order state; Cloudinary for private reference uploads subject to capability checks; Telegram Bot API for notifications; Vercel deployment target. Vitest, Playwright, ESLint. Motion only if needed. Use lockfile and existing scripts, no arbitrary version upgrades. Choose managed PostgreSQL provider and retry scheduler before integration.

```text
src/
  app/
    layout.tsx, globals.css, page.tsx
    collection/page.tsx
    create-order/page.tsx
    about/page.tsx
    api/orders/route.ts
    api/uploads/init/route.ts
    api/uploads/complete/route.ts
    api/internal/notifications/route.ts
  components/{layout,ui,shared,decorative}/
  features/{home,collection,create-order,about}/
  lib/{env,prisma,validations}/
  services/{order,upload,notification}.service.ts
  data/collections.ts
  types/
prisma/schema.prisma
prisma/migrations/
tests/{unit,integration,e2e}/
```

Illustrative paths; use real repo conventions. Keep route handlers thin, shared validation pure, integrations server-only (`server-only` guard where appropriate), UI isolated from DB and secrets. Catalog initially typed static data: `id`, `slug`, `name`, `category`, `image`, `alt`, `isLimited` only when verified; purchase action requires agreement. No speculative catalog tables.

## Order flow and contract
1. Customer chooses garment/details and optionally initiates a reference upload. API rate limits, creates short-lived upload intent bound to anonymous session, returns restricted upload authorization; browser sends directly to private storage if required by hosting limits. Verify installed SDK, provider and plan limits; never proxy large files blindly.
2. Completion endpoint verifies storage object identity, actual byte/type/content, scan result, size and ownership; marks upload eligible. Store generated object key, not public URL. Expire unused intents/files with a configured cleanup job.
3. `POST /api/orders` accepts JSON validated via shared schema and `Idempotency-Key` header; `garmentType`, `size`, `placement`, `comment`, `name`, `phone`, optional `referenceUploadId` per requirements. Reject extra/invalid fields, invalid session binding, reused/expired upload and abusive submissions.
4. In one database transaction create Order, claim eligible upload, and enqueue NotificationJob. Unique idempotency key scoped to anonymous session with normalized payload fingerprint; concurrent duplicates handled by DB uniqueness, identical retry returns original result; same key/different payload returns conflict.
5. Return `201 { orderId, status: "accepted" }` or `200` for identical retry. `400` invalid input, `409` conflict, `413` too large, `415` unsupported type where relevant, `429` rate limit, `503` temporary failure. Error shape proposal `{ code, message, fieldErrors? }`; safe localized UI, no stack traces, no personal data in responses except required input feedback. Never treat `accepted` as Telegram delivery.
6. Authenticated scheduled worker processes persisted jobs and sends to configured owner chat. Include order ID and required details; reference via approved private delivery mechanism (secure expiring link or safe attachment). Verify recipient, escape message text, minimize personal data. No browser-side Telegram calls.

## Data model (conceptual)
| Entity | Key fields / constraints |
|---|---|
| Order | UUID id, createdAt, garmentType, nullable size/placement/comment, name, normalized phone, session scope/hash, idempotency key, payload fingerprint; unique scoped key |
| ReferenceUpload | id, session binding, private storage key, bytes, detected type, state (pending/ready/claimed/rejected/expired), expiresAt, optional unique orderId |
| NotificationJob | id, unique orderId, state (pending/processing/sent/failed), attempts, nextAttemptAt, lease expiry, last safe error code, provider message ID if available, timestamps |

Transactional outbox; claim jobs with atomic lease/locking, bounded exponential backoff with jitter, recover expired leases, persist results, monitor pending/failed jobs, provide authorized retry procedure. Delivery is at-least-once: ambiguous network outcomes can produce duplicate Telegram messages; include stable order ID and do not claim exactly-once delivery. Retention applies to all tables, uploads and backups according to approved policy. Avoid raw PII in logs/job errors. No public lookup endpoint.

## Environment and deployment
Document placeholder values in `.env.example`; actual secrets in local ignored env or hosting secret manager. Proposed keys:
```dotenv
DATABASE_URL=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CRON_SECRET=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
Add separate migration connection/session-signing/rate-limit configuration if selected infrastructure needs it. Never prefix secrets with `NEXT_PUBLIC_`. Isolate development/test/production DBs, storage and recipients. Confirm supported file sizes, private access, scheduler cadence and DB pooling against actual hosting/provider plans; no in-memory retry timers or rate limits as sole production controls. Use durable/shared rate-limit mechanism; origin checks and session/CSRF protection where applicable. Upload security and cleanup must pass review before opening public endpoint.

## Verification and responsibilities
Architect defines shared contracts, lead approves and owns global config; backend implements server scope, frontend implements UI against contract; QA validates integration and responsive screenshots, reviewer checks security and regressions. Mock external services, test migration on isolated database, verify lint/typecheck/unit/integration/e2e/build. Production migration, deployment and real messages only with explicit approval. Record unresolved provider limits, privacy and credentials as blockers; no claims of working integration until verified.
