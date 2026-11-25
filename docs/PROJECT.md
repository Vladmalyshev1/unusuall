# UNUSUALL — Project Brief

Status: v0.1 — working specification based on the owner's brief and eight supplied mockups. Proposed decisions are not owner approvals.

## Purpose
UNUSUALL is a clothing brand and custom embroidery studio. The website presents its identity and original clothing collections and enables customers to submit custom embroidery requests. The owner must receive the request details and be able to contact the customer to agree on design, price and timing.

## Goals and users
- Customers: discover the brand, browse collections, understand the embroidery process and submit an inquiry from desktop or mobile.
- Owner: receive reliable, actionable order details without manually monitoring the website.
- Success: four working responsive routes, recognizable design, validated and durably stored requests, owner notification with recoverable failures, and clear customer feedback.

## Routes and scope
| Route | Purpose |
|---|---|
| `/` | Brand introduction, custom embroidery hero, four production steps and order CTA |
| `/collection` | Six category filters and four collection cards (TERRAIN, FLOW, BOTANICA, MINIMAL in references) |
| `/create-order` | Five-group custom embroidery request form |
| `/about` | Brand idea, process, benefits and order CTA |

Initial MVP: Russian UI, responsive catalog and custom-order requests; proposed collection purchase inquiry, not checkout. Product prices, availability, card destinations and purchase inquiry details are not specified. Do not invent them. No account, cart, online payment, admin dashboard, shipping automation or embroidery editor without approval. Catalog can start as typed local data; database-backed catalog is optional later.

## Visual direction
Dark premium editorial/techwear composition, cool blue highlights, thin geometric typography, embroidery photography and orbital lines. Use actual desktop and mobile references, excluding the device frame. Text and controls remain live HTML. Keep photography, logo and decorations separate where possible. Do not introduce extra sections or generic e-commerce styling. Use provided backgrounds and traced logo; generated product photos require confirmation against the real collection.

## Technical direction
Proposed stack: Next.js App Router, React, TypeScript, Tailwind CSS, React Hook Form, Zod, Route Handlers, PostgreSQL, Prisma, private reference storage via Cloudinary, Telegram Bot API, Playwright, Vitest, ESLint and Vercel. Motion is optional. Use installed versions and lockfile; no model or reasoning settings are part of project requirements. See `ARCHITECTURE.md` for contracts and boundaries.

## Sources and ownership
- `AGENTS.md`: execution and subagent workflow.
- `PROJECT.md`: goals and scope; `REQUIREMENTS.md`: behavior and acceptance.
- `DESIGN_SYSTEM.md` and `design/`: visual references and provisional tokens.
- `ASSETS.md`: updated inventory, actual asset status and destination paths; supersedes the preliminary asset paths/status in Design System section 9.
- `ARCHITECTURE.md`: technical decisions; `ROADMAP.md`: execution sequence and progress.
- Owner approves public copy, commercial rules, design changes, privacy policy and deployment. The lead agent integrates subagent work, checks evidence and records unresolved decisions.

## Decisions before production
Confirm official spelling (brief UNUSUALL; artwork UNUSUAL/unusual), logo wordmark, fonts, actual products and images, catalog card actions, required form fields and allowed values, file types/limit, contact and privacy policy, notification recipient, support hours and two-hour response promise, and use of displayed coordinates/marketing claims. Use reversible defaults in development only; do not publish unconfirmed claims or personal data processing flows.
