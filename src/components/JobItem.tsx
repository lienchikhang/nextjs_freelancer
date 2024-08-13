import { reduceString } from '@/libs/funcs/reduceString';
import { IJob } from '@/libs/interfaces/job.interface';
import { Rating } from '@mui/material';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react';

interface Props {
    data: IJob
}

const JobItem: React.FC<Props> = ({ data }) => {
    return (
        <div className='jobItem'>
            <Link className="jobItem__image-wrapper" href={{
                pathname: `/${data.job_name}/${data.id}`,
            }}>
                {
                    data.job_image ? <Image
                        className="jobItem__image"
                        src={data.job_image}
                        alt={data.job_name}
                        width={200}
                        height={150}
                    /> : <Image
                        className="jobItem__image"
                        src={'/images/notfound.jpeg'}
                        alt={data.job_name}
                        width={200}
                        height={150}
                    />
                }
            </Link>
            <Link className="jobItem__name" href={{
                pathname: `/${data.job_name}/${data.id}`,
            }}>{reduceString(data.job_name, 65)}</Link>
            {/* <p className="jobItem__star">{data.stars}</p> */}
            <Rating className="jobItem__star" name="read-only" value={data.stars} readOnly />
            <p className="jobItem__price">
                <strong>From {data.Services[0].price && data.Services[0].price.toLocaleString()}</strong>
            </p>
        </div>
    )
}

export default JobItem