import React, { useState } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './admin/pages/home/Home';
import Navbar from './admin/components/navbar/Navbar';
import Menu from './admin/components/menu/Menu';
import Footer from './admin/components/footer/Footer';
import Users from './admin/pages/users/Users';
import Products from './admin/pages/products/Products';
import Login from './user/pages/login/Login';
import Product from './admin/pages/product/Product';
import User from './admin/pages/user/User';
import HomeUI from './user/pages/home/home-ui'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Register from './user/pages/register/Register';
import { CartPage } from './user/pages/cart/CartPage';
import { CheckOut } from './user/pages/checkout/CheckOut';
import { AccountPage } from './user/pages/account/AccountPage';
import { CheckOutPage } from './user/pages/checkout/CheckOutPage';
import {Order} from './user/pages/order/Order'
import { ProductDetail } from './user/pages/productDetail/ProductDetail';
const queryClient = new QueryClient();

function App() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
  const total = cart.reduce(
    (acc, product) => acc + (product.selected ? product.price * product.quantity : 0),
    0
  );
  const [user, setUser] = useState(null);
  // const handleUpdateCart = (newCart) => {
  //   setCart(newCart);
  // };

  const Layout = () => {
    return (
      <div className='main'>
        <Navbar />
        <div className='container'>
          <div className='menuContainer'>
            <Menu />
          </div>
          <div className='contentContainer'>
            <QueryClientProvider client={queryClient}>

              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/users",
          element: <Users />
        },
        {
          path: "/products",
          element: <Products />
        },
        {
          path: "/users/:id",
          element: <User />
        },
        {
          path: "/products/:id",
          element: <Product />
        }
      ],
    },
    {
      path: '/home/*',
      element: <HomeUI cart={cart} setCart={setCart} user={user} setUser={setUser} />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/cart",
      element: <CartPage cart={cart} setCart={setCart} user={user} setUser={setUser} total={total} />
    },
    {
      path: "/checkout",
      element: <CheckOutPage cart={cart} total={total} />
    },
    {
      path: "/account",
      element: <AccountPage user={user} setUser={setUser} />
    },
    {
      path: "/user/order",
      element: <Order user={user} setUser={setUser} />
    },
    {
      path: "/productsdl/:productId",
      element: <ProductDetail user={user} setUser={setUser} cart={cart} />
    },

  ])
  return <RouterProvider router={router} />
}

export default App;