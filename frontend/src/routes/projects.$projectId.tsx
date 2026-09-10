import { createFileRoute, Link } from '@tanstack/react-router';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { ArrowLeft, Check } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Field, FieldGroup, FieldLabel, FieldDescription } from '@/components/ui/field';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { projectQuery, projectsQuery, updateProjectStatus, statuses, statusLabels, isProjectStatus, formatDate, type Project } from '@/lib/projects';

export const Route = createFileRoute('/projects/$projectId')({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(projectQuery(params.projectId)),
  component: ProjectPage,
});
function ProjectPage() {
  const { projectId } = Route.useParams();
  const query = useSuspenseQuery(projectQuery(projectId));
  return <ProjectDetails key={query.data.id} project={query.data} refreshFailed={query.isRefetchError} />;
}
function ProjectDetails({ project, refreshFailed }: { project: Project; refreshFailed: boolean }) {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<Project['status'] | null>(null);
  const status = selected ?? project.status;
  const mutation = useMutation({
    mutationFn: (nextStatus: Project['status']) => updateProjectStatus(project.id, nextStatus),
    onSuccess: async (updated) => {
      queryClient.setQueryData(projectQuery(project.id).queryKey, updated);
      queryClient.setQueryData(projectsQuery.queryKey, (projects) =>
        projects?.map((item) => item.id === updated.id ? updated : item),
      );
      setSelected(null);
      await queryClient.invalidateQueries({ queryKey: projectsQuery.queryKey });
    },
  });
  function submit(event: FormEvent) {
    event.preventDefault();
    mutation.mutate(status);
  }
  return <div className="flex flex-col gap-8">
    <Button variant="ghost" asChild className="self-start"><Link to="/" search={{ q: "", status: "all" }}><ArrowLeft data-icon="inline-start" aria-hidden="true" />All projects</Link></Button>
    <div className="flex flex-col gap-4">
      <Badge className="self-start" variant={project.status === 'active' ? 'active' : project.status === 'completed' ? 'secondary' : 'outline'}>{statusLabels[project.status]}</Badge>
      <h1 className="max-w-3xl text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">{project.name}</h1>
      <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{project.description}</p>
    </div>
    {refreshFailed && <Alert variant="destructive"><AlertTitle>Refresh failed</AlertTitle><AlertDescription>Showing the last loaded project. <button className="underline" onClick={() => void queryClient.invalidateQueries({ queryKey: projectQuery(project.id).queryKey })}>Try again</button></AlertDescription></Alert>}
    <div className="grid gap-8 border-t pt-8 md:grid-cols-[1fr_1.4fr]">
      <dl className="flex flex-col gap-6">
        <div><dt className="mb-1 text-sm text-muted-foreground">Project owner</dt><dd className="font-medium">{project.owner}</dd></div>
        <div><dt className="mb-1 text-sm text-muted-foreground">Due date</dt><dd className="font-medium"><time dateTime={project.dueDate}>{formatDate(project.dueDate)}</time></dd></div>
      </dl>
      <section aria-labelledby="update-heading" className="flex flex-col gap-5 rounded-xl border bg-card p-5 text-card-foreground sm:p-6">
        <div><h2 id="update-heading" className="mb-2 text-xl font-semibold">Update status</h2><p className="text-sm leading-relaxed text-muted-foreground">Update the status as this project moves forward.</p></div>
        <form onSubmit={submit}>
          <FieldGroup>
            <Field data-disabled={mutation.isPending}>
              <FieldLabel htmlFor="status">Project status</FieldLabel>
              <NativeSelect id="status" value={status} disabled={mutation.isPending} aria-describedby="status-help" onChange={(event) => {
                if (isProjectStatus(event.target.value)) { setSelected(event.target.value); mutation.reset(); }
              }}>
                {statuses.map((item) => <NativeSelectOption key={item} value={item}>{statusLabels[item]}</NativeSelectOption>)}
              </NativeSelect>
              <FieldDescription id="status-help">Your update appears in the project list.</FieldDescription>
            </Field>
            {mutation.isError && <Alert variant="destructive"><AlertTitle>Status was not saved</AlertTitle><AlertDescription>Your selection is still here. Try saving again.</AlertDescription></Alert>}
            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" disabled={mutation.isPending || status === project.status}>{mutation.isPending ? 'Saving...' : 'Save status'}</Button>
              <p role="status" className="flex items-center gap-2 text-sm text-muted-foreground">{mutation.isSuccess && <><Check className="size-4" aria-hidden="true" />Status saved</>}</p>
            </div>
          </FieldGroup>
        </form>
      </section>
    </div>
  </div>;
}
