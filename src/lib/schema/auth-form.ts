import {z} from 'zod';

import {AuthFormType} from '@/types';

export const authFormSchema = (formType: AuthFormType) => {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === 'register'
        ? z.string().min(2).max(50)
        : z.string().optional()
  });
};

export type AuthFormData = z.infer<ReturnType<typeof authFormSchema>>;
