import { createFileRoute, Link, stripSearchParams } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ChevronRight, FolderSearch, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { WorkspaceOverview } from '@/components/workspace-overview';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '@/components/ui/empty';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { projectsQuery, statuses, statusLabels, isProjectStatus, formatDate } from '@/lib/projects';

type Filters = { q: string; status: 'all' | (typeof statuses)[number] };
const defaults: Filters = { q: '', status: 'all' };
export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): Filters => ({
    q: typeof search.q === 'string' ? search.q.slice(0, 100) : '',
    status: isProjectStatus(search.status) ? search.status : 'all',
  }),
  search: { middlewares: [stripSearchParams(defaults)] },
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
  component: ProjectsPage,
});
function ProjectsPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const query = useSuspenseQuery(projectsQuery);

  const projects = query.data.filter((project) =>
    (search.status === 'all' || project.status === search.status) &&
    (project.name + ' ' + project.description + ' ' + project.owner).toLowerCase().includes(search.q.toLowerCase()));
  return <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <h1 id="projects-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">Projects</h1>
      <p className="text-base text-muted-foreground">Your team's work, from first plans to the finish line.</p>
    </div>
    <WorkspaceOverview projects={query.data} />
    <section aria-labelledby="projects-heading" className="overflow-hidden rounded-xl border bg-card">
      <div className="flex flex-col gap-4 p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <form className="min-w-0 lg:flex-1 lg:max-w-2xl" onSubmit={(event) => { event.preventDefault(); void navigate({ search: { ...search, q: String(new FormData(event.currentTarget).get('q') ?? '') } }); }}>
            <FieldGroup className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 sm:flex sm:flex-row">
              <Field className="col-span-2 min-w-0 sm:flex-1">
                <FieldLabel htmlFor="project-search">Search projects</FieldLabel>
                <Input key={search.q} id="project-search" name="q" type="search" maxLength={100} defaultValue={search.q} placeholder="Search by name or owner" />
              </Field>
              <Field className="sm:w-40">
                <FieldLabel htmlFor="project-status">Status</FieldLabel>
                <NativeSelect id="project-status" value={search.status} onChange={(event) => {
                  const status = event.target.value;
                  void navigate({ search: { ...search, status: isProjectStatus(status) ? status : 'all' } });
                }}>
                  <NativeSelectOption value="all">All statuses</NativeSelectOption>
                  {statuses.map((status) => <NativeSelectOption key={status} value={status}>{statusLabels[status]}</NativeSelectOption>)}
                </NativeSelect>
              </Field>
              <Button type="submit">Search</Button>
            </FieldGroup>
          </form>
          <Button className="self-end" variant="ghost" disabled={query.isFetching} onClick={() => void query.refetch()}>
            <RefreshCw data-icon="inline-start" aria-hidden="true" />{query.isFetching ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
        {query.isRefetchError && <Alert variant="destructive"><AlertTitle>Refresh failed</AlertTitle><AlertDescription>Showing the last loaded projects. Try refreshing again.</AlertDescription></Alert>}
      </div>
      <div className="project-columns border-y bg-muted/50 px-4 py-3 text-xs font-medium text-muted-foreground sm:px-5">
        <p role="status" className="min-w-0 break-words">{projects.length} {projects.length === 1 ? 'project' : 'projects'}{search.q && ' matching “' + search.q + '”'}</p>
        <span aria-hidden="true" className="hidden lg:block">Status</span>
        <span aria-hidden="true" className="hidden lg:block">Owner</span>
        <span aria-hidden="true" className="hidden lg:block">Due date</span>
      </div>
      {projects.length === 0 ? <Empty className="py-16">
        <EmptyHeader><EmptyMedia variant="icon"><FolderSearch aria-hidden="true" /></EmptyMedia><EmptyTitle>No projects found</EmptyTitle><EmptyDescription>Try another name or clear your filters to see all projects.</EmptyDescription></EmptyHeader>
        <Button variant="outline" onClick={() => { void navigate({ search: defaults }); }}>Clear filters</Button>
      </Empty> : <ul className="divide-y">
        {projects.map((project) => <li key={project.id}>
          <Link to="/projects/$projectId" params={{ projectId: project.id }} className="project-columns project-row group px-4 py-5 transition-colors hover:bg-accent/50 focus-visible:bg-accent/50 sm:px-5">
            <div className="min-w-0">
              <h2 className="text-base font-semibold tracking-tight group-hover:underline underline-offset-4">{project.name}</h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">{project.description}</p>
            </div>
            <Badge variant={project.status === 'active' ? 'active' : project.status === 'completed' ? 'secondary' : 'outline'}>{statusLabels[project.status]}</Badge>
            <span className="text-sm text-muted-foreground"><span className="sr-only">Owner: </span>{project.owner}</span>
            <span className="text-sm text-muted-foreground"><span className="lg:sr-only">Due </span><time dateTime={project.dueDate}>{formatDate(project.dueDate)}</time></span>
            <ChevronRight className="project-chevron size-4 text-muted-foreground group-hover:text-foreground" aria-hidden="true" />
          </Link>
        </li>)}
      </ul>}
    </section>
  </div>;
}
