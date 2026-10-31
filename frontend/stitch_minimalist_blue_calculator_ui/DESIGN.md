---
name: Precision Blue
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#404752'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#707883'
  outline-variant: '#bfc7d4'
  surface-tint: '#0062a1'
  primary: '#0062a1'
  on-primary: '#ffffff'
  primary-container: '#2496ed'
  on-primary-container: '#002c4c'
  inverse-primary: '#9ccaff'
  secondary: '#0058bb'
  on-secondary: '#ffffff'
  secondary-container: '#1e71e2'
  on-secondary-container: '#fefcff'
  tertiary: '#0b56cf'
  on-tertiary: '#ffffff'
  tertiary-container: '#5c8cff'
  on-tertiary-container: '#002566'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d0e4ff'
  primary-fixed-dim: '#9ccaff'
  on-primary-fixed: '#001d35'
  on-primary-fixed-variant: '#00497b'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a41'
  on-secondary-fixed-variant: '#004493'
  tertiary-fixed: '#dae2ff'
  tertiary-fixed-dim: '#b2c5ff'
  on-tertiary-fixed: '#001848'
  on-tertiary-fixed-variant: '#0040a1'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  display-md:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '500'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-md-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-sm: 0.5rem
  margin: 1.5rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system embodies high-precision utility, computational clarity, and technical elegance. Rooted in the visual restraint of modern cloud engineering platforms and contemporary design systems like Material 3, the aesthetic merges utility with absolute polish. 

The visual style is **Minimalist Modern** with tonal surface layering. It relies on crisp geometry, generous negative space, intentional micro-interactions, and calibrated typographic weights to reduce cognitive friction during complex calculations. The interface delivers an immediate sense of reliability, speed, and mathematical exactness.

## Colors

The palette draws directly from the clean, dependable blues of distributed systems and developer tooling:

- **Primary (`#2496ED`)**: Represents the active operational state, selected modes, and highlighted computation operators.
- **Secondary (`#0969DA`)**: Anchors critical evaluation actions (such as the equals trigger) and focused functional groups.
- **Tertiary (`#326CE5`)**: Accents memory commands (`M+`, `MR`), history pills, and specialized mathematical constants.
- **Neutral (`#0F172A`)**: The slate foundation for primary readouts, results, and dominant figures.

### Surface Tones & Tinted Tokens
- **Background Canvas**: `#F8FAFC` — A soft, low-strain off-white canvas.
- **Surface Elevation 1 (Calculator Base)**: `#FFFFFF` — Pure white card layer.
- **Surface Elevation 2 (Operator Wells / Pads)**: `#F0F6FF` — Soft cyanic-slate tint for secondary key banks.
- **Surface Elevation 3 (Active / Pressed Tones)**: `#E1EFFF` — Subtle reactive state tone.
- **Borders & Dividers**: `#E2E8F0` — Razor-thin, low-contrast structural rules.
- **Muted Text / Secondary Readouts**: `#64748B` — Subdued slate for calculation history and formulas.

## Typography

Inter powers the system across all tiers. Because computation interfaces demand tabular alignment and rapid scanning, typographic weights remain balanced between `400` (expressions), `500` (keypad affordances), and `600` (final outputs and headers).

- **Tabular Figures**: Numeric outputs must render with OpenType `tnum` (tabular numbers) enabled so values align predictably across rows and live input ticks.
- **Dynamic Expression Scaling**: `display-lg` serves the active computational line on desktop, shifting gracefully to `display-lg-mobile` when characters exceed 10 glyphs or when viewed on handheld screens.
- **Historical Feed**: Upper formula breadcrumbs leverage `body-lg` or `body-md` in `#64748B` to keep visual precedence strictly on the live result.

## Layout & Spacing

The computational grid utilizes a high-density, fixed-aspect grid structure wrapped in fluid viewports. 

- **Keypad Matrix**: Arranged in a strict 4-column (standard arithmetic) or 5 to 6-column (scientific) layout using `gutter-sm` (8px) on mobile and `gutter` (12px) on desktop to guarantee rapid, error-free tap targets.
- **Aspect Ratio Rhythms**: Keypad buttons maintain an aspect ratio of `1:1` or `1.15:1` (width to height), with the `0` or `=` keys spanning 2 columns where functional flow dictates.
- **Viewport Structure**:
  - **Desktop**: Centered card surface constrained to a maximum width of `420px` for standard mode (or `680px` for expanded scientific dual-pane), padded with `space-xl`.
  - **Tablet**: Centered adaptive card layout with optional persistent side drawer for tape/history logs.
  - **Mobile**: Full-viewport edge-to-edge frame anchored with `margin-sm` padding, maximizing the thumb-reach zone for all key groups.

## Elevation & Depth

This design system avoids heavy drop shadows, opting instead for **soft atmospheric layering** and razor-sharp border outlines reminiscent of modern web engineering consoles:

- **Level 0 (App Shell)**: Flat `#F8FAFC`.
- **Level 1 (Main Computation Tile)**: Solid `#FFFFFF`, bordered by 1px solid `#E2E8F0`, softened with an ambient shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 10px 25px -5px rgba(36, 150, 237, 0.06)`.
- **Level 2 (Interactive Keys - Resting)**: Background `#FFFFFF` (for digits) or `#F0F6FF` (for function keys), 1px solid `#E2E8F0`, with micro-lift: `0 1px 2px 0 rgba(15, 23, 42, 0.03)`.
- **Level 3 (Primary Equals / Action Key)**: Solid `#2496ED` with tinted glow: `0 4px 14px 0 rgba(36, 150, 237, 0.35)`.
- **State Transforms**: On pressed/active interactions, keys transition smoothly via `scale(0.98)` with shadow collapse to `none` and an active fill shift to `#E1EFFF`.

## Shapes

The shape architecture relies on a **Rounded (`0.5rem` / `8px` base)** structural rhythm, scaling up to `1rem` (16px) for larger surface containers and `1.5rem` (24px) for the master calculator chassis. 

- **Keypad Buttons**: `rounded-lg` (12px to 16px) provides a tactile, smooth square feel that maximizes touchable surface area while retaining gentle curvature.
- **Mode Chips & Toggles**: Fully pill-shaped (`9999px`) to visually differentiate system controls from calculation data keys.
- **Display Readout Area**: Soft inner chamfer using `rounded-lg` with subtle inset border framing.

## Components

### Numeric & Keypad Buttons
- **Digit Keys (`0-9`, `.`)**: White background (`#FFFFFF`), neutral high-contrast glyphs (`#0F172A`), `title-md` or `label-lg`, bordered with `#E2E8F0`. Hover triggers background `#F8FAFC`.
- **Operator Keys (`+`, `−`, `×`, `÷`)**: Tinted slate-blue background (`#F0F6FF`), primary blue glyphs (`#0969DA`), with a bolder stroke weight. Hover triggers `#E1EFFF`.
- **Action / Equals Key (`=`)**: Primary accent fill (`#2496ED`), crisp white text, bold presence. Active press transitions to `#0969DA`.
- **Clear & Modifier Keys (`AC`, `C`, `±`, `%`)**: Subtle light slate finish (`#F1F5F9`), medium neutral tone (`#475569`).

### Display & Readout Panel
- A vertically stacked readout card.
- **Formula Line (Top)**: Right-aligned, `body-md`, muted slate `#64748B`, auto-scrolling horizontally for deep nested operations.
- **Result Output (Bottom)**: Right-aligned, `display-lg`, `#0F172A`, utilizing tabular numerals with instant real-time calculation previews rendered in 50% opacity before the equals operator is engaged.

### Chips & Segmented Controls
- **Mode Switcher (Basic / Scientific / Converter)**: Floating segmented pill in `#F1F5F9` containing nested active indicators in `#FFFFFF` with `0 1px 3px rgba(0,0,0,0.06)` elevation and `#0969DA` active text.

### Calculation History Tape (List & Drawer)
- Clean list items separated by hairline rules (`#E2E8F0`).
- Each entry shows the full timestamp in `label-sm` (`#94A3B8`), formula expression in `body-md`, and result in `title-md` (`#0F172A`).
- Tapping any entry recalls both the formula and the result directly back to the active accumulator.

### Input Fields & Memory Badges
- Floating memory indicator badges (`M`, `DEG`, `RAD`) in `label-sm` (`#2496ED`) set inside small `#F0F6FF` rounded pill containers, providing immediate operational context with zero visual clutter.