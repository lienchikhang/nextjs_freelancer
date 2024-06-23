import { IJob } from '@/libs/interfaces/job.interface';
import React from 'react';
import JobItem from './JobItem';

interface Props {
    data: IJob[],
}

const JobItems: React.FC<Props> = ({ data }) => {
    console.log({ data });
    return (
        <div className="jobList__items">
            {
                data && data.map((job: IJob, idx: number) => {
                    return <JobItem data={job} key={idx} />
                })
            }
        </div>
    )
}

export default JobItems