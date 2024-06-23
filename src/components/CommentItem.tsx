import { IComment } from '@/libs/interfaces/gig.interface';
import { Avatar, Rating } from '@mui/material'
import React from 'react';

interface Props {
    data: IComment
}

const CommentItem: React.FC<Props> = ({ data }) => {
    return (
        <div className="comment__wrapper">
            <div className="comment__image">
                {
                    data.Users.avatar ?
                        <Avatar alt="Remy Sharp" src={data.Users.avatar}></Avatar> :
                        <Avatar alt="Remy Sharp">{data.Users.full_name[0].toUpperCase()}</Avatar>
                }
            </div>
            <div className="comment__info">
                <h2 className="comment__username">{data.Users.full_name}</h2>
                <div className="comment__rating">
                    <Rating name="read-only" value={data.rate} readOnly />
                    <p className="comment__star">{data.rate}</p>
                </div>
                <p className="comment__content">{data.content}</p>
                <div className="comment__date">
                    <p>{`${new Date(data.createdAt).getDate()}-${new Date(data.createdAt).getMonth() + 1}-${new Date(data.createdAt).getFullYear()}`}</p>
                </div>
            </div>
        </div>
    )
}

export default CommentItem