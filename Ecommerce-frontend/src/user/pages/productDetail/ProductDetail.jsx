import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './productDetail.css'
import { Header } from '../../components/header/Header';

export const ProductDetail = ({ user, setUser, cart, setCart, total }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState('');

  const API_URL = "http://localhost:8080"

  useEffect(() => {
    fetch(`${API_URL}/products/${productId}`)
      .then(response => response.json())
      .then(data => {
        // if (data.images && data.images.length > 0) {
        //   setImages(data.images);
        //   setSelectedImage(data.images[0]);
        // }
        setProduct(data);
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  }, [productId]);

  const getImageUrl = (images) => {
    if (images.startsWith('http')) {
      // If the image is an absolute URL, return it as is
      return images;
    } else {
      // If the image is a relative path, prepend the API URL
      return `${API_URL}/api/FileUpload/files/${images}`;
    }
  }
  return (
    <div>
      <Header user={user} setUser={setUser} cart={cart}/>
      <div className="product-detail">
        <div className="product-thumbnail">
          {product.images && product.images.map((image, index) => (
            <img 
            key={index} 
            src={getImageUrl(image)} 
            alt="Thumbnail" 
            onClick={() => setProduct({...product, selectedImage: image})}
            style={{width: '85px', 
                    height: '85px', 
                    cursor: 'pointer', 
                    border: product.selectedImage === image ? '2px solid #fce08c' : '1px solid #ccc'}}
            />
            ))}
        </div>
        {product.selectedImage && <img src={getImageUrl(product.selectedImage)} alt="Selected" style={{width: '620px', height: '620px'}}/>}
        <div className="product-info">
          <h3>{product.productName}</h3>
        </div>
      </div>
    </div>
  )
}
