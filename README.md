# Aspire React template

This template combines an ASP.NET Core API, a React frontend, and an Aspire AppHost.

During development, Aspire runs the API and the Vite frontend as separate resources. During publish, ASP.NET Core hosts the compiled React files from `wwwroot`, so the deployed application has one public endpoint.

## Requirements

- .NET 10 SDK
- Aspire CLI 13.5.3 or later
- Node.js 20.19 or later, or Node.js 22.12 or later

## Run the application

Start the AppHost from the repository root:

```powershell
aspire start --apphost test.AppHost/test.AppHost.csproj
```

The Aspire dashboard shows these application resources:

- `server` runs the ASP.NET Core API.
- `webfrontend` runs the Vite development server and proxies `/api` requests to `server`.

## Publish the application

Publish the server project:

```powershell
dotnet publish test.Server/test.Server.csproj -c Release
```

The command builds the React frontend and copies its output to the server's published `wwwroot` directory. Run the published `test.Server` application to serve both the API and the frontend.

## Project layout

```text
frontend/       React, TypeScript, and Vite
test.AppHost/   Aspire development orchestration
test.Server/    ASP.NET Core API and production web host
```

Read [the Aspire and React publishing notes](ASPIRE-REACT-PUBLISHING.md) for the project-file and middleware changes behind this setup.
