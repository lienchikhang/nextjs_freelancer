'use client';
import http from '@/libs/http/http';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import JobListNotFound from './JobListNotFound';
import Image from 'next/image';
import { Avatar, Pagination, Stack } from '@mui/material';
import { Tag } from 'antd';
import ButtonObject from '@/libs/classes/Button';
import { useSession } from '@/libs/contexts/session.context';

interface IService {
    Hires: {
        id: number,
        Users: {
            avatar: string,
            full_name: string,
        },
        isDone: boolean,
    }[],
    id: number,
    price: number,
    service_level: string,
}


const ServiceList = () => {

    const [detailService, setDetailService] = useState<IService | null>(null);
    const router = useRouter();
    const curPath = usePathname();
    const query = useSearchParams();
    const { handleExpired } = useSession();
    const curPage = query.get('page');


    useEffect(() => {
        const fetchingData = async () => {
            const rs = await http.get(`hire/get-detail-service-by-seller/${query.get('id')}?page=${curPage ? +curPage : 1}`);
            console.log('rs in fetch data servieList', rs);

            if (rs.error) {
                setDetailService(null);
            }

            if (rs.status == 200) {
                setDetailService(rs.content);
            } else {
                setDetailService(null);
            }
        }

        fetchingData();
    }, [curPage]);

    if (!detailService) {
        return <h1>Something is wrong!</h1>
    }

    if (!detailService.Hires.length) {
        return (
            <div className='services__wrapper'>
                <div className='service__info'>
                    <p>{detailService.service_level}</p>
                    <p>{detailService.price}</p>
                </div>
                <JobListNotFound mess="There's no order" />
            </div>
        )
    }

    const handleConfirm = async (hireId: number) => {
        const isNotExpired = await ButtonObject.checkExpired();

        if (!isNotExpired) {
            handleExpired(true);
            return;
        }

        console.log('click ', hireId);

        const rs = await http.patch(`hire/finish-service-by-seller/${hireId}`);

        console.log('rs in confirm seller', rs);

        if (rs.status == 200) {

            const idxLooking = detailService.Hires.findIndex((hire) => hire.id == hireId)

            const filterArr = detailService.Hires.map((hire, idx) => {
                if (idx == idxLooking) {
                    return {
                        ...hire,
                        isDone: true,
                    }
                }
                else {
                    return { ...hire, }
                }
            });

            const cloneDetail = { ...detailService };
            cloneDetail.Hires = [...filterArr];

            setDetailService(cloneDetail);
        }

    }

    return (
        <div className='services__wrapper'>
            <table className=' border border-gray-200 border-collapse'>
                <thead>
                    <tr>
                        <th className='w-1/3 py-3 px-4 uppercase font-semibold text-sm text-start'>User</th>
                        <th className='w-1/3 py-3 px-4 uppercase font-semibold text-sm text-start'>Status</th>
                        <th className='w-1/3 py-3 px-4 uppercase font-semibold text-sm text-start'>Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {
                        detailService.Hires.map((hire, idx: number) => {
                            return <tr key={idx}>
                                <td className='w-1/3 py-3 px-4 border border-gray-200'>
                                    <div className='flex gap-4 items-center'>
                                        {
                                            hire.Users.avatar ? <Avatar className='item__avatar' src={hire.Users.avatar} /> : <Avatar className='item__avatar'>{hire.Users.full_name[0]}</Avatar>
                                        }
                                        <p className='item__name'>{hire.Users.full_name}</p>
                                    </div>
                                </td>
                                <td className='w-1/3 py-3 px-4 border border-gray-200'>

                                    <div>
                                        {hire.isDone ? <Tag color='green'>Done</Tag> : <Tag color='red'>Not Done</Tag>}
                                    </div>
                                </td>
                                <td className='w-1/3 py-3 px-4 border border-gray-200'>
                                    <button onClick={() => handleConfirm(hire.id)} disabled={hire.isDone} className={`btn__done ${hire.isDone ? 'unactive' : 'active'}`}>Done</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ServiceList