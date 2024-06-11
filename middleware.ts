import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from './lib/supabase/middleware'
import { a } from '@react-spring/three'
const user_regex = new RegExp(/\/((user.*)|(online.*))/) // add (examples\/.*) in prod
const admin_redex = new RegExp(/\/admin.*/)
const creator_redex = new RegExp(/\/((creator.*))/) //add (examples\/create.*) in prod
const user_access = ["user", "random"]
const admin_access = ["admin", "creator","user", "random"]
const creator_access = ["creator", "user", "random"]
export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request)
  const role = user?.user_metadata.role
  const pathname = request.nextUrl.pathname
  let acces_lvl;
  let nescessary_access;
  switch (role) {
    case "admin":
      acces_lvl = admin_access
      break;
    case "creator":
      acces_lvl = creator_access
      break;
    case "user":
      acces_lvl = user_access
      break;
    default:
      acces_lvl = ["random"]
      break;
  }
  if (user){
    acces_lvl = user_access
  }
  if (admin_redex.test(pathname) && !acces_lvl.includes("admin")) {
    console.log("match")
    return NextResponse.redirect(new URL('/error', request.url), 307)
  }
  if (creator_redex.test(pathname) && !acces_lvl.includes("creator")) {
    return NextResponse.redirect(new URL('/error', request.url), 307)
  }
  if (user_regex.test(pathname) && !acces_lvl.includes("user")) {
    return NextResponse.redirect(new URL('/error', request.url), 307)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ],
}