# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

---

## How to Use

Before building any component:

1. Check if a similar component already exists here
2. If yes — match its exact classes
3. If no — build it following ui-rules.md and ui-tokens.md, then add it here

After building any component — update this file with the component name, file path, and exact classes used.

---

## Components

### HeroSection
File: src/app/components/HeroSection.tsx
Last updated: 2026-06-25
| Property | Class |
| --- | --- |
| Background | bg-surface |
| Text – primary | text-text-primary |
| Text – secondary | text-text-secondary |
| Border radius | rounded-md |
| Spacing | flex flex-col items-center text-center gap-6 p-6 |
| Hover/interactive | none |

### FeatureCards
File: src/app/components/FeatureCards.tsx
Last updated: 2026-06-25
| Property | Class |
| --- | --- |
| Background | bg-surface |
| Border | border-border |
| Border radius | rounded-lg |
| Shadow | shadow-sm |
| Text – primary | text-text-primary |
| Text – secondary | text-text-secondary |
| Spacing | p-6 flex flex-col items-center text-center |
| Grid | grid gap-6 md:grid-cols-3 |

### HowItWorks
File: src/app/components/HowItWorks.tsx
Last updated: 2026-06-25
| Property | Class |
| --- | --- |
| Background | bg-surface |
| Text – primary | text-text-primary |
| Text – secondary | text-text-secondary |
| Border radius | none |
| Spacing | py-12 |
| Grid | grid gap-8 md:grid-cols-3 |

### Footer
File: src/app/components/Footer.tsx
Last updated: 2026-06-25
| Property | Class |
| --- | --- |
| Background | bg-surface |
| Text – secondary | text-text-secondary |
| Text – primary links | text-text-primary |
| Spacing | py-6 |
| Layout | flex justify-center gap-4 |
