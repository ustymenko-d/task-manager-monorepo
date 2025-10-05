'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import authApi from '@/api/auth';
import PasswordInput from '@/components/pages/Auth/components/PasswordInput';
import { Form, FormField } from '@/components/ui/form';
import { useWithRecaptcha } from '@/hooks/useWithRecaptcha';
import AuthValidation from '@/schemas/authForm';
import { ResponseState } from '@/types/common';
import { Password } from '@/types/auth';
import LoadingButton from '@/components/LoadingButton';
import ConfirmPasswordInput from './components/ConfirmPasswordInput';

const FORM_CONFIG = {
	validationSchema: AuthValidation.resetPassword,
	defaultValues: {
		password: '',
		confirmPassword: '',
	},
} as const;

const FIELDS = ['password', 'confirmPassword'] as const;

const ResetPasswordForm = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { withRecaptcha } = useWithRecaptcha('reset_password');

	const [status, setStatus] = useState<ResponseState>('default');

	const { validationSchema, defaultValues } = FORM_CONFIG;

	const form = useForm<z.infer<typeof validationSchema>>({
		resolver: zodResolver(validationSchema),
		defaultValues,
	});

	const handleResetPassword = async (
		values: z.infer<typeof validationSchema>
	) => {
		setStatus('pending');

		try {
			const payload: Password = { password: values.password };
			const resetToken = searchParams.get('resetToken');

			const { success, message } = await authApi.resetPassword(
				await withRecaptcha<Password>(payload),
				resetToken
			);

			if (!success) throw new Error(message ?? 'Reset Password failed');

			setStatus('success');
			form.reset(defaultValues);

			toast.success('Your password has been changed successfully!', {
				description:
					'You will be automatically redirected to the main page in 3 seconds.',
			});

			setTimeout(() => {
				router.push('/');
			}, 3000);
		} catch (error) {
			setStatus('error');
			console.error('Change password error: ', error);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleResetPassword)}>
				<div className='flex flex-col gap-6'>
					{FIELDS.map((f) => (
						<FormField
							key={f}
							control={form.control}
							name={f}
							render={({ field }) =>
								f === 'password' ? (
									<PasswordInput
										{...(field as ControllerRenderProps<
											z.infer<typeof validationSchema>,
											'password'
										>)}
									/>
								) : (
									<ConfirmPasswordInput
										{...(field as ControllerRenderProps<
											z.infer<typeof validationSchema>,
											'confirmPassword'
										>)}
									/>
								)
							}
						/>
					))}

					<LoadingButton
						type='submit'
						className='w-full'
						loading={status === 'pending'}
						disabled={status === 'success'}>
						Confirm
					</LoadingButton>
				</div>
			</form>
		</Form>
	);
};

export default ResetPasswordForm;
