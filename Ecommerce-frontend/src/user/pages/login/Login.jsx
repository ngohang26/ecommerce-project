import React, {useEffect, useState, useCallback} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "semantic-ui-react";
import {GrClose} from 'react-icons/gr'  
import '../../styles/global-ui.css'
import './login.css'
import axios from 'axios';


const Login = ({onClose, onLoginSuccess}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Gửi dữ liệu đến phía backend
    axios.post('http://localhost:8080/user/login', {
      identifier: identifier,
      password: password
    })
    .then(function (response) {
      // Xử lý phản hồi từ phía backend
      // Ví dụ: chuyển hướng người dùng tới trang thích hợp
      if (response.data.role === 'ADMIN') {
        navigate('/');
      } else {
        onLoginSuccess(response.data);
      }
      if(rememberMe) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);

      }
      // Lưu trữ token vào localStorage
    })
    .catch(function (error) {
      // Xử lý lỗi
      // Ví dụ: hiển thị thông báo lỗi cho người dùng
      alert(error.response.data.message);
    });
  }

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      // Gửi yêu cầu tự động đăng nhập đến phía server
      axios.post('http://localhost:8080/user/auto-login', {
        token: token
      })
      .then(function (response) {
        // Xử lý phản hồi từ phía server
        // Ví dụ: chuyển hướng người dùng tới trang thích hợp
        if (response.data.role === 'ADMIN') {
          navigate('/');
        } else {
          onLoginSuccess(response.data);
        }
      })
      .catch(function (error) {
        // Xử lý lỗi
        // Ví dụ: hiển thị thông báo lỗi cho người dùng
        alert(error.response.data.message);
      });
    }
  
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown)  
    }
  }, [handleKeyDown, onLoginSuccess])

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="btn-close-container">
        <button type="button" onClick={onClose} className="btn-close">
          <GrClose className="btn-close-gr"/> 
        </button>        
        </div>
        <h2>SIGN IN</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-form">
            <Input type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder='Phone/ email/ username'/>

            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
          </div>
          {/* <TextField
            label="Tên"
            variant="outlined"
            InputLabelProps={{shrink: true}}
          /> */}
          <div className="checkbox-login">
            <Input type="checkbox" onChange={(e) => setRememberMe(e.target.checked)}></Input>
            <div>Remember me</div>
          </div>
          <Button type="submit" value="login" className="btn-login">LOGIN</Button>
          <Link className="link-forgetpass" >Forget password?</Link> 
        </form>
      </div>
    </div>
  )
}

export default Login
