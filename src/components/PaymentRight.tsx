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
import { IStateOrder, IStateUser } from '@/libs/interfaces/state.interface';
import http from '@/libs/http/http';
import { updateMethod } from '@/libs/reduxStore/order.slice';
import { useUser } from '@/libs/contexts/user.context';
import { useOrder } from '@/libs/contexts/order.context';
import ButtonObject from '@/libs/classes/Button';
import { useSession } from '@/libs/contexts/session.context';


interface Props {
    notifyError: (mess: string) => void;
    notifySuccess: (mess: string) => void;
}

const PaymentRight: React.FC<Props> = ({ notifyError, notifySuccess }) => {
    const [isPaid, setIsPaid] = useState(false);
    const { handleExpired } = useSession();
    const { user, logout } = useUser();
    const { order, createOrder } = useOrder();
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const local = localStorage.getItem('order');
        if (local) {
            const payload = JSON.parse(local);
            createOrder(payload);
        }
    }, [])

    const handleConfirm = async () => {
        if (!order) return;
        if (isPaid) return;
        if (!user) {
            console.log('not login')
            notifyError('Please login to do this action!')
            return;
        }

        const isNotExpired = await ButtonObject.checkExpired();

        if (!isNotExpired) {
            handleExpired(true);
            return;
        }

        console.log('userrr', user)

        const payment = new Payment(new Balance());

        if (order.method.toUpperCase() == PAYMENT.VNPAY) {
            payment.setStrategy(new VNPay());
            dispatch(
                updateMethod(PAYMENT.VNPAY)
            )
        }

        //make payment
        const rs = await payment.make({
            serviceId: order.id,
            method: order.method,
            name: order.name,
            jobId: order.jobId,
            email: user.email,
        }, order.price);

        console.log('res in payment right', rs);

        if (rs.status == 401) {
            localStorage.removeItem('root::user');
            notifyError(rs.mess);
            logout();
        }

        if (rs.status == 400) {
            notifyError(rs.mess);
        }

        //go back to home
        if (order.method.toUpperCase() == 'VNPAY' && rs.status == 200) {
            router.push(rs.content);
        }

        if (order.method.toUpperCase() == 'BALANCE' && rs.status == 200) {
            router.push('/payment/result');
        }
    }

    if (!order) {
        return <h1>Oops! There is something wrong here. Please try again!</h1>
    }

    return (
        <div className='payment__right'>
            <div className="infomation">
                <div className='infomation__top'>
                    {order?.image ?
                        <Image src={order?.image} alt={order?.name} width={50} height={50} /> :
                        <Image src={'/images/notfound.jpeg'} alt="notfound" width={50} height={50} />
                    }
                    {order?.name && <p>{order?.name.replaceAll('-', ' ')}</p>}
                </div>
                <div className='infomation__bottom'>
                    {order?.level && <p className='type'>{order?.level}</p>}
                    <div className='price'>
                        {order ? <p>{order?.price.toLocaleString()}</p> : <p>x.xxx.xxx</p>}
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
                    {order ? <p>{(order?.price).toLocaleString()}</p> : <p>x.xxx.xxx</p>}
                </div>
                <button className={`${order ? 'active' : 'disable'} ${isPaid ? 'done' : ''}`} onClick={handleConfirm}>{isPaid ? 'Thank you' : 'Confirm & Pay'}</button>
            </div>
        </div>
    )
}

export default PaymentRight