import { createFileRoute, Link, stripSearchParams } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ArrowUpRight, FolderSearch, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
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
  return <div className="flex flex-col gap-9">
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">A little room to focus.</h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">Keep track of the work that matters. Find a project, see what's next, and move it forward.</p>
      </div>
      <Button variant="outline" disabled={query.isFetching} onClick={() => void query.refetch()}>
        <RefreshCw data-icon="inline-start" aria-hidden="true" />{query.isFetching ? 'Refreshing...' : 'Refresh'}
      </Button>
    </div>
    <section aria-labelledby="projects-heading" className="overflow-hidden rounded-xl border bg-card">
      <div className="flex flex-col gap-6 p-5 sm:p-7">
        <div className="flex items-center gap-3">
          <h2 id="projects-heading" className="text-lg font-semibold">Projects</h2>
          <Badge variant="secondary">{query.data.length}</Badge>
        </div>
        <form onSubmit={(event) => { event.preventDefault(); void navigate({ search: { ...search, q: String(new FormData(event.currentTarget).get('q') ?? '') } }); }}>
          <FieldGroup className="flex-col sm:flex-row sm:items-end">
            <Field className="min-w-0 sm:flex-1">
              <FieldLabel htmlFor="project-search">Search projects</FieldLabel>
              <Input key={search.q} id="project-search" name="q" type="search" maxLength={100} defaultValue={search.q} placeholder="Search by name or owner" />
            </Field>
            <Field className="sm:w-44">
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
        {query.isRefetchError && <Alert variant="destructive"><AlertTitle>Refresh failed</AlertTitle><AlertDescription>Showing the last loaded projects. Try refreshing again.</AlertDescription></Alert>}
        <p role="status" className="text-sm text-muted-foreground">{projects.length} {projects.length === 1 ? 'project' : 'projects'}{search.q && ' matching “' + search.q + '”'}</p>
      </div>
      {projects.length === 0 ? <Empty className="py-16">
        <EmptyHeader><EmptyMedia variant="icon"><FolderSearch aria-hidden="true" /></EmptyMedia><EmptyTitle>No projects found</EmptyTitle><EmptyDescription>Try another name or clear your filters to see all projects.</EmptyDescription></EmptyHeader>
        <Button variant="outline" onClick={() => { void navigate({ search: defaults }); }}>Clear filters</Button>
      </Empty> : <ul>
        {projects.map((project) => <li key={project.id} className="border-t">
          <Link to="/projects/$projectId" params={{ projectId: project.id }} className="group flex items-center gap-4 px-5 py-6 transition-colors hover:bg-muted/60 focus-visible:bg-muted sm:px-7">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <h3 className="text-base font-semibold group-hover:text-primary">{project.name}</h3>
                <Badge variant={project.status === 'active' ? 'default' : project.status === 'completed' ? 'secondary' : 'outline'}>{statusLabels[project.status]}</Badge>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                <span>{project.owner}</span><span>Due <time dateTime={project.dueDate}>{formatDate(project.dueDate)}</time></span>
              </div>
            </div>
            <ArrowUpRight className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          </Link>
        </li>)}
      </ul>}
    </section>
  </div>;
}
