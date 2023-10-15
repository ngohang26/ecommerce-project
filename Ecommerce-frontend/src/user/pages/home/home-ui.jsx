import React from 'react';
import {Banner} from "../../components/banner/Banner";
import { Product } from "../../components/product/Product";
import { BannerAd } from "../../components/bannerad/BannerAd";

import Cate from "../../components/cate/Cate";
import { Header } from '../../components/header/Header';
function HomeUI({cart, setCart, user, setUser}) {
  return (
    <div className='App'>
        <Header user={user} setUser={setUser}/>
        <Banner/>
        <Cate/>
        <Product cart={cart} setCart={setCart}/>
        <BannerAd/>
    </div>

  );
}

export default HomeUI;
