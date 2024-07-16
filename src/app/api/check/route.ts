import http from "@/libs/http/http";
import { NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: NextApiResponse) {

    const cookieStore = req.cookies.get('token')?.value;

    console.log('cookiesssss', cookieStore);

    if (!cookieStore) return NextResponse.json({
        status: 401,
        mess: 'UnAuthorized',
    });


    const rs = await http.post('auth/check', {
        name: 'token',
        value: cookieStore,
    });

    console.log('res in check api route', rs);

    if (rs) return NextResponse.json({
        status: 200,
        mess: 'Passed',
        content: true,
    });

    return NextResponse.json({
        status: 403,
        mess: 'Failed',
        content: false,
    });
}
