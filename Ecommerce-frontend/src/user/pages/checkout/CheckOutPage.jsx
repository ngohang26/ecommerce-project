import React from 'react'
import { CheckOut } from './CheckOut'

export const CheckOutPage = ({cart , onCheckout, total}) => {
  return (
    <div>
      <CheckOut cart={cart} total={total}/>
    </div>
  )
}
