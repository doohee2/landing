---
name: Vibe Coding Platform
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c7c4d8'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#918fa1'
  outline-variant: '#464555'
  surface-tint: '#c3c0ff'
  primary: '#c3c0ff'
  on-primary: '#1d00a5'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#4d44e3'
  secondary: '#c3c0ff'
  on-secondary: '#231691'
  secondary-container: '#3e37a9'
  on-secondary-container: '#b3b0ff'
  tertiary: '#bdc2ff'
  on-tertiary: '#131e8c'
  tertiary-container: '#4a55be'
  on-tertiary-container: '#d7d8ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#e2dfff'
  secondary-fixed-dim: '#c3c0ff'
  on-secondary-fixed: '#0f0069'
  on-secondary-fixed-variant: '#3b35a7'
  tertiary-fixed: '#e0e0ff'
  tertiary-fixed-dim: '#bdc2ff'
  on-tertiary-fixed: '#000767'
  on-tertiary-fixed-variant: '#2f3aa3'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-hero:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  code-inline:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
  space-3xl: 6rem
---

## Brand & Style

This design system targets technical creators, modern product builders, and independent developers seeking an effortless, flow-state development environment. The brand personality balances hyper-modern engineering competence with intuitive, lightweight agility. The aesthetic blends **Corporate / Modern refinement** with subtle, developer-centric **Glassmorphism and crisp structure**.

Key atmospheric drivers:
- **Focused Flow:** A calm, high-contrast, distraction-free environment that prioritizes code clarity, UI preview fidelity, and tactile control.
- **Precision Engineering:** Sharp visual hierarchy, hairline structural borders, controlled gradients, and rhythmic micro-interactions that communicate stability and performance.
- **Sophisticated Depth:** Multi-tiered elevation created through subtle tinted ambient shadows and surface luminance shifts rather than heavy ornamental chrome.

## Colors

The palette is anchored by deep indigo nocturnal tones and balanced by surgical cool slate grays to optimize contrast and mitigate visual fatigue during extended development sessions.

- **Primary (`#4F46E5`):** High-energy electric indigo used for primary calls-to-action, active focus indicators, and key platform highlights.
- **Secondary (`#3730A3`):** Saturated deep indigo utilized for interactive state hovers, gradient stops, and structural accents.
- **Tertiary (`#818CF8`):** Soft periwinkle indigo applied to secondary interactive elements, badges, active code tokens, and icon accents.
- **Neutral Surface Palette:**
  - `Surface Base`: `#090D16` (deep obsidian canvas)
  - `Surface Elevated / Card`: `#0F172A` (cool deep slate container)
  - `Surface Layer / Modal`: `#1E293B` (refined slate overlay)
  - `Border Subtle`: `#1E1B4B` with opacity blending (`rgba(79, 70, 229, 0.15)`)
  - `Border Distinct`: `#334155`
  - `Text Primary`: `#F8FAFC`
  - `Text Secondary`: `#94A3B8`
  - `Text Muted`: `#64748B`

## Typography

The type system pairs **Inter** (with native Pretendard font-fallback for seamless CJK glyph rendering and Korean word breaking) for proportional UI copy with **JetBrains Mono** for code snippets, metric tags, and technical micro-labels.

- **Korean Localization Rule:** Set `word-break: keep-all` across all headings and body copy to prevent awkward mid-word line splits in Korean text blocks while preserving tight tracking in English.
- **Display Weights:** Reserved for product milestones and primary landing page value propositions (`fontWeight: 800` to `700`).
- **Code Tokens:** Monospaced elements must always feature subtle container styling with negative vertical optical compensation to preserve line grid alignment.

## Layout & Spacing

The system runs on a strict 8-point spatial rhythm mapped into a fluid 12-column grid system bounded by a maximum container width of `1280px`.

- **Breakpoints:**
  - **Desktop (≥ 1024px):** 12 columns, `1.5rem` (`24px`) gutters, `2rem` (`32px`) margins.
  - **Tablet (768px – 1023px):** 8 columns, `1.25rem` (`20px`) gutters, `1.5rem` (`24px`) margins.
  - **Mobile (< 768px):** 4 columns, `1rem` (`16px`) gutters, `1.25rem` (`20px`) margins.
- **Section Rhythm:**
  - Hero and featured showcase bands utilize `space-3xl` (`96px`) vertical padding on desktop, collapsing to `space-2xl` (`64px`) on mobile.
  - Card grids and feature clusters use `space-lg` (`24px`) inner element separation.

## Elevation & Depth

Visual hierarchy is constructed through luminous surface separation, low-opacity indigo boundaries, and ambient volumetric shadowing.

- **Base Canvas:** `#090D16` with an optional subtle ambient gradient ring radiating from `#1E1B4B` (20% opacity, 1200px blur radius) positioned centrally behind hero showcases.
- **Elevated Cards (Level 1):** `#0F172A` fill paired with a `1px` border of `rgba(255, 255, 255, 0.08)`. Shadow: `0px 4px 20px -2px rgba(15, 23, 42, 0.6)`.
- **Interactive Hover & Overlay (Level 2):** `#1E293B` fill with a `1px` dynamic border tinted to `rgba(79, 70, 229, 0.4)`. Shadow: `0px 12px 32px -4px rgba(79, 70, 229, 0.12), 0px 4px 12px rgba(0, 0, 0, 0.4)`.
- **Modals & Drawers (Level 3):** `#0F172A` with `backdrop-filter: blur(16px)` and subtle top highlight border (`rgba(255, 255, 255, 0.15)`). Shadow: `0px 24px 48px -12px rgba(0, 0, 0, 0.7)`.

## Shapes

The interface employs a balanced `0.5rem` (`8px`) baseline corner radius, imparting a structured yet tactile modern software experience.

- **Inputs, Buttons, and Tags:** `rounded` (`0.5rem` / `8px`) for compact balance.
- **Feature Cards and Code Viewers:** `rounded-lg` (`1rem` / `16px`) to cleanly frame complex multi-level content.
- **Modals and Hero Feature Modules:** `rounded-xl` (`1.5rem` / `24px`) to establish distinct focal regions.
- **Status Pills and Micro Badges:** Pill-shaped radius (`9999px`) to immediately distinguish informational status markers from actionable surfaces.

## Components

### Buttons
- **Primary:** Background `#4F46E5`, text `#FFFFFF`, font `label-md`. Border: `1px solid rgba(255, 255, 255, 0.12)`. Hover: `#3730A3` with subtle glowing drop shadow (`0 0 16px rgba(79, 70, 229, 0.35)`). Active: scale `0.98`.
- **Secondary / Outline:** Background `rgba(15, 23, 42, 0.6)`, text `#F8FAFC`, border `1px solid rgba(148, 163, 184, 0.2)`. Hover: `border-color: #818CF8`, background `rgba(30, 41, 59, 0.8)`.
- **Ghost:** Transparent background, text `#94A3B8`. Hover: text `#F8FAFC`, background `rgba(255, 255, 255, 0.05)`.

### Badges & Chips
- **Status Badges:** Fully rounded (`9999px`), padding `0.25rem 0.75rem`, font `label-sm`. Background `rgba(79, 70, 229, 0.12)`, border `1px solid rgba(129, 140, 248, 0.3)`, text `#818CF8`.
- **Category Filter Chips:** Rounded (`8px`), padding `0.375rem 0.875rem`, text `#94A3B8`, border `1px solid #1E293B`. Active state: background `#1E1B4B`, text `#F8FAFC`, border `1px solid #4F46E5`.

### Input Fields & Search Bars
- Background `#0B1120`, border `1px solid #334155`, text `#F8FAFC`, placeholder `#64748B`. Corner radius `8px`, vertical padding `0.625rem`, horizontal padding `0.875rem`.
- Focus ring: `1px solid #4F46E5` combined with `0 0 0 3px rgba(79, 70, 229, 0.2)`.

### Checkboxes & Toggle Switches
- **Checkboxes:** `18px x 18px`, radius `4px`, border `1px solid #475569`. Checked: background `#4F46E5`, border `#4F46E5`, checkmark `#FFFFFF`.
- **Toggle Switches:** `40px x 22px` track, background `#1E293B`. Checked: `#4F46E5`. Knob: `18px` white disc with smooth `200ms ease-out` transition.

### Cards
- **Feature Showcase Card:** Surface `#0F172A`, radius `16px`, `1px` border `rgba(255, 255, 255, 0.06)`, padding `1.5rem`. Inner hover glow transition: border shifts to `rgba(99, 102, 241, 0.3)`.
- **Code Preview Card:** Header strip in `#0B1120` featuring window action dots (red, yellow, green) and title text in `JetBrains Mono`. Body in `#060911` with active syntax highlighting tokens.

### Interactive Code / Vibe Prompt Terminal
- Specialized module mimicking an intelligent IDE command line: background `#090D16`, glowing inset border `#1E1B4B`, integrated copy buttons, and real-time execution pills using `#818CF8`.