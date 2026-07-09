import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Wallet, X, Copy, ExternalLink, LogOut } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

interface WalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WalletModal({ open, onOpenChange }: WalletModalProps) {
  const { wallet, connect, disconnect } = useWallet();

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
            <DialogTitle>Wallet Connected</DialogTitle>
            <DialogDescription>
              Your Stellar wallet is connected to YieldLens
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{truncateAddress(wallet.address!)}</p>
                <p className="text-xs text-muted-foreground">
                  Balance: {wallet.balance.toFixed(2)} XLM
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 gap-2" onClick={copyAddress}>
                <Copy className="w-4 h-4" />
                Copy Address
              </Button>
              <Button variant="outline" className="flex-1 gap-2" asChild>
                <a
                  href={`https://stellar.expert/explorer/public/account/${wallet.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on Explorer
                </a>
              </Button>
            </div>

            <Button variant="destructive" className="w-full gap-2" onClick={handleDisconnect}>
              <LogOut className="w-4 h-4" />
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
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Connect your Stellar wallet to track your DeFi positions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <Button
            className="w-full h-14 gap-3 text-base justify-start px-4"
            variant="outline"
            onClick={() => {
              connect();
              onOpenChange(false);
            }}
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">FB</span>
            </div>
            <div className="text-left">
              <p className="font-medium">Freighter Wallet</p>
              <p className="text-xs text-muted-foreground">Stellar browser extension</p>
            </div>
          </Button>

          <Button
            className="w-full h-14 gap-3 text-base justify-start px-4"
            variant="outline"
            onClick={() => {
              connect();
              onOpenChange(false);
            }}
          >
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">LB</span>
            </div>
            <div className="text-left">
              <p className="font-medium">Lobstr Wallet</p>
              <p className="text-xs text-muted-foreground">Stellar web wallet</p>
            </div>
          </Button>

          <Button
            className="w-full h-14 gap-3 text-base justify-start px-4"
            variant="outline"
            onClick={() => {
              connect();
              onOpenChange(false);
            }}
          >
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">SW</span>
            </div>
            <div className="text-left">
              <p className="font-medium">Stellar Wallet</p>
              <p className="text-xs text-muted-foreground">Simulated connection</p>
            </div>
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          By connecting, you agree to YieldLens Terms of Service
        </p>
      </DialogContent>
    </Dialog>
  );
}
