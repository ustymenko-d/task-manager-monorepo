import { toast } from 'sonner';

import authApi from '@/api/auth';

export const clearAuthCookies = async (autoReload: boolean = false) => {
	await authApi.clearAuthCookies();

	const reloadPage = () => window.location.reload();
	const message = 'Authentication cookies cleared successfully';

	if (autoReload) {
		toast.warning(`${message}. Reloading...`);
		setTimeout(reloadPage, 1500);
	} else {
		toast.warning(message, {
			description: 'Please reload the page to continue',
			action: {
				label: 'Reload',
				onClick: reloadPage,
			},
			duration: 10000,
		});
	}
};
