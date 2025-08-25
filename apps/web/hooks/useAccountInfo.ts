'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import AuthAPI from '@/api/auth.api';
import useIsStartPage from '@/utils/isStartPage';
import { UserInfo } from '@repo/shared/types';

const useAccountInfo = () => {
  const pathname = usePathname();

  return useQuery<UserInfo>({
    queryKey: ['account info'],
    queryFn: () => AuthAPI.getAccountInfo(),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 30,
    retry: false,
    enabled: !useIsStartPage(pathname),
  });
};

export default useAccountInfo;
