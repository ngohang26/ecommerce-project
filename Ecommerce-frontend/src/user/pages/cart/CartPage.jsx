import React from 'react'
import { Cart } from './Cart'
import { Header } from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

export const CartPage = ({ user, setUser, cart, setCart, total }) => {
  const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((product) => product.id !== productId);
      saveCart(newCart);
      return newCart;
    });
  };

  const handleIncreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const newCart =
        prevCart.map((product) =>
          product.id === productId
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
        saveCart(newCart);
        return newCart;
    });
  };

  const handleDecreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const newCart = 
      prevCart.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(0, product.quantity - 1) }
          : product
      );
      saveCart(newCart);
      return newCart;
    });
  };


  return (
    <div>
      <Header user={user} setUser={setUser}/>
      <Cart
        cart={cart}
        setCart={setCart}
        total={total}
        onRemoveFromCart={handleRemoveFromCart}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
      />
      <Footer/>
    </div>
  )
}
