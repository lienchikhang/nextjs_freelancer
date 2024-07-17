'use client';
import React from 'react';
import '../styles/paymentResult.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useRouter } from 'next/navigation';

const ResultPayment = () => {

    const router = useRouter();

    const handleClick = () => {
        router.push('/search')
    }

    return (
        <div className='payment__wrapper'>
            <CheckCircleIcon className='successful__icon' />
            <h1>Payment successful</h1>
            <p>Thank you for using our service!</p>
            <button onClick={handleClick}>Continue <NavigateNextIcon /></button>
        </div>
    )
}

export default ResultPayment