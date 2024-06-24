"use client";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MenuDrawer from './MenuDrawer';
import Logo from './Logo';
import SearchBar from './SearchBar';
import '../styles/header.scss';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { setUser } from '@/libs/reduxStore/user.slice';

interface Props {
    initialUser?: {
        full_name?: string,
        avatar?: string | null,
    },
}

const Header: React.FC<Props> = ({ initialUser }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setUser({
                full_name: initialUser?.full_name,
                avatar: initialUser?.avatar,
            })
        )
    }, [initialUser])

    const router = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(false);
    const route = useRouter();

    useEffect(() => {
        if (!router.split("/")[1]) {
            window.addEventListener("scroll", handleScroll);
        } else {
            window.removeEventListener("scroll", handleScroll);
            setShowNavbar(true);
        }
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [router]);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" ||
                (event as React.KeyboardEvent).key === "Shift")
        ) {
            return;
        }

        setIsOpen(open);
    };

    const handleScroll = () => {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        if (scrollPosition > 250) {
            if (router == "/") setShowNavbar(true);
            else setShowNavbar(false);
        } else {
            if (router == "/") setShowNavbar(false);
            else setShowNavbar(true);
        }
    };

    return (
        <header>
            <div className='header__wrapper'>
                <div className='header__start'>
                    <section className="header__menu" onClick={() => setIsOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </section>
                    <section className="header__logo" onClick={() => route.push('/')}>
                        <Logo showNavbar={showNavbar} />
                    </section>
                </div>
                <MenuDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
                {showNavbar && <SearchBar />}
                <Navbar />
            </div>
        </header>
    )
}

export default Header