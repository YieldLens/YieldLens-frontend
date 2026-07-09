import { Card, CardContent, CardHeader } from './ui/card';

export function SkeletonCard() {
  return (
    <Card className="animate-pulse">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="h-5 w-28 bg-muted rounded" />
            <div className="h-4 w-20 bg-muted rounded" />
          </div>
          <div className="text-right space-y-2">
            <div className="h-3 w-8 bg-muted rounded mx-auto" />
            <div className="h-6 w-16 bg-muted rounded" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-4 w-20 bg-muted rounded" />
        </div>
        <div className="flex justify-between">
          <div className="h-4 w-16 bg-muted rounded" />
          <div className="h-4 w-20 bg-muted rounded" />
        </div>
        <div className="border-t pt-3 space-y-2">
          <div className="flex justify-between">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-4 w-20 bg-muted rounded" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-20 bg-muted rounded" />
            <div className="h-4 w-20 bg-muted rounded" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-28 bg-muted rounded" />
            <div className="h-4 w-12 bg-muted rounded" />
          </div>
        </div>
        <div className="h-3 w-36 bg-muted rounded pt-2" />
      </CardContent>
    </Card>
  );
}

export function SkeletonOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="h-3 w-32 bg-muted rounded" />
                <div className="h-7 w-24 bg-muted rounded" />
              </div>
              <div className="w-9 h-9 bg-muted rounded-lg" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function SkeletonChart() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <div className="h-5 w-48 bg-muted rounded" />
        <div className="h-4 w-64 bg-muted rounded mt-2" />
      </CardHeader>
      <CardContent>
        <div className="h-[350px] bg-muted rounded-lg" />
      </CardContent>
    </Card>
  );
}

export function SkeletonPositions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
