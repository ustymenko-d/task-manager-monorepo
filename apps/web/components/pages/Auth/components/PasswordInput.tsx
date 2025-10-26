import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import useAppStore from '@/store/store';
import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { ControllerRenderProps } from 'react-hook-form';
import { FormValues } from '@/hooks/useAuthFormType';

const PasswordInput = ({
	...field
}: ControllerRenderProps<FormValues, 'password'>) => {
	const authFormType = useAppStore((s) => s.authFormType);
	const setAuthFormType = useAppStore((s) => s.setAuthFormType);

	const [showPassword, setShowPassword] = useState(false);

	const handleForgotPassword = () => {
		setAuthFormType('forgotPassword');
	};

	const toggleShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<FormItem>
			<FormControl>
				<div className='grid gap-2'>
					<div className='flex items-center'>
						<FormLabel>Password</FormLabel>
						{authFormType === 'login' && (
							<Button
								type='button'
								onClick={handleForgotPassword}
								variant='link'
								size='none'
								className='animated-underline ml-auto inline-block rounded-none text-sm hover:no-underline'>
								Forgot your password?
							</Button>
						)}
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
										className='absolute right-0 top-1/2 flex aspect-square h-full -translate-y-1/2 items-center justify-center text-gray-500 hover:text-gray-700'>
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

export default PasswordInput;
