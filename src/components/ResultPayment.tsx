'use client';
import http from '@/libs/http/http';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const ResultPayment = () => {

    useEffect(() => {
        const local = localStorage.getItem('order');

        if (local) {
            const fetchHireService = async () => {
                await http.post(`hire/pay-with-vnpay`, {
                    serviceId: JSON.parse(local).id,
                    method: 'VNPay',
                }).then((res) => {
                    console.log('res in payright', res);
                }).finally(() => {
                    // window.location.reload();
                })
            }
            fetchHireService();
        }
    }, [])

    console.log('render')

    return (
        <div>Thank you for using our service.</div>
    )
}

export default ResultPayment