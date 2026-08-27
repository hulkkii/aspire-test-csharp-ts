# Serve React separately in development and from ASP.NET Core after publish

The default Aspire React setup runs the Vite frontend and the ASP.NET Core server as separate resources. Keep that development model, but make the server own the frontend files in production.

This solution uses four changes.

## Configure the frontend publish output

Set the production output folder in `frontend/frontend.esproj`. Keep `ShouldRunBuildScript` disabled so a normal development build does not run the production frontend build. The JavaScript SDK still runs its publish target during `dotnet publish`.

```xml
<PropertyGroup>
  <StartupCommand>npm run dev</StartupCommand>
  <ShouldRunBuildScript>false</ShouldRunBuildScript>
  <BuildOutputFolder>$(MSBuildProjectDirectory)\dist</BuildOutputFolder>
</PropertyGroup>
```

`BuildOutputFolder` must match the folder produced by Vite. Vite uses `dist` by default.

## Reference the frontend from the server

Add the frontend project reference to `test.Server/test.Server.csproj`.

```xml
<ProjectReference Include="..\frontend\frontend.esproj">
  <ReferenceOutputAssembly>false</ReferenceOutputAssembly>
</ProjectReference>
```

The JavaScript SDK builds the frontend during server publish and copies the result to the published `wwwroot` directory. `ReferenceOutputAssembly` is false because the frontend does not produce a .NET assembly.

## Serve the published files

Add the static asset middleware and the single-page application fallback in `test.Server/Program.cs`.

```csharp
app.UseDefaultFiles();
app.MapStaticAssets();

// Map API and health endpoints before the fallback.

app.MapFallbackToFile("/index.html");
```

`UseDefaultFiles` resolves `/` to `index.html`. `MapStaticAssets` serves the published assets. The fallback lets React Router handle client-side routes that do not match an API endpoint or a file.

## Add Vite only in Aspire run mode

Keep the server resource in every AppHost mode. Add the Vite resource only in run mode.

```csharp
var server = builder.AddProject<Projects.test_Server>("server")
    .WithHttpHealthCheck("/health")
    .WithExternalHttpEndpoints();

if (builder.ExecutionContext.IsRunMode)
{
    builder.AddViteApp("webfrontend", "../frontend")
        .WithReference(server)
        .WaitFor(server);
}
```

During local development, the Aspire dashboard shows `server` and `webfrontend` separately. `WithReference(server)` passes the server endpoints to Vite, and `vite.config.ts` uses `SERVER_HTTPS` or `SERVER_HTTP` for the API proxy.

During publish, the AppHost contains only the server resource. Publishing the server project builds the referenced frontend, so Aspire does not need `PublishWithContainerFiles` and does not build the frontend twice.

## Verify the result

Start local development through Aspire:

```powershell
aspire start --apphost test.AppHost/test.AppHost.csproj
```

Publish the production server:

```powershell
dotnet publish test.Server/test.Server.csproj -c Release
```

The publish directory must contain `wwwroot/index.html` and the Vite assets under `wwwroot/assets`.
