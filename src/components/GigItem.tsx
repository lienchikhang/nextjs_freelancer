import Image from 'next/image';
import React from 'react';

interface Props {
    data: {
        id: number,
        job_image: string,
        job_name: string,
    }
}

const GigItem: React.FC<Props> = ({ data }) => {
    return (
        <div className='gigItem'>
            {
                data.job_image ? <Image className='gigItem__image' src={data.job_image} height={100} width={100} alt={data.job_name} /> : <p>no image</p>
            }
            <p className='gigItem__name'>{data.job_name.replaceAll('-', ' ')}</p>
            <div className='gigItem__btns'>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    )
}

export default GigItem