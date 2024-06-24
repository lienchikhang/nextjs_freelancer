import { cookies } from "next/headers";

export async function POST(req: Request) {

    const payload = await new Response(req.body).json();


    if (!payload.token || !payload.user) {
        return Response.json({
            message: 'Không nhận được sessionToken'
        }, {
            status: 400,
        });
    }

    cookies().set('full_name', payload.user.full_name);
    cookies().set('avatar', payload.user.avatar);

    return Response.json(payload, {
        status: 200,
        headers: {
            'Set-Cookie': `token=${payload.token}; Path=/`
        }
    })
}