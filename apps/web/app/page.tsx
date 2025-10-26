import AuthLink from '@/components/AuthLink';

const RootPage = () => (
	<div className='flex flex-col gap-4'>
		<h1 className='mx-auto w-11/12 text-center text-2xl font-bold lg:w-full lg:text-3xl'>
			Manage and organize your{'\u00A0'}tasks
		</h1>

		<p className='mx-auto max-w-md text-balance text-center text-base text-muted-foreground max-sm:px-4 xl:text-lg'>
			Log in to your account or create a new one to{'\u00A0'}continue.
		</p>

		<div className='mx-auto grid w-fit grid-cols-2 gap-4'>
			<AuthLink type='login' />
			<AuthLink type='signup' />
		</div>
	</div>
);

export default RootPage;
