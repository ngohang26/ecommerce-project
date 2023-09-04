import React from 'react';
import {GiBread, GiWrappedSweet, GiOpenedFoodCan, GiWineBottle, GiTomato, GiFruitBowl} from 'react-icons/gi'
import {TbMeat} from 'react-icons/tb'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './Category.css'
import { Container, Row, Col, Button } from 'react-bootstrap';

const Item = ({ icon, text, color }) => {
  return (
    <div  className='category-item'>
      <div className="item-container">
        <div className="icon-container">{React.cloneElement(icon, { style: { color: color } })}</div>
        <div className='text-container'>{text}</div>
      </div>
    </div>
  );
};


const items = [
  <Item icon={<GiTomato size={50} />} text="GiTomato" color="red"/>,
  <Item icon={<GiFruitBowl size={50} />} text="GiFruitBowl" color="#b7cc43"/>,
  <Item icon={<GiWineBottle size={50} />} text="GiWineBottlerot" color="#a32323"/>,
  <Item icon={<GiBread size={60 } />} text="GiBread" color="#d1a84a"/>,
  <Item icon={<TbMeat size={50} />} text="TbMeat" color="#a32323"/>,
  <Item icon={<GiWrappedSweet size={50} />} text="GiWrappedSweet" color="#23a336"/>,
  <Item icon={<GiOpenedFoodCan size={50} />} text="GiOpenedFoodCan" color="#a08322"/>,

];

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 4 },
};

export const Category = () => {
  return (
    <Container className='category'>
      <Row className="row-1">
          <h2 className='category-title'>Category</h2>
          <div className='category-btn'> 
            <Button className='btn-link'>View All Categories → </Button>
          </div>
      </Row>
      <AliceCarousel
        autoPlay
        autoPlayInterval={3000}
        animationDuration={1000}
        disableDotsControls
        items={items}
        responsive={responsive}
      />
    </Container>
  );
};

