'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import AuthAPI from '@/api/auth.api';
import { queryClient } from '@/components/providers/Query.provider';
import { Form, FormField } from '@/components/ui/form';
import { useWithRecaptcha } from '@/hooks/useWithRecaptcha';
import { Credentials, Email } from '@/types/auth';
import LoadingButton from '@/components/LoadingButton';
import { FormValues, useAuthFormType } from '@/hooks/useAuthFormType';
import useAppStore from '@/store/store';
import EmailInput from './components/EmailInput';
import PasswordInput from './components/PasswordInput';
import z from 'zod';
import { formConfig } from '@/const';
import RememberMe from './components/RememberMe';
import ConfirmPasswordInput from './components/ConfirmPasswordInput';
import { ControllerRenderProps } from 'react-hook-form';

const AuthForm = () => {
	const router = useRouter();

	const setIsAuthorized = useAppStore((s) => s.setIsAuthorized);

	const { withRecaptcha } = useWithRecaptcha('auth');

	const { authFormType, authForm, config, loading, setLoading } =
		useAuthFormType();

	const handleForgotPassword = async (payload: Email) => {
		const { success, message } = await AuthAPI.forgotPassword(
			await withRecaptcha<Email>(payload)
		);

		if (!success) throw new Error(message || 'Forgot Password error');

		setLoading('success');
		toast.success(message);
		authForm.reset(config.defaultValues);

		setTimeout(() => setLoading('default'), 3000);
	};

	const handleAuth = async (payload: Credentials) => {
		const { success, message, userInfo } =
			authFormType === 'signup'
				? await AuthAPI.signup(payload)
				: await AuthAPI.login(payload);

		if (!success) throw new Error(message || 'Auth error');

		setLoading('success');
		authForm.reset(config.defaultValues);
		toast.success(message);
		setIsAuthorized(true);
		queryClient.setQueryData(['account info'], userInfo);
		router.push('/home');
	};

	const onSubmit = async (values: FormValues) => {
		try {
			setLoading('pending');

			if (authFormType === 'forgotPassword') {
				const { email } = values as z.infer<
					typeof formConfig.forgotPassword.validationSchema
				>;

				await handleForgotPassword({ email });
			} else if (authFormType === 'signup') {
				const { email, password, rememberMe } = values as z.infer<
					typeof formConfig.signup.validationSchema
				>;
				await handleAuth(
					await withRecaptcha<Credentials>({ email, password, rememberMe })
				);
			} else {
				const { email, password, rememberMe } = values as z.infer<
					typeof formConfig.login.validationSchema
				>;
				await handleAuth(
					await withRecaptcha<Credentials>({ email, password, rememberMe })
				);
			}
		} catch (error) {
			setLoading('error');
			console.error(`${authFormType} error:`, error);
		}
	};

	return (
		<Form {...authForm}>
			<form
				onSubmit={authForm.handleSubmit(onSubmit)}
				className='flex flex-col gap-6'>
				{config.fields.map((f) =>
					f === 'rememberMe' ? (
						<FormField
							key={f}
							control={authForm.control}
							name='rememberMe'
							render={({ field }) => <RememberMe {...field} />}
						/>
					) : (
						<FormField
							key={f}
							control={authForm.control}
							name={f}
							render={({ field }) =>
								f === 'email' ? (
									<EmailInput
										{...(field as ControllerRenderProps<FormValues, 'email'>)}
									/>
								) : f === 'password' ? (
									<PasswordInput
										{...(field as ControllerRenderProps<
											FormValues,
											'password'
										>)}
									/>
								) : (
									<ConfirmPasswordInput
										{...(field as ControllerRenderProps<
											FormValues,
											'confirmPassword'
										>)}
									/>
								)
							}
						/>
					)
				)}

				<LoadingButton
					type='submit'
					loading={loading === 'pending'}
					disabled={loading === 'success'}>
					{config.buttonText}
				</LoadingButton>
			</form>
		</Form>
	);
};

export default AuthForm;
