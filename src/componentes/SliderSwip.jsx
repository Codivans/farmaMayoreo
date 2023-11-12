import React from "react";
import imgSlider1 from './../assets/img/slider5.jpg'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/swiper.min.css';

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import './../estilos/slider.css';


export default function App() {
  return (
    <article className="slider-principal">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src='https://firebasestorage.googleapis.com/v0/b/farmamayoreo-web.appspot.com/o/bannerPrincipal%2F36ae5386-5bcc-4765-8657-a644d0ab2893___89f7f601f917e227f1255478f413a3ed.webp?alt=media&token=1c91ddbd-6d0f-4839-83a8-4e568ae708b3' alt="Imagen 1" /></SwiperSlide>
        <SwiperSlide><img src='https://firebasestorage.googleapis.com/v0/b/farmamayoreo-web.appspot.com/o/bannerPrincipal%2F4031318d-79b0-4909-aab7-3b55b726022f___e514e1a4aa8b697ecd940c94bca1b0d4.webp?alt=media&token=7532537b-fadc-4df7-bbc0-fd7e409668ef' alt="Imagen 1" /></SwiperSlide>
        <SwiperSlide><img src='https://firebasestorage.googleapis.com/v0/b/farmamayoreo-web.appspot.com/o/bannerPrincipal%2F95ca6575-3541-4311-860f-3c81893462a8___9671e92532606c4ed3e302ec18720889.jpg?alt=media&token=3d987f9f-b3dc-4c74-9b20-72e7d4ee359d' alt="Imagen 1" /></SwiperSlide>
        <SwiperSlide><img src='https://firebasestorage.googleapis.com/v0/b/farmamayoreo-web.appspot.com/o/bannerPrincipal%2Fd5c85cab-f328-4555-90d9-77f5582e727a___02af6f93c0b5fe5632e2c23379df55d6.webp?alt=media&token=050022b1-bc1b-4c1c-945e-a7588e35bcf3' alt="Imagen 1" /></SwiperSlide>
      </Swiper>
    </article>
  );
}