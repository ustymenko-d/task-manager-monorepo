'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import useAppStore from '@/store/store';

const EmptyPlaceholder = () => {
	const openEditor = useAppStore((s) => s.openFolderEditor);

	const handleCreateFolder = () => openEditor('create', null);

	return (
		<div className='mt-4 flex min-h-40 w-full flex-col items-center justify-center gap-3 rounded-md border'>
			<h2>You haven&apos;t created any folders yet</h2>
			<Button variant='outline' onClick={handleCreateFolder}>
				<Plus className='opacity-60' />
				Create folder
			</Button>
		</div>
	);
};

export default EmptyPlaceholder;
