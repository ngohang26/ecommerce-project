import React, { useState } from 'react'
import './Products.css'
import DataTable from '../../components/dataTable/DataTable'
import Add from '../../components/Add/Add'

const productColumns = [
  { field: 'id', headerName: 'ID', type: "bigint" },
  { field: 'productName', headerName: 'Product Name', type: "string" },
  {
    field: 'price',
    headerName: 'Price',
    valueFormatter: ({ value }) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }), type: "decimal"
  },
  { field: 'image', headerName: 'Image', type: "string" },
  { field: 'category', headerName: 'Category', type: "string" },
  { field: 'sold', headerName: 'Sold', type: "int" },
  { field: 'rating', headerName: 'Rating', type: "float" },
];

async function fetchProducts() {
  const response = await fetch('http://localhost:8080/products/getAllProducts')
  return await response.json()
}

const Products = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className='products'>
      <div className='info'>
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add New Product</button>
      </div>
      <DataTable columns={productColumns} fetchData={fetchProducts} slug="products" />;
      {open && <Add columns={productColumns} setOpen={setOpen} fetchProducts={fetchProducts}/>}
    </div>
  )
}

export default Products
