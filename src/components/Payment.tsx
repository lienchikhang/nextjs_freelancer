import { Field, Label, Radio, RadioGroup } from '@headlessui/react'
import React, { useContext, useEffect, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { updateMethod } from '@/libs/reduxStore/order.slice';
import { useDispatch } from 'react-redux';
import PaymentLeft from './PaymentLeft';
import PaymentRight from './PaymentRight';


const Payment = () => {

    return (
        <React.Fragment>
            <PaymentLeft />
            <PaymentRight />
        </React.Fragment>
    )
}

export default Payment