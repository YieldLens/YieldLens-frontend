import { useState, useMemo } from 'react';
import { ApiPool } from '../services/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { ArrowUpDown, Waves, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';

interface PoolTableProps {
  pools: ApiPool[];
  searchQuery: string;
}

type SortColumn = 'name' | 'tvl' | 'volume24h' | 'currentApy';

export function PoolTable({ pools, searchQuery }: PoolTableProps) {
  const [sortCol, setSortCol] = useState<SortColumn>('currentApy');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const filteredAndSorted = useMemo(() => {
    let list = pools;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.token0.toLowerCase().includes(q) ||
          p.token1.toLowerCase().includes(q) ||
          p.protocol.toLowerCase().includes(q)
      );
    }

    return [...list].sort((a, b) => {
      let diff = 0;
      if (sortCol === 'name') {
        diff = a.name.localeCompare(b.name);
      } else {
        diff = (a[sortCol] as number) - (b[sortCol] as number);
      }
      return sortAsc ? diff : -diff;
    });
  }, [pools, searchQuery, sortCol, sortAsc]);

  const toggleSort = (col: SortColumn) => {
    if (sortCol === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(col);
      setSortAsc(false);
    }
  };

  const formatUsd = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Waves className="w-5 h-5 text-blue-500" />
            <CardTitle className="text-xl">Indexed Liquidity Pools</CardTitle>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            {filteredAndSorted.length} Pools Active
          </Badge>
        </div>
        <CardDescription>
          Real-time on-chain reserves, fee tiers, and time-weighted APYs from Soroban smart contracts
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase bg-muted/50 text-muted-foreground border-y font-semibold tracking-wider">
              <tr>
                <th
                  className="py-3 px-4 cursor-pointer hover:text-foreground"
                  onClick={() => toggleSort('name')}
                >
                  <div className="flex items-center gap-1.5">
                    Pool / Assets
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4">Protocol</th>
                <th className="py-3 px-4">Fee Tier</th>
                <th
                  className="py-3 px-4 cursor-pointer hover:text-foreground text-right"
                  onClick={() => toggleSort('tvl')}
                >
                  <div className="flex items-center justify-end gap-1.5">
                    TVL
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  className="py-3 px-4 cursor-pointer hover:text-foreground text-right"
                  onClick={() => toggleSort('volume24h')}
                >
                  <div className="flex items-center justify-end gap-1.5">
                    24h Volume
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  className="py-3 px-4 cursor-pointer hover:text-foreground text-right"
                  onClick={() => toggleSort('currentApy')}
                >
                  <div className="flex items-center justify-end gap-1.5">
                    Current APY
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right">7d EMA</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredAndSorted.map((pool) => (
                <tr key={pool.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <span>{pool.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground">{pool.protocol}</td>
                  <td className="py-3.5 px-4 font-mono text-xs">
                    {(pool.feeTierBps / 100).toFixed(2)}%
                  </td>
                  <td className="py-3.5 px-4 font-mono text-right font-medium">
                    {formatUsd(pool.tvl)}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-right text-muted-foreground">
                    {formatUsd(pool.volume24h)}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-right font-bold text-emerald-500">
                    {pool.currentApy.toFixed(1)}%
                  </td>
                  <td className="py-3.5 px-4 font-mono text-right text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-blue-400" />
                      {pool.ema7dApy.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
