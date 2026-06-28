import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { PortfolioOverview } from './components/PortfolioOverview';
import { PositionCard } from './components/PositionCard';
import { APYChart } from './components/APYChart';
import { ProtocolFilter } from './components/ProtocolFilter';
import { mockPositions, mockHistoricalAPY } from './data/mockData';
import { ProtocolType, PortfolioSummary } from './types/portfolio';

export default function App() {
  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolType | 'All'>('All');

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Portfolio Overview */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-6">Portfolio Overview</h2>
          <PortfolioOverview summary={portfolioSummary} />
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

          {/* Position Cards Grid */}
          {filteredPositions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPositions.map((position) => (
                <PositionCard key={position.id} position={position} />
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
  );
}
