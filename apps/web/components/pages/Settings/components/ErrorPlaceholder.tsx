import RefreshButton, { RefreshButtonProps } from '@/components/RefreshButton';

const ErrorPlaceholder = ({ handleRefresh }: RefreshButtonProps) => (
  <div className="pt-4">
    <p className="mb-2">Failed to upload data, try again:</p>

    <RefreshButton handleRefresh={handleRefresh} />
  </div>
);

export default ErrorPlaceholder;
