import Gig from '@/components/GigPage'
import http from '@/libs/http/http';
import { IGig } from '@/libs/interfaces/gig.interface';
import { GetServerSideProps, Metadata } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react'

interface Params extends ParsedUrlQuery {
    slug: string;
    id: string;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = params;

    return {
        title: `${decodeURIComponent(slug as string)}`,
        description: `Details about Gig: ${slug}`,
    };
}

async function fetchingData({ params }: { params: Params }) {
    const result = await Promise.all([
        http.get(`job/get/${params.id}`),
        http.get(`comment/get/${params.id}`),
        http.get(`service/get-by-job-id/${params.id}`),
    ]);
    console.log({ result });
    return result;
}

const GigPage = async ({ params }: { params: Params }) => {
    const data = await fetchingData({ params });
    return <Gig data={data} />
}

export default GigPage