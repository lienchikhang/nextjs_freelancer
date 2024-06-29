'use client';
import React from 'react';
import ProfileInfo from './ProfileInfo';
import UserGig from './UserGig';
import RegisterSeller from './RegisterSeller';
import { Flip, ToastContainer, toast } from 'react-toastify';

interface IResponse {
    status: number,
    mess: string,
    content: any,
    date: Date,
}

interface Props {
    data: any[]
}

const ProfilePage: React.FC<Props> = ({ data }) => {
    console.log('data in profile page', data);

    const notifySuccess = (mess: string) => toast.success(mess, {
        position: "bottom-center",
        transition: Flip,
    });

    if (data[0]?.error
        || data[1]?.error
        || data[2]?.error
        || data[3]?.error
        || data[0].status == 404
        || data[1].status == 404
        || data[2].status == 404
        || data[3].status == 404
    ) {
        return <div className="gig__wrapper">
            <h1>Something is wrong!</h1>
        </div>
    }

    return (
        <React.Fragment>
            <ToastContainer />
            <div className='profile__wrapper'>
                <div className='profile__main'>
                    <div className='profile__info'>
                        <ProfileInfo data={data[0]} skill={data[1]} certi={data[2]} />
                    </div>
                    <div className='profile__jobList'>
                        <div className='jobList__tile'>
                            <h2>Your job</h2>
                        </div>
                        {data[3].status == 403 && <RegisterSeller notifySuccess={notifySuccess} />}
                        {data[3].status == 200 && <UserGig />}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProfilePage