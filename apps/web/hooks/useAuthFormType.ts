'use client';

import { useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { z } from 'zod';

import { formConfig } from '@/const';
import useAppStore from '@/store/store';
import { ResponseState } from '@/types/common';

type AuthFormType = keyof typeof formConfig;

type Config = (typeof formConfig)[AuthFormType];
type Schema = Config['validationSchema'];
export type FormValues = z.infer<Schema>;

export function useAuthFormType() {
	const authFormType = useAppStore((s) => s.authFormType);
	const [loading, setLoading] = useState<ResponseState>('default');
	const config = formConfig[authFormType];

	const authForm: UseFormReturn<FormValues> = useForm<FormValues>({
		resolver: zodResolver(config.validationSchema),
		defaultValues: config.defaultValues,
	});

	useEffect(() => {
		authForm.reset(config.defaultValues as typeof config.defaultValues);
		setLoading('default');
	}, [authForm, config]);

	return {
		authFormType,
		authForm,
		config,
		loading,
		setLoading,
	};
}
