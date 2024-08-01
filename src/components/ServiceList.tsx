'use client';
import http from '@/libs/http/http';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface IService {

}

const ServiceList = () => {

    const [serviceList, setServiceList] = useState<IService[] | null>(null);
    const router = useRouter();
    const curPath = usePathname();
    const query = useSearchParams();
    const curPage = query.get('page');

    useEffect(() => {
        const fetchingData = async () => {
            const rs = await http.get(`service/get-all-by-seller?page=${curPage}`);
            console.log('rs in fetch data servieList', rs);

            if (rs.error) {
                setServiceList(null);
            }

            if (rs.status == 200) {
                setServiceList(rs.content);
            } else {
                setServiceList(null);
            }
        }

        fetchingData();
    }, [curPage]);

    return (
        <div>ServiceList</div>
    )
}

export default ServiceList