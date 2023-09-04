import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

export const AddressCard = ({ address, onUpdate, onDelete }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{address.name}</Typography>
        <Typography variant="body2">{address.phone}</Typography>
        <Typography variant="body2">
          {address.street}, {address.ward}, {address.district}, {address.city}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => onUpdate(address)}>Update</Button>
        <Button onClick={() => onDelete(address)}>Delete</Button>
      </CardActions>
    </Card>
  );
};
