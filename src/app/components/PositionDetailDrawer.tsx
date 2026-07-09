import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Badge } from './ui/badge';
import { Calendar, TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3 } from 'lucide-react';
import { Position } from '../types/portfolio';

interface PositionDetailDrawerProps {
  position: Position | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PositionDetailDrawer({ position, open, onOpenChange }: PositionDetailDrawerProps) {
  if (!position) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const getProtocolColor = (protocol: string) => {
    switch (protocol) {
      case 'Soroswap': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'Phoenix Hub': return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'Stellar Native Pools': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'Aquarius': return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const roi = ((position.value - position.liquidity) / position.liquidity) * 100;

  const detailRows = [
    { label: 'Position Value', value: formatCurrency(position.value), icon: DollarSign },
    { label: 'Liquidity Provided', value: formatCurrency(position.liquidity), icon: PieChart },
    { label: 'ROI', value: `${roi >= 0 ? '+' : ''}${roi.toFixed(2)}%`, icon: BarChart3, positive: roi >= 0 },
    { label: 'Unrealized P&L', value: formatCurrency(position.unrealizedPnL), icon: position.unrealizedPnL >= 0 ? TrendingUp : TrendingDown, positive: position.unrealizedPnL >= 0 },
    { label: 'Realized P&L', value: formatCurrency(position.realizedPnL), icon: TrendingUp, positive: true },
    { label: 'Impermanent Loss', value: `${position.impermanentLoss}%`, icon: TrendingDown, positive: false },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-2xl">{position.poolName}</SheetTitle>
              <SheetDescription className="mt-1">
                <Badge variant="secondary" className={getProtocolColor(position.protocol)}>
                  {position.protocol}
                </Badge>
              </SheetDescription>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">APY</p>
              <p className="text-2xl font-bold text-green-600">{position.apy}%</p>
            </div>
          </div>
        </SheetHeader>

        {/* Pool Composition */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Pool Composition</h4>
          <div className="flex gap-3">
            <div className="flex-1 p-3 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground">Token 0</p>
              <p className="text-lg font-bold">{position.token0}</p>
            </div>
            <div className="flex items-center text-muted-foreground">
              <span className="text-lg">/</span>
            </div>
            <div className="flex-1 p-3 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground">Token 1</p>
              <p className="text-lg font-bold">{position.token1}</p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-6">
          {detailRows.map((row, index) => {
            const Icon = row.icon;
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${row.positive !== undefined ? (row.positive ? 'text-green-500' : 'text-red-500') : 'text-muted-foreground'}`} />
                  <span className="text-sm text-muted-foreground">{row.label}</span>
                </div>
                <span className={`font-semibold ${row.positive !== undefined ? (row.positive ? 'text-green-600' : 'text-red-600') : ''}`}>
                  {row.value}
                </span>
              </div>
            );
          })}
        </div>

        {/* Entry Info */}
        <div className="p-3 bg-muted rounded-lg flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Entry Date: {formatDate(position.entryDate)}
          </span>
        </div>

        {/* Summary Note */}
        <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
          <p className="text-sm font-medium">Position Summary</p>
          <p className="text-xs text-muted-foreground mt-1">
            {position.poolName} on {position.protocol}. Total value of {formatCurrency(position.value)} with {position.apy}% APY.
            {position.unrealizedPnL >= 0
              ? ` Currently showing ${formatCurrency(position.unrealizedPnL)} in unrealized gains.`
              : ` Currently showing ${formatCurrency(Math.abs(position.unrealizedPnL))} in unrealized losses.`}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
