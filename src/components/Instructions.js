import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'
import 'swiper/swiper-bundle.css'
import { instTexts } from '../data/instructionsTexts'
import './Instructions.css'
// import myImg from '../assets/adrift_inst_01.jpg'

SwiperCore.use([ Pagination ]);


const Instructions = () => {
  
  const importAll = (r) => {
    return r.keys().map(r);
  }
  const images = importAll(require.context('../assets', true,  /\.(png|jpe?g|svg)$/));

  const slides = images.map((e, i) => {
    let src = e.default;
    return (
      <SwiperSlide key={i} tag='li'>
        <img
          className="slide-img"
          src={src}
          // src={require(`../assets/adrift_inst_${i + 1}.jpg`)}
          alt={`Slide ${i + 1}`}
        />
        <p
          className="slide-txt"
          dangerouslySetInnerHTML={{__html: `${instTexts[i]}`}}
        >
        </p>
      </SwiperSlide>
    )
  })


  return (
    <>
      <Swiper
        spaceBetween={40}
        slidesPerView={1.5}
        tag='section'
        wrapperTag='ul'
        pagination={{ type: 'progressbar' }}
      >
        {slides}
      </Swiper>
    </>
  )
}

export default Instructions
