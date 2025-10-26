'use client';

import Loader from '@/components/Loader';
import EmptyPlaceholder from '@/components/pages/Table/components/Table/components/EmptyPlaceholder';
import Table from '@/components/pages/Table/components/Table/Table';
import useFetch from '@/hooks/tasks/useFetch';
import { GetTasksRequest } from '@/types/tasks';

const Body = (searchparams: GetTasksRequest) => {
	const { data, isLoading, isFetching, isError, refetch } =
		useFetch(searchparams);

	const handleRefetch = () => {
		if (isError) refetch();
	};

	if (isLoading) {
		return (
			<div className='mt-4 flex min-h-40 w-full flex-col items-center justify-center gap-3 rounded-md border'>
				<Loader className='pt-4 text-lg' />
			</div>
		);
	}

	if (!data) return <EmptyPlaceholder handleRefresh={handleRefetch} />;

	const { tasks, pages } = data;

	return (
		<Table
			data={tasks}
			isFetching={isFetching}
			pagination={{ ...searchparams, pages }}
		/>
	);
};

export default Body;
