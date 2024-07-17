'use client';
import React, { useState } from 'react'
import ModalStateRegister from './RegisterDefault';
import ModalStateConfirm from './RegisterConfirm';
import { useRouter } from 'next/navigation';
import ModalStateOtp from './RegisterOtp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface IData {
    email: string;
    password: string;
    full_name: string;
}

const RegisterSection = () => {

    const [state, setState] = useState(1);
    const [data, setData] = useState<IData | null>(null);
    const router = useRouter();

    const notifySuccess = (mess: string) => toast.success(mess);
    const notifyError = (mess: string) => toast.error(mess);

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
            <ToastContainer />
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
                    <ModalStateOtp updateState={handleChangeState} data={data} notifySuccess={notifySuccess} notifyError={notifyError} />
                )}
            </div>
        </div>
    )
}

export default RegisterSection