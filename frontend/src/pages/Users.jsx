import React, { useEffect, useState } from 'react'
import {Link }from 'react-router-dom';
import axios from 'axios'


function Users() {
  const [data, setData]= useState([])
  useEffect(()=>{
    axios.get('http://localhost:8081/pages/users')

      .then(res=>setData(res.data))
      .catch(err=> console.log(err));
  },[])
  
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    
    if (confirmDelete) {
      axios.delete('http://localhost:8081/delete/' + id)
        .then((res) => {
          location.reload();
        })
        .catch((err) => console.log(err));
    }
  };
  
  
  return (
    <div><br/><br/><center><h4>USER MANAGEMENT</h4><br/></center>
    <div className='d-flex vh-100 justify-content-left '>
      <div className='w-100 bg-white rounded p-3 '>
          <div className='d-flex justify-content-end'>
            <Link to="/create" className='btn btn-success'><i className="bi bi-plus-circle-dotted"></i> Create</Link>
          </div>
          <table className='table'>
            <thead>
              <tr>
              <th>ID</th>
              <th>Name</th>
              
              <th>Surname</th>
              <th>Email</th>
              <th>Password</th>
              <th>Age</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((users, index)=>{
                return <tr key={index}>
                  <td className="truncate">{users.id}</td>
                  <td className="truncate">{users.name}</td>
                  <td className="truncate">{users.lastname}</td>
                  <td className="truncate">{users.email}</td>
                  
                  <td className="truncate">{users.password}</td>
                  <td className="truncate">{users.age}</td>
                  <td className="truncate">{users.contact}</td>
                  <td className="truncate">{users.address}</td>

                  <td>
                  <Link to={`/read/${users.id}`} className='btn btn-sm btn-primary'><i className="bi bi-eye-fill"></i>Read</Link>

                    <Link to={`/edit/${users.id}`}className='btn btn-sm btn-warning 'style={{ margin: '10px' }}><i className="bi bi-pencil-square"></i>Edit </Link>
                    <button onClick={() => handleDelete(users.id)} className='btn btn-sm btn-danger'><i className="bi bi-trash3-fill"></i>Delete</button>

                  </td>
                </tr>
              })
              
              }
            </tbody>
          </table>
      </div>
    </div>
    </div>
  )
}

export default Users
