import { queryOptions } from '@tanstack/react-query';

export const statuses = ['planned', 'active', 'completed'] as const;
export type ProjectStatus = (typeof statuses)[number];
export type Project = {
  id: string;
  name: string;
  description: string;
  owner: string;
  status: ProjectStatus;
  dueDate: string;
};
export const statusLabels: Record<ProjectStatus, string> = {
  planned: 'Planned', active: 'In progress', completed: 'Completed',
};
export function isProjectStatus(value: unknown): value is ProjectStatus {
  return statuses.some((status) => status === value);
}
export class ApiError extends Error {
  status: number;
  constructor(status: number) {
    super(status === 404 ? 'This project could not be found.' : 'The request failed. Please try again.');
    this.status = status;
  }
}
function parseProject(value: unknown): Project {
  if (!value || typeof value !== 'object') throw new Error('Unexpected project response.');
  const project = value as Record<string, unknown>;
  if (
    typeof project.id !== 'string' || typeof project.name !== 'string' ||
    typeof project.description !== 'string' || typeof project.owner !== 'string' ||
    !isProjectStatus(project.status) || typeof project.dueDate !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(project.dueDate) ||
    Number.isNaN(Date.parse(project.dueDate))
  ) throw new Error('Unexpected project response.');
  return project as Project;
}
async function request(url: string, init?: RequestInit): Promise<unknown> {
  const response = await fetch(url, init);
  if (!response.ok) throw new ApiError(response.status);
  return response.json();
}
const retry = (count: number, error: Error) =>
  !(error instanceof ApiError && error.status < 500) && count < 2;

export const projectsQuery = queryOptions({
  queryKey: ['projects'],
  queryFn: async ({ signal }) => {
    const data = await request('/api/projects', { signal });
    if (!Array.isArray(data)) throw new Error('Unexpected project list response.');
    return data.map(parseProject);
  },
  staleTime: 30_000,
  retry,
});
export const projectQuery = (id: string) => queryOptions({
  queryKey: ['projects', id],
  queryFn: async ({ signal }) =>
    parseProject(await request('/api/projects/' + encodeURIComponent(id), { signal })),
  staleTime: 30_000,
  retry,
});
export async function updateProjectStatus(id: string, status: ProjectStatus) {
  return parseProject(await request('/api/projects/' + encodeURIComponent(id), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  }));
}
export function formatDate(date: string) {
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    .format(new Date(date + 'T12:00:00'));
}
