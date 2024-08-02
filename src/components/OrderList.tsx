'use client';
import { Pagination, Stack, Tooltip } from '@mui/material';
import { Tag } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IOrderList } from './OrderPage';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import http from '@/libs/http/http';
import ButtonObject from '@/libs/classes/Button';
import { useSession } from '@/libs/contexts/session.context';
import { reduceString } from '@/libs/funcs/reduceString';
import JobListNotFound from './JobListNotFound';

interface Props {
    // data: IOrderList[],
    notifySuccess: (mess: string) => void;
}


const OrderList: React.FC<Props> = ({ notifySuccess }) => {

    const [orderList, setOrderList] = useState<IOrderList[] | null>(null);
    const [pages, setPages] = useState<number>(1);
    const router = useRouter();
    const curPath = usePathname();
    const query = useSearchParams();
    const { handleExpired } = useSession();
    const curPage = query.get('page');

    useEffect(() => {
        const fetchingData = async () => {
            const rs = await http.get(`hire/get-all?page=${curPage ? curPage : 1}`);
            console.log('rs in fetch data orderpage', rs);

            if (rs.error) {
                setOrderList(null);
            }

            if (rs.status == 200) {
                setOrderList(rs.content.hires);
                setPages(rs.content.page);
            } else {
                setOrderList(null);
            }
        }

        fetchingData();
    }, [curPage]);

    const handleConfirm = async (orderId: number) => {

        const isNotExpired = await ButtonObject.checkExpired();

        if (!isNotExpired) {
            handleExpired(true);
            return;
        }

        const rs = await http.patch(`hire/confirm-finish-service-by-user/${orderId}`);

        if (rs.status == 200) {
            notifySuccess(rs.mess);
            router.refresh();
        }
    }

    const handleChangePage = async (event: React.ChangeEvent<unknown>, value: number) => {
        router.push(curPath + `?page=${value}`)
    }

    if (!orderList) {
        return <div className="page__wrapper">
            <h1>Something is wrong!</h1>
        </div>
    }

    if (!orderList.length) {
        return <JobListNotFound mess="You don't have any orders. Please place one!" />
    }

    return (
        <div className='orders'>
            {
                orderList.map((order, idx: number) => {
                    return <div key={idx} className='orderItem__wrapper'>
                        <div className='p-4 flex items-center gap-3'>
                            <span className="khang__heading-his">Order ID:</span>
                            <Tag color="green">{order?.id}</Tag>
                        </div>
                        <div>
                            <table className='w-full border border-gray-200 border-collapse'>
                                <thead >
                                    <tr className='text-start'>
                                        <th className='w-1/3 py-3 px-4 border uppercase font-semibold text-sm text-start'>Job Image</th>
                                        <th className='w-1/3 py-3 px-4 border uppercase font-semibold text-sm text-start'>Job Name</th>
                                        <th className='w-1/3 py-3 px-4 border uppercase font-semibold text-sm text-start'>Service Level</th>
                                        <th className='w-1/3 py-3 px-4 border uppercase font-semibold text-sm text-start'>Price</th>
                                        <th className='w-1/3 py-3 px-4 border uppercase font-semibold text-sm text-start'>Seller Confirm</th>
                                        <th className='w-1/3 py-3 px-4 border uppercase font-semibold text-sm text-start'>Status</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    <tr>
                                        <td className='w-1/3 py-3 px-4 border border-gray-200'>
                                            <Image src={order?.Services?.Jobs?.job_image} width={100} height={100} alt='image' />
                                        </td>
                                        <td className='w-1/3 py-3 px-4 border border-gray-200'>{reduceString(order?.Services?.Jobs?.job_name.replaceAll('-', ' '))}</td>
                                        <td className='w-1/3 py-3 px-4 border border-gray-200'>{order?.Services?.service_level}</td>
                                        <td className='w-1/3 py-3 px-4 border border-gray-200'>{order?.price.toLocaleString()}</td>
                                        <td className='w-1/3 py-3 px-4 border border-gray-200'>{order?.isDone ? <Tag color="green">Done</Tag> : <Tag color="red">Not Done</Tag>}</td>
                                        <td className='w-1/3 py-3 px-4 border border-gray-200'>{order?.user_confirm ? <Tag color="green">Done</Tag> : <Tag color="red">Not Done</Tag>}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='btn__section'>
                            <button>Detail</button>
                            {
                                (order.isDone == false || order.user_confirm == false)
                                && <Tooltip title='Can only enable when order status is done'>
                                    <button
                                        disabled={!order.isDone}
                                        className={`${order.isDone ? 'active' : 'unactive'}`}
                                        onClick={() => handleConfirm(order.id)}
                                    >Confirm</button>
                                </Tooltip>
                            }
                        </div>
                    </div>
                })
            }
            <div className='paginagtion p-6'>
                <Stack>
                    <Pagination page={curPage == null ? 1 : +curPage} count={pages} onChange={handleChangePage} />
                </Stack>
            </div>
        </div>
    )
}

export default OrderList