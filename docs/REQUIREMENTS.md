# UNUSUALL — Functional and Nonfunctional Requirements

Status: v0.1. Observed = supplied brief/mockups; Proposed = development decision pending approval. Do not treat sample selections or missing business facts as approved.

## Functional requirements
| ID | Requirement / acceptance |
|---|---|
| NAV-01 | Four routes `/`, `/collection`, `/create-order`, `/about`; navigation links work, active route indicated, mobile menu keyboard accessible. |
| HOME-01 | Hero, four production steps, bottom CTA match the references; both CTAs navigate to order. |
| COL-01 | Show four reference collection cards and six filters: Все изделия, Худи, Футболки, Куртки, Аксессуары, Лимитированные. Proposed filters use typed category/limited data and show an honest empty state. Do not infer limited status. |
| COL-02 | Card arrow action and purchase inquiry are pending owner decision. No invented prices, stock, product detail routes or checkout. Development must report unresolved actions; release requires agreed working behavior. |
| ABOUT-01 | Hero, idea section with machine image, four process steps, four benefits and order CTA. No invented footer or claims; agree legal links separately. |
| ORD-01 | Five groups on one page; desktop columns and mobile stacked fields as specified in design system. |
| ORD-02 | Form validates on client for feedback and on server for enforcement. Pending, errors, retry, upload removal and success states; no duplicate submission. |
| ORD-03 | Persist valid requests and durable notification jobs atomically; return an order reference only after successful persistence. |
| ORD-04 | Send owner order reference, customer name/phone, garment, size, placement, comment and secure reference access if supplied. Retry delivery on failure without recreating orders; distinguish stored from notified. |
| ORD-05 | Provide a safe operational way for authorized owner/operator to recover failed notifications; no public order lookup or admin UI in MVP. |

## Order field contract (proposed)
| Visible field | Proposed key | Validation |
|---|---|---|
| Тип изделия | `garmentType` | Required enum `hoodie`, `tshirt`, `jacket`, `accessory`, `other` |
| Добавь свой дизайн | `referenceUploadId` | Optional single file; verify ownership/session and finalized scan |
| Размер | `size` | Required where applicable, approved options TBD; M is example only |
| Расположение вышивки | `placement` | Required where applicable, approved options TBD; «На спине» example only |
| Комментарий | `comment` | Optional; trim, proposed max 2000 chars |
| Имя | `name` | Required; trim, proposed max 100 chars; support Cyrillic/Unicode |
| Телефон | `phone` | Required; normalize/validate with agreed region/international support, no arbitrary Russian-only assumption |

Size/placement applicability for accessories/other, exact values, whether reference is mandatory and whether additional description is needed require approval. Do not add email, color, address or payment fields. Keep request body limits and error messages explicit. Use a generated idempotency key per logical submission; identical retry returns existing order, conflicting payload rejected. No automatic default M/back unless approved.

## Upload policy and failure behavior
Mockup advertises PNG/JPG/SVG/AI up to 20 MB. Proposed safe initial allowlist PNG/JPEG only, at an agreed byte limit (20 MB is a candidate), unless safe private storage, validation/scanning and SVG/AI handling are approved and tested. UI must advertise exactly the enabled types/size; flag deviation for owner approval before launch. Enforce byte/type/content checks, image dimensions and quotas; do not serve active SVG/AI inline. Use private storage, temporary authorized upload flow and expiry/cleanup. No external URL input as a substitute. Avoid logging customer data and uploaded filenames.

Invalid data: no order, actionable field messages. Upload unavailable: show error and allow retry/remove if optional. Database failure: no success; retry safely. Notification failure after persistence: order stays accepted; durable retry, alert on exhausted attempts. Customer success means request stored, not necessarily owner message delivered. Two-hour response promise in mockup must be confirmed; until then use an approved neutral confirmation.

## Nonfunctional and launch requirements
- Responsive 320px+, no overflow, real HTML, keyboard/focus, accessible labels, status announcements, reduced motion, contrast per design system.
- Optimize photos and fonts; no unnecessary client JS. Metadata, Russian document language, sitemap/robots per launch configuration; prevent indexing preview/test deployments.
- Server secrets only, request validation/rate limits, anti-spam, idempotency, escaped notifications, private uploads, redacted logs. No unauthenticated order data exposure.
- Owner confirms data controller/contact, processing notice and consent/legal basis as applicable, retention/deletion schedule, providers and access policy before public submissions. Do not invent legal text or claim compliance. Test only synthetic data.
- Test four routes at 1536×864 and 390×844 plus narrow/intermediate widths; compare screenshots to original reference interior. Test filters, menu, keyboard, upload validation, duplicate/concurrent submits, DB failure, notification retry/exhaustion and successful order flow. Run lint, typecheck, tests and build. Production delivery smoke test needs explicit approval and isolated recipient first.

## Release decisions
Owner must confirm spelling/wordmark, actual catalog and card behavior, form options and defaults, accepted formats and limits, response commitment, marketing claims/coordinates, privacy/retention and Telegram recipient. Lead tracks decisions in roadmap; no production launch until material blockers resolved.
