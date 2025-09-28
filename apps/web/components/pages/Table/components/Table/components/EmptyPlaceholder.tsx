import RefreshButton, { RefreshButtonProps } from '@/components/RefreshButton';

const EmptyPlaceholder = ({ handleRefresh }: RefreshButtonProps) => (
	<div className='flex flex-col items-center justify-center w-full gap-3 mt-4 border rounded-md min-h-40'>
		<h2>Failed to upload tasks</h2>
		<RefreshButton handleRefresh={handleRefresh} />
	</div>
);

export default EmptyPlaceholder;
