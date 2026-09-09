# Agent skill sources

The repository commits its frontend skill copies so a new checkout has the same instructions. [skills-lock.json](skills-lock.json) records the upstream source, skill path, and computed hash for each installed upstream skill. These hashes identify the installer snapshot; they are not Git commit identifiers.

## Included guidance

| Skill | Source | Role | License |
| --- | --- | --- | --- |
| [frontend-design](.agents/skills/frontend-design/SKILL.md) | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | Visual direction, typography, and critique | [Apache-2.0](.agents/skills/frontend-design/LICENSE.txt) |
| [shadcn](.agents/skills/shadcn/SKILL.md) | [shadcn/ui](https://github.com/shadcn-ui/ui/tree/main/skills/shadcn) | Component usage, composition, and CLI guidance | [MIT](.agents/skills/shadcn/LICENSE.md) |
| [frontend-workflow](.agents/skills/frontend-workflow/SKILL.md) | This repository | Connects the stack, design context, and browser review | Repository-owned instructions |
| [aspire](.agents/skills/aspire/SKILL.md) and [aspireify](.agents/skills/aspireify/SKILL.md) | Existing repository skills | Aspire operation and initialization | Retained from the original template |

The shadcn license copy comes from [upstream revision 3ba91b1](https://github.com/shadcn-ui/ui/blob/3ba91b1cc83e1bbe4ab35a422ff2a694849c5048/LICENSE.md). Keep the upstream notices when redistributing the skills. The original Aspire skills predate this frontend setup and have no entry in `skills-lock.json`.

TanStack skills are discovered from installed packages through `@tanstack/intent`. Their versions follow [frontend/package-lock.json](frontend/package-lock.json), and their licenses remain with those packages. Run `npx @tanstack/intent list` from `frontend` to see what is actually available. Use official library documentation when no matching skill ships with the installed package.

## Update the committed skills

From the repository root, update only the selected project skills:

```powershell
npx skills update frontend-design shadcn --project
```

Review the changed skill files and `skills-lock.json` before committing. Preserve license files and refresh the shadcn license from the reviewed upstream revision if necessary. A skill update may change behavior even when application dependencies are unchanged.

To reinstall the selected upstream skills at project scope, run these commands from the repository root:

```powershell
npx skills add anthropics/skills --skill frontend-design --agent codex --copy
npx skills add shadcn/ui --skill shadcn --agent codex --copy
```

These commands fetch the current upstream content. Use the committed files and repository history when you need the exact reviewed snapshot. Do not use `--global` for template updates.

## Design scope

The upstream copies remain unchanged. The local workflow applies them to this template and the user's brief. The default `@shadcn` registry is already selected, and an authorized new visual direction can change the demo theme or preset without a repeated confirmation step.

Anthropic's design skill is the default aesthetic guidance. Impeccable and prototype exploration are optional alternatives rather than additional mandatory workflows. The template uses the browser tools provided by the agent environment for visual review and does not install a browser test framework for that purpose.
