"use client";
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MenuDrawer from './MenuDrawer';
import Logo from './Logo';
import SearchBar from './SearchBar';
import '../styles/header.scss';
import Navbar from './Navbar';


const Header: React.FC = () => {
    const router = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(false);
    const route = useRouter();
    const path = usePathname();


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
        <header className={`myHeader ${path.includes('auth') ? 'auth' : ''}`}>
            <div className={`header__wrapper`}>
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