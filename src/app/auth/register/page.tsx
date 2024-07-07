import ArticleRegister from '@/components/ArticleRegister'
import React from 'react';
import '../../../styles/register.scss';
import RegisterSection from '@/components/RegisterSection';

const page = () => {
    return (
        <div className='regisPage'>
            <ArticleRegister />
            <RegisterSection />
        </div>
    )
}

export default page