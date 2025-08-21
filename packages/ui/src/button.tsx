'use client';

import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export const Button = ({
  children,
  className,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => (
  <button className={className} {...props}>
    {children}
  </button>
);
