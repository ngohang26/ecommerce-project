import React from 'react';
import './cate.css'
import { Card, CardContent, Typography } from '@mui/material';
import { GiBroccoli, GiFruitBowl, GiGrain, GiWaterBottle } from 'react-icons/gi';
import { FaSeedling } from 'react-icons/fa';

const categories = [
  { name: 'Fruits', icon: GiFruitBowl, color: '#beb04b' },
  { name: 'Vegetable', icon: GiBroccoli, color: '#167846' },
  { name: 'Juices', icon: GiWaterBottle, color: '#de9a4e' },
  { name: 'Pb Protein', icon: GiGrain, color: '#53370fee' },
  { name: 'Herbal Tea', icon: FaSeedling, color:'#216b1aed' },
];

const Cate = () => {
  return (
    <div className='category-container'>
      <h1>Category</h1>
      {/* <button>View All Categories</button> */}
      <div className='category'>
        {categories.map((category) => (
          <Card key={category.name} className='list-categories'>
            <div className="list-category">
              <category.icon style={{color: category.color, fontSize: 40}}/>
              <CardContent>
                <Typography variant='h6'>{category.name}</Typography>
              </CardContent>
            </div>
            </Card>
        ))}
      </div>
    </div>
  );
};


export default Cate