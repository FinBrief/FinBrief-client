'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import prisma from '@/utils/db/prisma'
import { loginSchema, signupSchema } from '@/lib/zodAuth'

// Login
export async function login(formData: FormData) {
  const supabase = createClient()

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
  redirect('/feed')
}


// Signup
export async function signup(formData: FormData) {
  const supabase = createClient()

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
  redirect('/feed')
}

// Signout
export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

// Get user

// Delete user

// Update user
