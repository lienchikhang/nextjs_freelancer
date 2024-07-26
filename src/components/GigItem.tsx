'use client';
import Image from 'next/image';
import React from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ButtonObject from '@/libs/classes/Button';
import { useSession } from '@/libs/contexts/session.context';

interface Props {
    data: {
        id: number,
        job_image: string,
        job_name: string,
        Services: {
            id: number,
            price: number,
            service_level: string
        }[],
    },
    handleAlertDelete: (gigId: number) => void;
}

const GigItem: React.FC<Props> = ({ data, handleAlertDelete }) => {

    const { handleExpired } = useSession();

    const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    }

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const isLoggedIn = ButtonObject.checkExpired();

        if (!isLoggedIn) {
            handleExpired(true);
            return;
        }

        handleAlertDelete(data.id);
    }

    return (
        <Accordion>
            <AccordionSummary
                //   expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"

            >
                <div className='gigItem'>
                    <Image className='gigItem__image' src={data.job_image ? data.job_image : '/images/notfound.jpeg'} height={100} width={100} alt={data.job_name} />

                    <p className='gigItem__name'>{data.job_name.replaceAll('-', ' ')}</p>
                    <div className='gigItem__btns'>
                        <button onClick={handleEdit}><ModeEditIcon /></button>
                        <button onClick={handleDelete}><DeleteIcon /></button>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <h3>Services:</h3>
                <ul>
                    {
                        data.Services.map((service, idx: number) => {
                            return <li key={idx}>
                                <p>{service.service_level}</p>
                                <p>{service.price.toLocaleString()} VND</p>
                            </li>
                        })
                    }
                </ul>
            </AccordionDetails>
        </Accordion>
    )
}

export default GigItem