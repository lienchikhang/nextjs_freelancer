'use client';
import Image from 'next/image';
import React from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ButtonObject from '@/libs/classes/Button';
import { useSession } from '@/libs/contexts/session.context';
import { useRouter } from 'next/navigation';
import { useUser } from '@/libs/contexts/user.context';
import { useGigEdit } from '@/libs/contexts/gigEdit.content';

interface Props {
    data: {
        id: number,
        job_image: string,
        job_name: string,
        job_desc: string,
        sub_id: number,
        Services: {
            id: number,
            price: number,
            service_desc: string,
            service_benefit: string,
            service_level: string,
            delivery_date: 0,
        }[],
        Subs: {
            ChildTypes: {
                type_id: number,
                id: number,
            },
            // child_type_id: number,
        }
    }
    handleAlertDelete: (gigId: number) => void;
}

const GigItem: React.FC<Props> = ({ data, handleAlertDelete }) => {

    const { handleExpired } = useSession();
    const { user } = useUser();
    const { setGigEdit } = useGigEdit();
    const router = useRouter();

    const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        console.log('on click')
        //set gigEdit
        setGigEdit({
            id: data.id,
            job_name: data.job_name,
            job_desc: data.job_desc,
            job_image: data.job_image,
            Services: data.Services,
            typeId: data.Subs.ChildTypes.type_id,
            childTypeId: data.Subs.ChildTypes.id,
            subId: data.sub_id,
        });

        router.push(`/profile/${user?.name}/edit`);
    }

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const isNotExpired = await ButtonObject.checkExpired();

        if (!isNotExpired) {
            handleExpired(true);
            return;
        }

        handleAlertDelete(data.id);
    }

    const handleViewOrders = async (serviceId: number) => {
        const isNotExpired = await ButtonObject.checkExpired();

        if (!isNotExpired) {
            handleExpired(true);
            return;
        }

        router.push(`${user?.name}/services?id=${serviceId}&page=1`);
    }

    return (
        <Accordion>
            <AccordionSummary
                //   expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"

            >
                <div className='gigItem'>
                    <Image className='gigItem__image' src={data.job_image ? data.job_image : '/images/notfound.jpeg'} height={100} width={100} alt={data.job_image} />

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
                            console.log(`service + ${idx}`, service)
                            return <li key={idx}>
                                <p>{service.service_level}</p>
                                <p>{service.price.toLocaleString()} VND</p>
                                <button onClick={() => handleViewOrders(service.id)}>View all orders</button>
                            </li>
                        })
                    }
                </ul>
            </AccordionDetails>
        </Accordion>
    )
}

export default GigItem