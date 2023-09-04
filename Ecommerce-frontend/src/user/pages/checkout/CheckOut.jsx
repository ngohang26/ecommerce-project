import React from 'react';

export const CheckOut = ({ cart, onCheckout, total}) => {
  const selectedProducts = cart.filter((product) => product.selected);

  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {selectedProducts.map((product) => (
          <li key={product.id}>
            {product.productName} - ${product.price} x {product.quantity} = $
            {(product.price * product.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={onCheckout}>Place Order</button>
    </div>
  );
};
