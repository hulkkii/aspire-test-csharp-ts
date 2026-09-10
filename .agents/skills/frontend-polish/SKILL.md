---
name: frontend-polish
disable-model-invocation: true
description: Explicit-only refinement of an existing UI's spacing, typography, alignment, consistency, and responsive details. Implement focused improvements while preserving its visual identity and functionality.
---

# Frontend polish

Use only when the user explicitly invokes this skill. Implement a bounded refinement pass on the requested target. If the user requests review only, report recommendations without editing. Preserve the product, palette, fonts, major layout, and behavior unless the brief authorizes changing them. No prior audit or separate approval is required.

## Inspect and refine

Follow [frontend-workflow](../frontend-workflow/SKILL.md) for context, library guidance, endpoint discovery, implementation, and verification. Read `frontend/DESIGN.md` and nearby components. Inspect the existing result through the agent's browser tools before changing it when available; reuse any still-current review evidence.

Identify the details that interfere with the task or make related elements inconsistent. Prioritize observed usability problems, then refine alignment, spacing relationships, type hierarchy, wrapping, control sizing, and responsive layout. Keep loading, empty, error, and success feedback clear where relevant.

Fix the responsible shared style or component variant when appropriate, using semantic tokens and the shadcn skill's component rules. Consider other consumers before changing a shared component. Avoid per-instance patches that merely conceal a parent layout problem.

Keep intentional brand characteristics. Do not add decoration, animation, new features, dependencies, or a new theme merely to make the pass look substantial. If the main problem calls for a broader redesign, explain it and complete useful refinements within the requested scope.

## Verify and finish

Compare before and after at relevant desktop and narrow widths. Exercise affected controls and user journeys using the workflow's checks. Preserve keyboard access, accessible names, and data behavior. Run checks warranted by the changes, fix observed regressions, and stop after confirming the corrections.

Summarize the meaningful refinements and what was verified. If browser inspection was unavailable, state what remains visually unverified rather than claiming a successful build proves the design.
