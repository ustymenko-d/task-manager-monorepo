import RefreshButton, { RefreshButtonProps } from '@/components/RefreshButton';

const ErrorPlaceholder = ({ handleRefresh }: RefreshButtonProps) => (
	<div className='mt-4 flex min-h-40 w-full flex-col items-center justify-center gap-3 rounded-md border'>
		<h2>Something went wrong!</h2>
		<RefreshButton handleRefresh={handleRefresh} />
	</div>
);

export default ErrorPlaceholder;
