import React, { useState } from 'react'
import './Add.css'

const Add = (props) => {
  const [product, setProduct] = useState({});
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let productCopy = { ...product };

    // Upload the thumbnail to the server
    if (thumbnail) {
      const formData = new FormData();
      formData.append('file', thumbnail);
      const uploadResponse = await fetch('http://localhost:8080/api/FileUpload/uploadFile', {
        method: 'POST',
        body: formData
      });
      if (uploadResponse.ok) {
        const data = await uploadResponse.json();
        // Update the product object with the uploaded image URL
        productCopy = { ...productCopy, thumbnail: data.data };
      }
    }

    // Upload the detail images to the server
    if (images) {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append('files', images[i]);
      }
      const uploadResponse = await fetch('http://localhost:8080/api/FileUpload/uploadMultipleFiles', {
        method: 'POST',
        body: formData
      });
      if (uploadResponse.ok) {
        const data = await uploadResponse.json();
        // Update the product object with the uploaded image URLs
        productCopy = { ...productCopy, images: data.data };
      }
    }

    // Send a POST request to the server to add the new product
    const response = await fetch('http://localhost:8080/products/addProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productCopy)
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

  const handleThumbnailChange = (event) => {
    setThumbnail(event.target.files[0]);
  }

  const handleImagesChange = (event) => {
    setImages(event.target.files);
  
    // Create previews of the images
    let previews = [];
    for (let i = 0; i < event.target.files.length; i++) {
      previews.push(URL.createObjectURL(event.target.files[i]));
    }
    setPreviewImages(previews);
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
          .filter((item) => item.field !== "id" && item.field !== "thumbnail" && item.field !== "images")
          .map((column) => (
            <div className="item" key={column.field}>
              <label>{column.headerName}</label>
              <input type={column.type} placeholder={column.field} onChange={(e) => handleChange(e, column.field)} />
            </div>
          ))}
        <div className="item">
          <label>Thumbnail</label>
          <input type="file" onChange={handleThumbnailChange} />
          {thumbnail && <img src={URL.createObjectURL(thumbnail)} alt="Selected" />}
        </div>
        <div className="item full-width">
          <label>Detail Images</label>
          <input type="file" onChange={handleImagesChange} multiple />
        <div className='image-item'>
                  {previewImages.map((src, index) => (
          <div key={index}>
            <img src={src} alt="Preview" />
          </div>
        ))}

        </div>
        </div>
        <button>Send</button>
      </form>
    </div>
  </div>
  )
}

export default Add
