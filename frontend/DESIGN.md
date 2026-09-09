# Design context

This template can host unrelated products and substantially different visual designs. Replace the demo's identity, composition, typography, colors, and content to match a new brief.

## Current demo

Workroom demonstrates a project list, status filters, and project details. Projects can be planned, active, or completed. The demo exists to exercise routing, URL state, server queries, and mutations.

The initial component preset is shadcn `radix-nova` with Lucide icons. Semantic Tailwind CSS 4 tokens live in `src/index.css`; `components.json` records the shadcn configuration. Inspect those files and the current components for exact values. They are the source of truth for the running design.

## Extend or replace

When adding to the current application, reuse its tokens, components, and interaction patterns. Keep the new page consistent with the surrounding application.

When the user requests a new product or visual direction, select a design for that brief. The project-tracker domain, current theme, and layout impose no constraints on the result. A new direction can change the shadcn preset, fonts, palette, spacing, radii, density, imagery, and page structure together.

Keep accessible component behavior, readable content, keyboard focus, and responsive layouts through either kind of change. The technical integration with Router, Query, and `/api` remains useful across designs.

## Record the adopted design

After adopting a new direction, replace the current-demo description with the actual product and audience. Record the visual decisions that future changes need to preserve and point to their implementation. Keep exact token values in CSS rather than duplicating them here.

A useful record names the primary user task, the page hierarchy, typography roles, use of color, content density, and any supplied visual references. Add only decisions that the application actually implements.
