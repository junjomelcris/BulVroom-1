import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Read() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`https://bulvroom.onrender.com/read/${id}`)
      .then(res => {
        console.log(res);
        setUser(res.data[0]);
      })
      .catch(err => console.log(err));
  }, [id]);

  if (!user) {
    return (
      <div className='d-flex vh-100 bg-success justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
          <div className='d-flex justify-content-end'>
            <Link to="/pages/users" className='btn btn-danger'>
              <i className="bi bi-x"></i>
            </Link>
          </div>
          <p>User not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='d-flex vh-100 bg-success justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <div className='d-flex justify-content-end'>
          <Link to="/pages/users" className='btn btn-danger'>
            <i className="bi bi-x"></i>
          </Link>
        </div>
        <h2><i className="bi bi-eye-fill"></i> User Details</h2>
        <div className="user-details">
          <p><strong>User's ID:</strong> {user.id}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Last Name:</strong> {user.lastname}</p>
          <p><strong>Password:</strong> {user.password}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Contact:</strong> {user.contact}</p>
          <p><strong>Address:</strong> {user.address}</p>
        </div>
        <Link to={`/edit/${user.id}`} className='btn btn-sm btn-warning '><i className="bi bi-pencil-square"></i>Edit </Link>
      </div>
    </div>
  );
}

export default Read;
