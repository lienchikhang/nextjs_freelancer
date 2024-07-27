'use client';
import { useUser } from '@/libs/contexts/user.context';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import '../styles/loginSuccessPage.scss';

const LoginFacebook = () => {

    const query = useSearchParams();
    const { login } = useUser();
    const router = useRouter();

    const handleClick = () => {
        router.push('/search')
    }


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

        setTimeout(() => {
            router.push('/search');
        }, 1000)
    }, []);

    return (
        <div className='login-success__wrapper'>
            <CheckCircleIcon className='successful__icon' />
            <h1>Login successful</h1>
            <button onClick={handleClick}>Continue <NavigateNextIcon /></button>
        </div>
    )
}

export default LoginFacebook