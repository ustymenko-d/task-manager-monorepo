import { AuthForm } from '@/types/auth';

export interface AuthSlice {
	isAuthorized: boolean;
	setIsAuthorized: (newValue: boolean) => void;

	authFormType: AuthForm;
	setAuthFormType: (newValue: AuthForm) => void;
}

const createAuthSlice = (
	set: (
		partial: Partial<AuthSlice> | ((state: AuthSlice) => Partial<AuthSlice>)
	) => void
): AuthSlice => ({
	isAuthorized: false,
	setIsAuthorized: (isAuthorized) => set({ isAuthorized }),

	authFormType: 'login',
	setAuthFormType: (authFormType) => set({ authFormType }),
});

export default createAuthSlice;
