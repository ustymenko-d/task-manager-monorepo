import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Footer = () => (
	<footer className='border-t border-dashed'>
		<div className='container mx-auto flex flex-wrap justify-between gap-x-1 text-balance border-dashed px-4 py-4 text-center sm:border-x'>
			<p className='text-base'>
				Built&nbsp;by{' '}
				<Link
					href='https://ustymenko.vercel.app'
					className={cn(
						buttonVariants({
							variant: 'link',
							size: 'none',
						}),
						'animated-underline rounded-none text-base hover:no-underline'
					)}
					target='_blank'>
					Denys Ustymenko
				</Link>
			</p>
			<span className='text-muted-foreground'>v1.0.1</span>
		</div>
	</footer>
);

export default Footer;
