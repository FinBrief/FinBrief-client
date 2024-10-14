import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Dont write anything here

  const {
    data: { user },
  } = await supabase.auth.getUser()

  //console.log(user)
  /*
  if(!user &&request.nextUrl.pathname.startsWith('/profile')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    console.log("zz")
    return NextResponse.redirect(url)
  }
  
  if (user) {
    // Fetching user from db
    const appUser = await prisma.user.findUnique({
      where: { id: user.id },
    })

    if (!appUser) {
      // User not found, redirect to login
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    if (appUser.role === 'admin' && request.nextUrl.pathname.startsWith('/admin')) {
      // Allow access to admin routes
      return supabaseResponse
    }

    if (appUser.role !== 'admin' && request.nextUrl.pathname.startsWith('/admin')) {
      // Redirect non-admin users attempting to access admin routes
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
    
  }*/

  return supabaseResponse
}

/*
Caching User Data: To reduce database calls, consider caching user data in memory or using a caching layer like Redis.
Batching Requests: If multiple middleware functions require similar data, batch requests to optimize performance.
*/