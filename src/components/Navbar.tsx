import React, { useContext, useEffect, useState } from 'react'
// import { LanguageIcon } from '@heroicons/react/24/solid';
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { Logout, Settings } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { IStateUser } from '@/libs/interfaces/state.interface';
import { useUser } from '@/libs/contexts/user.context';
import { cookies } from 'next/headers';

interface IState {
    user: {
        full_name: string,
        avatar: string,
    }
}

const Navbar: React.FC = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { user, logout, login } = useUser();
    const router = useRouter();
    const open = Boolean(anchorEl);

    useEffect(() => {
        const local = localStorage.getItem('root::user');
        if (local) {
            const payload = JSON.parse(local);
            login(payload);
        }
    }, [])

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
                user ?
                    <div className='nav__login'>
                        {
                            user?.avatar ? <Link href={'#'}>
                                <Avatar src={user?.avatar} />
                            </Link> :
                                <Link href={'#'}>
                                    <Avatar>{user?.name[0]?.toUpperCase()}</Avatar>
                                </Link>
                        }
                        <Link href={'#'}>{user?.name}</Link>
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