import Gig from '@/components/GigPage'
import ProfilePage from '@/components/ProfilePage';
import http from '@/libs/http/http';
import { IGig } from '@/libs/interfaces/gig.interface';
import { GetServerSideProps, Metadata } from 'next';
import { cookies } from 'next/headers';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import '../../../styles/profile.scss';

interface Params extends ParsedUrlQuery {
    slug: string;
    id: string;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = params;

    return {
        title: `${decodeURIComponent(slug as string)} | Freelancer`,
        description: `Details about Gig: ${slug}`,
    };
}

async function fetchingData({ params }: { params: Params }) {
    const result = await Promise.all([
        fetch(`http://localhost:8080/user/getInfo`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                'Cookie': `token=${cookies().get('token')?.value}`,
            },
        }).then((res) => res.json()).catch((err) => {
            return {
                data: null,
                error: true,
            }
        }),
        fetch(`http://localhost:8080/skill/get-all`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                'Cookie': `token=${cookies().get('token')?.value}`,
            },
        }).then((res) => res.json()).catch((err) => {
            return {
                data: null,
                error: true,
            }
        }),
        fetch(`http://localhost:8080/certification/get-all`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                'Cookie': `token=${cookies().get('token')?.value}`,
            },
        }).then((res) => res.json()).catch((err) => {
            return {
                data: null,
                error: true,
            }
        }),
    ]);
    return result;
}

const Profile = async ({ params }: { params: Params }) => {
    const data = await fetchingData({ params });
    return <ProfilePage data={data} />
}

export default Profile