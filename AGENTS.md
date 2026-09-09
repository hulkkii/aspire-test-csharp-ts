# Working in this template

This repository uses ASP.NET Core, Aspire, and a Vite React SPA with Tailwind CSS 4, shadcn/ui, TanStack Router, and TanStack Query.

## Frontend work

Use [.agents/skills/frontend-workflow/SKILL.md](.agents/skills/frontend-workflow/SKILL.md) for frontend implementation and design changes. It connects the upstream design and library skills to this repository. Read [frontend/DESIGN.md](frontend/DESIGN.md) for the current demo and the rules for replacing it.

The demo's product, palette, layout, fonts, and shadcn preset are replaceable. A request for a new visual direction authorizes changing them. Preserve existing design choices when extending the current design.

Run package commands from `frontend`:

```powershell
npm ci
npm run dev
npm run routes:generate
npm run typecheck
npm run lint
npm run build
```

Before TanStack work, run `npx @tanstack/intent list` from `frontend`, then `npx @tanstack/intent load "<package>#<skill>"` for relevant identifiers returned by that command. Follow the installed skills and their references. If a package has no skill, use its official documentation for the installed version.

## Run and publish

For Aspire operations and endpoint discovery, use [.agents/skills/aspire/SKILL.md](.agents/skills/aspire/SKILL.md). Start from the repository root:

```powershell
aspire start --apphost test.AppHost/test.AppHost.csproj
```

Use the discovered `webfrontend` endpoint for browser review. Keep frontend API calls relative to `/api` so the development proxy and published server both work.

```powershell
dotnet publish test.Server/test.Server.csproj -c Release
```

[README.md](README.md) documents setup and [ASPIRE-REACT-PUBLISHING.md](ASPIRE-REACT-PUBLISHING.md) explains the single-host publish path.
