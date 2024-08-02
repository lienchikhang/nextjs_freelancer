'use client';
import http from '@/libs/http/http';
import { Progress } from 'antd'
import React, { useEffect, useState } from 'react';
import '../styles/progressSection.scss';

interface Props {
    // data: any[];
    label?: string;
    apiSegment: string;
}

const ProgressSection: React.FC<Props> = ({ label, apiSegment }) => {

    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const fetchingData = async () => {
            const rs = await http.get(apiSegment);

            console.log('rs in progress', rs);

            if (rs.status == 200) {
                setPercent(rs.content?.result);
            }
        }

        fetchingData();
    }, []);


    return (
        <div className='progress__wrapper'>
            <h2>{label} complete</h2>
            <Progress type="circle" percent={Math.floor(percent)} />
        </div>
    )
}

export default ProgressSection