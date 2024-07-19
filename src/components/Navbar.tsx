import React, { useEffect } from 'react'
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { Logout, Settings } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/libs/contexts/user.context';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ButtonObject from '@/libs/classes/Button';
import { useSession } from '@/libs/contexts/session.context';

interface IState {
    user: {
        full_name: string,
        avatar: string,
    }
}

const Navbar: React.FC = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { user, logout, login } = useUser();
    const { handleExpired } = useSession();
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

    const handleProfile = async () => {
        const isNotExpired = await ButtonObject.checkExpired();
        console.log('isPass', isNotExpired);
        if (isNotExpired) {
            router.push(`/profile/${user?.name}`)
            handleExpired(false);
            handleClose();
        } else {
            handleExpired(true);
        }
    }

    const handleLogout = () => {
        logout();
        window.location.reload();
    }


    return (
        <ul className="header__nav">
            {
                user ?
                    <ul className='nav__login'>
                        <li>
                            <Link href="#">
                                <Tooltip title="Notifications">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <NotificationsNoneIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <Tooltip title="Messages">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <MailOutlineIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </li>
                        <li>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    {user?.avatar ? <Avatar src={user?.avatar} /> : <Avatar>{user?.name[0]?.toUpperCase()}</Avatar>}
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={handleProfile}>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    Orders
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </li>

                    </ul> :
                    <ul className='nav__login'>
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
                            <Link href={'/auth/login'}>Sign in</Link>
                        </li>
                        <li className={`nav__item`} >
                            <Link href={'/auth/register'}>Join</Link>
                        </li>
                    </ul>
            }

        </ul>
    )
}

export default Navbar