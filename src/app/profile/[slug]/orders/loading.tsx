import React from 'react';
import '../../../../styles/loading.scss';
import Image from 'next/image';

const loading = () => {
    return (
        <div className='loading__wrapper'>
            <div className='loading__flex'>
                <Image src="/images/Loading.png" alt="loading-image" width={300} height={300} />
                <div className='loading__section'>
                    <h1>Processing...</h1>
                    <p>Please wait</p>
                </div>
            </div>
        </div>
    )
}

export default loading