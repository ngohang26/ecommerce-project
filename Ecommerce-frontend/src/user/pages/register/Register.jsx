import React, { useState } from 'react';
import './register.css';
import '../../styles/global-ui.css'
import { Button, Input } from "semantic-ui-react";
import { GrClose } from 'react-icons/gr';
import { useEffect } from 'react';
import axios from 'axios';

const Register = ({ onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8080/user/register', {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      username: username,
      password: password
    })
      .then(function (response) {
        window.location.href = '/home';
      })
      .catch(function (error) {
        alert(error.response.data.message);
      });
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="btn-close-container">
          <button type="button" onClick={onClose} className="btn-close">
            <GrClose />
          </button>
        </div>
        <h2>REGISTER</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="name-form">
            <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" style={{ marginRight: 10 }} />
            <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last name' />
          </div>
          <div className="other-form">
            <Input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone number' />
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
            <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
          </div>
          <br />
          <Button type="submit" value="register" className="btn-register">REGISTER</Button>
        </form>
      </div>
    </div>
  )
}

export default Register