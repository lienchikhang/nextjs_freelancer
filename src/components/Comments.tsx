'use client';
import { IComment } from '@/libs/interfaces/gig.interface'
import React, { useEffect, useRef, useState } from 'react'
import CommentItem from './CommentItem';
import { Pagination } from '@mui/material';
import http from '@/libs/http/http';

interface Props {
    data: {
        data: IComment[],
        page: number
    },
    jobId: number,
}

const Comments: React.FC<Props> = ({ data, jobId }) => {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    // const []
    const [cmts, setCmts] = useState<any[] | null>(null);

    useEffect(() => {
        const fetch = async () => {
            const rs = await http.get(`comment/get/${jobId}?page=${page}`);
            console.log('rs in cmts', rs)
            setCmts(rs.content?.data);
            setTotalPage(rs.content?.page);
            // Giả định rằng dữ liệu phản hồi nằm trong rs.data
        };
        fetch();
    }, [page])


    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    if (cmts && !cmts.length) {
        return <div>
            <h1>Nothing here</h1>
        </div>
    }

    return (
        <div>
            {
                cmts && cmts.map((comment: IComment, idx: number) => {
                    return <CommentItem data={comment} key={idx} />
                })
            }
            <Pagination count={totalPage} variant="text" size="large" onChange={handleChangePage} />
        </div>
    )
}

export default Comments