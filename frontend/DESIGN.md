# Design context

This template can host unrelated products and substantially different visual designs. Replace the demo's identity, composition, typography, colors, and content to match a new brief.

## Current demo

Workroom demonstrates a project list, status filters, and project details. Projects can be planned, active, or completed. The demo exists to exercise routing, URL state, server queries, and mutations.

The theme follows the supplied River IT screenshot: a charcoal header, yellow primary actions, dark text, and a neutral light-gray background. Colors are approximations from that reference. Use dark text on yellow buttons and pale yellow badges with dark text. Yellow text is reserved for the charcoal header. Focus outlines use a darker gold on light surfaces.

Geist remains the application typeface. A compact Projects heading leads into the search toolbar and project list. Desktop rows align status, owner, and due date in columns; narrow screens stack the description above the metadata. Keep the detail page consistent with this hierarchy.

The initial component preset is shadcn `radix-nova` with Lucide icons. Semantic Tailwind CSS 4 tokens live in `src/index.css`; `components.json` records the shadcn configuration. Inspect those files and the current components for exact values. They are the source of truth for the running design.

## Implementation map

Use these entry points to find the current implementation. Keep exact values and APIs in their source files; update this map when replacing or moving them.

| Where | What to inspect | Reuse boundary |
| --- | --- | --- |
| [src/index.css](src/index.css) | Theme tokens, typography, and shared styles | Reuse within the adopted design; replace for a new direction |
| [components.json](components.json) | shadcn preset and configuration | Component tooling configuration, not a required page layout |
| [src/components/ui](src/components/ui) | Installed component implementations and variants | Reusable building blocks; choose composition for the task |
| [src/routes/__root.tsx](src/routes/__root.tsx) | Application shell and shared route layout | Current shell is replaceable; inspect shared effects before editing |
| [src/routes/index.tsx](src/routes/index.tsx) | Project list and URL-based filters | Replaceable project-list example |
| [src/routes/projects.$projectId.tsx](src/routes/projects.$projectId.tsx) | Project detail and status changes | Example of a routed detail flow; product fields and composition are replaceable |
| [src/lib/projects.ts](src/lib/projects.ts) | Project data and query definitions | Reuse integration patterns as appropriate; replace the demo domain |

## Extend or replace

When adding to the current application, reuse its tokens, components, and interaction patterns. Keep the new page consistent with the surrounding application.

Consistency applies to the adopted typography, color roles, controls, and interaction conventions. Compose each page around its own task: a settings form, analytical dashboard, and marketing page can share a visual identity while using different structures, widths, and content density. Do not repeat the demo's list arrangement merely to make pages match.

When the user requests a new product or visual direction, select a design for that brief. The project-tracker domain, current theme, and layout impose no constraints on the result. A new direction can change the shadcn preset, fonts, palette, spacing, radii, density, imagery, and page structure together.

Keep accessible component behavior, readable content, keyboard focus, and responsive layouts through either kind of change. The technical integration with Router, Query, and `/api` remains useful across designs.

## Record the adopted design

After adopting a new direction, replace the current-demo description with the actual product and audience. Record the visual decisions that future changes need to preserve and point to their implementation. Keep exact token values in CSS rather than duplicating them here.

A useful record names the primary user task, the page hierarchy, typography roles, use of color, content density, and any supplied visual references. Add only decisions that the application actually implements.

For consequential choices, record a short entry with **scope**, **decision**, **reason**, **implementation or evidence**, and **exceptions**. Include an example when it makes the rule easier to apply. Routine spacing edits do not need individual records. Label unresolved assumptions explicitly; do not present them as accepted standards.

Keep these records specific to the adopted product. Replace or retire obsolete decisions when the product changes. Existing code is evidence of current behavior, not automatic precedent for every future design.
