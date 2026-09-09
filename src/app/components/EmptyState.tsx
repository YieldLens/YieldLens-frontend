import { Wallet, Search, ArrowUpRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface EmptyStateProps {
  type: 'no-positions' | 'no-search-results';
  searchQuery?: string;
  onConnectWallet?: () => void;
  onClearSearch?: () => void;
}

export function EmptyState({ type, searchQuery, onConnectWallet, onClearSearch }: EmptyStateProps) {
  if (type === 'no-search-results') {
    return (
      <Card className="border border-dashed py-12 text-center bg-muted/20">
        <CardContent className="flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold">No Matching Pools Found</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            We couldn't find any pools matching <span className="font-mono font-medium">"{searchQuery}"</span>. Try searching for a token symbol like XLM, USDC, or AQUA.
          </p>
          {onClearSearch && (
            <Button variant="outline" size="sm" onClick={onClearSearch}>
              Clear Search Filter
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-dashed py-12 text-center bg-muted/20">
      <CardContent className="flex flex-col items-center justify-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
          <Wallet className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold">No Active Liquidity Positions</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          This wallet currently holds no tracked liquidity shares across Stellar Native, Soroswap, Phoenix, or Aquarius pools.
        </p>
        <div className="flex gap-2 pt-2">
          {onConnectWallet && (
            <Button size="sm" onClick={onConnectWallet} className="gap-1.5">
              Connect Another Wallet
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
