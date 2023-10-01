import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Create() {
  const [values, setValues] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    age: '',
    contact: '',
    address: ''
  });

  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);

    const confirmation = window.confirm('Confirm insertion of this user?');

    if (confirmation) {
      axios.post('https://bulvroom.onrender.com/pages/users', values)
        .then(res => {
          console.log(res);
          Navigate('/pages/users');
        })
        .catch(err => console.error(err));
    }
  };


  return (
    <div className='d-flex vh-100 bg-success justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <div className='d-flex justify-content-end'>
          <Link to="/pages/users" className='btn btn-danger'>
            <i className="bi bi-x"></i>
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Add User</h2>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder='Enter Name'
              className='form-control'
              onChange={e => setValues({ ...values, name: e.target.value })}
              required
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder='Enter Last Name'
              className='form-control'
              onChange={e => setValues({ ...values, lastName: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Enter Email'
              className='form-control'
              onChange={e => setValues({ ...values, email: e.target.value })}
              required
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='Enter Password'
              className='form-control'
              onChange={e => setValues({ ...values, password: e.target.value })}
              required
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="age">Age</label>
            <input
              type="text"
              id="age"
              name="age"
              placeholder='Enter Age'
              className='form-control'
              onChange={e => setValues({ ...values, age: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="contact">Contact</label>
            <input
              type="text"
              id="contact"
              name="contact"
              placeholder='Enter Contact'
              className='form-control'
              onChange={e => setValues({ ...values, contact: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder='Enter Address'
              className='form-control'
              onChange={e => setValues({ ...values, address: e.target.value })}
            />
          </div>
          <button className='btn btn-warning' type="submit">ADD +</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
