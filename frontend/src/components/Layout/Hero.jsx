import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import heroImg8 from "../../assets/hero image 1.png";
import heroImg6 from "../../assets/hero image 2.png";
import heroImg3 from "../../assets/hero image 3.png";
import heroImg4 from "../../assets/mug hero.png";

import heroImg1 from "../../assets/cord model 1.png";
import heroImg2 from "../../assets/avasa kurtas model 3.png";
import heroImg5 from "../../assets/kurta model1.png";
import heroImg7 from "../../assets/avasa kurtas model 3.png";

const heroImages = [
  { image: heroImg1, link: "/collection/all?gender=Women" },
  { image: heroImg2, link: "/collection/all?gender=Women" },
  { image: heroImg5, link: "/collection/all?gender=Women" },
  { image: heroImg7, link: "/collection/all?category=Women" },
  { image: heroImg8, link: "/collection/all?gender=Women" },
  { image: heroImg6, link: "/collection/all?gender=Men" },
  { image: heroImg3, link: "/collection/all?gender=Women" },
  { image: heroImg4, link: "/collection/all?category=Bottom Wear" },
];

const Hero = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 2000);

    return () => clearInterval(interval);

  }, []);

  useEffect(() => {

    if (sliderRef.current) {

      const sliderWidth = sliderRef.current.clientWidth;

      sliderRef.current.scrollTo({
        left: currentIndex * sliderWidth,
        behavior: "smooth",
      });

    }

  }, [currentIndex]);

  return (

    <section className='relative overflow-hidden w-full bg-white'>

      <div
        ref={sliderRef}
        className='flex overflow-x-auto snap-x snap-mandatory scroll-smooth w-full h-[500px] md:h-[650px] lg:h-[750px]'
        style={{ scrollbarWidth: 'none' }}
      >

        {heroImages.map((item, index) => (

          <Link
            to={item.link}
            key={index}
            className='w-full h-full flex-shrink-0 snap-center'
            style={{ minWidth: '100%' }}
          >

            <img
              src={item.image}
              alt={`Hero ${index + 1}`}
              className='w-full h-full object-contain'
            />

          </Link>

        ))}

      </div>

    </section>

  );

};

export default Hero;
