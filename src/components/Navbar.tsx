import React, { useContext, useEffect, useState } from 'react'
// import { LanguageIcon } from '@heroicons/react/24/solid';
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { Logout, Settings } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar: React.FC = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [fullname, setFullname] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<string | null>(null);
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
            <li className="nav__item">
                <Link href={'#'}>Sign in</Link>
            </li>
            <li className={`nav__item scrolled`}>
                <Link href={'#'}>Join</Link>
            </li>
        </ul>
    )
}

export default Navbar