import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import http from './libs/http/http';

export async function middleware(request: NextRequest) {

    //get token
    const cookieStore = request.cookies.get('token');

    console.log('cookieStore', cookieStore);

    if (cookieStore) {
        const token = cookieStore.value;

        console.log('tokeeeen', token);
        //validate token
        const rs = await fetch(`http://localhost:8080/auth/check`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': token,
            },
            credentials: 'include'
        })

        console.log('rs in midd', rs);

        if (rs.status == 200) {
            //case go to login => back to home
            //case go to register => back to home
            //case go to profile => pass
            NextResponse.next();
        } else
            NextResponse.redirect(new URL('/auth/login', request.url))
    }

    return NextResponse.redirect(new URL('/auth/login', request.url))
}

export const config = {
    matcher: [
        // '/auth/login',
        // '/auth/register',
        // '/me',
        '/payment/:path*'
    ]
}