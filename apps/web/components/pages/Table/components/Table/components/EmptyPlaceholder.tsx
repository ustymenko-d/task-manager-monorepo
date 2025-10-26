import RefreshButton, { RefreshButtonProps } from '@/components/RefreshButton';

const EmptyPlaceholder = ({ handleRefresh }: RefreshButtonProps) => (
	<div className='mt-4 flex min-h-40 w-full flex-col items-center justify-center gap-3 rounded-md border'>
		<h2>Failed to upload tasks</h2>
		<RefreshButton handleRefresh={handleRefresh} />
	</div>
);

export default EmptyPlaceholder;
