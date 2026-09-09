import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Calculator, ArrowRight, TrendingUp, ShieldAlert, Sparkles } from 'lucide-react';

export function calculateImpermanentLoss(priceChangeA: number, priceChangeB: number): {
  divergenceRatio: number;
  impermanentLossPercent: number;
  hodlMultiplier: number;
  lpMultiplier: number;
} {
  const pA = 1 + priceChangeA / 100;
  const pB = 1 + priceChangeB / 100;

  if (pA <= 0 || pB <= 0) {
    return {
      divergenceRatio: 0,
      impermanentLossPercent: -100,
      hodlMultiplier: 0,
      lpMultiplier: 0,
    };
  }

  const k = pA / pB;
  const ilFraction = (2 * Math.sqrt(k)) / (1 + k) - 1;
  const ilPercent = Number((ilFraction * 100).toFixed(2));

  // 50/50 initial portfolio ratio
  const hodlMultiplier = (pA + pB) / 2;
  const lpMultiplier = Math.sqrt(pA * pB);

  return {
    divergenceRatio: Number(k.toFixed(3)),
    impermanentLossPercent: Math.abs(ilPercent),
    hodlMultiplier: Number(hodlMultiplier.toFixed(3)),
    lpMultiplier: Number(lpMultiplier.toFixed(3)),
  };
}

export function ImpermanentLossCalculator() {
  const [tokenA, setTokenA] = useState('XLM');
  const [tokenB, setTokenB] = useState('USDC');
  const [changeA, setChangeA] = useState(50); // +50%
  const [changeB, setChangeB] = useState(0);  // 0% (stablecoin)
  const [estApy, setEstApy] = useState(18.5); // 18.5% fee return
  const [holdDays, setHoldDays] = useState(90);

  const { impermanentLossPercent, hodlMultiplier, lpMultiplier } = useMemo(() => {
    return calculateImpermanentLoss(changeA, changeB);
  }, [changeA, changeB]);

  const feeReturnPercent = useMemo(() => {
    return Number(((estApy * (holdDays / 365))).toFixed(2));
  }, [estApy, holdDays]);

  const netLpReturn = useMemo(() => {
    return Number(((lpMultiplier - 1) * 100 + feeReturnPercent).toFixed(2));
  }, [lpMultiplier, feeReturnPercent]);

  const hodlReturn = useMemo(() => {
    return Number(((hodlMultiplier - 1) * 100).toFixed(2));
  }, [hodlMultiplier]);

  return (
    <Card className="border shadow-sm mb-8">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-500" />
          <CardTitle className="text-xl">Impermanent Loss & Yield Simulator</CardTitle>
        </div>
        <CardDescription>
          Simulate price divergence between paired assets and evaluate fee earnings vs HODLing
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2 p-3 bg-muted/40 rounded-lg">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {tokenA} Price Change (%)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={changeA}
                onChange={(e) => setChangeA(Number(e.target.value))}
                className="w-full bg-background border rounded px-3 py-1.5 text-sm font-mono"
              />
              <span className="text-xs font-mono">%</span>
            </div>
            <div className="flex gap-1 pt-1">
              {[-25, 0, 25, 50, 100].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setChangeA(val)}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-muted hover:bg-muted-foreground/20 font-mono"
                >
                  {val > 0 ? `+${val}%` : `${val}%`}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 p-3 bg-muted/40 rounded-lg">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {tokenB} Price Change (%)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={changeB}
                onChange={(e) => setChangeB(Number(e.target.value))}
                className="w-full bg-background border rounded px-3 py-1.5 text-sm font-mono"
              />
              <span className="text-xs font-mono">%</span>
            </div>
            <div className="flex gap-1 pt-1">
              {[-10, 0, 10, 25, 50].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setChangeB(val)}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-muted hover:bg-muted-foreground/20 font-mono"
                >
                  {val > 0 ? `+${val}%` : `${val}%`}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 p-3 bg-muted/40 rounded-lg">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Pool APY (%)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={estApy}
                onChange={(e) => setEstApy(Number(e.target.value))}
                className="w-full bg-background border rounded px-3 py-1.5 text-sm font-mono"
              />
              <span className="text-xs font-mono">%</span>
            </div>
          </div>

          <div className="space-y-2 p-3 bg-muted/40 rounded-lg">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Holding Duration (Days)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={holdDays}
                onChange={(e) => setHoldDays(Number(e.target.value))}
                className="w-full bg-background border rounded px-3 py-1.5 text-sm font-mono"
              />
              <span className="text-xs font-mono">days</span>
            </div>
          </div>
        </div>

        {/* Results Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl border bg-card flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-medium">Impermanent Loss</span>
              <ShieldAlert className="w-4 h-4 text-amber-500" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold font-mono text-amber-500">
                -{impermanentLossPercent}%
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                Value drag vs holding 50/50 outside pool
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border bg-card flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-medium">LP Return + Fees</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold font-mono text-emerald-500">
                {netLpReturn >= 0 ? `+${netLpReturn}%` : `${netLpReturn}%`}
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                Includes +{feeReturnPercent}% from pool LP fee yield
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border bg-card flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-medium">Net Strategy Edge</span>
              <Sparkles className="w-4 h-4 text-blue-500" />
            </div>
            <div className="mt-2">
              <span
                className={`text-2xl font-bold font-mono ${
                  netLpReturn >= hodlReturn ? 'text-blue-500' : 'text-rose-500'
                }`}
              >
                {netLpReturn >= hodlReturn
                  ? `+${(netLpReturn - hodlReturn).toFixed(2)}%`
                  : `${(netLpReturn - hodlReturn).toFixed(2)}%`}
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                {netLpReturn >= hodlReturn
                  ? 'Providing liquidity outperforms HODL'
                  : 'HODL outperforms due to heavy divergence'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
