'use client';
import React, { useState } from 'react'
import ModalStateRegister from './RegisterDefault';
import ModalStateConfirm from './RegisterConfirm';
import { useRouter } from 'next/navigation';
import ModalStateOtp from './RegisterOtp';

export interface IData {
    email: string;
    password: string;
    full_name: string;
}

const RegisterSection = () => {

    const [state, setState] = useState(1);
    const [data, setData] = useState<IData | null>(null);
    const router = useRouter();

    const updateData = (data: IData) => {
        setData(data);
    };

    const handleChangeState = (step: number) => {
        if (state + step < 1) {
            router.back();
        }
        setState(prev => prev + step);
    }

    return (
        <div className='regis__wrapper'>
            <div className="modal__top">
                {state == 1 && <ModalStateRegister
                    updateState={handleChangeState}
                    updateData={updateData}
                />}
                {state == 2 && (
                    <ModalStateConfirm
                        updateState={handleChangeState}
                        updateData={updateData}
                        data={data}
                    />
                )}
                {state == 3 && (
                    <ModalStateOtp updateState={handleChangeState} data={data} />
                )}
            </div>
        </div>
    )
}

export default RegisterSection