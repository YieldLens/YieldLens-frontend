import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { Position } from '../types/portfolio';

interface PositionCardProps {
  position: Position;
}

export function PositionCard({ position }: PositionCardProps) {
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
      case 'Soroswap':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'Phoenix Hub':
        return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
      case 'Stellar Native Pools':
        return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'Aquarius':
        return 'bg-cyan-100 text-cyan-700 hover:bg-cyan-100';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{position.poolName}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className={getProtocolColor(position.protocol)}>
                {position.protocol}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">APY</p>
            <p className="text-xl font-bold text-green-600">{position.apy}%</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Position Value</span>
          <span className="font-semibold">{formatCurrency(position.value)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Liquidity</span>
          <span className="font-semibold">{formatCurrency(position.liquidity)}</span>
        </div>

        <div className="border-t pt-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Unrealized P&L</span>
            <div className="flex items-center gap-1">
              {position.unrealizedPnL >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span className={`font-semibold ${position.unrealizedPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(position.unrealizedPnL)}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Realized P&L</span>
            <span className="font-semibold text-green-600">{formatCurrency(position.realizedPnL)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Impermanent Loss</span>
            <span className="font-semibold text-orange-600">{position.impermanentLoss}%</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
          <Calendar className="w-3 h-3" />
          <span>Entry: {formatDate(position.entryDate)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
