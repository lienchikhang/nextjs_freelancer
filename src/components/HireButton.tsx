'use client';
import { IService } from '@/libs/interfaces/gig.interface';
import { toggle } from '@/libs/reduxStore/drawer.slide';
import { setOrder } from '@/libs/reduxStore/order.slice';
import React from 'react';
import { useDispatch } from 'react-redux';

interface Props {
    data: IService,
    job: {
        image: string,
        name: string,
    }
}

const HireButton: React.FC<Props> = ({ data, job }) => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(
            setOrder({
                id: data.id,
                price: data.price,
                name: job.name,
                image: job.image,
                level: data.service_level,
            })
        )

        dispatch(
            toggle(true)
        )
    }

    return (
        <button
            onClick={handleClick}
        >
            Continue
        </button>
    )
}

export default HireButton