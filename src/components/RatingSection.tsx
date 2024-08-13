'use client';
import ButtonObject from '@/libs/classes/Button';
import { useSession } from '@/libs/contexts/session.context';
import http from '@/libs/http/http';
import { Textarea } from '@headlessui/react'
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import LoadingModal from './LoadingModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Props {
    gigId: number,
}

const RatingSection: React.FC<Props> = ({ gigId }) => {

    const { handleExpired } = useSession();
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState<number | null>(0);
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);

    const notiSuccess = (mess: string) => toast.success(mess);
    const notiError = (mess: string) => toast.error(mess);

    const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.currentTarget.value);
    }

    const handleCancel = () => {
        if (!(comment && rating)) return;

        setComment("");
        setRating(0);
    }

    const handleAdd = async () => {
        if (!(comment && rating)) return;

        const isNotExpired = await ButtonObject.checkExpired();
        if (!isNotExpired) handleExpired(true);

        setLoading(true);

        // const rs = await http.post(`comment/add/${gigId}`, {
        //     content: comment,
        //     rateNum: rating,
        // });

        fetch(`http://localhost:8080/comment/add/${gigId}`, {
            method: 'POST',
            credentials: "include",
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': 'true' },
            body: JSON.stringify({
                content: comment,
                rateNum: rating,
            }),
        }).then((res) => res.json()).then((rs) => {
            console.log('rs in add comment', rs);

            if (rs.status == 201) {
                setLoading(false);
                notiSuccess("Comment successfully!");
                setTimeout(() => {
                    router.refresh();
                    setComment("");
                    setRating(0);
                }, 1000)
            }

            if (rs.status == 400) {
                setLoading(false);
                notiError(rs.mess);
                setComment("");
                setRating(0);
            }
        })
        // if (rs.status == 201) {
        //     setLoading(false);
        //     notiSuccess("Comment successfully!");
        //     setTimeout(() => {
        //         router.refresh();
        //     }, 1000)
        // }

        // if (rs.status == 400) {
        //     setLoading(false);
        //     notiError(rs.mess);
        // }
    }

    return (
        <div>
            <ToastContainer />
            {/* <LoadingModal isOpen={true} /> */}
            <div className='flex items-center gap-5'>
                <h3>Your rate: </h3>
                <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                />
            </div>
            <Textarea
                value={comment}
                onChange={handleComment}
                placeholder='Type comment...'
                className={"w-full mt-4 rounded-md border-2 px-4 py-2 h-[200px]"}
            />
            <div className='addComment__btn float-end flex items-center gap-5 mt-4'>
                <button
                    className={comment && rating ? "active" : "unactive"}
                    disabled={!(comment && rating)}
                    onClick={handleCancel}
                >Cancel</button>
                <button
                    className={comment && rating ? "active" : "unactive"}
                    disabled={!(comment && rating)}
                    onClick={handleAdd}
                >Add</button>
            </div>
        </div>
    )
}

export default RatingSection