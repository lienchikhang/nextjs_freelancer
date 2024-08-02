'use client';
import React, { useEffect, useState } from 'react';
import ProfileInfo from './ProfileInfo';
import UserGig from './UserGig';
import RegisterSeller from './RegisterSeller';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, ChakraProvider, useDisclosure } from '@chakra-ui/react';
import SessionExpired from './SessionExpired';
import http from '@/libs/http/http';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ButtonObject from '@/libs/classes/Button';
import { useSession } from '@/libs/contexts/session.context';

interface IResponse {
    status: number,
    mess: string,
    content: any,
    date: Date,
}

interface Props {
    data: any[]
}

interface IGig {
    id: number,
    job_image: string,
    job_name: string,
    job_desc: string,
    Services: {
        id: number,
        price: number,
        serviceDesc: string,
        serviceBenefit: string,
        serviceLevel: string,
        deliveryDate: 0,
    }[],
}

const ProfilePage: React.FC<Props> = ({ data }) => {

    console.log('data aaaa', data);

    if (data[0]?.error
        || data[1]?.error
        || data[2]?.error
        || data[0].status == 404
        || data[1].status == 404
        || data[2].status == 404
    ) {
        return <div className="gig__wrapper">
            <h1>Something is wrong!</h1>
        </div>
    }

    return (
        <React.Fragment>
            <div className='profile__wrapper'>
                <div className='profile__main'>
                    <div className='profile__info'>
                        <ProfileInfo data={data[0]} skill={data[1]} certi={data[2]} />
                    </div>
                    <div className='profile__jobList'>
                        <div className='jobList__tile'>
                            <h2>Your job</h2>
                        </div>
                        <UserGig />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProfilePage