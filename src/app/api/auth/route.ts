import { NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {

    const payload = await new Response(req.body).json();

    console.log('payload in api rout', payload);

    if (!payload.token || !payload.user) {
        return res.status(400).json({ message: 'Cookie not found!' });
    }

    const response = NextResponse.json({ message: 'Cookie set successfully' }, { status: 200 });
    response.cookies.set('token', payload.token, {
        path: '/',
        httpOnly: true,
    });


    return response;
}

export async function DELETE(req: Request, res: NextApiResponse) {
    // Clear the token cookie by setting its expiration date to a past date

    const response = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
    response.cookies.set('token', '', {
        path: '/',
        httpOnly: true,
    });


    return response;
}