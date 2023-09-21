import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Edit() {
  const { id } = useParams();
  const Navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8081/read/${id}`)
      .then(res => {
        console.log(res);
        setValues({
          name: res.data[0].name,
          email: res.data[0].email,
          lastName: res.data[0].lastName,
          password: res.data[0].password,
          age: res.data[0].age,
          contact: res.data[0].contact,
          address: res.data[0].address,
        });
      })
      .catch(err => console.log(err));
  }, [id]);

  const [values, setValues] = useState({
    name: null,
    email: null,
    lastName: null,
    password: null,
    age: null,
    contact: null,
    address: null,
  });

  const handleUpdate = (event) => {
    event.preventDefault();

    // Show a confirmation dialog
    const confirmUpdate = window.confirm('Are you sure you want to update this user?');

    if (confirmUpdate) {
      axios
        .put(`http://localhost:8081/edit/${id}`, values)
        .then((res) => {
          console.log(res);
          Navigate('/pages/users');
        })
        .catch((err) => console.log(err));
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
        <form onSubmit={handleUpdate}>
          <div>
            <h2>Update User</h2>
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder='Enter Name'
              className='form-control'
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="">Last Name</label>
            <input
              type="text"
              placeholder='Enter Last Name'
              className='form-control'
              value={values.lastName}
              onChange={(e) => setValues({ ...values, lastName: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder='Enter Email'
              className='form-control'
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className='mb-2'>
  <label htmlFor="">Password</label>
  <input
    type="password"
    placeholder='Enter Password'
    className='form-control'
    value={values.password}
    onChange={(e) => setValues({ ...values, password: e.target.value })}
    disabled // This line disables the input field
  />
</div>

          <div className='mb-2'>
            <label htmlFor="">Age</label>
            <input
              type="text"
              placeholder='Enter Age'
              className='form-control'
              value={values.age}
              onChange={(e) => setValues({ ...values, age: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="">Contact</label>
            <input
              type="text"
              placeholder='Enter Contact'
              className='form-control'
              value={values.contact}
              onChange={(e) => setValues({ ...values, contact: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="">Address</label>
            <input
              type="text"
              placeholder='Enter Address'
              className='form-control'
              value={values.address}
              onChange={(e) => setValues({ ...values, address: e.target.value })}
            />
          </div>
          <button className='btn btn-success'>
            <i className="bi bi-pencil-square"></i> UPDATE
          </button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
