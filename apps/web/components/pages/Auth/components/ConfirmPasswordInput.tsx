import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { FormValues } from '@/hooks/useAuthFormType';
import { ControllerRenderProps } from 'react-hook-form';
import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

const ConfirmPasswordInput = ({
	...field
}: ControllerRenderProps<FormValues, 'confirmPassword'>) => {
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<FormItem>
			<FormControl>
				<div className='grid gap-2'>
					<div className='flex items-center'>
						<FormLabel>Confirm Password</FormLabel>
					</div>
					<div className='relative'>
						<Input
							{...field}
							type={showPassword ? 'text' : 'password'}
							required
							className='pr-10'
							value={field.value ?? ''}
						/>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										type='button'
										onClick={toggleShowPassword}
										className='absolute right-0 flex items-center justify-center h-full text-gray-500 -translate-y-1/2 top-1/2 aspect-square hover:text-gray-700'>
										{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
									</button>
								</TooltipTrigger>
								<TooltipContent>
									<p>{showPassword ? 'Hide' : 'Show'} password</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>
			</FormControl>
			<FormMessage />
		</FormItem>
	);
};

export default ConfirmPasswordInput;
