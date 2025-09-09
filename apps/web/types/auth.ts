import AuthValidation from '@/schemas/authForm';
import { z } from 'zod';

type Fields = 'email' | 'password' | 'confirmPassword' | 'rememberMe';

export interface FormConfig {
  fields: Fields[];
  buttonText: string;
  validationSchema: z.Schema;
  defaultValues: {
    email: string;
    password?: string;
    confirmPassword?: string;
    rememberMe?: boolean;
  };
}

export type AuthForm = 'login' | 'signup' | 'forgotPassword';

export type Email = z.infer<typeof AuthValidation.email>;
export type Password = z.infer<typeof AuthValidation.password>;
export type Credentials = z.infer<typeof AuthValidation.login>;
