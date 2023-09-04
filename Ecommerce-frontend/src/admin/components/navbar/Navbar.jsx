import React from 'react'
import './Navbar.css'
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='logo'>
        <img src="logo.svg" alt=""/>
        <span>foodadmin</span>
      </div>
      <div className='icons'>
        <img src="search.svg" alt="" className='icon'/>
        <img src="app.svg" alt="" className='icon'/>
        <img src="expand.svg" alt="" className='icon'/>
        <div className='notification'>
          <img src="notifications.svg" alt=""/>
          <span>1</span>
        </div>
        <div className='user'>
          <img src="https://i.pinimg.com/564x/e9/b1/d5/e9b1d51411ad76c73fc0c18dfdab486b.jpg" alt=""/>
          <span>Jane</span>
        </div>
        <img src="/settings.svg" alt="" className='icon'/>
      </div>
    </div>
  )
}

export default Navbar