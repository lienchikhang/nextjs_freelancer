import { IComment, IGig, IService } from '@/libs/interfaces/gig.interface';
import { StarIcon } from '@heroicons/react/16/solid';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Avatar, Pagination, } from '@mui/material';
import React from 'react';
import CommentItem from './CommentItem';
import '../styles/gigPage.scss';
import HiredDetail from './HireDetail';
import Comments from './Comments';
import Image from 'next/image';
import DrawerComfirm from './DrawerConfirm';

interface Props {
    data: any[]
}

const Gig: React.FC<Props> = ({ data }) => {
    console.log('data in gig', data);

    if (data[0]?.error
        || data[1]?.error
        || data[2]?.error
        || data[0].status == 404
        || data[1].status == 404
        || data[2].status == 404
    ) {
        return <div className="gig__wrapper">
            <h1>Something is wrong!</h1>
        </div>
    }

    return (
        <React.Fragment>
            <DrawerComfirm />
            data[0]?.status == 200 && data[0]?.content &&
            <div className='gig__wrapper'>
                <div className='gig__info'>
                    <h1>{data[0]?.content?.job_name.replace('-', ' ')}</h1>
                    <div className="star">
                        <StarIcon />
                        <div>
                            <span>{data[0]?.content?.stars}</span>
                            <span>({data[0]?.content?.rate})</span>
                        </div>
                    </div>
                    <div className='gig__user'>
                        {data[0].content.Users.avatar ? <Avatar
                            alt={data[0].content.Users.full_name}
                            src={data[0].content.Users.avatar}
                            sx={{ width: 100, height: 100 }}
                        /> : <Avatar
                            alt={data[0].content.Users.full_name}
                            src={data[0].content.Users.full_name[0].toUpperCase()}
                            sx={{ width: 100, height: 100 }}
                        />
                        }
                        <div className="info__user">
                            <h2>{data[0]?.content?.Users?.full_name}</h2>
                            <button>Contact me</button>
                        </div>
                    </div>
                    {data[0]?.content?.job_image && <Image className='gig__image' width={550} height={450} src={data[0]?.content?.job_image} alt={data[0]?.content?.job_name} />}
                    <p className="gig__desc">{data[0]?.content?.job_desc}</p>
                    <ul className="gig__user-skill">
                        {data[0]?.content?.Users?.Skills.map((skill: { skill_name: string }, idx: number) => {
                            return <li key={idx}>
                                {skill.skill_name}
                            </li>
                        })}
                    </ul>
                    <div id="comment" className="detailJob__comments">
                        <h2 className="comments__heading">Reviews</h2>
                        {
                            data[1]?.status == 200 && data[1]?.content ? <Comments data={data[1]?.content} jobId={data[0]?.content.id} /> : <div></div>
                        }
                    </div>
                </div>
                <div className='gig__services'>
                    <TabGroup className="tab__wrapper">
                        <TabList className="tab__top">
                            {
                                data[2]?.status == 200 && data[2]?.content &&
                                data[2]?.content.map((service: IService, idx: number) => {
                                    return <Tab key={idx} className={`top__item ${data[2]?.content.length == 1 ? 'w-full' : `w-1/${data[2]?.content.length}`} border-0 data-[selected]:!text-green-500 data-[selected]:!border-b-green-500 data-[selected]:!border-b-2`}>
                                        {service.service_level}
                                    </Tab>
                                })
                            }
                        </TabList>
                        <TabPanels className="tab__bottom">
                            {
                                data[2]?.status == 200 && data[2]?.content &&
                                data[2]?.content.map((service: IService, idx: number) => {
                                    return <TabPanel key={idx} className="bottom__item">
                                        <HiredDetail data={service} job={{
                                            image: data[0]?.content.job_image,
                                            name: data[0]?.content?.job_name,
                                            jobId: data[0]?.content.id,
                                        }} />
                                    </TabPanel>
                                })
                            }
                        </TabPanels>
                        <div className="contact">
                            <button>Contact me</button>
                        </div>
                    </TabGroup>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Gig;