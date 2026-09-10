---
name: frontend-slop-check
disable-model-invocation: true
description: Explicit-only visual review for generic UI patterns, redundant copy, and decoration that obscures the product. Report findings without editing unless fixes are explicitly requested.
---

# Frontend slop check

Use only when the user explicitly invokes this skill. Review the requested page, component, or flow; do not turn the review into an unsolicited redesign. Report only by default. An explicit request to fix findings authorizes focused changes through [frontend-workflow](../frontend-workflow/SKILL.md).

## Gather evidence

Read the brief, conversation, `frontend/DESIGN.md`, and relevant source. Identify the primary task and intentional visual choices. Existing branding and supplied references take precedence over generic aesthetic preferences, including when they use purple, gradients, or familiar fonts.

Use the [aspire skill](../aspire/SKILL.md) for endpoint discovery and the agent's available browser tools for screenshots and interaction inspection. Review relevant desktop and narrow-screen views. If browser access is unavailable, provide a source-only review and identify visual claims that remain unverified. Do not install browser tooling or the Impeccable runtime for this review.

## Inspect in context

Treat these as prompts to investigate, not automatic violations:

- Product fit: interchangeable hero, metrics, and feature grids that displace the actual task; invented claims or generic placeholder copy.
- Hierarchy: unrelated content presented with equal emphasis; nested cards consuming useful space; spacing that obscures grouping.
- Decoration: repeated icon tiles, badges, accent borders, gradients, glow, or motion with no useful meaning.
- Typography and color: weak reading hierarchy, distracting emphasis, or a default palette unrelated to the brief. A familiar font alone is not a defect.
- Copy: repeated labels and explanations, vague actions, or decorative jargon that makes the task harder to understand.
- Usability: obscured content, cramped dialogs, overflow, focus problems, or unreadable contrast. Distinguish these defects from aesthetic preferences.

For each candidate, ask what it communicates and whether removing or changing it would improve this product. Preserve useful repetition, status colors, intentional imagery, and established design choices. Do not replace one generic aesthetic with another.

## Report

Lead with the most consequential findings. For each, give the page or element, screenshot or source evidence, its effect on the task, and a concrete improvement. Separate usability defects from aesthetic suggestions; include strengths worth preserving when useful. State the reviewed scope and verification limits. No finding quota, invented score, or probability of AI authorship is required.

This is an agent review, not a deterministic detector run. Claim detector results only if a detector was actually run at the user's request, and identify its target and limitations. A clean review does not establish accessibility compliance or prove human authorship.
