import LoginFacebook from '@/components/LoginFacebook'
import React from 'react';

interface ExamplePageProps {
    query: { [key: string]: string | string[] };
}

const LoginFacebookPage = () => {
    return <LoginFacebook />
}

export default LoginFacebookPage