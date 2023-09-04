import React, { useState } from 'react'
import './Add.css'

const Add = (props) => {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Upload the image file to the server
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const uploadResponse = await fetch('/api/FileUpload', {
        method: 'POST',
        body: formData
      });
      if (uploadResponse.ok) {
        const data = await uploadResponse.json();
        // Update the product object with the uploaded image URL
        setProduct({ ...product, image: data.data });
      }
    }
    // Send a POST request to the server to add the new product
    const response = await fetch('http://localhost:8080/products/addProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    if (response.ok) {
      props.setOpen(false);
      props.fetchProducts();
    } else if (response.status === 409) {
      setError('A product with the same name or image already exists.');
    } else {
      setError('An error occurred while adding the product.');
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  }

  const handleChange = (e, field) => {
    setProduct({ ...product, [field]: e.target.value });
  }

  return (
    <div className='add'>
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new Product</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img" && item.field !== "image")
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                <input type={column.type} placeholder={column.field} onChange={(e) => handleChange(e, column.field)} />
              </div>
            ))}
          <div className="item">
            <label>Image</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <button>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Add

