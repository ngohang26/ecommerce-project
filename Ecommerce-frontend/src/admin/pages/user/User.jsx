import React from 'react'
import './user.css'
import Single from '../../components/single/Single'
import { singleUser } from '../../data'
const User = () => {
  return (
    <div className='username'>
      <Single {...singleUser}/>
    </div>
  )
}
export default User
