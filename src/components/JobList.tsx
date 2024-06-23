'use client';
import http from '@/libs/http/http';
import React, { useCallback, useEffect, useState } from 'react'
import JobItem from './JobItem';
import { IFilter, IJob, } from '@/libs/interfaces/job.interface';
import JobItems from './JobItems';
import '../styles/jobList.scss';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from '@mui/material';
import JobListNotFound from './JobListNotFound';
import ButtonDeliveryTime from './ButtonDeliveryTime';
import ButtonBudget from './ButtonBudget';

const JobList = () => {

    const [page, setPage] = useState(1);
    const [curPage, setCurPage] = useState(1);
    const [jobs, setJob] = useState<IJob[] | null>();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const query = useSearchParams();

    const fetchData = useCallback(async (route: string) => {
        return http.get(route);
    }, [])

    const handleChangePage = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }, [])

    // console.log({ searchParams, pathname, query: query.toString() })


    useEffect(() => {
        fetchData(`job/get-all?page=${curPage}&${query.toString()}`)
            .then((res) => {
                if (res.status == 200) {
                    setJob(res.content.data);
                    setPage(res.content.page);
                }
            });
    }, [query.toString(), curPage,]);

    return (
        <section className='jobList__wrapper'>
            <div className="jobList__filter">
                <ButtonDeliveryTime />
                <ButtonBudget />
            </div>
            {
                (jobs && jobs.length != 0)
                    ? <JobItems data={jobs} />
                    : <JobListNotFound />
            }
            <div className='jobList__pagination'>
                {jobs && jobs.length != 0 && <Pagination count={page ? page : 1} variant="text" size="large" onChange={handleChangePage} />}
            </div>
        </section>
    )
}

export default JobList