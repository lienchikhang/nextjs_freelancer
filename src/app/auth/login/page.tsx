import LoginSection from '@/components/LoginSection'
import React from 'react';
import ArticalDefault from '@/components/ArticleDefault';
import '../../../styles/login.scss';

const LoginPage = () => {
    return (
        <div className='loginPage'>
            <ArticalDefault />
            <LoginSection />
        </div>
    )
}

export default LoginPage