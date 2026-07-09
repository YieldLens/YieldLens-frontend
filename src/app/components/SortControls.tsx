import { Button } from './ui/button';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

export type SortField = 'apy' | 'value' | 'unrealizedPnL' | 'liquidity';
export type SortOrder = 'asc' | 'desc';

interface SortControlsProps {
  sortField: SortField;
  sortOrder: SortOrder;
  onSortChange: (field: SortField) => void;
}

const sortOptions: { field: SortField; label: string }[] = [
  { field: 'apy', label: 'APY' },
  { field: 'value', label: 'Value' },
  { field: 'unrealizedPnL', label: 'P&L' },
  { field: 'liquidity', label: 'Liquidity' },
];

export function SortControls({ sortField, sortOrder, onSortChange }: SortControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Sort by:</span>
      <div className="flex gap-1">
        {sortOptions.map((option) => {
          const isActive = sortField === option.field;
          return (
            <Button
              key={option.field}
              variant={isActive ? 'secondary' : 'ghost'}
              size="sm"
              className="gap-1"
              onClick={() => onSortChange(option.field)}
            >
              {option.label}
              {isActive ? (
                sortOrder === 'asc' ? (
                  <ArrowUp className="w-3 h-3" />
                ) : (
                  <ArrowDown className="w-3 h-3" />
                )
              ) : (
                <ArrowUpDown className="w-3 h-3 opacity-50" />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
