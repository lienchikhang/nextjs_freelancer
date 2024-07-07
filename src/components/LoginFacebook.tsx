'use client';
import { useUser } from '@/libs/contexts/user.context';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'

const LoginFacebook = () => {

    const query = useSearchParams();
    const { login } = useUser();


    useEffect(() => {
        const data = query.get('user')


        if (data) {
            const user = JSON.parse(data);
            localStorage.setItem('root::user', JSON.stringify(user.info));
            login(user.info);

            //call api
            fetch(`/api/auth`, {
                method: 'POST',
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: user.token, user: user.info }),
            });
        }
    }, []);

    return (
        <div>
            <button>Continue</button>
        </div>
    )
}

export default LoginFacebook