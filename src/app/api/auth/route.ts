import { cookies } from "next/headers";

export async function POST(req: Request) {

    const payload = await new Response(req.body).json();

    console.log('payload in api rout', payload);

    if (!payload.token || !payload.user) {
        return Response.json({
            message: 'Không nhận được sessionToken'
        }, {
            status: 400,
        });
    }

    cookies().set('token', payload.token);

    return Response.json(payload, {
        status: 200,
        headers: {
            'Set-Cookie': `token=${payload.token}; Path=/`
        }
    })
}