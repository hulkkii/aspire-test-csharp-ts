---
name: frontend-workflow
description: Build or change frontend features and visual designs in this Aspire, Vite, React, shadcn, Tailwind, and TanStack template. Connect project context, upstream skills, and browser review.
---

# Frontend workflow

## Establish the task

Read `frontend/DESIGN.md`, `frontend/components.json`, and the relevant routes, components, and styles. Use the user's brief to distinguish an extension from a new design direction.

For an extension, preserve the current visual language and reuse its components. For a new direction, choose the product, hierarchy, layout, typography, colors, density, and imagery that fit the brief. The Workroom demo and its shadcn preset are starting examples, not requirements for future applications. Update `frontend/DESIGN.md` when adopting a new direction.

Use the available `frontend-design` skill for visual direction. State material assumptions and proceed when the brief is sufficient. Existing conversation context and the user's requested product or design count as the brief; do not ask them to reconfirm it. Do not add a routine approval checkpoint before implementation. Explore alternatives only when the request or an unresolved design choice warrants them.

## Load the relevant library guidance

Use the installed `shadcn` skill for component selection, composition, and CLI operations. Run shadcn commands from `frontend`. This template uses the official `@shadcn` registry by default; ordinary component additions do not need a new registry-choice question. Inspect `components.json` and installed components before generating or changing them. Keep Tailwind 4 tokens in the configured CSS file; derive component colors from semantic tokens. For a new theme, change tokens and component variants at their source instead of scattering per-instance overrides. The chosen preset may change with the brief.

Before routing, search-parameter, query, or mutation work, run these commands from `frontend`:

```powershell
npx @tanstack/intent list
npx @tanstack/intent load "<package>#<skill>"
```

Replace the placeholder with a relevant identifier from the list. Load only the skills needed for the change and follow their references. Package names do not guarantee skill availability. Use the [official Query docs](https://tanstack.com/query/latest/docs/framework/react/overview) or [Router docs](https://tanstack.com/router/latest/docs/framework/react/overview) when the installed package has no matching skill. Check advice against the installed version.

## Implement in the existing application

Use TanStack Router for routes and shareable URL state. Use TanStack Query for server data and mutation cache updates. Keep transient control state local to React. Reuse existing query definitions so route preloading and rendered views address the same cache entries. Generate the route tree with the project command instead of editing generated output.

Keep requests relative to `/api`. Preserve the Aspire development proxy and ASP.NET Core publish path. Treat the demo's in-memory API as sample storage when adapting it to a real product.

Use the selected shadcn components where they fit the interaction. Their preset does not dictate page composition or branding. Retain accessible interaction behavior when restyling. Build the loading, empty, error, and success states needed by the actual feature.

## Review the result

Use the repository's `aspire` skill to start or inspect the application and discover its actual `webfrontend` endpoint. Do not assume a port. Review through the browser tools available in the agent environment; no repository Playwright installation or test setup is required.

For a new page or substantial visual change, inspect desktop and narrow-screen screenshots and exercise the main interaction. Check keyboard focus, readable contrast, overflow, and relevant data states. For a small edit, inspect the affected area and behavior. Fix observed defects and confirm the corrections without an open-ended polishing loop.

Run the project checks appropriate to the change, normally `npm run typecheck`, `npm run lint`, and `npm run build` for frontend implementation. If a browser or running application is unavailable, complete the checks that can run and report the unverified visual or interaction behavior. Do not claim browser verification from a successful build.
