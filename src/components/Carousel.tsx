"use client";
import React from "react";
import Lottie from "lottie-react";
import a1 from "../../public/videos/a1.json";
import a2 from "../../public/videos/a2.json";
import "../styles/carousel.scss";
import SearchBar from "./SearchBar";
import ListType from "./ListType";

const Carousel = () => {
  return (
    <section className="carousel">
      <div className="carousel__top">
        <div className="carousel__left">
          <div className="left__lottie">
            <Lottie animationData={a1} />
          </div>
        </div>
        <div className="carousel__right">
          <div className="right__search">
            <h1>Find the right freelance service, right away</h1>
            <div className="search__wrapper">
              <SearchBar className='active' />
            </div>
          </div>
        </div>
      </div>
      <div className="carousel__bottom">
        <ListType />
      </div>
    </section>
  );
};

export default Carousel;
