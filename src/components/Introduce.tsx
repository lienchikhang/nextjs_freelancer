import intros from '@/libs/constants/introduce.constants'
import React from 'react';
import '../styles/introduce.scss';

const Introduce = () => {
    return (
        <section className='introduce'>
            <h2>A whole world of freelance talent at your fingertips</h2>
            <div className="introduce__list">
                {intros.map((intro, idx) => {
                    return <div className='introduct__item' key={idx}>
                        <img src={intro.icon} alt="" width={32} height={32} />
                        <h3>{intro.title}</h3>
                        <p>{intro.desc}</p>
                    </div>
                })}
            </div>
            <div className="introduct__video">
                <video
                    src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/e0f330e4c8d6e3bf843a3bd3164fa275-1706087048062/How%20Fiverr%20Works%20EN%20Subs%2016x9"
                    controls={true}
                    autoPlay
                    preload='auto'
                    poster='https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/ef51b45f79342925d5268e0b2377eae8-1704717764992/thumbnail.png'
                ></video>
            </div>
            <div className='introduce__pro'>
                <div className='pro__left'>
                    <h2 className="pro__title">
                        New e-Commerce
                        project management service <strong>made for your business</strong>
                    </h2>
                    <p className="pro__desc">
                        An experienced e-Commerce project manager will plan, coordinate, and execute your project. Overseeing a team of e-Commerce experts, they'll handle everything from site building, design and content to optimization, marketing strategies, and UGC videos.
                    </p>
                    <button className="pro__button">Get started</button>
                </div>
                <div className='pro__right'>
                    <img src="/images/pro.webp" alt="" />
                </div>
            </div>
        </section>
    );
}

export default Introduce