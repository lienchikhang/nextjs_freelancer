'use client';
import http from '@/libs/http/http';
import { Progress } from 'antd'
import React, { useEffect, useState } from 'react'

interface Props {
    // data: any[];
}

const ProgressSection: React.FC<Props> = ({ }) => {

    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const fetchingData = async () => {
            const rs = await http.get('hire/count-all');

            if (rs.status == 200) {
                setPercent(rs.content.result);
            }
        }

        fetchingData();
    }, []);


    return (
        <div className='progress__wrapper'>
            <h2>Orders complete</h2>
            <Progress type="circle" percent={percent} />
        </div>
    )
}

export default ProgressSection