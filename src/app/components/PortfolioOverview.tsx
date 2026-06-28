import { Card, CardContent } from './ui/card';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet } from 'lucide-react';
import { PortfolioSummary } from '../types/portfolio';

interface PortfolioOverviewProps {
  summary: PortfolioSummary;
}

export function PortfolioOverview({ summary }: PortfolioOverviewProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const stats = [
    {
      label: 'Total Portfolio Value',
      value: formatCurrency(summary.totalValue),
      icon: Wallet,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Unrealized P&L',
      value: formatCurrency(summary.totalUnrealizedPnL),
      icon: summary.totalUnrealizedPnL >= 0 ? ArrowUpRight : ArrowDownRight,
      iconColor: summary.totalUnrealizedPnL >= 0 ? 'text-green-500' : 'text-red-500',
      bgColor: summary.totalUnrealizedPnL >= 0 ? 'bg-green-50' : 'bg-red-50',
      trend: summary.totalUnrealizedPnL >= 0 ? 'positive' : 'negative',
    },
    {
      label: 'Realized P&L',
      value: formatCurrency(summary.totalRealizedPnL),
      icon: TrendingUp,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Total IL Impact',
      value: formatPercentage(summary.totalImpermanentLoss),
      icon: ArrowDownRight,
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.trend === 'negative' ? 'text-red-600' : stat.trend === 'positive' ? 'text-green-600' : ''}`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
