# UNUSUALL — Asset Inventory

Status v0.3, updated on 2026-11-25. Includes Phase 2 asset verification and the Phase 3.1 working font pair. Catalog, wordmark and icon approval remain open.

## Reference mockups

| Route | Desktop file | Mobile file |
|---|---|---|
| `/` | `design/desktop/home.PNG` | `design/mobile/home.PNG` |
| `/collection` | `design/desktop/collection.PNG` | `design/mobile/collection.PNG` |
| `/create-order` | `design/desktop/create_order.PNG` | `design/mobile/create_order.PNG` |
| `/about` | `design/desktop/about.png` | `design/mobile/about.PNG` |

The originals are PNG, 1536×864 desktop and 941×1672 mobile with the phone frame. Filenames are case-sensitive on the deployment host.

## Supplied photographs

Paths in the table are relative to `public/`. Each path had a `.webp` suffix and PNG contents. All six now contain true lossless WebP with the original resolution, aspect ratio and decoded RGB pixels. All are opaque. The original PNG bytes were archived before conversion in `design/originals/backgrounds/` or `design/originals/process/` with the corresponding stem and a `.png` suffix. The original files and mockups are verified against the pre-edit SHA-256 inventory. The embroidery detail WebP uses an sRGB ICC profile to represent the source's PNG sRGB tag. Its original EXIF/DPI metadata remains in the archived PNG.

| File | Resolution · ratio | Before, bytes | After, bytes | Saved | Intended use and visual match |
|---|---|---:|---:|---:|---|
| `images/backgrounds/about-hero.webp` | 1672×941 · 1672:941 | 2,108,788 | 1,305,640 | 38.1% | About hero, embroidered brand sign. Orbit and star already present |
| `images/backgrounds/collection-hero.webp` | 2172×724 · 3:1 | 2,259,108 | 1,525,032 | 32.5% | Collection hero, blue-white flower |
| `images/backgrounds/embroidery-detail.webp` | 1672×941 · 1672:941 | 3,015,037 | 1,452,868 | 51.8% | Blue-white embroidery for Home CTA, Order hero and desktop Order bottom decoration |
| `images/backgrounds/home-hero.webp` | 1536×1024 · 3:2 | 2,160,224 | 1,326,910 | 38.6% | Home hero, copper-embroidered jacket. U-shaped artwork and orbit already present |
| `images/backgrounds/thread-spools.webp` | 1672×941 · 1672:941 | 1,852,103 | 1,175,856 | 36.5% | About CTA, two spools. Part of the orbit already present |
| `images/process/embroidery-machine.webp` | 1086×1448 · 3:4 | 1,899,356 | 1,232,288 | 35.1% | About idea panel, needle and stitches. Requires a landscape crop |
| Total | | 13,294,616 | 8,018,594 | 39.7% | |

The six subjects match the references. Final responsive crops remain a page implementation check. The separately listed hoodie and denim embroidery photos are unavailable locally. `public/images/portfolio/` is empty and portfolio photos are outside the approved MVP.

## Product concept images

All four files keep their supplied PNG bytes. Each decodes as RGBA. The alpha bounds below use a threshold of 16 and coordinates `(left, top)–(right, bottom)` with an exclusive bottom/right. See the [side-by-side visual review](../design/review/products.html) for the desktop reference crops and full PNGs. The mobile references show the same product motifs.

| Reference | File within `public/images/products/` | Resolution · ratio | Bytes | Alpha · content bounds | Visual status |
|---|---|---|---:|---|---|
| TERRAIN | `hoodie.png` | 1536×1024 · 3:2 | 1,987,025 | 0–254 · (37,92)–(1489,905) | Two dark logo-branded views. Reference shows one navy hoodie with mountains |
| FLOW | `tshirt.png` | 1774×887 · 2:1 | 1,685,910 | 0–255 · (47,89)–(1725,836) | Two black logo-branded views. Reference shows one white tee with blue koi |
| BOTANICA | `jacket.png` | 1774×887 · 2:1 | 2,319,339 | 0–255 · (38,60)–(1740,838) | Two dark jacket views with a mark. Reference shows one navy floral bomber |
| MINIMAL | `cap.png` | 1536×1024 · 3:2 | 1,990,175 | 0–254 · (330,81)–(1245,987) | One almost frontal dark cap with a mark and side padding. Reference shows a navy cap with mountains in a three-quarter view |

These are technically intact concepts with unequal visual density. A generic crop can cut off one of the two views in three files. Final product images, metadata and any use of these concepts require owner approval.

## Logo and site icons

- `public/logo/logo-white.svg` is the supplied primary mark for dark backgrounds. `logo-blue.svg` and `logo-black.svg` retain the same single path and transparent 786×179 viewBox (about 4.39:1). All parse as standalone SVG without external references, fonts, scripts or text nodes. The 1600×364 transparent PNG/WebP variants have approximately 5–6 px of perimeter padding. The white mark remains legible on dark backgrounds. Preserve geometry, use intrinsic proportions and omit embellishments.
- `favicon.svg` uses a 100×100 viewBox with a dark rounded square and white mark. `favicon.ico` includes 16/32/48/64 px frames. `apple-touch-icon.png` is 180×180. Raster assets decode with alpha. `favicon-32.png` and `icon-192.png`/`icon-512.png` remain in `public/logo/` as supplied variants.
- Root App Router metadata in `src/app/layout.tsx` emits the ICO compatibility link, the SVG with `sizes="any"` and the 180 px Apple Touch Icon. This is the single icon declaration. File-based starter favicon, icon and apple-icon entries are absent. [Next.js Metadata icons](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#icons)
- The supplied brand mark is a tracing. The original vector and separate lowercase `unusual` wordmark under the mark in the mockups are unavailable locally. Confirm the public spelling `UNUSUALL` / `UNUSUAL` and wordmark with the owner.

## Interface icon set

`public/icons/` contains 17 project-authored SVGs drawn for this phase from the UI patterns in the references. They use no external icon library or upstream artwork. The project currently declares no general repository license. Asset usage within the project is reviewed separately from owner visual sign-off.

| Scope | SVG filenames |
|---|---|
| Garments | `hoodie`, `t-shirt`, `jacket`, `cap` |
| Filters and selection | `grid`, `more`, `sparkle`, `check` |
| Navigation and fields | `arrow-right`, `chevron-down`, `menu`, `close`, `upload` |
| About and decorative marks | `layers`, `lightning`, `infinity`, `plus` |

All names have the `.svg` suffix. Close is a proposed state for the open mobile menu. The references only show the closed hamburger.

## Font candidates

The app uses **Unbounded 200** and **Manrope 400/500/600**. The four WOFF2 files and both OFL notices are in [src/app/fonts](../src/app/fonts/). [fonts.css](../src/app/fonts.css) declares the standard Cyrillic and Latin ranges for loading subsets on demand. The app serves these files locally.

The [local comparison](../design/review/typography.html) loads twelve unmodified variable WOFF2 subsets for standard Cyrillic and Latin. The font files and each upstream copyright/license notice are stored under `design/review/fonts/`. The [local stylesheet](../design/review/fonts.css) records the exact Google Fonts delivery URLs. [Google Fonts CSS2 API](https://developers.google.com/fonts/docs/css2) · [SIL OFL 1.1](https://openfontlicense.org/open-font-license-official-text/)

| Role | Family | Published weight/style | Cyrillic | License and source |
|---|---|---|---|---|
| Display | Unbounded | 200–900, upright | Yes | OFL 1.1 · [Google Fonts source](https://github.com/google/fonts/tree/main/ofl/unbounded) |
| Display | Geologica | 100–900, variable slant and shape axes | Yes | OFL 1.1 · [Google Fonts source](https://github.com/google/fonts/tree/main/ofl/geologica) |
| Display | Exo 2 | 100–900, upright/italic | Yes | OFL 1.1 · [Google Fonts source](https://github.com/google/fonts/tree/main/ofl/exo2) |
| Body | Manrope | 200–800, upright | Yes | OFL 1.1 · [Google Fonts source](https://github.com/google/fonts/tree/main/ofl/manrope) |
| Body | Inter | 100–900, upright/italic, optical size in family | Yes | OFL 1.1 · [Google Fonts source](https://github.com/google/fonts/tree/main/ofl/inter) |
| Body | Golos Text | 400–900, upright | Yes | OFL 1.1 · [Google Fonts source](https://github.com/google/fonts/tree/main/ofl/golostext) |

The review files are outside the app and `public/`. If the browser blocks local-file fonts, run `py -m http.server 3139 --bind 127.0.0.1` from the repository root. Open `http://127.0.0.1:3139/design/review/typography.html` or `http://127.0.0.1:3139/design/review/products.html`. This preview server is local and independent of Next.js.

## Usage rules

- Keep full-page mockups and archived sources outside `public/`. Use them for review. Build page text and interactive controls as live HTML, with the mobile device frame excluded.
- Preserve photo aspect ratio. Set separate desktop/mobile focal points and verify the embroidered detail. Use only additional ornament that is absent from the photo.
- Use responsive image sizes, reserved dimensions and lazy loading where appropriate. Prioritize the main hero only. Use descriptive alt text for meaningful product imagery and empty alt text for decorative imagery.
- Keep portfolio imagery out of the MVP pending approval. Customer uploads belong in private server-managed storage.
