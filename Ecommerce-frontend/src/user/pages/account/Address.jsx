import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { AddressForm } from './AddressForm';
import { AddressList } from './AddressList';

export const Address = ({userId}) => {
  const [addresses, setAddresses] = useState([]);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [addressToUpdate, setAddressToUpdate] = useState(null);

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

  const handleAddAddress = address => {
    let token = localStorage.getItem('token');
    if (token) {
      axios.post(`http://localhost:8080/users/${userId}/addresses?token=${token}`, address)
        .then(function (response) {
          setAddresses([...addresses, response.data]);
          setShowAddAddressForm(false);
        })
        .catch(function (error) {
          alert(error.response.data.message);
        });
    }
  };
  
  const handleUpdateAddress = address => {
    let token = localStorage.getItem('token');
    if (token) {
      axios.put(`http://localhost:8080/users/${userId}/addresses/${address.id}?token=${token}`, address)
        .then(function (response) {
          setAddresses(addresses.map(a => a.id === address.id ? response.data : a));
          setAddressToUpdate(null);
        })
        .catch(function (error) {
          alert(error.response.data.message);
        });
    }
  };
  
  const handleDeleteAddress = address => {
    let token = localStorage.getItem('token');
    if (token) {
      axios.delete(`http://localhost:8080/users/${userId}/addresses/${address.id}?token=${token}`)
        .then(function (response) {
          setAddresses(addresses.filter(a => a.id !== address.id));
        })
        .catch(function (error) {
          alert(error.response.data.message);
        });
    }
  };
  
  return (
    <div>
      <Button onClick={() => setShowAddAddressForm(true)}>Add new your address</Button>
      {showAddAddressForm && (
        <AddressForm
          initialValues={{}}
          onSubmit={handleAddAddress}
          onCancel={() => setShowAddAddressForm(false)}
        />
      )}
      {addressToUpdate && (
        <AddressForm
          initialValues={addressToUpdate}
          onSubmit={updatedAddress => handleUpdateAddress(updatedAddress)}
          onCancel={() => setAddressToUpdate(null)}
        />
      )}
      <AddressList
        addresses={addresses}
        onUpdate={address => setAddressToUpdate(address)}
        onDelete={address => handleDeleteAddress(address)}
      />
    </div>
  );
};
