'use client';
import React from 'react';
import Lottie from "lottie-react";
import a1 from '../../public/videos/a1.json';
import a2 from '../../public/videos/a2.json';
import '../styles/carousel.scss';

const Carousel = () => {
    return (
        <section className='carousel'>
            <div className="carousel__left">
                <div className="left__lottie">
                    <Lottie animationData={a1} />
                </div>
            </div>
            <div className="carousel__right">
                <div className="right__search">
                    <h1>Find the right freelance service, right away</h1>
                </div>
                {/* <Lottie animationData={a2} /> */}
            </div>
        </section>
    )
}

export default Carousel