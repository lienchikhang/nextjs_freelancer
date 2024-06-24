"use client";
import { Skeleton } from '@mui/material';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { PAYMENT } from '@/libs/enums/payment.enum';
import { Payment, Balance, VNPay } from '@/libs/classes/Payment';
import { setUser } from '@/libs/reduxStore/user.slice';
import { toggleModal } from '@/libs/reduxStore/authModal.slice';
import { IStateOrder } from '@/libs/interfaces/state.interface';
import http from '@/libs/http/http';
import { updateMethod } from '@/libs/reduxStore/order.slice';


interface Props {
}

interface IState {
    order: {
        id: number,
        price: number,
        name: string,
        image: string,
        level: string,
        method: string,
        jobId: number,
    },
}

const PaymentRight: React.FC<Props> = ({ }) => {

    const selector = useSelector<IState>(state => state.order) as IStateOrder;
    const [isPaid, setIsPaid] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleConfirm = async () => {
        if (!selector.id || !selector.method) return;

        if (isPaid) return;

        if (!Cookies.get('token')) {
            console.log('not login')
            dispatch(
                toggleModal(true)
            )
            return;
        }

        const payment = new Payment(new Balance());

        if (selector.method.toUpperCase() == PAYMENT.VNPAY) {
            payment.setStrategy(new VNPay());
            dispatch(
                updateMethod(PAYMENT.VNPAY)
            )
        }

        //make payment
        const rs = await payment.make({
            serviceId: selector.id,
            method: selector.method,
            name: selector.name,
            jobId: selector.jobId,
        }, selector.price)

        if (rs.status == 401) {
            dispatch(
                setUser({
                    full_name: '',
                    avatar: ''
                })
            );

            Cookies.remove('full_name');
            Cookies.remove('avatar');
            Cookies.remove('token');

            window.location.reload();
        }

        //go back to home
        if (rs.status == 200) {
            router.push(rs.content);
        }
    }

    return (
        <div className='payment__right'>
            <div className="infomation">
                <div className='infomation__top'>
                    {selector?.image ?
                        <Image src={selector?.image} alt={selector?.name} width={50} height={50} /> :
                        <Image src={'/images/notfound.jpeg'} alt="notfound" width={50} height={50} />
                    }
                    {selector?.name && <p>{selector?.name.replaceAll('-', ' ')}</p>}
                </div>
                <div className='infomation__bottom'>
                    {selector?.level && <p className='type'>{selector?.level}</p>}
                    <div className='price'>
                        {selector ? <p>{selector?.price.toLocaleString()}</p> : <p>x.xxx.xxx</p>}
                    </div>
                </div>
            </div>
            <div className='checkout'>
                <div className='service'>
                    <p>Service fee</p>
                    <p>0</p>
                </div>
                <div className='total'>
                    <p className='checkout__total'>Total</p>
                    {selector ? <p>{(selector?.price).toLocaleString()}</p> : <p>x.xxx.xxx</p>}
                </div>
                <button className={`${selector ? 'active' : 'disable'} ${isPaid ? 'done' : ''}`} onClick={handleConfirm}>{isPaid ? 'Thank you' : 'Confirm & Pay'}</button>
            </div>
        </div>
    )
}

export default PaymentRight