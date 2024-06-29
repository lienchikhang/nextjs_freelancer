import { Avatar } from '@mui/material';
import React from 'react';
import ProfileSkill from './ProfileSkill';
import ProfileCertification from './ProfileCertification';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

interface IResponse {
    status: number,
    mess: string,
    content: any,
    date: Date,
}

interface Props {
    data: IResponse,
    skill: IResponse,
    certi: IResponse,
}

const ProfileInfo: React.FC<Props> = ({ data, skill, certi }) => {
    return (
        <div className='info__wrapper'>
            <div className="user">
                <div className='info__top'>
                    {data?.content?.avatar ?
                        <div className='image__wrapper relative rounded-full w-[150px] h-[150px]'>
                            <Avatar src={data?.content?.avatar} sx={{ width: '150px', height: '150px' }} className='absolute' />
                            <input hidden type="file" className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full' />
                        </div> :
                        <div className='image__wrapper relative rounded-full w-[150px] h-[150px]'>
                            <Avatar sx={{ width: '150px', height: '150px' }} className='absolute'>{data?.content?.full_name[0].toUpperCase()}</Avatar>
                            <input type="file" className='absolute z-20 top-1/2 left-1/2 opacity-0 -translate-x-1/2 -translate-y-1/2' />
                            <div className='image__icon'>
                                <AddAPhotoIcon />
                            </div>
                        </div>
                    }
                    <h2 className='info__name'>{data?.content?.full_name}</h2>
                    <button>Preview Fiverr Profile</button>
                </div>
                <div className='info__bottom'>
                    <div className='info__country'>
                        <p className='title'>From</p>
                        <p className='content'>Vietnam</p>
                    </div>
                    <div className='info__member'>
                        <p className='title'>Member since</p>
                        <p className='content'>{new Date(data?.content?.joinAt).getUTCFullYear()}</p>
                    </div>
                </div>
            </div>

            <div className="skill">
                <div className="skill__section">
                    <div className='section__heading'>
                        <p className='heading__title'>Description</p>
                        <p className='heading__link'>Edit Description</p>
                    </div>
                    <ul className="section__items">
                    </ul>
                </div>
                <ProfileSkill data={skill.content} />
                <ProfileCertification data={certi.content} />
            </div>
        </div>
    )
}

export default ProfileInfo