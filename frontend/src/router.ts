import { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { RouteError, RouteMissing, RoutePending } from '@/components/route-feedback';

export const queryClient = new QueryClient();
export const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  defaultPendingComponent: RoutePending,
  defaultErrorComponent: RouteError,
  defaultNotFoundComponent: RouteMissing,
  scrollRestoration: true,
});
declare module '@tanstack/react-router' {
  interface Register { router: typeof router }
}
