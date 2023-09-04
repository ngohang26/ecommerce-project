import React, { useState, useEffect } from "react";
import Slide1 from '../../assets/product-thumb-1.png'
import Slide2 from '../../assets/product-thumb-2.png'
import Slide3 from '../../assets/ad-image-1.png'
import Slide4 from '../../assets/ad-image-2.png'
import { BsArrowRightShort } from 'react-icons/bs'
import './Banner.css'
import { Image } from "semantic-ui-react";
const images = [Slide1, Slide2];

const texts = [
  ["100% Natural", "Fresh Smoothie & Summer Juice", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum."],
  ["100% Natural", "Heinz Tomato Ketchup", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum."]
];
export function Banner() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((index + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 3000); // chuyển đổi ảnh mỗi 3 giây
    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="banner" >
      <div className="block-1" style={{ backgroundColor: "rgb(230,243,250)" }}>
        <div className="text">
          <h1 className="categories sale">{texts[index][0]}</h1>
          <h3 className="banner-title">{texts[index][1]}</h3>
          <p>{texts[index][2]}</p>
          <button>SHOP COLLECTION</button>
        </div>
        <Image src={images[index]} alt="banner" />
      </div>
      <div className="block-2" style={{ backgroundColor: "rgb(238,245,228)" }}>
        <div className='text'>
          <h1 className="categories sale">20% off</h1>
          <h3 className="banner-title">Fruits & Vegetables</h3>
          <button>shop collection <BsArrowRightShort /></button>
        </div>
        <Image src={Slide3} className='swiper-slide' alt="Smoothie" />
      </div>
      <div className="block-3" style={{ backgroundColor: "rgb(249,235,231)" }}>
        <div className='text'>
          <h1 className="categories sale">15% off</h1>
          <h3 className="banner-title">Breads &<br/>Plant-based Protein</h3>          
          <button>shop collection<BsArrowRightShort /></button>
        </div>
        <Image src={Slide4} className='swiper-slide' alt="Breads" />
      </div>
    </div>
  );
}


