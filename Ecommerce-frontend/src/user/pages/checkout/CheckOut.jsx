import React, {useState, useEffect} from 'react';
import { Box, Button, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import './checkOut.css'

export const CheckOut = ({ cart, onCheckout, total }) => {
  const selectedProducts = cart.filter((product) => product.selected);
  const [addresses, setAddresses] = useState([]);

  const summaryItems = [
    { label: 'Subtotal', value: `$${total.toFixed(2)}` },
    { label: 'Shipping fee', value: 'FREE' },
    { label: 'Shipping Guarantee', value: 'FREE' },
    { label: 'Total', value: '' },
  ];

  const getImageUrl = (image) => {
    if (image.startsWith('http')) {
      return image;
    } else {
      // return `${API_URL}/api/FileUpload/files/${image}`;
    }
  }
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: '',
    color: theme.palette.text.secondary,
    border: 'none',
    boxShadow: 'none',
  }));

  const fetchAddresses = () => {
    let token = localStorage.getItem('token');
    if (token) {
      axios.get(`http://localhost:8080/user/profile?token=${token}`)
        .then(function (response) {
          let userId = response.data.id;
          axios.get(`http://localhost:8080/users/${userId}/addresses`)
            .then(function (response) {
              setAddresses(response.data);
            })
            .catch(function (error) {
              alert(error.response.data.message);
            });
        })
        .catch(function (error) {
          alert(error.response.data.message);
        });
    }
  }

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handlePlaceOrder = () => {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');  
    

    if (token) {
      axios.post(`http://localhost:8080/users/purchase`, {
      products: selectedProducts.map(product => product.id), 
      status: 'to ship', 
      userId: userId 
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(function (response) {
        alert('Đơn hàng đã được đặt thành công!');
      })
      .catch(function (error) {
        alert('Có lỗi xảy ra khi đặt đơn hàng');
      });
    }
  }

  return (
    <div className='checkout-container' >
      <h1>Checkout</h1>
      <Box id='box-item'>
        <Grid container spacing={2}>
          <Grid xs={8} style={{ display: 'flex',  spacing: '2'}} container>
            <Grid item xs={12}>
              <Item>
                <h2>Shipping Address</h2>
                {addresses.map(address => (
                  <>
                    <h5 key={address.id}>{`${address.name}, ${address.phone},`}</h5>
                    <p key={address.id}>
                      {` ${address.street}, ${address.ward}, ${address.district}, ${address.city}`}
                    </p></>
                ))}
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item>
                <h2>Order Details</h2>
                <ul className='item-cart'>
                  {selectedProducts.map((product) => (
                    <li key={product.id}>
                      <div className="product-container">
                        <img src={getImageUrl(product.image)} alt={product.productName} />
                        <span className="quantity">x{product.quantity}</span>
                      </div>
                      <p>{product.productName} - ${product.price}</p>
                    </li>
                  ))}
                </ul>
                <div className="delivery">
                  <h3>Delivery Options</h3>
                  <span>Standard Delivery</span>
                  <span>Free shipping</span>
                </div>
              </Item>
            </Grid>
          </Grid>
          <Grid xs={4}>
            <Item>
              <h2>Order Summary</h2>
              {summaryItems.map((item, index) => (
                <div key={index} className="summary">
                  <p>{item.label}</p>
                  <p>{item.value}</p>
                </div>
              ))}
              <Button style={{width:' 100%'}} variant='contained' onClick={handlePlaceOrder}>Place Order</Button>
            </Item>
          </Grid>
        </Grid>
      </Box>
      </div>
  )
}
