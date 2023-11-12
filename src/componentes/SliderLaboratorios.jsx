import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from './../assets/img/laboratorios/bayer.webp'
import img2 from './../assets/img/laboratorios/bdf.webp'
import img3 from './../assets/img/laboratorios/garnier.webp'
import img4 from './../assets/img/laboratorios/gsk.webp'
import img5 from './../assets/img/laboratorios/haleon.webp'
import img6 from './../assets/img/laboratorios/recjitt.webp'
import img7 from './../assets/img/laboratorios/siegfried.webp'
import img8 from './../assets/img/laboratorios/unilever.webp'


// Import Swiper styles
import 'swiper/swiper.min.css';

// import required modules
import { Pagination, Autoplay } from "swiper";

export default function SliderLaboratorios() {
    
    return (
        <div className='slider-labs'>
            <h2 className="title">Los mejores productos de los mejores laboratorios para surtir tu farmacia</h2>
            <Swiper
                slidesPerView={"auto"}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                spaceBetween={10}
                pagination={{
                clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper swiper-labs"
            >
                <SwiperSlide className="slider-img-labs">
                    <img src={img1} />
                </SwiperSlide>
                <SwiperSlide className="slider-img-labs">
                    <img src={img2} />
                </SwiperSlide>
                <SwiperSlide className="slider-img-labs">
                    <img src={img3} />
                </SwiperSlide>
                <SwiperSlide className="slider-img-labs">
                    <img src={img4} />
                </SwiperSlide>
                <SwiperSlide className="slider-img-labs">
                    <img src={img5} />
                </SwiperSlide>
                <SwiperSlide className="slider-img-labs">
                    <img src={img6} />
                </SwiperSlide>
                <SwiperSlide className="slider-img-labs">
                    <img src={img7} />
                </SwiperSlide>
                <SwiperSlide className="slider-img-labs">
                    <img src={img8} />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}