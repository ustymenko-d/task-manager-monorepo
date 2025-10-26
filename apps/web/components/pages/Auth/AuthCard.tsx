'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import useAppStore from '@/store/store';

import AuthForm from './AuthForm';
import AuthFormSuggestion from './components/AuthFormSuggestion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { GoogleLogo } from '@/assets/icons/providers-logos';

const cardConfig = {
	login: {
		title: 'Welcome back',
		description:
			'Please enter your email and password to sign in to your account.',
	},
	signup: {
		title: 'Create an account',
		description: 'Please enter your email and password to create your account.',
	},
	forgotPassword: {
		title: 'Forgot your password?',
		description: 'Please enter the email address provided during registration',
	},
} as const;

const AuthCard = () => {
	const authFormType = useAppStore((s) => s.authFormType);

	const { title, description } = cardConfig[authFormType];

	return (
		<Card className='max-w-sm'>
			<CardHeader>
				<CardTitle className='text-2xl'>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<AuthForm />

				{authFormType !== 'forgotPassword' && (
					<div className='flex flex-col gap-4 pt-4'>
						<div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
							<span className='relative z-10 bg-background px-2 text-muted-foreground'>
								Or continue with
							</span>
						</div>

						<Button asChild variant='outline'>
							<Link href='/api/auth/google' className='flex items-center gap-2'>
								<GoogleLogo />
								{authFormType === 'login' ? 'Sign in' : 'Sign up'} with Google
							</Link>
						</Button>
					</div>
				)}

				<AuthFormSuggestion />
			</CardContent>
		</Card>
	);
};

export default AuthCard;
