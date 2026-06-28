export type ProtocolType = 'Stellar Native Pools' | 'Soroswap' | 'Phoenix Hub' | 'Aquarius';

export interface Position {
  id: string;
  protocol: ProtocolType;
  poolName: string;
  token0: string;
  token1: string;
  liquidity: number;
  value: number;
  apy: number;
  impermanentLoss: number;
  unrealizedPnL: number;
  realizedPnL: number;
  entryDate: string;
}

export interface HistoricalAPY {
  date: string;
  [key: string]: number | string;
}

export interface PortfolioSummary {
  totalValue: number;
  totalUnrealizedPnL: number;
  totalRealizedPnL: number;
  totalImpermanentLoss: number;
  positionsCount: number;
}
