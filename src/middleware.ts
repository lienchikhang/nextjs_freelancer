import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import http from './libs/http/http';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {

    //get token
    const cookieStore = request.cookies.get('token');

    console.log('cookieStore', cookieStore);
    console.log('next_url', request.nextUrl);
    console.log('url', request.url);


    if (cookieStore) {

        //validate token
        const rs = await http.post('auth/check', cookieStore);

        console.log('resssss', rs)

        if (rs.status == 200) {
            //case go to login => back to home
            if (request.nextUrl.pathname.includes('login')) return NextResponse.redirect(new URL('/', request.url))
            //case go to register => back to home
            if (request.nextUrl.pathname.includes('register')) return NextResponse.redirect(new URL('/', request.url))
            //case go to profile => pass
            return NextResponse.next();
        } else {
            if (!request.nextUrl.pathname.includes('login')) return NextResponse.redirect(new URL('/auth/login', request.url))
        }
    } else {
        if (!request.nextUrl.pathname.includes('login')) return NextResponse.redirect(new URL('/auth/login', request.url))
    }
}

export const config = {
    matcher: [
        '/auth/:path*',
        '/me',
        '/payment/:path*'
    ]
}