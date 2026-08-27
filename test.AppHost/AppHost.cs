var builder = DistributedApplication.CreateBuilder(args);

var server = builder.AddProject<Projects.test_Server>("server")
    .WithHttpHealthCheck("/health")
    .WithExternalHttpEndpoints();

if (builder.ExecutionContext.IsRunMode)
{
    builder.AddViteApp("webfrontend", "../frontend")
        .WithReference(server)
        .WaitFor(server);
}

builder.Build().Run();
