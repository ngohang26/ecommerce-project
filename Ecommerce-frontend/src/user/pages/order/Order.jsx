import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './order.css'

export const Order = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');
    if (token && userId) {
      axios.get(`http://localhost:8080/users/${userId}/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(function (response) {
          setOrders(response.data);
        })
        .catch(function (error) {
          alert('Có lỗi xảy ra khi lấy danh sách đơn hàng');
        });
    }
  }, []);

  return (
    <div className='order-container'>
      <h1>My Order</h1>
      <div className="nav-tabs">
        {/* ...existing code... */}
      </div>
      <div className="order-list">
        {orders.filter(order => selectedTab === 'all' || order.status === selectedTab).map(order => (
          <div key={order.id} className="order-item">
            <div key={order.id} className="order-item">
              <h2>Order ID: {order.id}</h2>
              <p>Status: {order.status}</p>
              <ul>
                {order.products.map(product => (
                  <li key={product.id}>
                    <p>Product Name: {product.name}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Price: ${product.price}</p>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}


// khai bao ham lay anh giong nhu o ...