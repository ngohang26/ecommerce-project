import React from 'react';
import { AddressCard } from './AddressCard';

export const AddressList = ({ addresses, onUpdate, onDelete }) => {
  return (
    <>
      {addresses.map(address => (
        <AddressCard
          key={address.id}
          address={address}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};
