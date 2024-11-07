'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import prisma from '@/utils/db/prisma'
import { loginSchema, signupSchema } from '@/lib/zodAuth'
import { toast } from 'sonner'


const supabase = createClient()

// Login
export async function login(formData: FormData) {
  const data = {
    email: formData.get('email')?.toString() || '',
    password: formData.get('password')?.toString() || '',
  }

  const parseResult = loginSchema.safeParse(data)

  if (!parseResult.success) {
    return { error: parseResult.error.message }
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log('Supabase Login Error:', error.message)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/feed/custom')
}


// Signup
export async function signup(formData: FormData) {
  const data = {
    email: formData.get('email')?.toString() || '',
    password: formData.get('password')?.toString() || '',
    options: { 
      data: {
        username: formData.get('username')?.toString() || '',
      }
    }
  }

  const parseResult = signupSchema.safeParse(data)

  if (!parseResult.success) {
    console.log('Signup Validation Error:', parseResult.error.message)
    redirect('/error')
  }

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp(data)

  if (signUpError) {
    console.log('Supabase Signup Error:', signUpError.message)
    redirect('/error')
  }

  if (signUpData.user) {
    const supabaseId = signUpData.user.id

    const addUserDB = await prisma.user.create({
      data: {
        supabaseId: supabaseId,
        email: data.email,
        username: data.options.data.username
      }
    })
    console.log('User added to database:', addUserDB)
  } else {
    console.log('No user data received from Supabase')
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/feed/custom')
}

// Signout
export async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log('Supabase Signout Error:', error.message)
    return false;
  }

  revalidatePath('/', 'layout')
  return true;
}

// Randomly works then doesnt....change to clerk maybe
export async function signInWithGoogle() {
  console.log('Signing in with Google')
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `http://localhost:3000/auth/callback`,
    },
  })

  if (error) {
    console.log('Supabase Signin with Google Error:', error.message)
    redirect('/error')
  }

  if (data.url) {
    redirect(data.url)
  }
}
