# Interaction decisions

Use for forms, mutations, dialogs, and destructive actions. Apply only to states the feature can reach. The shadcn skill owns component APIs and accessible composition; TanStack guidance owns routing and query behavior.

## Forms and mutations

Identify the object being changed, who may change it, and when the change takes effect. Distinguish local drafts from saved data. Use action labels that explain the result, such as "Save profile" or "Archive project".

Preserve entered values through validation and recoverable request failures. Explain the problem near the relevant field or action and provide a recovery path. A retry must not silently discard edits or create duplicate records. Show pending feedback and prevent accidental repeated submission while a mutation is running.

Reflect successful changes in all affected views. If updates are optimistic, handle rejection by restoring consistent state and explaining the failure. Never claim a save succeeded before the persistence layer confirms it. Check reload behavior against the chosen storage scope.

## Choose the interaction surface

Use inline controls or disclosure for changes that benefit from surrounding context. Use a dialog for a bounded task that can be completed without extensive navigation. Prefer a page for long, complex, or linkable workflows. Do not choose a modal simply because the component is available.

Keep required information and frequent actions visible. When revealing occasional options, preserve their discoverability and keyboard access. Check initial focus, focus return on close, cancellation, and constrained-height scrolling using the component library's supported behavior. Account for unsaved edits when leaving a form.

## Consequences and recovery

For destructive actions, name the affected object and scope, including whether other people or related records are affected. Match confirmation to the consequence; routine reversible changes do not automatically need a confirmation dialog. Offer undo only when the system actually supports reversal.

Represent permissions honestly. Hiding or disabling a control does not replace backend authorization. Explain unavailable actions when that helps users proceed, without revealing restricted information.

## Verify the affected journey

Exercise input, submission, immediate feedback, related views, and reload where relevant. Include an actual validation or recoverable failure path when the change affects it. Check long content and narrow layouts, and confirm that errors retain input and leave a usable retry or exit. Use the workflow's existing browser checks; no additional browser framework is required.

## Maintain the decisions

Record consequential adopted choices in `frontend/DESIGN.md` with scope, rationale, implementation or evidence, and exceptions. Existing code shows what is implemented; it does not automatically establish the right pattern for another product. Keep unresolved choices labeled as assumptions and avoid turning one review comment into a universal rule.

Repository-authored guidance informed by [Vercel's product-design article](https://vercel.com/blog/teaching-agents-product-design-at-vercel). Adapted for this template's replaceable products and existing library skills.
