import { Badge } from './ui/badge';
import { ProtocolType } from '../types/portfolio';

interface ProtocolFilterProps {
  selectedProtocol: ProtocolType | 'All';
  onProtocolChange: (protocol: ProtocolType | 'All') => void;
  protocolCounts: Record<string, number>;
}

export function ProtocolFilter({ selectedProtocol, onProtocolChange, protocolCounts }: ProtocolFilterProps) {
  const protocols: Array<ProtocolType | 'All'> = ['All', 'Soroswap', 'Phoenix Hub', 'Stellar Native Pools', 'Aquarius'];

  const getProtocolColor = (protocol: string) => {
    if (protocol === selectedProtocol) {
      switch (protocol) {
        case 'Soroswap':
          return 'bg-blue-500 text-white hover:bg-blue-600';
        case 'Phoenix Hub':
          return 'bg-purple-500 text-white hover:bg-purple-600';
        case 'Stellar Native Pools':
          return 'bg-green-500 text-white hover:bg-green-600';
        case 'Aquarius':
          return 'bg-cyan-500 text-white hover:bg-cyan-600';
        case 'All':
          return 'bg-gray-700 text-white hover:bg-gray-800';
        default:
          return 'bg-gray-500 text-white hover:bg-gray-600';
      }
    }
    return 'bg-secondary text-secondary-foreground hover:bg-secondary/80';
  };

  return (
    <div className="flex flex-wrap gap-2">
      {protocols.map((protocol) => (
        <Badge
          key={protocol}
          variant="secondary"
          className={`cursor-pointer px-4 py-2 ${getProtocolColor(protocol)}`}
          onClick={() => onProtocolChange(protocol)}
        >
          {protocol} {protocol !== 'All' && `(${protocolCounts[protocol] || 0})`}
        </Badge>
      ))}
    </div>
  );
}
