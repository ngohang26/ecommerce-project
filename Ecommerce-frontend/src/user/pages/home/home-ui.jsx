// import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { Header } from '../../components/header/Header';
import React from 'react';
import {Banner} from "../../components/banner/Banner";
import { Product } from "../../components/product/Product";
import { BannerAd } from "../../components/bannerad/BannerAd";
import { Footer } from "../../components/footer/Footer";

import Cate from "../../components/cate/Cate";
function HomeUI({cart, setCart, user, setUser}) {
  return (
    <div className='App'>
        <Header user={user} setUser={setUser}/>
        <Banner/>
        <Cate/>
        <Product cart={cart} setCart={setCart}/>
        <BannerAd/>
        <Footer/>
    </div>

  );
}

export default HomeUI;
