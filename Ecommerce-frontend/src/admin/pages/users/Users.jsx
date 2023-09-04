import React, { useState } from 'react'
import DataTable from '../../components/dataTable/DataTable'
import './Users.css'
import Add from '../../components/Add/Add'
const userColumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name'},
  { field: 'lastName', headerName: 'Last name'},
  { field: 'username', headerName: 'User name'},
  { field: 'email', headerName: 'Email'},
  { field: 'phone', headerName: 'Phone number'},

];

async function fetchUsers() {
  const response = await fetch('http://localhost:8080/user/getAllUsers');
  return await response.json();
}
const Users = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className='users'>
      <div className='info'>  
        <h1>Users</h1>
        {/* <button onClick={() => setOpen(true)}>Add New User</button>       */}
      </div>
      <DataTable columns={userColumns} fetchData={fetchUsers} slug = "user" />;
      {open && <Add columns={userColumns} setOpen={setOpen} />}
    </div>
  )
}

export default Users