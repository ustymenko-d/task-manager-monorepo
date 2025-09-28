import { StateStorage } from 'zustand/middleware';

// Returns global localStorage for client and storage mock for SSR
const getStorage = (): StateStorage =>
	(globalThis.localStorage as Storage as StateStorage) ?? {
		getItem: () => null,
		setItem: () => {},
		removeItem: () => {},
	};

export default getStorage;
