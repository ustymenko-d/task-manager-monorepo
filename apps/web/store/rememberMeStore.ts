import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface RememberMeState {
	rememberMe: boolean;
	setRememberMe: (value: boolean) => void;
}

export const useRememberMeStore = create<RememberMeState>()(
	persist(
		(set) => ({
			rememberMe: false,
			setRememberMe: (rememberMe) => set({ rememberMe }),
		}),
		{
			name: 'remember-me-store',
			storage: createJSONStorage(() => globalThis.sessionStorage as Storage),
		}
	)
);
