import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from '@/components/ui/chart';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { statuses, statusLabels, type Project } from '@/lib/projects';

// Illustrative history, independent of the API's current project records.
const activity = [
  { week: 'Jul 27', created: 18, completed: 12 },
  { week: 'Aug 3', created: 25, completed: 17 },
  { week: 'Aug 10', created: 21, completed: 19 },
  { week: 'Aug 17', created: 32, completed: 24 },
  { week: 'Aug 24', created: 27, completed: 29 },
  { week: 'Aug 31', created: 35, completed: 31 },
];
const chartConfig = {
  created: { label: 'Tasks created', color: 'var(--chart-2)' },
  completed: { label: 'Tasks completed', color: 'var(--chart-1)' },
} satisfies ChartConfig;

export function WorkspaceOverview({ projects }: { projects: Project[] }) {
  const completed = projects.filter((project) => project.status === 'completed').length;
  const percentage = projects.length ? Math.round(completed / projects.length * 100) : 0;

  return <section aria-label="Workspace overview" className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle><h2>Team activity</h2></CardTitle>
        <CardDescription>Weekly tasks created and completed.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart">
          <TabsList aria-label="Activity view">
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>
          <TabsContent value="chart">
            <ChartContainer config={chartConfig} className="h-52 w-full aspect-auto">
              <AreaChart accessibilityLayer data={activity} margin={{ left: 0, right: 12, top: 16 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} minTickGap={16} />
                <YAxis tickLine={false} axisLine={false} width={28} allowDecimals={false} domain={[0, 40]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Area dataKey="created" type="monotone" fill="var(--color-created)" fillOpacity={0.08} stroke="var(--color-created)" strokeWidth={2} strokeDasharray="4 4" isAnimationActive={false} />
                <Area dataKey="completed" type="monotone" fill="var(--primary)" fillOpacity={0.3} stroke="var(--color-completed)" strokeWidth={2} isAnimationActive={false} />
              </AreaChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="data" className="h-52 overflow-y-auto">
            <Table>
              <TableCaption>Sample weekly task counts, 2026.</TableCaption>
              <TableHeader><TableRow><TableHead scope="col">Week of</TableHead><TableHead scope="col">Created</TableHead><TableHead scope="col">Completed</TableHead></TableRow></TableHeader>
              <TableBody>{activity.map((week) => <TableRow key={week.week}><TableCell>{week.week}</TableCell><TableCell>{week.created}</TableCell><TableCell>{week.completed}</TableCell></TableRow>)}</TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="gap-2">
        <Badge variant="outline">Sample data</Badge>
        <p className="text-xs text-muted-foreground">Jul 27 to Sep 6, 2026</p>
      </CardFooter>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle><h2>Project snapshot</h2></CardTitle>
        <CardDescription>Across all projects in this workspace.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5">
        <div>
          <p className="text-3xl font-semibold tracking-tight tabular-nums">{percentage}% <span className="text-sm font-normal text-muted-foreground">completed</span></p>
          <Progress className="mt-3" value={percentage} aria-label="Projects completed" aria-valuetext={`${completed} of ${projects.length} projects completed`} />
        </div>
        <dl className="flex flex-col gap-3">
          {statuses.map((status) => <div key={status} className="flex items-center justify-between gap-3">
            <dt className="text-muted-foreground">{statusLabels[status]}</dt>
            <dd className="font-medium tabular-nums">{projects.filter((project) => project.status === status).length}</dd>
          </div>)}
        </dl>
      </CardContent>
      <CardFooter><p className="text-xs text-muted-foreground">{projects.length ? `${completed} of ${projects.length} projects completed. Update a project's status to see it here.` : 'No projects yet.'}</p></CardFooter>
    </Card>
  </section>;
}
