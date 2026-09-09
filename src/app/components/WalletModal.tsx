import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Wallet, Copy, ExternalLink, LogOut, Globe, CheckCircle2 } from 'lucide-react';
import { useWallet, WalletType, StellarNetwork } from '../contexts/WalletContext';

interface WalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WALLET_OPTIONS: { type: WalletType; name: string; description: string; badge: string; color: string }[] = [
  {
    type: 'Freighter',
    name: 'Freighter Wallet',
    description: 'Official browser extension by SDF',
    badge: 'Popular',
    color: 'bg-blue-600',
  },
  {
    type: 'xBull',
    name: 'xBull Wallet',
    description: 'Hardware & web multi-platform wallet',
    badge: 'DeFi Ready',
    color: 'bg-purple-600',
  },
  {
    type: 'Hana',
    name: 'Hana Wallet',
    description: 'Multi-chain non-custodial wallet',
    badge: 'Mobile & Web',
    color: 'bg-emerald-600',
  },
  {
    type: 'Albedo',
    name: 'Albedo Wallet',
    description: 'Web authentication with delegated keys',
    badge: 'Instant',
    color: 'bg-amber-600',
  },
];

export function WalletModal({ open, onOpenChange }: WalletModalProps) {
  const { wallet, connect, disconnect, switchNetwork } = useWallet();

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  const copyAddress = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    onOpenChange(false);
  };

  if (wallet.isConnected) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Wallet Connected
            </DialogTitle>
            <DialogDescription>
              Connected via {wallet.walletType || 'Stellar Wallet'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-3">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate font-mono">{truncateAddress(wallet.address!)}</p>
                <p className="text-xs text-muted-foreground">
                  Balance: {wallet.balance.toFixed(2)} XLM
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  {wallet.network}
                </span>
              </div>
            </div>

            {/* Network switch */}
            <div className="flex items-center justify-between p-3 border rounded-xl">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-medium">Stellar Network</span>
              </div>
              <div className="flex gap-1">
                {(['testnet', 'public'] as StellarNetwork[]).map((net) => (
                  <button
                    key={net}
                    type="button"
                    onClick={() => switchNetwork(net)}
                    className={`text-xs px-2.5 py-1 rounded-md capitalize font-medium transition-colors ${
                      wallet.network === net
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {net}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 gap-2 text-xs" onClick={copyAddress}>
                <Copy className="w-3.5 h-3.5" />
                Copy Address
              </Button>
              <Button variant="outline" className="flex-1 gap-2 text-xs" asChild>
                <a
                  href={`https://stellar.expert/explorer/${wallet.network}/account/${wallet.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Stellar.Expert
                </a>
              </Button>
            </div>

            <Button variant="destructive" className="w-full gap-2 text-xs" onClick={handleDisconnect}>
              <LogOut className="w-3.5 h-3.5" />
              Disconnect Wallet
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Stellar Wallet</DialogTitle>
          <DialogDescription>
            Select your preferred wallet to track and inspect liquidity positions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2.5 py-3">
          {WALLET_OPTIONS.map((opt) => (
            <Button
              key={opt.type}
              className="w-full h-14 gap-3 text-left justify-start px-3.5 border rounded-xl hover:border-primary/50 transition-all"
              variant="outline"
              onClick={() => {
                connect(opt.type);
                onOpenChange(false);
              }}
            >
              <div className={`w-9 h-9 ${opt.color} rounded-xl flex items-center justify-center shadow-sm`}>
                <span className="text-white font-bold text-xs">{opt.name.slice(0, 2).toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">{opt.name}</p>
                  <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-medium">
                    {opt.badge}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{opt.description}</p>
              </div>
            </Button>
          ))}
        </div>

        <p className="text-[11px] text-center text-muted-foreground">
          Stellar Wallets Kit enables non-custodial key signing without private key exposure.
        </p>
      </DialogContent>
    </Dialog>
  );
}
