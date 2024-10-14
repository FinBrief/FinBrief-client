import { z } from 'zod';

// Schema for Login
export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

// Schema for Signup
export const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  options: z.object({
    data: z.object({
      username: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters long' })
        .regex(/^[a-zA-Z0-9_]+$/, { message: 'Username can only contain letters, numbers, and underscores' }),
    }),
  }),
});