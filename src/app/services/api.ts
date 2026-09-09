import { mockPositions, mockHistoricalAPY } from '../data/mockData';
import { Position } from '../types/portfolio';

const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001/api';

export interface ApiPool {
  id: string;
  name: string;
  protocol: string;
  token0: string;
  token1: string;
  feeTierBps: number;
  reserve0: number;
  reserve1: number;
  tvl: number;
  volume24h: number;
  currentApy: number;
  ema7dApy: number;
  ema30dApy: number;
}

export interface ApiApyPoint {
  timestamp: string;
  apy: number;
  volume: number;
  tvl: number;
}

export const api = {
  async getPools(): Promise<ApiPool[]> {
    try {
      const res = await fetch(`${API_BASE}/pools`, { signal: AbortSignal.timeout(2500) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return json.data;
    } catch {
      // Graceful fallback to local mock pool representations if backend is offline
      return [
        {
          id: 'xlm-usdc',
          name: 'XLM / USDC',
          protocol: 'Soroswap',
          token0: 'XLM',
          token1: 'USDC',
          feeTierBps: 30,
          reserve0: 1540000,
          reserve1: 154000,
          tvl: 308000,
          volume24h: 84500,
          currentApy: 18.5,
          ema7dApy: 18.1,
          ema30dApy: 17.8,
        },
        {
          id: 'xlm-aqua',
          name: 'XLM / AQUA',
          protocol: 'Aquarius',
          token0: 'XLM',
          token1: 'AQUA',
          feeTierBps: 30,
          reserve0: 2100000,
          reserve1: 42000000,
          tvl: 420000,
          volume24h: 125000,
          currentApy: 26.4,
          ema7dApy: 25.8,
          ema30dApy: 24.9,
        },
        {
          id: 'usdc-eurc',
          name: 'USDC / EURC',
          protocol: 'Phoenix Hub',
          token0: 'USDC',
          token1: 'EURC',
          feeTierBps: 5,
          reserve0: 890000,
          reserve1: 820000,
          tvl: 1780000,
          volume24h: 310000,
          currentApy: 12.2,
          ema7dApy: 12.0,
          ema30dApy: 11.7,
        },
      ];
    }
  },

  async getPoolHistory(id: string, interval: '1h' | '24h' | '7d' = '24h'): Promise<ApiApyPoint[]> {
    try {
      const res = await fetch(`${API_BASE}/pools/${id}/history?interval=${interval}`, {
        signal: AbortSignal.timeout(2500),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return json.data;
    } catch {
      return [];
    }
  },

  async getPositions(protocol?: string): Promise<Position[]> {
    try {
      const query = protocol && protocol !== 'All' ? `?protocol=${encodeURIComponent(protocol)}` : '';
      const res = await fetch(`${API_BASE}/positions${query}`, {
        signal: AbortSignal.timeout(2500),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return json.data;
    } catch {
      return mockPositions;
    }
  },

  async getHistoricalApy(): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE}/apy/historical`, {
        signal: AbortSignal.timeout(2500),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return json.data;
    } catch {
      return mockHistoricalAPY;
    }
  },
};
