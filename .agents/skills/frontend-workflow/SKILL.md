---
name: frontend-workflow
description: Build or change frontend features and visual designs in this Aspire, Vite, React, shadcn, Tailwind, and TanStack template. Connect project context, upstream skills, and browser review.
---

# Frontend workflow

This skill owns task scope, execution sequence, project integration, storage decisions, and verification. Use frontend-design for visual direction and critique, shadcn for component APIs, composition, styling conventions, and accessible interactions, and TanStack guidance for routing and data APIs.

## Establish the task

Read `frontend/DESIGN.md`, `frontend/components.json`, and the relevant routes, components, and styles. Use the user's brief to distinguish an extension from a new design direction.

For an extension, preserve the current visual language and reuse its components. For a new direction, choose the product, hierarchy, layout, typography, colors, density, and imagery that fit the brief. The Workroom demo and its shadcn preset are starting examples, not requirements for future applications. Update `frontend/DESIGN.md` when adopting a new direction.

Use the available `frontend-design` skill for visual direction. State material assumptions and proceed when the brief is sufficient. Existing conversation context and the user's requested product or design count as the brief; do not ask them to reconfirm it. Do not add a routine approval checkpoint before implementation. Explore alternatives only when the request or an unresolved design choice warrants them.

## Clarify consequential gaps

When the request leaves consequential choices unresolved, offer one compact round of at most three questions before dependent implementation. Use existing conversation and project context first; do not ask the user to repeat known requirements. Skip clarification when the brief is sufficient or the user says "you decide," "just build it," or otherwise delegates the choices. State material assumptions briefly and proceed.

Prioritize the intended audience and primary task, component versus single page versus complete application or flow, prototype versus working product, and persistence needs. Ask only about gaps that would materially change the work. Visual preferences and references are optional; missing color guidance alone does not block implementation. Combine storage clarification with this round rather than starting another interview.

For each question, put a concrete recommended answer first, label it as recommended, and give a short reason. Include a few meaningful alternatives and allow a free-text response. Use the environment's question tool when available. Keep questions in product language rather than asking the user to choose implementation details.

Always tell the user they can answer "Use your recommendations and build it" to accept all proposed defaults and end clarification. Treat equivalent replies as delegation. After answers arrive, implement using the choices without a separate approval checkpoint. Ask follow-up questions only if an answer reveals a genuine blocker. While awaiting answers, continue independent inspection or preparation; do not treat silence as acceptance of a required decision.

## Choose the data scope

Decide early from the brief whether this is a visual prototype, a local demo, or a working shared application. State the storage assumption and its limitations; ask only when the distinction materially affects the requested outcome and cannot be inferred.

- A visual prototype may use sample data and in-memory state.
- A local demo may use browser storage when retaining non-sensitive sample data across reloads is useful. State that it is local to that browser and can be cleared.
- A working shared application needs appropriate durable backend persistence. The demo's in-memory API is sample storage and does not satisfy this requirement.

Do not store secrets or sensitive application data in browser storage as a shortcut. Verify reload behavior against the chosen scope; do not imply persistence when changes are intentionally temporary.

## Ground the visual decisions

When a reference is supplied, distinguish faithful reproduction from inspiration using the brief. For reproduction, inspect the reference and preserve its composition, proportions, density, typography, and imagery. For inspiration, identify which qualities to carry forward and adapt them to the new product. Do not substitute a preferred aesthetic for an explicit visual target.

Identify the screen's primary user task and give its content and controls the appropriate visual priority. Match heading scale, whitespace, and information density to that task. Application screens do not automatically need a marketing-style hero.

Prefer supplied assets and a consistent icon library. Use imagery when it serves the brief; avoid decorative filler. Use suitable source assets, available image tools, or established libraries for complex illustrations and maps rather than approximating them with improvised shapes. Simple vectors and diagrams remain appropriate when they communicate the content.

## Load the relevant library guidance

Use the installed `shadcn` skill for component selection, composition, and CLI operations. Run shadcn commands from `frontend`. This template uses the official `@shadcn` registry by default; ordinary component additions do not need a new registry-choice question. Inspect `components.json` and installed components before generating or changing them.

Keep Tailwind 4 tokens in the configured CSS file; derive component colors from semantic tokens. For a new theme, change tokens and component variants at their source instead of scattering per-instance overrides. The chosen preset may change with the brief. Review foreground and background token pairs together across the affected themes, including muted text, inputs, overlays, charts, and focus states. A primary-color change alone does not establish a complete new theme.

Before routing, search-parameter, query, or mutation work, run these commands from `frontend`:

```powershell
npx @tanstack/intent list
npx @tanstack/intent load "<package>#<skill>"
```

Replace the placeholder with a relevant identifier from the list. Load only the skills needed for the change and follow their references. Package names do not guarantee skill availability. Use the [official Query docs](https://tanstack.com/query/latest/docs/framework/react/overview) or [Router docs](https://tanstack.com/router/latest/docs/framework/react/overview) when the installed package has no matching skill. Check advice against the installed version.

## Implement in the existing application

Use TanStack Router for routes and shareable URL state. Use TanStack Query for server data and mutation cache updates. Keep transient control state local to React. Reuse existing query definitions so route preloading and rendered views address the same cache entries. Generate the route tree with the project command instead of editing generated output.

Keep requests relative to `/api`. Preserve the Aspire development proxy and ASP.NET Core publish path. Treat the demo's in-memory API as sample storage when adapting it to a real product.

Follow the shadcn skill when selecting and composing components. Its preset does not dictate page composition or branding. Build the loading, empty, error, and success states needed by the actual feature.

Before fixing a layout defect, inspect parent containers, shared component variants, and global styles. Correct the responsible rule instead of accumulating local spacing overrides.

## Review the result

Use the repository's `aspire` skill to start or inspect the application and discover its actual `webfrontend` endpoint. Do not assume a port. Review through the browser tools available in the agent environment; no repository Playwright installation or test setup is required.

For a new page or substantial visual change, inspect desktop and narrow-screen screenshots. Check keyboard focus, readable contrast, overflow, and relevant data states. For a small edit, inspect the affected area and behavior.

Verify the affected user journey from input to visible outcome. For a create or edit flow, enter representative data, save, confirm the rendered values update immediately, check related list/detail views, and reload to verify the chosen persistence behavior. Check validation and failure handling where relevant. Test Back/Forward when navigation or URL state is involved, and activity history when the feature provides it. Adapt these checks to the feature; a read-only screen does not require a create flow.

Fix observed defects and repeat the affected checks without an open-ended polishing loop.

Run `npm run lint` and `npm run build` when warranted by the change. The build includes route generation and typechecking; use standalone `npm run typecheck` when a build is unnecessary or for early feedback. If a browser or running application is unavailable, complete the checks that can run and report the unverified visual or interaction behavior. Do not claim browser verification from a successful build.
