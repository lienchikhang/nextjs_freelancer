import ServicePageComponent from '@/components/ServicePageComponent';
import { Metadata } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

interface Params extends ParsedUrlQuery {
    slug: string;
    id: string;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = params;


    return {
        title: `${decodeURIComponent(slug as string)} | Services`,
        description: `Details about Order: ${slug}`,
    };
}

const ServicePage = () => {
    return <ServicePageComponent />;

}

export default ServicePage