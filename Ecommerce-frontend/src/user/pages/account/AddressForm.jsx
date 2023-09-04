import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';

export const AddressForm = ({ initialValues, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialValues.name || '');
  const [phone, setPhone] = useState(initialValues.phone || '');
  const [provinceId, setProvinceId] = useState(initialValues.provinceId || '');
  const [districtId, setDistrictId] = useState(initialValues.districtId || '');
  const [wardId, setWardId] = useState(initialValues.wardId || '');
  const [street, setStreet] = useState(initialValues.street || '');
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    axios.get('https://provinces.open-api.vn/api/?depth=2')
      .then(response => {
        setProvinces(response.data);
      })
      .catch(error => {
        console.error('Error fetching provinces', error);
      });
  }, []);

  useEffect(() => {
    if (provinceId) {
      const province = provinces.find(province => province.id === provinceId);
      if (province) {
        setDistricts(province.districts);
      }
    }
  }, [provinceId, provinces]);

  useEffect(() => {
    if (districtId) {
      const district = districts.find(district => district.id === districtId);
      if (district) {
        setWards(district.wards);
      }
    }
  }, [districtId, districts]);

  const handleSubmit = () => {
    onSubmit({
      name,
      phone,
      provinceId,
      districtId,
      wardId,
      street,
    });
  };

  return (
    <>
      <TextField
        label="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <TextField
        label="Phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      <FormControl fullWidth>
        <InputLabel>Province</InputLabel>
        <Select
          value={provinceId}
          onChange={e => {
            setProvinceId(e.target.value);
            setDistrictId('');
            setWardId('');
          }}
          label="Province"
        >
          {provinces.map(province => (
            <MenuItem key={province.id} value={province.id}>
              {province.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>District</InputLabel>
        <Select
          value={districtId}
          onChange={e => {
            setDistrictId(e.target.value);
            setWardId('');
          }}
          label="District"
          disabled={!provinceId}
        >
          {districts.map(district => (
            <MenuItem key={district.id} value={district.id}>
              {district.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Ward</InputLabel>
        <Select
          value={wardId}
          onChange={e => setWardId(e.target.value)}
          label="Ward"
          disabled={!districtId}
        >
          {wards.map(ward => (
            <MenuItem key={ward.id} value={ward.id}>
              {ward.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Street"
        value={street}
        onChange={e => setStreet(e.target.value)}
      />
      <Button onClick={handleSubmit}>Submit</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </>
  );
};
