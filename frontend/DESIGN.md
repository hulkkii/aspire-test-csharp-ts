# Design context

This template can host unrelated products and substantially different visual designs. Replace the demo's identity, composition, typography, colors, and content to match a new brief.

## Current demo

Workroom demonstrates a project list, status filters, and project details. Projects can be planned, active, or completed. The demo exists to exercise routing, URL state, server queries, and mutations.

The theme follows the supplied River IT screenshot: a charcoal header, yellow primary actions, dark text, and a neutral light-gray background. Colors are approximations from that reference. Use dark text on yellow buttons and pale yellow badges with dark text. Yellow text is reserved for the charcoal header. Focus outlines use a darker gold on light surfaces.

Geist remains the application typeface. A compact Projects heading leads into the search toolbar and project list. Desktop rows align status, owner, and due date in columns; narrow screens stack the description above the metadata. Keep the detail page consistent with this hierarchy.

`src/components/workspace-overview.tsx` demonstrates shadcn Card, Chart, Tabs, Table, and Progress above the project list. The area chart and data tab share a fixed, labeled sample of weekly task activity. The project snapshot uses all current API projects, independent of list filters. Chart lines use gold and gray with distinct line patterns; the data tab provides the same values as an accessible table. The installed Progress component forwards its value to the Radix root so assistive technology receives the percentage.

The initial component preset is shadcn `radix-nova` with Lucide icons. Semantic Tailwind CSS 4 tokens live in `src/index.css`; `components.json` records the shadcn configuration. Inspect those files and the current components for exact values. They are the source of truth for the running design.

## Extend or replace

When adding to the current application, reuse its tokens, components, and interaction patterns. Keep the new page consistent with the surrounding application.

When the user requests a new product or visual direction, select a design for that brief. The project-tracker domain, current theme, and layout impose no constraints on the result. A new direction can change the shadcn preset, fonts, palette, spacing, radii, density, imagery, and page structure together.

Keep accessible component behavior, readable content, keyboard focus, and responsive layouts through either kind of change. The technical integration with Router, Query, and `/api` remains useful across designs.

## Record the adopted design

After adopting a new direction, replace the current-demo description with the actual product and audience. Record the visual decisions that future changes need to preserve and point to their implementation. Keep exact token values in CSS rather than duplicating them here.

A useful record names the primary user task, the page hierarchy, typography roles, use of color, content density, and any supplied visual references. Add only decisions that the application actually implements.
