'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import FoldersAPI from '@/api/folders.api';
import useIsStartPage from '@/utils/isStartPage';
import { GetFoldersResponse } from '@repo/api/types';
import { GetFoldersRequest } from '@/types/folders';

const useFetch = (params: GetFoldersRequest) => {
  const pathname = usePathname();

  return useQuery<
    GetFoldersResponse,
    Error,
    GetFoldersResponse,
    [string, GetFoldersRequest]
  >({
    queryKey: ['folders', params],
    queryFn: () => FoldersAPI.getFolders(params),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 30,
    retry: false,
    enabled:
      !useIsStartPage(pathname) ||
      pathname.startsWith('/settings') ||
      pathname.startsWith('/home'),
  });
};
export default useFetch;
