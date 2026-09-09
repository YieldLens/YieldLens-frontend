import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type WalletType = 'Freighter' | 'xBull' | 'Hana' | 'Albedo';
export type StellarNetwork = 'testnet' | 'public';

interface WalletState {
  isConnected: boolean;
  walletType: WalletType | null;
  network: StellarNetwork;
  address: string | null;
  balance: number;
  lpPositionsCount: number;
}

interface WalletContextType {
  wallet: WalletState;
  connect: (type?: WalletType) => void;
  disconnect: () => void;
  switchNetwork: (network: StellarNetwork) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

function generateWalletAddress(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let addr = 'G';
  for (let i = 0; i < 55; i++) {
    addr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return addr;
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    walletType: null,
    network: 'testnet',
    address: null,
    balance: 0,
    lpPositionsCount: 0,
  });

  const connect = useCallback((type: WalletType = 'Freighter') => {
    setWallet((prev) => ({
      ...prev,
      isConnected: true,
      walletType: type,
      address: generateWalletAddress(),
      balance: Math.floor(Math.random() * 50000) / 100,
      lpPositionsCount: 3,
    }));
  }, []);

  const disconnect = useCallback(() => {
    setWallet((prev) => ({
      ...prev,
      isConnected: false,
      walletType: null,
      address: null,
      balance: 0,
      lpPositionsCount: 0,
    }));
  }, []);

  const switchNetwork = useCallback((network: StellarNetwork) => {
    setWallet((prev) => ({
      ...prev,
      network,
    }));
  }, []);

  return (
    <WalletContext.Provider value={{ wallet, connect, disconnect, switchNetwork }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
