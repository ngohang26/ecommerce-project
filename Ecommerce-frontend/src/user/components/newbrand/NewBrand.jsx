import React from 'react'
import Thumb11 from '../../../assets/product-thumb-11.jpg'
import Thumb12 from '../../../assets/product-thumb-12.jpg'
import Thumb13 from '../../../assets/product-thumb-13.jpg'
import Thumb14 from '../../../assets/product-thumb-14.jpg'
import AliceCarousel from 'react-alice-carousel'
import { Container, Row, Col, Button } from 'react-bootstrap';
import './NewBrand.css'

const Item = ({Image, text, title}) => {
    return (
            <div className='brand-item'>
                <div className='image-brand' ><img src={Image} alt={title} /></div>
                <div className='text'>
                <div className='text-brand'>{text}</div> 
                <div className='title-brand'>{title}</div> 
                </div> 

            </div>
    )
}

const items = [
    <Item Image={Thumb11} text="Amber Jar" title="Honey best nectar you wish to get"/>,
    <Item Image={Thumb12} text="Amber Jar" title="Honey best nectar you wish to get"/>,
    <Item Image={Thumb13} text="Amber Jar" title="Honey best nectar you wish to get"/>,
    <Item Image={Thumb14} text="Amber Jar" title="Honey best nectar you wish to get"/>

]

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
}

export const NewBrand = () => {
  return (
    <Container className='brand-carousel'>
        <Row className="row-2">
            <h2 className='brand-carousel-title'>Newly Arrived Brands</h2>
            <div className='category-btn'>
            <Button className='btn-link'>View All Categories →</Button>
            </div>
        </Row>
        <AliceCarousel
            autoPlay
            autoPlayInterval={3000}
            animationDuration={1000}
            disableDotsControls
            items={items}
            responsive={responsive}/>
    </Container>
    );
        
};
