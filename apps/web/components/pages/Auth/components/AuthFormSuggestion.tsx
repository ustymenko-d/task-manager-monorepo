import Link from 'next/link';

import useAppStore from '@/store/store';
import { AuthForm } from '@/types/auth';

const signupSuggestion = {
	text: 'Don’t have an account?',
	linkText: 'Sign up',
	newType: 'signup' as AuthForm,
};

const suggestionConfig: Record<
	AuthForm,
	{ text: string; linkText: string; newType: AuthForm }
> = {
	login: signupSuggestion,
	forgotPassword: signupSuggestion,
	signup: {
		text: 'Already have an account?',
		linkText: 'Sign in',
		newType: 'login' as AuthForm,
	},
} as const;

const AuthFormSuggestion = () => {
	const authFormType = useAppStore((s) => s.authFormType);
	const setAuthFormType = useAppStore((s) => s.setAuthFormType);

	const {
		text: suggestionText,
		linkText,
		newType,
	} = suggestionConfig[authFormType];

	const handleChangeFormType = () => {
		setAuthFormType(newType);
	};

	return (
		<div className='mt-4 flex flex-wrap gap-2 text-center text-base'>
			<span className='text-muted-foreground'>{suggestionText}</span>
			<Link
				href='/auth'
				className='animated-underline'
				onClick={handleChangeFormType}>
				{linkText}
			</Link>
		</div>
	);
};

export default AuthFormSuggestion;
