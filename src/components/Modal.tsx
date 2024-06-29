'use client';
import React from 'react';

interface Props {
    type: string
    mess: string
}

const Modal: React.FC<Props> = ({ type, mess }) => {

    const handleClose = () => {

    }

    return (
        <div>Modal</div>
    )
}

export default Modal