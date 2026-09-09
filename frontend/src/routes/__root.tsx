import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import { PanelsTopLeft } from 'lucide-react';
import { RouteError, RouteMissing, RoutePending } from '@/components/route-feedback';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: AppShell,
  errorComponent: RouteError,
  notFoundComponent: RouteMissing,
  pendingComponent: RoutePending,
});
function AppShell() {
  return <div className="min-h-svh">
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:p-3 focus:text-foreground">Skip to content</a>
    <header className="border-b bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-5 sm:px-8">
        <Link to="/" search={{ q: "", status: "all" }} className="flex items-center gap-2.5 rounded-sm text-lg font-semibold tracking-tight">
          <PanelsTopLeft className="size-6 text-primary" aria-hidden="true" /> Workroom
        </Link>
        <nav aria-label="Main navigation"><Link to="/" search={{ q: "", status: "all" }} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted" activeProps={{ 'aria-current': 'page' }}>Projects</Link></nav>
      </div>
    </header>
    <main id="main" tabIndex={-1} className="mx-auto max-w-6xl px-5 py-10 outline-none sm:px-8 sm:py-16">
      <Outlet />
    </main>
    <footer className="mx-auto max-w-6xl px-5 py-8 text-xs leading-relaxed text-muted-foreground sm:px-8">
      Demo workspace. Changes are shared and reset when the server restarts.
    </footer>
  </div>;
}
