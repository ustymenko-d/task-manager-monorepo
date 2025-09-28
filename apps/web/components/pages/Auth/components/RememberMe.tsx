'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormItem } from '@/components/ui/form';
import { FormValues } from '@/hooks/useAuthFormType';
import { useRememberMeStore } from '@/store/rememberMeStore';
import { ControllerRenderProps } from 'react-hook-form';

const RememberMe = ({
	name,
	onBlur,
	onChange,
	ref,
	value,
}: ControllerRenderProps<FormValues, 'rememberMe'>) => {
	const setRememberMe = useRememberMeStore((s) => s.setRememberMe);

	const handleChange = (checked: boolean) => {
		onChange(checked);
		setRememberMe(checked);
	};

	return (
		<FormItem>
			<FormControl>
				<div className='flex items-center space-x-2'>
					<label className='flex items-center gap-2 text-base leading-none cursor-pointer text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
						<Checkbox
							id={name}
							ref={ref}
							name={name}
							onBlur={onBlur}
							checked={value}
							onCheckedChange={handleChange}
						/>
						Remember me
					</label>
				</div>
			</FormControl>
		</FormItem>
	);
};

export default RememberMe;
