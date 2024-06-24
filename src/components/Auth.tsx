'use client';
import React, { useState } from 'react';
import Box from "@mui/material/Box";
import AuthRight from '@/components/AuthRight';
import ArticalDefault from './ArticleDefault';
import ArticleRegister from './ArticleRegister';
import '../styles/auth.scss';
import { Modal } from '@mui/material';
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '@/libs/reduxStore/authModal.slice';
import { IStateModal } from '@/libs/interfaces/state.interface';

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
};

interface IState {
    modal: {
        isOpen: boolean,
    }
    user: {
        full_name: string,
        avatar: string | null,
    }
}

const Auth = () => {
    const [step, setStep] = useState(1);
    const selector = useSelector<IState>(state => state.modal) as IStateModal;
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(
            toggleModal(false)
        )
    };

    const updateState = (number: number) => {
        setStep((prev) => prev + number);
    };

    return (
        <Modal
            open={(!Cookies.get('token') && selector.isOpen) as boolean}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="modal__wrapper">
                <div className="modal__left">
                    {step == 1 && <ArticalDefault />}
                    {step == 2 && <ArticleRegister />}
                    {step == 3 && <ArticleRegister />}
                    {step == 4 && <ArticleRegister />}
                </div>
                <div className="modal__right">
                    <AuthRight
                        state={step}
                        updateState={updateState}
                        handleCloseModal={handleClose}
                    />
                </div>
            </Box>
        </Modal>
    )
}

export default Auth