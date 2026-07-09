import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Position } from '../types/portfolio';

interface PortfolioAllocationProps {
  positions: Position[];
}

const PROTOCOL_COLORS: Record<string, string> = {
  'Soroswap': '#3b82f6',
  'Phoenix Hub': '#a855f7',
  'Stellar Native Pools': '#22c55e',
  'Aquarius': '#06b6d4',
};

export function PortfolioAllocation({ positions }: PortfolioAllocationProps) {
  // Aggregate positions by protocol
  const protocolAllocation = positions.reduce((acc, pos) => {
    const existing = acc.find((item) => item.name === pos.protocol);
    if (existing) {
      existing.value += pos.value;
    } else {
      acc.push({ name: pos.protocol, value: pos.value });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const totalValue = protocolAllocation.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = ((data.value / totalValue) * 100).toFixed(1);
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-sm">{data.name}</p>
          <p className="text-sm text-muted-foreground">{formatCurrency(data.value)}</p>
          <p className="text-sm font-semibold">{percentage}% of portfolio</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Portfolio Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={protocolAllocation}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {protocolAllocation.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PROTOCOL_COLORS[entry.name] || '#6b7280'}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value: string) => (
                <span className="text-sm text-muted-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
