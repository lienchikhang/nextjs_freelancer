import popServices from '@/libs/constants/popularService.constants'
import React from 'react';
import '../styles/popularService.scss';

const PopularService = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };


    return (
        <section className='popularService'>
            <h2>Popular services</h2>
            <div className='service__list'>
                {
                    popServices.map((service, idx: number) => {
                        return <div key={idx} className='service__item' style={{ backgroundColor: service.bgColor }}>
                            <h3>{service.title}</h3>
                            <img src={service.image} alt={service.title} />
                        </div>
                    })
                }
            </div>
        </section>
    )
}

export default PopularService