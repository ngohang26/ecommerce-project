import React from 'react'
import Ad3 from '../../assets/ad-image-3.png'
import Ad4 from '../../assets/ad-image-4.png'
import './BannerAd.css'

const banners = [{title: "Luxa Dark Chocolate", 
                description: "Very tasty & creamy vanilla flavour creamy milk.", 
                image: Ad3, 
                buttonText: "SHOW NOW", 
                backgroundColor: "rgb(249, 235, 231)"},

                {title: "Creamy Muffins", 
                description: "Very tasty & creamy vanilla flavour creamy muffins.", 
                image: Ad4, 
                buttonText: "SHOW NOW", 
                backgroundColor: "rgb(230,243,250)"}
] 
export const BannerAd = () => {
  return (
    <div className='banner-container'>
        {banners.map(banner => (
        <div className="banner-ad" style={{ backgroundColor: banner.backgroundColor }}>
            <div className="banner-content">
                <div className="categories sale">Upto 25% Off</div>
                <h2 className='banner-title'>{banner.title}</h2>
                <p>{banner.description}</p>
                <button>{banner.buttonText}</button>
            </div>
            <img src={banner.image} alt={banner.title} />
        </div>
        ))}
    </div>
  )
}


