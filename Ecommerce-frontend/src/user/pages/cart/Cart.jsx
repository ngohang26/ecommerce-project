import React from 'react';
import { useNavigate } from "react-router-dom";
import './cart.css';
import { DataGrid } from '@mui/x-data-grid';
import { Stack, Typography } from '@mui/material';
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'
import { Button } from 'semantic-ui-react';

export const Cart = ({ cart, total, setCart, onRemoveFromCart, onIncreaseQuantity, onDecreaseQuantity }) => {
  const navigate = useNavigate();
  // console.log('cart:', cart)
  const handleCheckOutClick = () => {
    navigate('/checkout');
    
  }
    
  const columns = [
    {field: 'image', 
    headerName: 'Product Image', 
    flex: 2,
    renderCell: (params) => (
      <img src={params.row.image} alt={params.row.productName} width={80} height={80} />
    ) },
    { field: 'productName', headerName: 'Product Name', flex: 2 },
    { field: 'price', headerName: 'Price', flex: 2.2, valueFormatter: ({ value }) => value.toFixed(2) },
    {
      field: 'quantity',
      headerName: 'Quantity',
      flex: 2,
      renderCell: (params) => (
        <div className='quantity-container' >
          <button className='btn-quantity btn-minus' onClick={() => onDecreaseQuantity(params.row.id)}>
            <AiOutlineMinus fontSize={18}/>
          </button>
          <div className='quantity-box'>{params.row.quantity}</div>
          <button className='btn-quantity btn-plus' onClick={() => onIncreaseQuantity(params.row.id)}>
            <AiOutlinePlus fontSize={18}/>
          </button>
        </div>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1.8,
      renderCell: (params) => (
        <>
          <button className='btn-remove' onClick={() => onRemoveFromCart(params.row.id)}>Delete</button>
        </>
      ),
    },
  ];

  return (
    <div className='cart-container'>
      <h2>Cart</h2>
      <div style={{ height:480, width: '100%' }}>
        <DataGrid className='data-grid'
          rows={cart} 
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => {
            setCart((preCart) => 
            preCart.map((product) => ({
              ...product,
              selected: newSelection.includes(product.id),
            })))
          }}
          hideFooterPagination
          disableRowSelectionOnClick
          disableColumnMenu
          components = {{
            NoRowsOverlay: () => (
              <Stack height='100%' alignItems='center' justifyContent='center'>
                Your shopping cat is empty
              </Stack>
            )
          }}
        />
      </div>
      <Stack direction='row' spacing={2} alignItems='center'>
        <Typography>Total: ${total.toFixed(2)}</Typography>
        {/* <Typography>Selected value: ${selectedValue.toFixed(2)}</Typography> */}
        <Button variant='contained' onClick={handleCheckOutClick}>Check out</Button>
      </Stack>    
    </div>
  );
};



// import React from 'react';
// import './cart.css';
// import { DataGridPro } from '@mui/x-data-grid-pro';

// export const Cart = ({ cart, onRemoveFromCart, onIncreaseQuantity, onDecreaseQuantity }) => {
//   const total = cart.reduce(
//     (acc, product) => acc + product.price * product.quantity,
//     0
//   );
    
//   const columns = [
//     { field: 'name', headerName: 'Product Name', width: 150 },
//     { field: 'price', headerName: 'Price', width: 150, valueFormatter: ({ value }) => value.toFixed(2) },
//     {
//       field: 'quantity',
//       headerName: 'Quantity',
//       width: 150,
//       renderCell: (params) => (
//         <div>
//           <button onClick={() => onDecreaseQuantity(params.row.id)}>-</button>
//           <span>{params.row.quantity}</span>
//           <button onClick={() => onIncreaseQuantity(params.row.id)}>+</button>
//         </div>
//       ),
//     },
//     {
//       field: 'action',
//       headerName: 'Action',
//       width: 150,
//       renderCell: (params) => (
//         <>
//           <button onClick={() => onRemoveFromCart(params.row.id)}>Delete</button>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <h2>Cart</h2>
//       <div style={{ height: 400, width: '100%' }}>
//         <DataGridPro
//           rows={cart} 
//           columns={columns}
//           checkboxSelection
//           rowsPerPageOptions={[]}
//           hideFooterRowCount={true}
//           disableRowSelectionOnClick

//           />
//       </div>
//       <p>Total: ${total.toFixed(2)}</p>
//     </div>
//   );
// };
