import React, { useState } from "react";
import Logo from "../../assets/logo.png"
import { SearchBar } from "../searchbar/SearchBar";
import './Header.css';
import 'semantic-ui-css/semantic.min.css'
import { Image, Menu, MenuItem } from "semantic-ui-react";
import { SearchResultsList } from "../searchbar/SearchResultsList";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";

export const Header = ({user, setUser}) => {
  const [results, setResults] = useState([]);
  const [, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  // const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  /*CART */
  const handleViewCart = () => {
    navigate('/cart');
  }

  const handleAvatarClick = () => {
    setShowMenu(!showMenu);
  }


  /*ACCOUNT */
  const handleAccount = () => {
    navigate('/account')
  }


  /*LOGIN, LOGOUT, REGISTER */
  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  }

  const handleSignOut = () => {
    setIsLoggedIn(false);
  }

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/');

  }

  const handleSignInClick = () => {
    setShowLogin(true);
  }

  const handleLoginClose = () => {
    setShowLogin(false);
  }

  const handleRegisterClick = () => {
    setShowRegister(true);
  }

  const handleRegisterClose = () => {
    setShowRegister(false);
  }

  const handleLogoClick = () => {
    navigate('/');
  }

  return (
    <div className='header'>
      <div className='leftSide'>
        <Image src={Logo} onClick={handleLogoClick}/>
      </div>
      <div className='centerSide'>
        <div className="search-bar-container">
          <SearchBar setResults={setResults} />
          {results && results.length > 0 && <SearchResultsList results={results} />}
        </div>
      </div>
      <div className='rightSide'>
        <div className="support-box">
          <span>For support?</span>
          <h1>0977666888</h1>
        </div>
        <div className="form-account">
          {user ? (
            <div className="form-user" onClick={handleAvatarClick}>
              {/* <img src={user.avatar} alt={user.username} /> */}
              <div className='user' >
                <i class='bx bx-user' ></i>
              </div>
              <span className="username" >{user.username}</span>
              {showMenu && (
                <Menu className="showMenu">
                  <MenuItem name="Your Acccount" onClick={handleAccount} />
                  <MenuItem name="Order" onClick={handleSignOut} />
                  <MenuItem name="Sign Out" onClick={handleLogOut} />
                </Menu>
              )
              }
            </div>
          ) : (
            <div className="sign-in">

              <MenuItem className="item" onClick={handleSignInClick}>SIGN IN</MenuItem>
              {showLogin && <Login onClose={handleLoginClose} onLoginSuccess={handleLoginSuccess} />}

              <MenuItem className="item" onClick={handleRegisterClick}>REGISTER</MenuItem>
              {showRegister && <Register onClose={handleRegisterClose} />}
            </div>
          )
          }
        </div>
        <div className='cart'>
          <div className='heart' onClick={handleAvatarClick}>
                <i class='bx bx-heart' ></i>
          </div>
          <AiOutlineShoppingCart className="cart-icon" onClick={handleViewCart} size={30} />
        </div>
      </div>
    </div>

  )
}
