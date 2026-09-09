import { Link, useRouter, type ErrorComponentProps } from '@tanstack/react-router';
import { AlertCircle, FolderSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '@/components/ui/empty';
import { ApiError } from '@/lib/projects';

export function RoutePending() {
  return <div role="status" className="flex flex-col gap-6 py-12">
    <span className="sr-only">Loading projects</span>
    <Skeleton className="h-10 w-56" />
    <Skeleton className="h-5 w-72 max-w-full" />
    {[1, 2, 3].map((row) => <Skeleton key={row} className="h-24 w-full" />)}
  </div>;
}
export function RouteMissing() {
  return <Empty className="py-24">
    <EmptyHeader>
      <EmptyMedia variant="icon"><FolderSearch aria-hidden="true" /></EmptyMedia>
      <EmptyTitle>Page not found</EmptyTitle>
      <EmptyDescription>The address may have changed. Go back to your projects to continue.</EmptyDescription>
    </EmptyHeader>
    <Button asChild><Link to="/" search={{ q: "", status: "all" }}>View projects</Link></Button>
  </Empty>;
}
export function RouteError({ error }: ErrorComponentProps) {
  const router = useRouter();
  if (error instanceof ApiError && error.status === 404) return <RouteMissing />;
  return <Empty role="alert" className="py-24">
    <EmptyHeader>
      <EmptyMedia variant="icon"><AlertCircle aria-hidden="true" /></EmptyMedia>
      <EmptyTitle>Projects could not be loaded</EmptyTitle>
      <EmptyDescription>Check your connection and try again. Your saved work has not changed.</EmptyDescription>
    </EmptyHeader>
    <Button onClick={() => void router.invalidate()}>Try again</Button>
  </Empty>;
}
