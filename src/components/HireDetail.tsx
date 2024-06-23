import React from 'react';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";
import { useParams } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { IService } from '@/libs/interfaces/gig.interface';

interface Props {
    data: IService,
}

const HiredDetail: React.FC<Props> = ({ data }) => {
    return (
        <div className="hiredDetail__wrapper">
            <div className="hiredDetail__top">
                <h2>{data.service_level}</h2>
                <p>{data && data.price?.toLocaleString()}</p>
            </div>
            <div className="hiredDetail__content">
                <p className="hiredDetail__desc">
                    {data && data.service_desc}
                </p>
                <p className="hiredDetail__time">
                    <AccessTimeIcon /> {data && data.delivery_date}-day delivery
                </p>
                <p>
                    {data && data.service_benefit}
                </p>
            </div>
            <div className="hiredDetail__bottom">
                <button
                //   onClick={handleClick}
                //   className={`${hasError ? "disabled" : ""}`}
                >
                    Continue
                </button>
                <p>Compare package</p>
            </div>
        </div>
    )
}

export default HiredDetail