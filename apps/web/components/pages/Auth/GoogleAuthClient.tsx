'use client';

import AuthAPI from '@/api/auth.api';
import { ResponseState } from '@/types/common';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const GoogleAuthClient = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const code = searchParams.get('code');
	const [status, setStatus] = useState<ResponseState>('default');

	useEffect(() => {
		const authenticate = async () => {
			try {
				setStatus('pending');

				if (!code) throw new Error('No code provided');

				const { success, message } = await AuthAPI.googleAuth({ code });

				if (!success) throw new Error(message ?? 'Authentication failed');

				setStatus('success');
				toast.success('Authentication successful! Redirecting...');
				router.replace('/home');
			} catch {
				setStatus('error');
				toast.error('Authentication failed. Please try again.');
			}
		};

		authenticate();
	}, [code, router]);

	const renderStatusMessage = () => {
		switch (status) {
			case 'pending':
				return 'Verifying Google account...';
			case 'error':
				return 'Authentication failed. Please try again.';
			case 'success':
				return 'Authentication successful! Redirecting...';
			default:
				return null;
		}
	};

	return (
		<div className='flex items-center gap-2'>
			{status === 'pending' && (
				<Loader2
					strokeWidth={1.25}
					className='w-5 h-5 text-gray-500 animate-spin'
				/>
			)}
			{renderStatusMessage()}
		</div>
	);
};

export default GoogleAuthClient;
