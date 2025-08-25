import { LucideIcon } from 'lucide-react';

export type ResponseState = 'default' | 'pending' | 'success' | 'error';

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  description: string;
};

export interface EditorSettings<T> {
  open: boolean;
  mode: 'create' | 'edit';
  target: T | null;
}

export interface RecaptchaToken {
  recaptchaToken: string;
}
