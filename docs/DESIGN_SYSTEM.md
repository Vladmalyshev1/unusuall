# UNUSUALL — Website Design System

**Status:** v0.3 — raster reference specification and Phase 3.1 UI Kit.  
**Purpose:** visual specification for Next.js, Codex and its subagents.  
**UI language:** Russian; preserve original collection names.

## 1. Sources and priorities

| Route | Desktop: `design/desktop/` | Mobile: `design/mobile/` |
|---|---|---|
| `/` | `home.PNG` | `home.PNG` |
| `/collection` | `collection.PNG` | `collection.PNG` |
| `/create-order` | `create_order.PNG` | `create_order.PNG` |
| `/about` | `about.png` | `about.PNG` |

Paths preserve the actual case of the originals. Desktop references are 1536×864 px. Mobile references are 941×1672 px including a phone body. Approximate visible display bounds are x=110…826 and y=48…1620 px. Treat the screen interior as a presentation reference. Exclude device frame, hardware buttons, external background and hardware corner rounding from the website UI.

- **Observation:** directly visible; governs composition and copy.
- **Estimate:** approximate measurement from raster images, not an exact Figma token.
- **Proposal:** initial implementation for missing states or intermediate widths; verify before finalizing.

`AGENTS.md` governs workflow; `REQUIREMENTS.md` governs behavior and data; this document and the originals govern visuals. Report conflicts rather than silently changing approved design. The brief uses **UNUSUALL**, while references contain **UNUSUAL** (e.g. About heading) and `unusual` in the logo. Do not redraw or independently correct the logo; confirm public spelling before release.

## 2. Visual concept

Observation: a dark premium techwear/editorial interface for a custom embroidery studio. Blue-black backgrounds, cool blue glows, thin white geometric headings, fine lines, soft gradients, macro photos of embroidery and thread. Asymmetric compositions with large imagery, whitespace and orbital curves. The home jacket has copper-brown embroidery; this is a photographic accent, not a separate button color.

Do not turn the site into a generic marketplace or introduce bright fills, heavy shadows, ubiquitous glass cards, extra decoration, background videos, mandatory scroll snapping or gratuitous motion. Never use a whole-page screenshot as the background with invisible links over it. Text, navigation and forms must be genuine HTML elements.

## 3. Color tokens

Measurement: median pixel colors were computed for dark luminance ranges, light near-neutral pixels and mid-luminance blue pixels in the rasters. For example, desktop dark medians are roughly #13171E–#151A21, mobile #0D151E–#11171E; light pixels in several upper regions are around #EAECEC–#EEEEEE and blue accents around #3F5E8A–#4F6492. Gradients, antialiasing and photography prevent identifying original layer colors. These tokens are a **proposed normalization**, not exact original design values.

| CSS token | Initial value | Role |
|---|---|---|
| `--color-bg` | `#11171E` | Main dark background |
| `--color-bg-deep` | `#0B121B` | Deep shadows, mobile background |
| `--color-surface` | `#171D25` | Cards, subtle control fill |
| `--color-text` | `#EEEEEE` | Primary text and active outlines |
| `--color-text-secondary` | `#D3D5DB` | Captions and supporting copy |
| `--color-text-muted` | `#AEB5C0` | Placeholders and hints; check contrast |
| `--color-line` | `#535C68` | Decorative lines, dividers |
| `--color-control-border` | `#818B98` | Visible interactive control boundary |
| `--color-active-border` | `#EEEEEE` | Selected filter/garment |
| `--color-blue` | `#405B8A` | Blue background accent |
| `--color-glow` | `#849BC5` | Cool orbital edge light (estimate) |
| `--color-focus` | `#B4C9F0` | Keyboard focus (proposal) |
| `--color-error` | `#FFAAAA` | Error (proposal, not shown) |
| `--color-success` | `#B5DFC9` | Success (proposal, not shown) |

Use layered CSS gradients, local radial gradients, SVG curves and separate images. Page compositions differ; do not impose one global background artwork. Blue glow is local, not a full-page bright gradient. Check contrast over images: target 4.5:1 normal text, 3:1 large text and 3:1 meaningful control boundaries/focus. Add a local backing layer if necessary without undermining composition.

## 4. Typography

**Observed.** All eight references use very wide, thin geometric capitals for headlines and section titles. A neutral sans-serif handles navigation, labels, product descriptions and fields. Home has the largest type and a tracked tagline. Collection uses a one-line display title with separate readable copy. Order uses a two-line display title and denser field labels. About uses the two-line display title, then display for section heads and neutral body for the longer copy. The exact families and weights cannot be identified from the PNGs.

**Raster estimates.** Approximate visible H1 glyph heights, measured on light neutral pixels. These are raster dimensions, independent of the intended CSS size.

| Route | Desktop glyph height | Mobile presentation glyph height |
|---|---:|---:|
| Home | 44–45 px | 40–41 px |
| Collection | 34 px | 39 px |
| Order | 33–34 px | 34 px |
| About | 33 px | 32 px |

The approximate width-to-glyph-height ratio of «ВЫШИВКА» in the references is 9.4–10.0. With the family weights shown below and zero added tracking, sampled fonts gave approximately 8.43 (Unbounded), 7.36 (Geologica) and 6.65 (Exo 2). On mobile, retain the intentional line breaks where space allows and verify the actual glyph widths on the page. Readable text can increase the total page height.

**Proposals based on the local browser specimens.** Each family has Cyrillic and Latin and is available under SIL OFL 1.1. Sources, weights and licenses are listed in [ASSETS.md](ASSETS.md#font-candidates). [View the specimens](../design/review/typography.html).

| Family | Observed fit in specimen | Tradeoff |
|---|---|---|
| Unbounded 200 | Closest width and low, geometric silhouette | Strokes and character details retain more weight than the reference |
| Geologica 150–200 | Clean thin strokes and less angular forms | Condenses the visual footprint compared with the reference |
| Exo 2 200 | Technological squared contours | Narrowest of the three and a different shape in rounded letters |
| Manrope 400/500/600 | Geometric rounded proportions balance the large titles and work for labels | Upright family, with a softer character than the tighter reference navigation |
| Inter 400/500/600 | Clear controls and small text. Includes italics | More utilitarian shapes, less of the reference's geometric character |
| Golos Text 400/500/600 | Readable Cyrillic and strong small text | Text-first personality. The weight range starts at 400 |

Phase 3.1 uses **Unbounded 200 + Manrope 400/500/600**. The variable WOFF2 files are bound through local CSS `@font-face` declarations to retain separate Latin and Cyrillic unicode ranges, with the license notices alongside the fonts. Display tracking starts at .045em and role-specific line-height at 1.08–1.16. For body prose use 400, .00–.02em and 1.45–1.6. For fields use 400 and 1.4. For navigation use 500, .015–.04em and about 1.25. For CTA use 600 with .15em tracking. Validate actual page headings and control widths at 320 and 390 px during page composition.

| Role | Desktop CSS px (estimate/start) | Mobile CSS px (start) | Style |
|---|---:|---:|---|
| Home H1 | 56–64 | 30–36 | 200–300, uppercase, line-height 1.0–1.12 |
| Other page H1 | 44–52 | 26–32 | 200–300, uppercase, 1.05–1.15 |
| Large CTA H2 | 38–48 | 24–30 | 200–300, uppercase, 1.05–1.15 |
| Section H2 | 28–36 | 20–24 | 200–300, uppercase, 1.1–1.2 |
| Body | 14–16 | 14–16 | 400, 1.4–1.6 |
| Navigation | 13–14 | 11–13 | 400–500, uppercase |
| Eyebrow/tagline | 13–15 | 11–13 | 400–500, uppercase, tracking .12–.22em |
| Product name | 16–18 | 13–16 | 300–400, uppercase |
| Form fields | 14–16 | 16 | 400 |
| Label/supporting text | 12–14 | 12–14 | 400–500 |
| CTA | 14–16 | 13–16 | 500–600, uppercase, tracking .12–.20em |

Mobile sizes intentionally do not copy tiny presentation pixels: preserve readability on a real device, allowing a taller page. Display tracking starts at approximately .02–.08em, taglines are more spaced, body has normal tracking. Preserve characteristic line breaks on Home, About and Order at reference widths but avoid broken text at 320px. Do not force long Cyrillic labels into narrow cards with `white-space: nowrap`.

## 5. Grid, spacing and responsiveness

Desktop estimates: main content begins at x≈80–115 and ends at x≈1430–1470; typical gutters 5–7%. Header logo x≈96, navigation from x≈538, top band about 80–85px. Home hero boundary y≈511, process band ends y≈625; Collection hero y≈250; Order hero y≈254; About hero y≈277. These are composition landmarks, not fixed viewport heights.

Proposed tokens: spacing 4/8/12/16/20/24/32/40/48/64/80/96px; desktop gutter `clamp(32px, 6vw, 96px)`; tablet 24–32px; mobile 16–24px; shared max-width 1440px (verify at 1536); card gaps 12–24px. Radii: 0 main sections, 8–12px fields, 12–16px cards, 999px filters. Mostly 1px borders; decorative lines may be translucent.

| Width (proposal) | Rules |
|---|---|
| 320–479px | Mobile header, stacked sections, 2 product columns if they fit, single-column form |
| 480–767px | Mobile composition, more breathing room |
| 768–1023px | Intermediate tablet layout, 2–3 product columns as space permits, no clipped text |
| 1024–1279px | Desktop composition when navigation/form fit; wrap groups if necessary |
| 1280px+ | 4 collection cards, 5 garment types, horizontal process, wide heroes |

Choose transitions based on content, not phone models. Mobile reference compresses a long page; do not force the entire site into 100vh. Allow normal vertical scrolling. Do not scale the whole interface as an image. Use Grid/Flex for structure, absolute positioning only for justified imagery/decor. Decoration must not affect flow or intercept pointer events. Normalize mobile reference to approximately 390 CSS px width; also test 320, 375, 430, 768, 1024, 1280, 1440 and 1536px. Mobile smoke-test height 844px is proposed, not original. Capture full-page screenshots.

## 6. Component inventory

| Component (proposed name) | Observed appearance / implementation rules |
|---|---|
| `Header`, `BrandLockup`, `MobileNav` | White logo, vertical divider, «СТУДИЯ КАСТОМНОЙ ВЫШИВКИ». Desktop 4 links with active underline; mobile active page and hamburger. Open menu not shown; implement accessible menu with same 4 links. |
| `PageHero` | Heading and copy alongside/over thematic photo, independent decoration slots. Do not force identical hero heights. |
| `BracketButton` / `BracketLink` | Thin square brackets, tracked uppercase text and arrow, sometimes arrow-only brackets. No filled replacement button. Entire visible group is one hit area. |
| `OrbitDecoration`, `StarMark`, `SectionDivider` | Fine curves, four-point stars, plus signs, horizontal rules. SVG/CSS, `aria-hidden`, `pointer-events: none`. |
| `ProcessSteps` | 01–04, horizontal with arrows on desktop, vertical line and nodes on mobile. Home and About copy differ. Arrows decorative unless action specified. |
| `CategoryFilter` | Six pill-shaped outline icon filters. Selected: lighter outline, subtle fill. Desktop one row; mobile 3×2 where space permits, wrap otherwise. |
| `ProductCard` | Large garment image without heavy frame, two-line label and arrow. Desktop four columns, mobile two. Confirm arrow destination; no invented detail page or price. |
| `GarmentTypePicker` | Five rounded rectangular icon options; selected outline, subtle fill, checkmark. Desktop five across; mobile 3+2. Radio group semantics. |
| `FormStep` | Number, heading with dash, vertical line. Desktop number/title in left column, fields right; mobile number left, title above fields. All five groups on one page, not a wizard. |
| `FileUpload` | Dashed rectangle, upload icon, heading and format/limit hint. Real file input, keyboard support, filename, remove/reselect, errors. |
| `SelectField`, `TextField`, `Textarea` | Transparent/dark fill, fine border, light text, downward select arrow. Associated labels, visible focus. |
| `BenefitCard` / `BenefitsGrid` | Icon left, uppercase label. Desktop shared strip with separators; mobile four separate cards in 2×2. |
| `ImagePanel`, `OrderCTA` | Rounded process photo with decorative plus; large final CTA with macro photo. |

Avoid a component for every JSX line. Share tokens while preserving page-specific differences. The prepared monochrome SVGs use a transparent 24×24 viewBox, uniform 1.5 stroke, round joins and ends, and `currentColor`. Use an accessible label on the interactive control. Keep purely decorative marks hidden from assistive technology. For inherited color use inline SVG or a mask with `background-color: currentColor`. Keep text in HTML. Close is the proposed counterpart of the visible mobile menu icon. See [the icon inventory](ASSETS.md#interface-icon-set).

## 7. Page-specific visual requirements

### `/` — Home
- Header then hero: «ВЫШИВКА / НА ЗАКАЗ», «ТВОЙ ДИЗАЙН, ЛЮБАЯ ВЕЩЬ — / РЕАЛЬНАЯ ВЫШИВКА», CTA «СОЗДАТЬ ЗАКАЗ» to `/create-order`.
- Desktop: text left, large jacket center/right, large translucent U-like graphic behind it, orbits and star; `55.7558° N / 37.6173° E` is decorative copy, not user geolocation or verified studio address. Mobile: text above jacket, CTA near bottom of hero.
- «КАК ЭТО РАБОТАЕТ —»: 01 Идея и дизайн; 02 Подготовка к вышивке; 03 Производство на оборудовании; 04 Готовая вещь. Horizontal desktop strip, vertical mobile sequence.
- Final «СОЗДАЙ / СВОЮ ВЕЩЬ» CTA, blue/white embroidery macro, thin orbit and arrow link to order.

### `/collection` — Collection
- Hero «КОЛЛЕКЦИЯ», desktop tagline «ГОТОВЫЕ ИЗДЕЛИЯ С АВТОРСКОЙ ВЫШИВКОЙ UNUSUAL» and copy «Лимитированные коллекции и базовые модели с уникальной вышивкой — для тех, кто ценит детали.» Mobile shows description without separate tagline. Right/below: blue-white embroidered flower with glowing curve.
- Filters: Все изделия, Худи, Футболки, Куртки, Аксессуары, Лимитированные. «Все изделия» is selected in references. Actual filtering depends on data; support empty state without inventing products.
- Four visible items: ХУДИ / TERRAIN (dark mountain hoodie); ФУТБОЛКИ / FLOW (white fish T-shirt); КУРТКИ / BOTANICA (dark floral jacket); АКСЕССУАРЫ / MINIMAL (dark mountain cap). These are visible names and imagery, not verified SKUs, pricing or availability. Do not invent prices, sizes, checkout or payments. Confirm whether cards represent categories, products or inquiries.
- Four across desktop, 2×2 mobile; large images without added product panels. Decorative blue glow around lower composition.

### `/create-order` — Create Order
- Hero «СОЗДАНИЕ / ЗАКАЗА», tagline «РАССКАЖИ О СВОЕЙ ИДЕЕ — МЫ ПРЕВРАТИМ ЕЕ В ВЫШИВКУ», embroidery macro right/below.
- 01 «ВЫБЕРИ ТИП ИЗДЕЛИЯ»: Худи, Футболка, Куртка, Аксессуар, Другое. «Худи» is selected in references.
- 02 «ДОБАВЬ СВОЙ ДИЗАЙН»: «ЗАГРУЗИТЬ ФАЙЛ», hint `PNG, JPG, SVG, AI · до 20 МБ`. Visible copy is not confirmed server policy. Confirm accepted formats and required/optional upload. Never execute or render SVG/AI as trusted content; require safe validation, private storage and an agreed handling policy. Check hosting limits for 20MB; authenticated/authorized direct-to-storage upload may be necessary. Do not advertise unsupported formats.
- 03 «УКАЖИ ДЕТАЛИ»: РАЗМЕР (example M), РАСПОЛОЖЕНИЕ ВЫШИВКИ (example «На спине»). Other choices, defaults and sizing applicability to accessories are not established.
- 04 «КОММЕНТАРИЙ»: «Дополнительные пожелания (необязательно)».
- 05 «КОНТАКТЫ»: «Имя», «Телефон». Two fields side by side on desktop, stacked on mobile. Add programmatic labels; do not add email, color or address without approval even if mentioned in earlier proposals.
- «ОТПРАВИТЬ ЗАЯВКУ»; both references say «МЫ СВЯЖЕМСЯ С ВАМИ В ТЕЧЕНИЕ 2 ЧАСОВ»; confirm the owner's service commitment. Do not silently treat example M/«На спине» as valid order defaults without requirements confirmation.
- Desktop step column x≈96–320, field column x≈405–1470; mobile vertical groups with lines at left. Two selects and two contacts per row on desktop, single-column mobile. Expand form on errors rather than overlapping fields.

### `/about` — About
- Hero «О БРЕНДЕ / UNUSUAL» (as shown; spelling issue above), tagline «ВЫШИВКА, КОТОРАЯ ДЕЛАЕТ ВЕЩИ ОСОБЕННЫМИ», embroidered logo macro.
- «НАША ИДЕЯ —»: «Превращать твои идеи в уникальные вышитые вещи. Мы работаем на стыке ручного ремесла, технологий и уличной культуры, создавая кастомную вышивку на одежде и аксессуарах.» Embroidery needle photo. Desktop heading, text and photo in one row; mobile heading/copy side by side if space permits, photo below; stack all on narrow screens.
- «КАК МЫ РАБОТАЕМ —»: 01 Разрабатываем дизайн; 02 Готовим к вышивке; 03 Вышиваем на оборудовании; 04 Создаём готовую вещь. Horizontal/vertical depending on width.
- Four benefits: Индивидуальный подход, Высокое качество, Современное оборудование, Без ограничений в дизайне. Last is visible marketing copy, not a verified technical guarantee; confirm before publication.
- Final «СОЗДАЙ СВОЮ ВЕЩЬ» CTA and «СОЗДАТЬ ЗАКАЗ», thread spools photo, orbit and star. No standalone footer is visible; do not invent one visually. Agree on legal/contact links separately.

## 8. States and accessibility

References mostly show static states; active navigation, «Все изделия» and selected «Худи» are visible. Other states are functional proposals:

| State | Rule |
|---|---|
| Default | Dark surface, readable light text, thin outline |
| Hover | Slightly stronger outline/glow without size jump |
| Focus-visible | Distinct contrast ring; never remove outline without replacement |
| Selected | Light outline and subtle fill; checkmark for garment type, semantic state |
| Disabled / pending | Clear reason/«Отправляем…» indicator, prevent repeated submit |
| Error | Contrasting text near field, `aria-invalid` and description association; never color only |
| Success | «Заявка отправлена» only after persistence; do not claim owner notification delivery without confirmation |
| Upload | Filename, progress, removal, unsupported type/size error |
| Empty/loading catalog | Subtle placeholder without changing identity or inventing products |

Prefer interactive hit areas at least 44×44 CSS px, including icons/arrows; hit areas may exceed visual bounds. All controls keyboard operable; mobile menu closes on Escape and returns focus. `aria-current="page"` for nav, `aria-pressed` for toggle filters or radio semantics for mutually exclusive choices, real buttons/links. Fields: `autocomplete="name"`, `autocomplete="tel"`, appropriate type/inputmode and visible or accessible labels. Announce submission status via live region. Do not hide text/controls behind decoration. Respect `prefers-reduced-motion`; animation optional. Proposed transitions: 150–250ms opacity/color/border/transform, no content shift on hover.

## 9. Assets and preparation

Refer to [ASSETS.md](ASSETS.md) for the verified filenames, formats and approval status. The six separate background/process subjects are ready as lossless WebP. Catalog imagery and the separate wordmark still require approval. Preserve the supplied mark and aspect ratio.

| Asset | Desktop focal point | Mobile focal point |
|---|---|---|
| Home jacket | Collar and copper embroidery toward center-right | Jacket detail below the title. Keep collar and recognizable embroidery |
| Collection flower | Center of the flower at the right | Full center of the flower below the text |
| Embroidery macro | Blue-white raised stitches along the Home CTA and Order hero edge | Keep the sloping blue-white stitch detail below the hero copy |
| About hero | Embroidered sign at the right | Mark below/beside the heading with readable copy |
| Machine | Crop the tall source to the needle and fabric in the horizontal panel | Retain the needle and a visible line of stitches |
| Thread spools | Two spools toward lower left of About CTA | Two spools toward lower right of the composition |

These are proposed focal points for implementation. Use page-specific `object-position` or art-directed crops. Check at 1536, 390 and 320 px. Keep the photo proportions. Whole mockups and device frames stay in the reference materials. Text and controls stay in HTML. Account for baked-in ornaments before adding new layers, including the Home U and orbit, About star/orbit and the partial orbit on the spools. The desktop Order mockup has a lower macro detail. The mobile Order bottom uses a glow and orbit. Keep unused portfolio photography outside the MVP pending approval. Use `next/image` with suitable dimensions and responsive `sizes`, meaningful product alt text and empty alt text for decoration.

## 10. Implementing tokens in Next.js / Tailwind CSS

Use [globals.css](../src/app/globals.css) as the token source. Tailwind 4 `@theme` exposes the palette, families, responsive type sizes, regular 4 px spacing, radii and max width. Use `site-container` for the shared gutter and `display-heading` with `text-display-home`, `text-display-page`, `text-display-cta` or `text-display-section` for display roles.

Shared components live under [src/components/ui](../src/components/ui/). Filter and garment groups use native radios. Fields preserve native form semantics. `FileUpload` accepts caller-provided limits and feedback and keeps the selected file in the browser until the caller handles it. The showcase at `/ui-kit` is available with `npm run dev`. Its examples use fixture values. The phase 3.1 mobile filters stack icons above labels at narrow widths to preserve readable text. Catalog photography and card actions await approval for the page.

Use Grid/Flex, semantic markup and responsive queries. Use `clamp()` for type after verifying chosen font; avoid scattered magic numbers. Each hero has its own composition/image position. Do not disable body scrolling to conceal overflow. Server Components by default; client boundaries for navigation, filters, form and other interactive parts. Avoid UI kits that impose a different design.

## 11. Subagents and visual acceptance

- `design_analyst`: inspect originals, compare regions, document desktop/mobile differences and missing assets; verify estimates, do not edit files unless assigned. Distinguish observations from assumptions.
- Main agent: resolve disputed decisions with owner, approve tokens/shared contracts, assign file ownership.
- `frontend`: implement components in assigned files without unapproved redesign. `backend`: implement form contract; visual copy and server limits must agree.
- `qa`: Playwright full-page screenshots of all four routes at 1536×864 and 390×844 (proposed mobile normalization), plus intermediate widths; check overflow, navigation, filters, forms, keyboard/focus, errors and reduced motion.
- `reviewer`: review semantics, contrast, responsiveness, shared tokens and form security. Main agent integrates and rechecks material fixes.

Acceptance checklist:
- [ ] Grid, logo position, navigation, heading breaks and hierarchy match references closely.
- [ ] Colors, thin lines, glows, photos and outlines preserve original style.
- [ ] Desktop four collection cards, five garment types, horizontal process; mobile two cards per row where possible, types 3+2, vertical process, stacked fields.
- [ ] No phone frame, horizontal scroll, clipped text or overlap; real content may scroll vertically.
- [ ] Buttons/fields have working actions/states; contrast, keyboard and accessible names checked.
- [ ] Screenshots manually compared for composition; mobile compared to screen interior with normalized scale. Do not impose arbitrary pixel-diff thresholds on presentation raster images.
- [ ] Missing assets/fonts, deviations and unverified states reported. After real site approval, create independent Playwright baselines if useful.

Do not claim pixel-perfect fidelity or passing tests without original assets or actual browser verification.

## 12. Open questions before final implementation

1. Official UNUSUALL / UNUSUAL spelling and original vector logo.
2. Source imagery and final approval of page typography against the references.
3. Confirm coordinates, marketing claims and two-hour response commitment.
4. Card/filter behavior, actual product data, purchase vs inquiry; prices/sizes not shown in Collection.
5. Required fields, size/placement options, upload formats and limits, contact method, legal copy and data processing consent.
6. Approve open mobile menu, hover/focus/error/success/empty/loading and missing intermediate layouts.

Reversible UI implementation may start using current references. Do not present proposed tokens or states as an approved Figma design. Update this file after assets and decisions arrive; preserve change history in Git.
