import { Button } from './ui/button';
import { Wallet } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">YL</span>
          </div>
          <h1 className="text-2xl font-bold">YieldLens</h1>
        </div>
        <Button className="gap-2">
          <Wallet className="w-4 h-4" />
          Connect Wallet
        </Button>
      </div>
    </header>
  );
}
