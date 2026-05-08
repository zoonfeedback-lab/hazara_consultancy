---
name: Academic Excellence Framework
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#44474e'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#465f88'
  primary: '#000a1e'
  on-primary: '#ffffff'
  primary-container: '#002147'
  on-primary-container: '#708ab5'
  inverse-primary: '#aec7f6'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#090b09'
  on-tertiary: '#ffffff'
  tertiary-container: '#20221f'
  on-tertiary-container: '#888985'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#aec7f6'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#2d476f'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e3e3de'
  tertiary-fixed-dim: '#c6c7c2'
  on-tertiary-fixed: '#1a1c19'
  on-tertiary-fixed-variant: '#454744'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  h1:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Newsreader
    fontSize: 36px
    fontWeight: '600'
    lineHeight: '1.3'
  h3:
    fontFamily: Newsreader
    fontSize: 28px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  section-padding: 80px
---

## Brand & Style

The design system is built upon the pillars of **Academic Authority** and **Aspirational Growth**. It serves as a bridge between the rich heritage of the Hazara region and the global future of its students. The visual language must command respect while remaining accessible to the community it serves.

We employ a **Corporate / Modern** design style with a focus on editorial clarity. By utilizing expansive whitespace and a structured typographic hierarchy, the interface evokes the feeling of a prestigious university prospectus. The aesthetic is intentional, avoiding fleeting trends in favor of a timeless, institutional presence that builds immediate trust with parents and students alike.

## Colors

The color palette is rooted in tradition and excellence. 
- **Deep Navy (#002147)** acts as the anchor, used for headers, primary backgrounds, and critical UI elements to establish a formal tone. 
- **Metallic Gold (#D4AF37)** is used sparingly as a high-intent accent for success states, premium highlights, and call-to-action details.
- **Off-Whites (#F9F9F9, #F5F5F0)** provide a soft, paper-like canvas that reduces eye strain and reinforces the academic "white-glove" service feel.
- **Text Neutrals** utilize a very dark navy-tinted charcoal rather than pure black to maintain a sophisticated depth.

## Typography

This design system uses a dual-font strategy to balance tradition and utility. 
- **Newsreader** (Serif) is reserved for headlines and pull-quotes. Its literary character provides the "academic" weight required for an educational consultancy.
- **Inter** (Sans-Serif) handles all body copy, forms, and functional UI elements, ensuring maximum legibility across all devices.
- **Urdu Support:** For local accessibility, **Noto Nastaliq Urdu** must be implemented with a 1.8x line-height multiplier to accommodate the vertical requirements of the script. Urdu text should generally be 2px larger than the corresponding English body text to maintain visual parity.

## Layout & Spacing

The design system utilizes a **Fixed Grid** model to ensure content feels curated and structured. 
- A 12-column grid is standard for desktop, with generous 24px gutters to allow the content to "breathe."
- Vertical rhythm is based on an 8px square grid. 
- Large section headings should be separated by significant vertical padding (80px+) to distinguish different areas of consultancy (e.g., Undergraduate vs. Graduate services).
- Content containers should be centered with a maximum width of 1280px to prevent line lengths from becoming illegible on ultra-wide displays.

## Elevation & Depth

Depth in this design system is subtle and intentional, mimicking the layering of physical stationery. 
- **Tonal Layers:** We use varying shades of off-white to separate content sections rather than heavy shadows.
- **Ambient Shadows:** Where shadows are necessary (such as on cards), they must be extremely soft: a 15% opacity Navy-tinted blur with a large spread (e.g., `0 12px 32px rgba(0, 33, 71, 0.08)`).
- **Gold Accents:** Depth can also be conveyed through 1px Gold borders on active or "featured" elements, giving them a slight visual lift without physical displacement.

## Shapes

The shape language is conservative and formal. 
- **Soft Corners (0.25rem):** Most UI elements (buttons, inputs, cards) use a subtle radius. This removes the harshness of pure squares while maintaining a disciplined, professional appearance.
- **Standardization:** Avoid high-radius pill shapes or circular buttons, as they appear too casual for a consultancy context. 
- **Images:** Photography should use the same `rounded-sm` or `rounded-md` corners, never sharp 90-degree angles, to maintain a consistent visual "softness" across the site.

## Components

### Buttons
Primary buttons feature a Solid Navy background with Gold text or a 2px Gold bottom-border. Hover states should involve a subtle shift to a slightly lighter Navy or the introduction of a Gold glow. Secondary buttons use a Navy outline with a transparent background.

### Cards
Cards are the primary vehicle for displaying university programs or success stories. They feature a white background, a 1px border in a very light grey, and a subtle "ambient shadow" on hover. Headlines within cards must always be Serif.

### Input Fields
Inputs are structured with a 1px border in `#D1D1D1`. When focused, the border transitions to Deep Navy. Labels always sit above the field in `label-caps` typography to ensure clarity.

### Chips & Tags
Used for categories like "STEM," "Scholarship," or "UK Universities." These should be flat, using a pale version of the Gold or Navy as a background with high-contrast text.

### Narrative Elements
Incorporate "Trust Badges" and "Accreditation Seals" as specialized components. These should use the Metallic Gold color to signify their importance and the consultancy's certified status.