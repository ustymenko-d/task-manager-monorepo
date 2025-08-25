import { RefreshCcw } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';

export interface RefreshButtonProps {
  handleRefresh: () => void;
}

const RefreshButton = ({ handleRefresh }: RefreshButtonProps) => (
  <Button variant="outline" onClick={handleRefresh}>
    <RefreshCcw size={16} strokeWidth={1.25} className="opacity-60" />
    Refresh
  </Button>
);

export default RefreshButton;
