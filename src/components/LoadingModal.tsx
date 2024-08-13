import { CircularProgress } from '@mui/material'
import React from 'react'

interface Props {
    isOpen: boolean
}

const LoadingModal: React.FC<Props> = ({ isOpen }) => {

    return (
        isOpen && <div className='w-screen h-screen fixed bg-black/55 z-50 flex items-center justify-center'>
            <CircularProgress color="success" className='text-green-500' />
        </div>
    )
}

export default LoadingModal