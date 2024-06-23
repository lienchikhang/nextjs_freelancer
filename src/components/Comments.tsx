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
    const [cmts, setCmts] = useState<any[] | null>(null);
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current) {
            const fetch = async () => {
                const rs = await http.get(`comment/get/${jobId}?page=${page}`);
                setCmts(rs.content.data); // Giả định rằng dữ liệu phản hồi nằm trong rs.data
            };
            fetch();
        } else {
            isMounted.current = true;
        }
    }, [page])


    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    if (!data.data.length) {
        return <div>
            <h1>Nothing here</h1>
        </div>
    }

    return (
        <div>
            {
                !cmts ? data.data.map((comment: IComment, idx: number) => {
                    return <CommentItem data={comment} key={idx} />
                }) : cmts.map((comment: IComment, idx: number) => {
                    return <CommentItem data={comment} key={idx} />
                })
            }
            <Pagination count={data.page ? data.page : 1} variant="text" size="large" onChange={handleChangePage} />
        </div>
    )
}

export default Comments