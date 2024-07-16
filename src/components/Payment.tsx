'use client';
import { Field, Label, Radio, RadioGroup } from '@headlessui/react'
import React, { useContext, useEffect, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { updateMethod } from '@/libs/reduxStore/order.slice';
import { useDispatch } from 'react-redux';
import PaymentLeft from './PaymentLeft';
import PaymentRight from './PaymentRight';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SessionExpired from './SessionExpired';
import { ChakraProvider } from '@chakra-ui/react';


const Payment = () => {

    const notifySuccess = (mess: string) => toast.success(mess);
    const notifyError = (mess: string) => toast.error(mess);

    return (
        <React.Fragment>
            <ToastContainer />
            <ChakraProvider>
                <SessionExpired />
            </ChakraProvider>
            <div className='payment__wrapper'>
                <PaymentLeft />
                <PaymentRight notifySuccess={notifySuccess} notifyError={notifyError} />
            </div>
        </React.Fragment>
    )
}

export default Payment