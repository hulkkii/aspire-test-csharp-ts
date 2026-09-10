---
name: frontend-prototype
description: Explicit-only exploration of frontend designs or lightweight interaction flows with realistic sample data and simulated behavior. Build runnable alternatives before production validation, persistence, and backend work.
disable-model-invocation: true
---

# Frontend prototype

Use only when explicitly invoked. Build enough to answer the user's design question and let them try the result. This mode does not require production completeness.

## Frame the experiment

Read the brief, conversation, `frontend/DESIGN.md`, and relevant components. State the question being explored in one sentence. Use the workflow's short clarification round only for consequential gaps; skip it when the user delegates decisions.

Build one design when requested. When comparing directions, default to three alternatives unless the user specifies otherwise. Vary structure, hierarchy, or interaction for layout questions; color-only alternatives are appropriate when the question is about palette. Use consistent representative content so differences are easy to compare.

For an extension, show the experiment in its surrounding application context. For a new product or visual direction, allow a different shell, theme, typography, and density. Use [frontend-design](../frontend-design/SKILL.md) for visual judgment without adding a formal planning exercise.

## Build only what the question needs

Use the existing Vite, React, Tailwind, and shadcn setup. Follow [frontend-workflow](../frontend-workflow/SKILL.md) for project context, relevant library guidance, and Aspire endpoint discovery. The scope and completion checks in this skill replace its production-completeness expectations during prototype work.

Use realistic fixtures and local React state by default. Simulate saves and other interactions needed to judge the design. Do not connect experimental actions to real mutations, create a backend, or add persistence unless that is explicitly part of the question. Identify simulated behavior and reset-on-reload limits in the handoff.

Defer comprehensive validation, exhaustive error states, production tests, and reusable abstractions. Include validation or failure simulation when it is what the user is exploring. Keep existing component accessibility, meaningful labels, keyboard access, readable contrast, and enough error handling for the prototype to run. Do not remove production validation or authorization from existing features to speed up an experiment.

Name temporary components or routes clearly. Follow the project's routing conventions. Keep experimental styles and theme tokens scoped to the prototype; avoid changing shared primitives or the app-wide theme merely to show alternatives. Account for overlays rendered through portals so their theme follows the active variant. Do not update the adopted design record until a direction is selected for implementation.

## Make alternatives easy to compare

For multiple variants, use a small, clearly separate development-only switcher and a shareable URL search parameter through TanStack Router. Preserve unrelated search state, default unknown variant values safely, and give each variant a descriptive name. Let each alternative own its composition rather than forcing it through one shared layout.

Use accessible buttons or a select for switching. Keep the switcher from covering content and avoid global arrow-key shortcuts that interfere with inputs or widgets. Isolate or reset fixture state between variants so comparisons start predictably. Gate experimental rendering and access with Vite's development mode; hiding only the switcher does not keep prototype behavior out of production.

## Review and hand over

Discover the running URL through the Aspire skill and use the agent's browser tools. Check the target viewport and a narrow view when relevant, switch through the alternatives, and exercise the simulated interaction being explored. Fix crashes, major overflow, and controls that prevent evaluation. Run targeted lint or type checks when code changes warrant them; a production build is not a substitute for viewing a development-only prototype.

Provide the URL and variant links, the design question, each option's main trade-off, and what is simulated or unverified. No browser framework or evaluation harness is required. Stop when the prototype is usable for the intended decision, without an open-ended polish loop.

Selection does not automatically authorize production implementation. When asked to implement a selected direction, return to the normal frontend workflow, replace simulations with the required behavior, verify the affected journeys, and remove temporary variants and switching controls. Do not automatically commit, publish, create issues, or discard alternatives during the exploration.
