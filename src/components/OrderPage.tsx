'use client';
import React from 'react';
import '../styles/userOrders.scss';
import ProgressSection from './Progress';
import { Box, Pagination, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import OrderList from './OrderList';
import ServiceList from './ServiceList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Props {
    // data: any[]
}

export interface IOrderList {
    id: number,
    price: number,
    isDone: boolean,
    user_confirm: boolean,
    Services: {
        id: number,
        Jobs: {
            job_name: string,
            job_image: string,
        },
        service_level: string,
    }
}

const OrderPage: React.FC<Props> = ({ }) => {

    const [value, setValue] = React.useState(0);
    const theme = useTheme();

    const notifySuccess = (mess: string) => toast.success(mess);

    return (
        <div className="page__wrapper">
            <ToastContainer />
            <div className='order__wrapper'>
                <ProgressSection label='Orders' apiSegment='hire/count-all' />
                <div className='list__wrapper'>
                    <OrderList notifySuccess={notifySuccess} />
                </div>
            </div>
        </div>
    )
}

export default OrderPage