var builder = WebApplication.CreateBuilder(args);

// Add service defaults & Aspire client integrations.
builder.AddServiceDefaults();

// Add services to the container.
builder.Services.AddProblemDetails();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseExceptionHandler();

app.UseDefaultFiles();
app.MapStaticAssets();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}


string[] summaries = ["Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"];

var api = app.MapGroup("/api");
api.MapGet("weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

// Demo data is process-local and volatile: restarting the server resets all changes.
// A single lock keeps reads and status updates consistent without adding a database.
var projectLock = new object();
var projects = new Dictionary<string, Project>(StringComparer.Ordinal)
{
    ["website-refresh"] = new("website-refresh", "Website refresh", "A clearer home for our product, with thoughtful content and a simpler path to getting started.", "Emma Wilson", "active", new DateOnly(2026, 9, 25)),
    ["customer-onboarding"] = new("customer-onboarding", "Customer onboarding", "Help new teams find their footing with a welcoming first-run experience.", "Alex Chen", "active", new DateOnly(2026, 10, 2)),
    ["design-system"] = new("design-system", "Design system", "Bring our shared components, patterns, and accessibility guidance into one place.", "Sofia Martin", "planned", new DateOnly(2026, 10, 16)),
    ["quarterly-review"] = new("quarterly-review", "Quarterly review", "Collect the stories, results, and lessons that will shape the next quarter.", "James Taylor", "planned", new DateOnly(2026, 10, 9)),
    ["research-library"] = new("research-library", "Research library", "Make customer insights easy to find and useful across the team.", "Emma Wilson", "completed", new DateOnly(2026, 9, 4))
};

api.MapGet("projects", () =>
{
    lock (projectLock)
    {
        return projects.Values.OrderBy(project => project.Name).ToArray();
    }
});

api.MapGet("projects/{id}", IResult (string id) =>
{
    lock (projectLock)
    {
        return projects.TryGetValue(id, out var project)
            ? Results.Ok(project)
            : Results.NotFound();
    }
});

api.MapPatch("projects/{id}", IResult (string id, UpdateProjectStatus request) =>
{
    if (request.Status is not ("planned" or "active" or "completed"))
    {
        return Results.ValidationProblem(new Dictionary<string, string[]>
        {
            ["status"] = ["Status must be planned, active, or completed."]
        });
    }

    lock (projectLock)
    {
        if (!projects.TryGetValue(id, out var project))
        {
            return Results.NotFound();
        }

        var updatedProject = project with { Status = request.Status };
        projects[id] = updatedProject;
        return Results.Ok(updatedProject);
    }
});

// API misses must never fall through to the SPA document, including dotted paths.
app.MapFallback("/api/{**path}", () => Results.NotFound());

app.MapDefaultEndpoints();

app.MapFallbackToFile("/index.html");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

record Project(string Id, string Name, string Description, string Owner, string Status, DateOnly DueDate);

record UpdateProjectStatus(string? Status);
