---
name: frontend-simplify
disable-model-invocation: true
description: Explicit-only simplification of a specified UI by reducing redundant containers, copy, and competing emphasis. Implement changes while keeping required content, functionality, and intentional branding.
---

# Frontend simplify

Use only when the user explicitly invokes this skill. Simplify the requested page, component, or flow. If the user asks for suggestions only, report without editing. Preserve functionality, required information, and the chosen visual identity; simplification does not authorize removing features or data.

## Establish what must remain

Follow [frontend-workflow](../frontend-workflow/SKILL.md) for context, implementation, library rules, and verification. Read `frontend/DESIGN.md`, inspect the relevant source, and view the existing UI with available browser tools. Identify the primary task, secondary tasks, and any explicitly protected content from the brief. Ask a focused question only if uncertainty would risk removing something essential.

## Reduce obstacles

Remove duplicate explanations, meaningless decoration, and containers that add depth without grouping useful information. Bring related content and controls together. Make action priority clear through placement and emphasis. Preserve repeated patterns where they help users compare items or learn the interface.

Use progressive disclosure for occasional options only when it improves the task. Keep those options discoverable and keyboard accessible. Do not hide frequent actions, required instructions, validation messages, or information needed for a decision. Preserve labels and accessible names when shortening visible copy.

Prefer fewer competing treatments over indiscriminately removing color, imagery, or personality. Dense applications can remain dense when that supports their users. Do not impose minimalism or replace the established theme as a side effect.

Make the smallest coherent change using existing components and tokens. Remove newly unused code and imports, while preserving unrelated work. No new abstraction or dependency is needed merely to reduce visual clutter.

## Verify what remains

Compare before and after against the primary and secondary tasks. Confirm that required information and every affected action remain available, including options moved behind disclosure. Check relevant desktop and narrow views, keyboard access, and the affected user journey through the workflow. Fix observed regressions and stop after verification.

Summarize what was removed, regrouped, or moved and why that helps. Report any behavior or visual result that could not be verified.

## Sources

Repository-authored guidance informed by Impeccable's [distill command](https://impeccable.style/docs/distill/). See [provenance](../../../SKILLS.md).
