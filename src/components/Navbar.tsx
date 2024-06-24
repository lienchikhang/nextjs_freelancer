import React, { useContext, useEffect, useState } from 'react'
// import { LanguageIcon } from '@heroicons/react/24/solid';
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { Logout, Settings } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { IStateUser } from '@/libs/interfaces/state.interface';

interface IState {
    user: {
        full_name: string,
        avatar: string,
    }
}

const Navbar: React.FC = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const selector = useSelector<IState>(state => state.user) as IStateUser;
    const router = useRouter();
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <ul className="header__nav">
            <li className="nav__item">
                <Link href={'#'}>Freelancer Pro</Link>
            </li>
            <li className="nav__item">
                <Link href={'#'}>Explore</Link>
            </li>
            <li className="nav__item">
                <Link href={'#'}>English</Link>
            </li>
            <li className="nav__item">
                <Link href={'#'}>Become a seller</Link>
            </li>
            {
                selector?.full_name ?
                    <div className='nav__login'>
                        {
                            selector?.avatar ? <Link href={'#'}>
                                <Avatar src={selector?.avatar} />
                            </Link> :
                                <Link href={'#'}>
                                    <Avatar>{selector?.full_name[0]?.toUpperCase()}</Avatar>
                                </Link>
                        }
                        <Link href={'#'}>{selector?.full_name}</Link>
                    </div> :
                    <React.Fragment>
                        <li className="nav__item">
                            <Link href={'#'}>Sign in</Link>
                        </li>
                        <li className={`nav__item`} >
                            <Link href={'#'}>Joib</Link>
                        </li>
                    </React.Fragment>
            }

        </ul>
    )
}

export default Navbar