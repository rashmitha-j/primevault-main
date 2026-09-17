import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import brand1 from "../../assets/mens t shirt.jpg";
import brand2 from "../../assets/cap.jpeg";
import brand3 from "../../assets/hoodies.avif";
import brand4 from "../../assets/coffe mug.jpeg";
import brand5 from "../../assets/phone case.webp";
import brand6 from "../../assets/crop top.webp";
import Title from '../Title';

const Brand = () => {
  const settings = {
    infinite: true,
    speed: 5000, // Slower scrolling speed
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear", // Ensures smooth continuous scrolling
    arrows: false,
    pauseOnHover: false,
    draggable: false,
    responsive: [
      {
        breakpoint: 640, // Mobile breakpoint
        settings: {
          slidesToShow: 3, // Reduce slides for smaller screens
          slidesToScroll: 1,
        },
      },
    ],
  };

  const brands = [brand1,brand2,brand3,brand4,brand6,brand5];

  return (
    <div className="w-full overflow-hidden py-5">
      <h2 className='text-2xl text-center font-bold mb-4 '>Categories We Print On!</h2>
      
      <Slider {...settings} className="flex">
        {brands.map((brand, index) => (
          <div key={index} className="px-1 md:px-3 flex justify-center"> {/* Reduced padding on mobile */}
            <div className="brand-container w-40 h-20 flex items-center justify-center overflow-hidden rounded-lg shadow-md transition-transform duration-300">
              <img src={brand} alt={`Brand ${index + 1}`} className="max-w-full max-h-full object-contain" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Brand;