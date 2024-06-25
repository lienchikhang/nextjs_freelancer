'use client';
import { useDrawer } from '@/libs/contexts/drawerConfirm.context';
import { useOrder } from '@/libs/contexts/order.context';
import { IService } from '@/libs/interfaces/gig.interface';
import React, { useState } from 'react';

interface Props {
    data: IService,
    job: {
        image: string,
        name: string,
        jobId: number,
    }
}

const HireButton: React.FC<Props> = ({ data, job }) => {

    const { createOrder } = useOrder();
    const { toggleDrawer } = useDrawer();

    const handleClick = () => {

        const payload = {
            id: data.id,
            price: data.price,
            name: job.name,
            image: job.image,
            level: data.service_level,
            jobId: job.jobId,
            method: 'BALANCE',
        }

        createOrder(payload)
        toggleDrawer(true);

    }

    return (
        <button onClick={handleClick}>
            Continue
        </button>
    )
}

export default HireButton