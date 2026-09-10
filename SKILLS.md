# Agent skill sources

The repository commits its frontend skill copies so a new checkout has the same instructions. [skills-lock.json](skills-lock.json) records the upstream source, skill path, and computed hash for each installed upstream skill. These hashes identify the upstream installer snapshot; they are not Git commit identifiers and do not describe subsequent local adaptations. Repository history records the reviewed local versions.

## Included guidance

| Skill | Source | Role | License |
| --- | --- | --- | --- |
| [frontend-design](.agents/skills/frontend-design/SKILL.md) | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | Locally adapted visual direction, typography, and critique | [Apache-2.0](.agents/skills/frontend-design/LICENSE.txt) |
| [shadcn](.agents/skills/shadcn/SKILL.md) | [shadcn/ui](https://github.com/shadcn-ui/ui/tree/main/skills/shadcn) | Component usage, composition, and CLI guidance | [MIT](.agents/skills/shadcn/LICENSE.md) |
| [frontend-workflow](.agents/skills/frontend-workflow/SKILL.md) | This repository | Connects the stack, design context, and browser review | Repository-owned instructions |
| [aspire](.agents/skills/aspire/SKILL.md) and [aspireify](.agents/skills/aspireify/SKILL.md) | Existing repository skills | Aspire operation and initialization | Retained from the original template |

The shadcn license copy comes from [upstream revision 3ba91b1](https://github.com/shadcn-ui/ui/blob/3ba91b1cc83e1bbe4ab35a422ff2a694849c5048/LICENSE.md). Keep the upstream notices when redistributing the skills. The original Aspire skills predate this frontend setup and have no entry in `skills-lock.json`.

TanStack skills are discovered from installed packages through `@tanstack/intent`. Their versions follow [frontend/package-lock.json](frontend/package-lock.json), and their licenses remain with those packages. Run `npx @tanstack/intent list` from `frontend` to see what is actually available. Use official library documentation when no matching skill ships with the installed package.

## Optional frontend tools

These repository-authored skills are informed by Paul Bakaus's [Impeccable](https://github.com/pbakaus/impeccable), reviewed on 2026-09-10. They use original local instructions based on the linked public guidance, rather than vendored upstream skill files, and have no installer entry in `skills-lock.json`.

| Skill | Purpose | Source guidance |
| --- | --- | --- |
| [frontend-slop-check](.agents/skills/frontend-slop-check/SKILL.md) | Report evidence-backed visual and usability findings; no edits by default | [Slop catalog](https://impeccable.style/slop/), [critique](https://impeccable.style/docs/critique/), [detector](https://impeccable.style/docs/detector/) |
| [frontend-polish](.agents/skills/frontend-polish/SKILL.md) | Refine existing details while preserving the design | [Polish](https://impeccable.style/docs/polish/) |
| [frontend-simplify](.agents/skills/frontend-simplify/SKILL.md) | Reduce clutter while preserving functionality | [Distill](https://impeccable.style/docs/distill/) |

These three tools use host configuration to prevent automatic invocation:

| Host | Invocation control | Discovery and usage |
| --- | --- | --- |
| Codex | `policy.allow_implicit_invocation: false` in `agents/openai.yaml` | Canonical `.agents/skills` folders; invoke with `$frontend-polish`, for example |
| Claude Code | `disable-model-invocation: true` in `SKILL.md` frontmatter | Thin `.claude/skills` entrypoints load the canonical instructions; invoke with `/frontend-polish` |
| GitHub Copilot in VS Code and Copilot CLI | `disable-model-invocation: true` in `SKILL.md` frontmatter | Supports `.agents/skills`; invoke with `/frontend-polish` |

Manual invocation remains enabled by default. The normal frontend workflow does not load these tools automatically. Keep invocation metadata consistent in the canonical skills and Claude entrypoints; edit workflow instructions only in `.agents/skills`. Copilot can also discover `.claude/skills`, so both locations use the same names, explicit-only policy, and canonical workflow.

See the official [Claude Code skills reference](https://code.claude.com/docs/en/skills), [VS Code skill controls](https://code.visualstudio.com/docs/agent-customization/agent-skills), and [Copilot CLI skills reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference). The Copilot policy above is documented for VS Code and CLI; do not assume identical invocation controls in every Copilot host or older version.

```text
$frontend-slop-check Review the dashboard. Report only.
$frontend-polish Refine the settings page, keeping its current theme.
$frontend-simplify Reduce clutter in the project detail view.
```

These skills use the agent's existing browser tools. They do not install Impeccable, its detector, hooks, or a browser test framework. A slop check is an agent review, not an automated detector scan. Maintain these local instructions directly and review source guidance selectively when updating them.

## Update the committed skills

From the repository root, update only the selected project skills:

```powershell
npx skills update frontend-design shadcn --project
```

Review the changed skill files and `skills-lock.json` before committing. Updates and reinstalls can overwrite the local frontend-design adaptation; review and reapply the changes described below. Preserve its separate [modification notice](.agents/skills/frontend-design/NOTICE.md) and license files, and refresh the shadcn license from the reviewed upstream revision if necessary. A skill update may change behavior even when application dependencies are unchanged.

To reinstall the selected upstream skills at project scope, run these commands from the repository root:

```powershell
npx skills add anthropics/skills --skill frontend-design --agent codex --copy
npx skills add shadcn/ui --skill shadcn --agent codex --copy
```

These commands fetch the current upstream content. Use the committed files and repository history when you need the exact reviewed snapshot. Do not use `--global` for template updates.

## Design scope

The frontend workflow routes form, mutation, dialog, and destructive-action work to [interaction decisions](.agents/skills/frontend-workflow/references/interactions.md). This repository-authored reference and the decision-recording guidance in `frontend/DESIGN.md` are informed by [Vercel's product-design article](https://vercel.com/blog/teaching-agents-product-design-at-vercel), reviewed on 2026-09-10. Product-specific decisions remain replaceable; component APIs stay with the library skills.

`npm run lint` includes the recommended `eslint-plugin-jsx-a11y` rules for TSX. Only components with stable native semantics are mapped explicitly. Static linting does not establish accessible names or behavior for every Radix composition, and does not replace rendered browser and keyboard checks. See the [plugin documentation](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y).

The shadcn copy remains unchanged. The frontend-design copy is locally adapted to use proportional planning, distinguish application screens from marketing pages, avoid routine brief confirmation, and defer integration and component rules to the relevant skills. Preserve these changes when updating upstream content. The local workflow applies the guidance to this template and the user's brief. The default `@shadcn` registry is already selected, and an authorized new visual direction can change the demo theme or preset without a repeated confirmation step.

The local design adaptation also sets defaults for new designs without visual guidance: no dominant purple or violet, product-specific color choices, restrained decorative effects, and hierarchy beyond repeated cards. User requests, supplied references, and established branding take precedence. The purple restriction was informed by the [community-hosted v0 prompt](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools/blob/main/v0%20Prompts%20and%20Tools/Prompt.txt); the local guidance does not adopt its fixed color counts or framework-specific rules. Preserve these defaults when updating the skill.

Anthropic's design skill is the default aesthetic guidance. Impeccable and prototype exploration are optional alternatives rather than additional mandatory workflows. The template uses the browser tools provided by the agent environment for visual review and does not install a browser test framework for that purpose.
