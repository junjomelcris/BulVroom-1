import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
  const [data, setData] = useState({
    fName: '',
    lName: '',
    email: '',
    password: '',
    address: '',
    contact: '',
    driver_license_1: '',
    driver_license_2: '',
    valid_id: '',
    profile_pic: null,
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const confirmation = window.confirm('Confirm insertion of this user?');

    if (confirmation) {
      const formData = new FormData();
      formData.append('fName', data.fName);
      formData.append('lName', data.lName);
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('address', data.address);
      formData.append('contact', data.contact);
      formData.append('driver_license_1', data.driver_license_1);
      formData.append('driver_license_2', data.driver_license_2);
      formData.append('valid_id', data.valid_id);
      formData.append('profile_pic', data.profile_pic);

      axios
        .post('http://localhost:8082/create', formData)
        .then((res) => {
          console.log(res);
          navigate('/employee');
        })
        .catch((err) => console.error(err));
    }
  };

  const handleFileChange = (e) => {
    setData({ ...data, profile_pic: e.target.files[0] });
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <h2 className='card-title mb-4'>Add Employee</h2>
              <form onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='fName' className='form-label'>
                      First Name
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='fName'
                      name='fName'
                      placeholder='Enter First Name'
                      autoComplete='off'
                      onChange={(e) => setData({ ...data, fName: e.target.value })}
                    />
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='lName' className='form-label'>
                      Last Name
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='lName'
                      name='lName'
                      placeholder='Enter Last Name'
                      autoComplete='off'
                      onChange={(e) => setData({ ...data, lName: e.target.value })}
                    />
                  </div>
                </div>
                <div className='mb-3'>
                  <label htmlFor='username' className='form-label'>
                    User Name
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='username'
                    name='username'
                    placeholder='Enter User Name'
                    autoComplete='off'
                    onChange={(e) => setData({ ...data, username: e.target.value })}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='email' className='form-label'>
                    Email
                  </label>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    name='email'
                    placeholder='Enter Email'
                    autoComplete='off'
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='password' className='form-label'>
                    Password
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    name='password'
                    placeholder='Enter Password'
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='address' className='form-label'>
                    Address
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='address'
                    name='address'
                    placeholder='1234 Main St'
                    autoComplete='off'
                    onChange={(e) => setData({ ...data, address: e.target.value })}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='contact' className='form-label'>
                    Contact
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='contact'
                    name='contact'
                    placeholder='Enter Contact'
                    autoComplete='off'
                    onChange={(e) => setData({ ...data, contact: e.target.value })}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='license1' className='form-label'>
                    Driver License 1
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='license1'
                    name='driver_license_1'
                    placeholder='Enter License 1'
                    autoComplete='off'
                    onChange={(e) => setData({ ...data, driver_license_1: e.target.value })}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='license2' className='form-label'>
                    Driver License 2
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='license2'
                    name='driver_license_2'
                    placeholder='Enter License 2'
                    autoComplete='off'
                    onChange={(e) => setData({ ...data, driver_license_2: e.target.value })}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='validId' className='form-label'>
                    Valid ID
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='validId'
                    name='valid_id'
                    placeholder='Enter Valid ID'
                    autoComplete='off'
                    onChange={(e) => setData({ ...data, valid_id: e.target.value })}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label' htmlFor='inputGroupFile01'>
                    Select Profile Picture
                  </label>
                  <input
                    type='file'
                    className='form-control'
                    id='inputGroupFile01'
                    onChange={handleFileChange}
                  />
                </div>
                <div className='d-grid'>
                  <button type='submit' className='btn btn-primary btn-block'>
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
