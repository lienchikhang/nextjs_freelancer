import React from 'react';
import '../styles/loading.scss';

const loading = () => {
    return (
        <div className='loading__wrapper'>
            <div className='loading__section'>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                </svg>
                <h1>Processing...</h1>
            </div>
        </div>
    )
}

export default loading