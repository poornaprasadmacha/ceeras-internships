# QueryPath — Design System & Visual Specification

## 1. Design Philosophy

QueryPath is engineered for long, distraction-free study sessions.
The design principles emphasize:

1. **Restraint Over Flash**: Muted palettes, subtle borders, and delicate elevation instead of bright neon gradients or heavy drop shadows.
2. **Zero Emojis**: Complete avoidance of emojis anywhere in the user interface, documentation, or exercises. Information and state are conveyed with typography, layout, and clean Lucide React icons.
3. **High Contrast with Visual Comfort**: High readability adhering to WCAG 2.2 AA (minimum 4.5:1 for normal text, 3:1 for large text and UI components) without harsh pure-white-on-pure-black glare.
4. **Information Hierarchy**: Clean typography scales and generous whitespace to keep complex SQL outputs and explanations readable.

---

## 2. Color Themes & Design Tokens

Theme selection is driven by CSS custom properties attached to `html[data-theme="..."]`.

### 2.1 Soft Light (Default Theme)

| Token | CSS Variable | Value | Purpose |
|---|---|---|---|
| Background | `--bg-app` | `#F6F8F6` | Page backdrop (calm tinted neutral) |
| Main Surface | `--bg-surface` | `#FFFFFF` | Primary card, editor, and table background |
| Secondary Surface | `--bg-subtle` | `#EEF3EF` | Sidebar, panel, and toolbar backdrop |
| Primary Text | `--text-primary` | `#25332D` | Primary headings and body copy |
| Secondary Text | `--text-secondary` | `#637168` | Captions, metadata, and labels |
| Primary Accent | `--accent-primary` | `#356859` | Primary CTA buttons, active links |
| Secondary Accent | `--accent-secondary` | `#739B87` | Active tab highlights, subtle badges |
| Borders | `--border-color` | `#DCE5DE` | Hairline dividers and card borders |
| Success | `--status-success` | `#3F775C` | Correct answers, passed tests |
| Warning | `--status-warning` | `#8B6B35` | Hints, alerts, prerequisites |
| Error | `--status-error` | `#A64B4B` | SQL syntax errors, invalid responses |
| Editor Canvas | `--editor-bg` | `#F0F4F1` | Monospace code editor surface |
| Editor Text | `--editor-text` | `#26382F` | Monospace SQL query text |

### 2.2 Warm Paper Theme

| Token | CSS Variable | Value | Purpose |
|---|---|---|---|
| Background | `--bg-app` | `#FAF7F2` | Warm parchment background |
| Main Surface | `--bg-surface` | `#FFFFFF` | Card surface |
| Secondary Surface | `--bg-subtle` | `#F3EFEA` | Panel and sidebar surface |
| Primary Text | `--text-primary` | `#342E28` | Earthy charcoal text |
| Secondary Text | `--text-secondary` | `#726960` | Warm slate secondary text |
| Primary Accent | `--accent-primary` | `#6E5034` | Rich leather brown accent |
| Secondary Accent | `--accent-secondary` | `#A28063` | Warm sand accent |
| Borders | `--border-color` | `#E6DFD5` | Warm border divider |
| Success | `--status-success` | `#446E52` | Sage green success |
| Warning | `--status-warning` | `#916933` | Ochre warning |
| Error | `--status-error` | `#9E4545` | Terracotta red error |
| Editor Canvas | `--editor-bg` | `#F5F0E8` | Warm editor backdrop |
| Editor Text | `--editor-text` | `#322A22` | Earthy code text |

### 2.3 Soft Dark Theme

| Token | CSS Variable | Value | Purpose |
|---|---|---|---|
| Background | `--bg-app` | `#151B18` | Deep charcoal-green (no pure black) |
| Main Surface | `--bg-surface` | `#1B231F` | Elevated card surface |
| Secondary Surface | `--bg-subtle` | `#222D28` | Sidebar and panel surface |
| Primary Text | `--text-primary` | `#E1E8E3` | Soft off-white high contrast text |
| Secondary Text | `--text-secondary` | `#93A398` | Muted sage text |
| Primary Accent | `--accent-primary` | `#5E9882` | Luminous soft seafoam green |
| Secondary Accent | `--accent-secondary` | `#416E5D` | Deep teal accent |
| Borders | `--border-color` | `#2B3B32` | Subtle dark green-slate border |
| Success | `--status-success` | `#5EA37C` | Soft green success indicator |
| Warning | `--status-warning` | `#C79F5E` | Soft amber warning indicator |
| Error | `--status-error` | `#D47070` | Soft coral error indicator |
| Editor Canvas | `--editor-bg` | `#171F1B` | Dark code editor canvas |
| Editor Text | `--editor-text` | `#DCE6E0` | Crisp light code text |

---

## 3. Typography Hierarchy

- **Font Family (Prose & UI)**: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif.
- **Font Family (Code & Data)**: "JetBrains Mono", "Fira Code", Menlo, Monaco, Consolas, monospace.

### Type Scale

| Element | Class / Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| Display | `text-3xl` (30px) | 700 / Bold | 1.25 | Lesson Hero & Main Dashboard Title |
| Heading 1 | `text-2xl` (24px) | 700 / Bold | 1.3 | Major Section Headings |
| Heading 2 | `text-xl` (20px) | 600 / SemiBold | 1.35 | Subsections & Modal Headings |
| Heading 3 | `text-lg` (18px) | 600 / SemiBold | 1.4 | Card Titles & Exercise Tasks |
| Body | `text-base` (16px) | 400 / Normal | 1.6 | Narrative explanations & concepts |
| Small | `text-sm` (14px) | 400 / 500 | 1.5 | Results tables, captions, metadata |
| Micro | `text-xs` (12px) | 500 / Medium | 1.4 | Badges, tags, execution timestamps |
| Code | `font-mono text-sm` | 400 / 500 | 1.5 | Inline SQL syntax & query editor |

---

## 4. Spacing & Elevation

- **Radius Scale**:
  - `rounded-sm`: 4px (badges, tags)
  - `rounded-md`: 6px (buttons, input fields)
  - `rounded-lg`: 8px (cards, code editor containers, result tables)
  - `rounded-xl`: 12px (modals, hero sections)
- **Shadow Scale**:
  - `shadow-sm`: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
  - `shadow-md`: `0 4px 6px -1px rgba(0, 0, 0, 0.07)`
  - `shadow-lg`: `0 10px 15px -3px rgba(0, 0, 0, 0.08)`
  - (Dark theme suppresses shadows in favor of subtle border highlights).

---

## 5. Component Design Rules

1. **Buttons**:
   - Primary: Solid accent background with contrasting white text.
   - Secondary: Subtle background with 1px border.
   - Ghost: Transparent background with accent text on hover.
   - Focus visible: High-contrast 2px outline offset by 2px.
2. **Tables**:
   - Border-collapse with alternating or bordered rows.
   - Sticky header for long result sets.
   - Numeric alignment: Right-aligned for IDs, numbers, and dates; Left-aligned for text.
3. **Editor**:
   - Distinct gutter with muted line numbers.
   - Active line highlight without excessive contrast.
   - Bracket pair matching indicator.
4. **Status Indicators**:
   - Accompanied by descriptive text and Lucide icons (e.g. CheckCircle2 for success, AlertTriangle for warning, XCircle for error), never color alone.
