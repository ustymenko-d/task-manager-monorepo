import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
	className?: string;
};

const PageSection = ({ children, className }: Props) => (
	<section
		className={clsx(
			'w-full grow gap-3 overflow-hidden bg-background p-2 lg:p-0',
			className
		)}>
		{children}
	</section>
);

export default PageSection;
