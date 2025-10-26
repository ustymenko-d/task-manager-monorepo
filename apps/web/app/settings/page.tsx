import PageHead from '@/components/PageHead';
import Body from '@/components/pages/Settings/Body';
import PageSection from '@/components/PageSection';

const SettingsPage = () => (
	<PageSection className='flex flex-col gap-6'>
		<PageHead title='View and update your account settings' />
		<Body />
	</PageSection>
);

export default SettingsPage;
