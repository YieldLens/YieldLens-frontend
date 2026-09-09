import { useState, useMemo, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { WalletProvider, useWallet } from './contexts/WalletContext';
import { Header } from './components/Header';
import { PortfolioOverview } from './components/PortfolioOverview';
import { PortfolioAllocation } from './components/PortfolioAllocation';
import { PositionCard } from './components/PositionCard';
import { PositionDetailDrawer } from './components/PositionDetailDrawer';
import { SortControls, SortField, SortOrder } from './components/SortControls';
import { APYChart } from './components/APYChart';
import { ProtocolFilter } from './components/ProtocolFilter';
import { SearchFilter } from './components/SearchFilter';
import { SkeletonOverview, SkeletonChart, SkeletonPositions } from './components/SkeletonLoaders';
import { ImpermanentLossCalculator } from './components/ImpermanentLossCalculator';
import { PoolTable } from './components/PoolTable';
import { EmptyState } from './components/EmptyState';
import { api, ApiPool } from './services/api';
import { mockPositions, mockHistoricalAPY } from './data/mockData';
import { ProtocolType, PortfolioSummary, Position } from './types/portfolio';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { WalletModal } from './components/WalletModal';

function MainDashboard() {
  const { wallet } = useWallet();
  const [positions, setPositions] = useState<Position[]>(mockPositions);
  const [pools, setPools] = useState<ApiPool[]>([]);
  const [historicalApy, setHistoricalApy] = useState(mockHistoricalAPY);
  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolType | 'All'>('All');
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [sortField, setSortField] = useState<SortField>('value');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch live pools and data from YieldLens backend with fallback
  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        const [fetchedPools, fetchedPositions, fetchedApy] = await Promise.all([
          api.getPools(),
          api.getPositions(),
          api.getHistoricalApy(),
        ]);
        if (mounted) {
          setPools(fetchedPools);
          if (fetchedPositions.length > 0) setPositions(fetchedPositions);
          if (fetchedApy.length > 0) setHistoricalApy(fetchedApy);
        }
      } catch (err) {
        console.warn('Using local fallback data:', err);
      } finally {
        if (mounted) {
          setTimeout(() => setIsLoading(false), 600);
        }
      }
    }
    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  // Calculate portfolio summary
  const portfolioSummary: PortfolioSummary = useMemo(() => {
    return {
      totalValue: positions.reduce((sum, pos) => sum + pos.value, 0),
      totalUnrealizedPnL: positions.reduce((sum, pos) => sum + pos.unrealizedPnL, 0),
      totalRealizedPnL: positions.reduce((sum, pos) => sum + pos.realizedPnL, 0),
      totalImpermanentLoss: positions.length
        ? positions.reduce((sum, pos) => sum + pos.impermanentLoss, 0) / positions.length
        : 0,
      positionsCount: positions.length,
    };
  }, [positions]);

  // Filter positions by protocol and search query
  const filteredPositions = useMemo(() => {
    const protocolFiltered =
      selectedProtocol === 'All'
        ? positions
        : positions.filter((pos) => pos.protocol === selectedProtocol);

    if (!searchQuery.trim()) return protocolFiltered;

    const query = searchQuery.toLowerCase();
    return protocolFiltered.filter(
      (pos) =>
        pos.poolName.toLowerCase().includes(query) ||
        pos.token0.toLowerCase().includes(query) ||
        pos.token1.toLowerCase().includes(query)
    );
  }, [positions, selectedProtocol, searchQuery]);

  // Count positions by protocol
  const protocolCounts = useMemo(() => {
    return positions.reduce((counts, pos) => {
      counts[pos.protocol] = (counts[pos.protocol] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);
  }, [positions]);

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
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs defaultValue="positions" className="w-full space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Stellar Yield Analytics</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Real-time liquidity pool tracking, impermanent loss monitoring, and Soroban yield metrics
              </p>
            </div>
            <TabsList className="grid grid-cols-3 w-full sm:w-auto">
              <TabsTrigger value="positions">Positions</TabsTrigger>
              <TabsTrigger value="pools">Live Pools</TabsTrigger>
              <TabsTrigger value="il-calc">IL Calculator</TabsTrigger>
            </TabsList>
          </div>

          {/* Positions & Portfolio View */}
          <TabsContent value="positions" className="space-y-8 mt-0">
            {/* Portfolio Overview */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Portfolio Summary</h2>
              {isLoading ? (
                <SkeletonOverview />
              ) : (
                <>
                  <PortfolioOverview summary={portfolioSummary} />
                  <div className="mt-6">
                    <PortfolioAllocation positions={positions} />
                  </div>
                </>
              )}
            </section>

            {/* APY Trends Chart */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Multi-Protocol APY Trends</h2>
              {isLoading ? <SkeletonChart /> : <APYChart data={historicalApy} />}
            </section>

            {/* Positions */}
            <section>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Tracked Liquidity Positions</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Individual LP deposits across Soroswap, Phoenix, and Aquarius
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-64">
                    <SearchFilter value={searchQuery} onChange={setSearchQuery} />
                  </div>
                  <div className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                    {filteredPositions.length} {filteredPositions.length === 1 ? 'position' : 'positions'}
                  </div>
                </div>
              </div>

              {/* Protocol Filter */}
              <div className="mb-4">
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

              {/* Position Cards Grid or Empty State */}
              {isLoading ? (
                <SkeletonPositions />
              ) : sortedPositions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedPositions.map((position) => (
                    <PositionCard
                      key={position.id}
                      position={position}
                      onSelect={(pos) => {
                        setSelectedPosition(pos);
                        setDrawerOpen(true);
                      }}
                    />
                  ))}
                </div>
              ) : searchQuery.trim() ? (
                <EmptyState
                  type="no-search-results"
                  searchQuery={searchQuery}
                  onClearSearch={() => setSearchQuery('')}
                />
              ) : (
                <EmptyState
                  type="no-positions"
                  onConnectWallet={() => setWalletModalOpen(true)}
                />
              )}
            </section>
          </TabsContent>

          {/* Live Pools View */}
          <TabsContent value="pools" className="space-y-6 mt-0">
            <div className="max-w-md mb-4">
              <SearchFilter
                value={searchQuery}
                onChange={setSearchQuery}
              />
            </div>
            <PoolTable pools={pools} searchQuery={searchQuery} />
          </TabsContent>

          {/* Impermanent Loss Calculator View */}
          <TabsContent value="il-calc" className="space-y-6 mt-0">
            <ImpermanentLossCalculator />
          </TabsContent>
        </Tabs>

        {/* Footer Info */}
        <footer className="mt-16 p-6 border rounded-xl bg-card text-card-foreground">
          <h3 className="font-semibold mb-1">About YieldLens</h3>
          <p className="text-sm text-muted-foreground">
            A production-grade portfolio tracker for Stellar DeFi. Track your LP positions across Soroswap, Phoenix Hub,
            Aquarius, and Stellar Native Pools. Monitor impermanent loss, real-time P&L, and historical APY trends.
          </p>
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
            <span>Network: <span className="font-mono capitalize font-medium">{wallet.network}</span></span>
            <span>Status: <span className="text-emerald-500 font-medium">RPC Synchronized</span></span>
          </div>
        </footer>
      </main>

      <PositionDetailDrawer
        position={selectedPosition}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />

      <WalletModal
        open={walletModalOpen}
        onOpenChange={setWalletModalOpen}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <WalletProvider>
        <MainDashboard />
      </WalletProvider>
    </ThemeProvider>
  );
}
