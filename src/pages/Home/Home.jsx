import React from 'react'
import { Carousel } from 'react-bootstrap'
import { IMAGES } from '../../constants/images'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { RecommendedSection } from '../../components/RecommendedSection/RecommendedSection';
export default function Home() {
  return (
    <>
    <Swiper
      autoHeight={true}
      spaceBetween={50}
      slidesPerView={1}
      navigation={true}

      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination]}
      className="mySwiper"
    >
      <SwiperSlide><img src={IMAGES.HERO_IMAGE_5} alt="HERO" /></SwiperSlide>
      <SwiperSlide><img src={IMAGES.HERO_IMAGE_6} alt="HERO" /></SwiperSlide>
      <SwiperSlide><img src={IMAGES.HERO_IMAGE_4} alt="HERO" /></SwiperSlide>
    </Swiper>
    
    <RecommendedSection/>
    </>
  )
}
