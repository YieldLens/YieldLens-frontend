import { useState, useMemo } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { WalletProvider } from './contexts/WalletContext';
import { Header } from './components/Header';
import { PortfolioOverview } from './components/PortfolioOverview';
import { PortfolioAllocation } from './components/PortfolioAllocation';
import { PositionCard } from './components/PositionCard';
import { PositionDetailDrawer } from './components/PositionDetailDrawer';
import { SortControls, SortField, SortOrder } from './components/SortControls';
import { APYChart } from './components/APYChart';
import { ProtocolFilter } from './components/ProtocolFilter';
import { mockPositions, mockHistoricalAPY } from './data/mockData';
import { ProtocolType, PortfolioSummary, Position } from './types/portfolio';

export default function App() {
  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolType | 'All'>('All');
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sortField, setSortField] = useState<SortField>('value');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Calculate portfolio summary
  const portfolioSummary: PortfolioSummary = useMemo(() => {
    return {
      totalValue: mockPositions.reduce((sum, pos) => sum + pos.value, 0),
      totalUnrealizedPnL: mockPositions.reduce((sum, pos) => sum + pos.unrealizedPnL, 0),
      totalRealizedPnL: mockPositions.reduce((sum, pos) => sum + pos.realizedPnL, 0),
      totalImpermanentLoss: mockPositions.reduce((sum, pos) => sum + pos.impermanentLoss, 0) / mockPositions.length,
      positionsCount: mockPositions.length,
    };
  }, []);

  // Filter positions by protocol
  const filteredPositions = useMemo(() => {
    if (selectedProtocol === 'All') {
      return mockPositions;
    }
    return mockPositions.filter((pos) => pos.protocol === selectedProtocol);
  }, [selectedProtocol]);

  // Count positions by protocol
  const protocolCounts = useMemo(() => {
    return mockPositions.reduce((counts, pos) => {
      counts[pos.protocol] = (counts[pos.protocol] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);
  }, []);

  // Sort positions
  const sortedPositions = useMemo(() => {
    const sorted = [...filteredPositions];
    sorted.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
    });
    return sorted;
  }, [filteredPositions, sortField, sortOrder]);

  const handleSortChange = (field: SortField) => {
    if (field === sortField) {
      setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <ThemeProvider>
      <WalletProvider>
        <div className="min-h-screen bg-background">
          <Header />
          
          <main className="container mx-auto px-4 py-8">
            {/* Portfolio Overview */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-6">Portfolio Overview</h2>
              <PortfolioOverview summary={portfolioSummary} />
            </section>
            <section className="mb-8">
              <PortfolioAllocation positions={mockPositions} />
            </section>

            {/* APY Trends Chart */}
            <section className="mb-8">
              <APYChart data={mockHistoricalAPY} />
            </section>

            {/* Positions */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Liquidity Positions</h2>
                <div className="text-sm text-muted-foreground">
                  {filteredPositions.length} {filteredPositions.length === 1 ? 'position' : 'positions'}
                </div>
              </div>

              {/* Protocol Filter */}
              <div className="mb-6">
                <ProtocolFilter
                  selectedProtocol={selectedProtocol}
                  onProtocolChange={setSelectedProtocol}
                  protocolCounts={protocolCounts}
                />
              </div>

              {/* Sort Controls */}
              <div className="mb-6">
                <SortControls
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSortChange={handleSortChange}
                />
              </div>

              {/* Position Cards Grid */}
              {sortedPositions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedPositions.map((position) => (
                    <PositionCard key={position.id} position={position} onSelect={(pos) => { setSelectedPosition(pos); setDrawerOpen(true); }} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted rounded-lg">
                  <p className="text-muted-foreground">No positions found for this protocol</p>
                </div>
              )}
            </section>

            {/* Footer Info */}
            <section className="mt-12 p-6 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">About YieldLens</h3>
              <p className="text-sm text-muted-foreground">
                A lightweight portfolio tracker for Stellar DeFi. Track your LP positions across Soroswap, Phoenix Hub, 
                Aquarius, and Stellar Native Pools. Monitor impermanent loss, P&L, and historical APY trends — all in one dashboard.
              </p>
              <p className="text-xs text-muted-foreground mt-3">
                Note: This is a frontend demo. Connect your wallet to track real positions from the Stellar blockchain.
              </p>
            </section>
          </main>
        </div>
        <PositionDetailDrawer
          position={selectedPosition}
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
        />
      </WalletProvider>
    </ThemeProvider>
  );
}
