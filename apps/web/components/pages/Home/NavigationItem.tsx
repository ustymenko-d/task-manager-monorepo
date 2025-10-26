import Link from 'next/link';

import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { NavItem } from '@/types/common';

const NavigationItem = ({ href, icon: Icon, label, description }: NavItem) => (
	<Link href={href}>
		<Card className='flex h-full flex-col items-center gap-2 p-4 text-center shadow-sm hover:bg-accent'>
			<Icon size={40} strokeWidth={1} className='opacity-50' />
			<CardTitle>{label}</CardTitle>
			<CardDescription className='hidden text-sm sm:inline-block'>
				{description}
			</CardDescription>
		</Card>
	</Link>
);

export default NavigationItem;
