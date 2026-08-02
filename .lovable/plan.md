# Fix Shorts page cards + make every device match

## What's broken (confirmed by inspecting the running site)

**1. Desktop Shorts / Films pages — collapsed cards (the bug in your screenshot)**
The film card component was built for horizontal carousels, so it carries fixed percentage widths (`w-[42%]`, `w-[calc(...)]`) plus "don't shrink". The browse pages (Shorts, Films) reuse that same card inside a normal grid, where those carousel widths fight the grid: each card shrinks to a tiny thumbnail with truncated titles ("H..", "S.."). This affects every browse page, not just Shorts.

**2. Mobile home hero is genuinely broken**
On a 390px phone the hero stacks the YouTube ambient video above the text. The embed is blown up 1.35x and its player chrome (pause / skip buttons and the "Cinemalaya Foundation" title bar) shows through, sitting behind the top nav. The hero block also forces a 640px minimum height on phones, so the fold is mostly empty video.

## The fix

**Film card**
- Make the carousel width classes opt-in: cards get their percentage widths only when rendered inside a rail, and fill their cell (`w-full`) when rendered in a grid.
- Titles and metadata get room to breathe again; the plus / My List button stays anchored correctly at every size.

**Browse pages (Shorts, Films, and all the rest)**
- Grid becomes 2 columns on phones, 3 on tablet, 4-5 on desktop with the shared 8px-grid gutters, so it lines up with the homepage rails on the same vertical axis.
- Page heading uses the same responsive scale as the homepage section headers.

**Mobile hero**
- Show the still image (not the YouTube embed) below the `lg` breakpoint, so no player chrome can leak. Keep the ambient muted video on desktop.
- Drop the forced 640px min-height on phones; let the hero sit at a proportional 16:9 media block plus text, with a gradient scrim under the nav so the wordmark stays legible.
- Buttons wrap into a tidy stack on narrow widths instead of an uneven three-across row.

**Full-site responsive sweep**
Check and correct at 390 (mobile), 834 (tablet) and 1280+ (desktop) on home, Shorts, Films, film detail sheet, search overlay, My List panel and footer:
- consistent section spacing and one shared left gutter everywhere
- carousels touch-scroll with partial next card visible, no clipped first card
- no truncated-to-one-letter text, no horizontal overflow
- footer stays a uniform grid (2 col mobile / 4-5 col desktop)

## Technical notes

- `src/components/likha/rail.tsx` — add an `inRail` (default true) prop to `FilmCard`; widths map applies only when true.
- `src/routes/browse/$slug.tsx` — pass the grid variant of the card, tighten grid columns and heading scale.
- `src/components/likha/hero.tsx` — breakpoint-gated media (image under `lg`, iframe at `lg+`), remove mobile `min-h-[640px]`, add top scrim, stack actions on small widths.
- Verification: Playwright screenshots at 390 / 834 / 1280 for each route, plus a console-error and horizontal-overflow check.

No backend, data or pricing changes.
