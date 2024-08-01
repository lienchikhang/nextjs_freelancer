import OrderPage from '@/components/OrderPage';
import { Metadata } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { cookies } from 'next/headers';

interface Params extends ParsedUrlQuery {
    slug: string;
    id: string;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = params;

    return {
        title: `${decodeURIComponent(slug as string)} | Orders`,
        description: `Details about Order: ${slug}`,
    };
}

// async function fetchingData({ params }: { params: Params }) {
//     const result = await Promise.all([
//         //fetch check role ? seller
//         fetch(`http://localhost:8080/hire/get-all`, {
//             method: 'GET',
//             credentials: 'include',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Access-Control-Allow-Credentials': 'true',
//                 'Cookie': `token=${cookies().get('token')?.value}`,
//             },
//         }).then((res) => res.json()).catch((err) => {
//             return {
//                 data: null,
//                 error: true,
//             }
//         }),
//         fetch(`http://localhost:8080/service/get-all-by-seller`, {
//             method: 'GET',
//             credentials: 'include',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Access-Control-Allow-Credentials': 'true',
//                 'Cookie': `token=${cookies().get('token')?.value}`,
//             },
//         }).then((res) => res.json()).catch((err) => {
//             return {
//                 data: null,
//                 error: true,
//             }
//         }),
//     ]);
//     return result;
// }

const OrderWrapperPage = async ({ params }: { params: Params }) => {
    // const data = await fetchingData({ params });
    return <OrderPage />
}

export default OrderWrapperPage