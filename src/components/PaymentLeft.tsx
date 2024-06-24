'use client';
import { Field, Label, Radio, RadioGroup } from '@headlessui/react'
import React, { useContext, useEffect, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { setOrder, updateMethod } from '@/libs/reduxStore/order.slice';
import { useDispatch } from 'react-redux';

interface Plan {
    name: string;
    ram: string;
    cpus: string;
    disk: string;
}

const plans = [
    { name: 'Balance', ram: '12GB', cpus: '6 CPUs', disk: '256GB SSD disk' },
    { name: 'VNPay', ram: '16GB', cpus: '8 CPUs', disk: '512GB SSD disk' },
]

const PaymentLeft = () => {

    let [selected, setSelected] = useState<Plan>(plans[0]);
    const dispatch = useDispatch();

    useEffect(() => {
        const local = localStorage.getItem('order');
        if (local) {
            const orderPayload = JSON.parse(local);
            dispatch(
                setOrder({
                    id: orderPayload.id,
                    price: orderPayload.price,
                    name: orderPayload.name,
                    image: orderPayload.image,
                    level: orderPayload.service_level,
                    jobId: orderPayload.jobId,
                    method: orderPayload.method,
                })
            )
            dispatch(
                updateMethod(plans[0].name.toUpperCase())
            )
        }
    }, [])

    const handleChangePlan = (value: Plan) => {
        console.log('selected', value);
        setSelected(value);
        dispatch(
            updateMethod(value.name.toUpperCase())
        )
    }

    return (
        <div className='payment__left'>
            <div className='left__wrapper'>
                <div className="infomation">
                    <div className="info__heading">
                        <h2>Billing information</h2>
                    </div>
                    <div className="info__body">
                        <div>
                            <p>Your invoice will be issued according to the details listed here.</p>
                            <button>Add details</button>
                        </div>
                    </div>
                </div>
                <div className="options">
                    <div className="option__heading">
                        <h2>Payment Options</h2>
                    </div>
                    <div className="option__body">
                        <div className="w-full max-w-md">
                            <RadioGroup value={selected} onChange={handleChangePlan} aria-label="Server size" className="space-y-2">
                                {plans.map((plan) => (
                                    <Radio
                                        key={plan.name}
                                        value={plan}
                                        className="option__item group relative flex cursor-pointer rounded-lg bg-white/5 py-4 px-5 text-white shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
                                    >
                                        <div className="flex w-full items-center justify-between">
                                            <div className="text-sm/6">
                                                <p className="font-semibold text-black">{plan.name}</p>
                                                <div className="flex gap-2 text-black/50">
                                                    <div>{plan.ram}</div>
                                                    <div aria-hidden="true">&middot;</div>
                                                    <div>{plan.cpus}</div>
                                                    <div aria-hidden="true">&middot;</div>
                                                    <div>{plan.disk}</div>
                                                </div>
                                            </div>
                                            <CheckCircleIcon className="size-6 fill-black opacity-0 transition group-data-[checked]:opacity-100" />
                                        </div>
                                    </Radio>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PaymentLeft

