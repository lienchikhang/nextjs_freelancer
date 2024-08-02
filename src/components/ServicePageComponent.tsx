'use client';
import React from 'react';
import '../styles/servicePage.scss';
import ProgressSection from './Progress';
import ServiceList from './ServiceList';
import { useSearchParams } from 'next/navigation';

const ServicePageComponent = () => {

    const query = useSearchParams();

    return (
        <div className='service__wrapper'>
            <div className="servicePage__wrapper">
                <div className="service__progress">
                    <ProgressSection label='Services' apiSegment={`hire/count-all-seller?serviceId=${query.get('id')}`} />
                </div>
                <div className="service__list">
                    <ServiceList />
                </div>
            </div>
        </div>
    )
}

export default ServicePageComponent