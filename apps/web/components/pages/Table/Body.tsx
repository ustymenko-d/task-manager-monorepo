'use client';

import Loader from '@/components/Loader';
import Table from '@/components/pages/Table/components/Table/Table';
import RefreshButton from '@/components/RefreshButton';
import useFetch from '@/hooks/tasks/useFetch';
import { GetTasksRequest } from '@/types/tasks';

const LoadingState = () => (
	<div className='mt-4 flex min-h-40 w-full flex-col items-center justify-center gap-3 rounded-md border'>
		<Loader className='pt-4 text-lg' />
	</div>
);

const ErrorState = ({ onRefresh }: { onRefresh: () => void }) => (
	<div className='mt-4 flex min-h-40 w-full flex-col items-center justify-center gap-3 rounded-md border'>
		<h2>Failed to upload tasks</h2>
		<RefreshButton handleRefresh={onRefresh} />
	</div>
);

const EmptyState = () => (
	<div className='mt-4 flex min-h-40 w-full flex-col items-center justify-center gap-3 rounded-md border'>
		<h2 className='text-muted-foreground'>No tasks found</h2>
	</div>
);

const Body = (searchparams: GetTasksRequest) => {
	const { data, isLoading, isFetching, isError, refetch } =
		useFetch(searchparams);

	if (isLoading) return <LoadingState />;
	if (isError) return <ErrorState onRefresh={refetch} />;
	if (!data || data.tasks.length === 0) return <EmptyState />;

	return (
		<Table
			data={data.tasks}
			isFetching={isFetching}
			pagination={{ ...searchparams, pages: data.pages }}
		/>
	);
};

export default Body;
