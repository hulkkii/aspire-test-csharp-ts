# Aspire React template

This template combines an ASP.NET Core API, a React frontend, and an Aspire AppHost. The frontend uses Vite, Tailwind CSS 4, shadcn/ui, TanStack Router, and TanStack Query.

During development, Aspire runs the API and the Vite frontend as separate resources. During publish, ASP.NET Core hosts the compiled React files from `wwwroot`, so the deployed application has one public endpoint.

## Requirements

- .NET 10 SDK
- Aspire CLI 13.5.3 or later
- Node.js 20.19 or later, or Node.js 22.12 or later

## Run the application

Install the frontend dependencies from `frontend`:

```powershell
npm ci
```

Start the AppHost from the repository root:

```powershell
aspire start --apphost test.AppHost/test.AppHost.csproj
```

The Aspire dashboard shows these application resources:

- `server` runs the ASP.NET Core API.
- `webfrontend` runs the Vite development server and proxies `/api` requests to `server`.

Open the `webfrontend` endpoint shown by Aspire. The Workroom demo has a project list, URL-based filters, and project details. Changing a project's status exercises an API mutation and the Query cache. Demo data lives in memory and resets when the API restarts.

## Change the frontend

Run these commands from `frontend`:

```powershell
npm run routes:generate
npm run typecheck
npm run lint
npm run build
```

Use `npm run dev` for the Vite server when you already have the required API environment. Starting through Aspire supplies the API connection for normal local development.

The demo's product and visual design are replaceable. [frontend/DESIGN.md](frontend/DESIGN.md) explains how to extend the current design or adopt a new one. Semantic theme tokens live in `frontend/src/index.css`. The initial shadcn preset is `radix-nova`, recorded in `frontend/components.json`.

Add shadcn components from `frontend` with the [official CLI](https://ui.shadcn.com/docs/cli). Inspect existing components before adding another. Use TanStack Router for routes and shareable URL state, and TanStack Query for server data. Keep API requests relative to `/api` so development and publish use the same client code.

## Working with agents

[AGENTS.md](AGENTS.md) directs agents to the repository's frontend workflow and Aspire guidance. For normal implementation, describe the result you want; you do not need to name every supporting skill. The workflow selects relevant design, shadcn, and TanStack guidance and uses the agent's available browser tools to inspect substantial UI changes.

### Example prompts

| Intent | Prompt |
| --- | --- |
| Build a new app | Build a booking app for a small salon. Replace the Workroom demo. Ask about consequential gaps and recommend defaults. |
| Let the agent decide | Build a personal reading tracker. You decide the design and scope. Use sample data and browser storage. |
| Extend the current app | Add sorting by due date to the project list. Preserve the current visual language. |
| Explore designs first | `$frontend-prototype Explore three different booking-app layouts. Use sample data and simulated interactions.` |
| Check for generic design | `$frontend-slop-check Review the dashboard. Report findings without editing.` |
| Refine a design | `$frontend-polish Refine the project detail page. Preserve its theme and functionality.` |
| Reduce clutter | `$frontend-simplify Simplify the dashboard while keeping every action available.` |
| Implement a selected prototype | Implement variant B using the normal frontend workflow. Replace simulated saves with backend persistence. |

The four optional tools require explicit invocation. The examples use `$skill-name`; Codex also supports `/skill-name`. In Claude Code and supported GitHub Copilot interfaces such as VS Code and CLI, use `/skill-name`, for example `/frontend-prototype Explore three booking-app layouts`. These tools stay optional; normal implementation does not run them automatically.

If the task has consequential gaps, the workflow asks one short round of questions with recommended answers. Say "Use your recommendations and build it" to accept the proposed defaults, or include "you decide" in the original request to skip routine clarification. Existing requirements and references still apply.

Prototypes use sample data and simulated behavior to explore a design question. They defer backend integration, comprehensive validation, and production completeness unless those are the subject of the experiment. A chosen prototype needs a separate implementation request before it becomes a working product. Browser storage is suitable for a local demo; it does not provide shared backend persistence.

For an extension, the agent preserves the adopted visual identity. For a new product or direction, the demo's palette, fonts, shell, and page composition can all change. See [frontend/DESIGN.md](frontend/DESIGN.md) for the current design and implementation map.

### Library guidance and maintenance

TanStack Intent discovers skills in installed npm packages. From `frontend`, list the available skills, then load a relevant identifier from the output:

```powershell
npx @tanstack/intent list
npx @tanstack/intent load "<package>#<skill>"
```

The scripts `npm run skills:list` and `npm run skills:load -- "<package>#<skill>"` provide the same operations. Run `npm ci` before discovery. Do not assume that every TanStack package ships skills; when no matching skill is listed, use the official documentation for that library and installed version.

See [SKILLS.md](SKILLS.md) for source records, licenses, and project-scoped update commands. Review upstream skill changes before updating the committed copies. Package-shipped TanStack skills change with npm dependencies. See the [shadcn skill guide](https://ui.shadcn.com/docs/skills), [TanStack Intent consumer guide](https://tanstack.com/intent/latest/docs/getting-started/quick-start-consumers), and [Anthropic frontend-design source](https://github.com/anthropics/skills/tree/main/skills/frontend-design) for upstream guidance.

## Publish the application

Publish the server project:

```powershell
dotnet publish test.Server/test.Server.csproj -c Release
```

The command builds the React frontend and copies its output to the server's published `wwwroot` directory. Run the published `test.Server` application to serve both the API and the frontend.

## Project layout

```text
.agents/skills/  Agent skills and frontend workflow
frontend/       React, TypeScript, Vite, and client libraries
test.AppHost/   Aspire development orchestration
test.Server/    ASP.NET Core API and production web host
```

Read [the Aspire and React publishing notes](ASPIRE-REACT-PUBLISHING.md) for the project-file and middleware changes behind this setup.
