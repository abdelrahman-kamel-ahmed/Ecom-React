import React from 'react'
import { Carousel } from 'react-bootstrap'
import { IMAGES } from '../../constants/images'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { RecommendedSection } from '../../components/RecommendedSection/RecommendedSection';
import { CategoriesSection } from '../../components/CategoriesSection/CategoriesSection';
export default function Home() {
  return (
    <>
    <section
  className="hero-section d-flex w-100"
  style={{
    backgroundImage: `url(${IMAGES.CLOTHIS})`,
    height: '70vh',
    backgroundPosition: 'center',
  }}
>
        <div className="container-fluid text-center d-flex flex-column align-items-start pt-5">
            <h1 class="text-white mb-3 fw-bold">New Arrivals!</h1>
            <h3 class="text-white mb-3" >Collection 2026 </h3>
        </div>
    </section>    
    {/* <Swiper
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
      <SwiperSlide><img src={IMAGES.CLOTHIS} alt="HERO" /></SwiperSlide>
    </Swiper> */}
    {/* categories section */}
    <CategoriesSection/>
    
    <RecommendedSection/>
    </>
  )
}
