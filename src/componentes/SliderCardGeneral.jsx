import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Card } from './Card';
import { getUnixTime } from 'date-fns';

export const SliderCardGeneral = () => {
  return (
    <div>
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
            className="mySwiper swiper-card-general"
        >
            {
                dataProductos.map(({codigo, nombre, precio, existencia}) =>{
                    return(
                        <SwiperSlide className="card-slider" key={codigo}>
                            <Card codigo={codigo} nombre={nombre} precio={precio} existencia={existencia} st="carrusel" idTienda={idTienda}/>
                        </SwiperSlide>
                    )
                })
            }  
        </Swiper>
    </div>
  )
}
