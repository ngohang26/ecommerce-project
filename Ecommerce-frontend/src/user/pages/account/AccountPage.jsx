import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AiOutlineProfile } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go'
import { BsCreditCard2Back } from 'react-icons/bs';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IoMdNotificationsOutline } from 'react-icons/io'
import { Header } from '../../components/header/Header';
import { Profile } from './Profile';
import { Address } from './Address';
import './accountPage.css';

export const AccountPage = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabChange = (event) => {
    setActiveTab(event.currentTarget.dataset.tab);
  };
  

  const menuItems = [
    { tab: "profile", icon: <AiOutlineProfile />, text: "Profile" },
    { tab: "address", icon: <GoLocation />, text: "Address" },
    { tab: "back-card", icon: <BsCreditCard2Back />, text: "Bank & Cards" },
    { tab: "change-pw", icon: <RiLockPasswordLine />, text: "Change Password" },
    { tab: "noti", icon: <IoMdNotificationsOutline />, text: "Notification Setting" }
  ];

  return (
    <div>
      <Header user={user} setUser={setUser} />
      <div className='account-container'>
        <div className='account-menu' style={{ flex: 3 }}>
          <List>
            {menuItems.map((item)=> (
              <ListItem button key={item.tab} data-tab={item.tab} onClick={handleTabChange}>
                <ListItemIcon style={{fontSize: 22}}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text}/>
              </ListItem>
            ))}
          </List>
        </div>
        <div className='account-form' style={{ flex: 7 }}>
          {activeTab === "profile" && <Profile />}
          {activeTab === "address" && <Address />}

        </div>
      </div>
    </div>
  );
}
