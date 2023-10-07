import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddVehicle() {
  const [data, setData] = useState({
    id: '', // Updated to allow admin to choose the owner
    make: '',
    model: '',
    type: '',
    seatingCapacity: '',
    transmission: '',
    gas: '',
    features: [], // Updated to allow multiple features
    plate: '',
    description: '',
    phone: '',
    rate: '',
    deposit: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const confirmation = window.confirm('Confirm insertion of this vehicle?');

    if (confirmation) {
      axios
        .post('https://bulvroom.onrender.com/createVehicle', data)
        .then((res) => {
          console.log(res);
          navigate('/vehicles'); // Redirect to the vehicle management page
        })
        .catch((err) => console.error(err));
    }
  };

  const handleCheckboxChange = (feature) => {
    // Function to toggle features in the state
    const updatedFeatures = [...data.features];
    if (updatedFeatures.includes(feature)) {
      // If the feature is already in the array, remove it
      updatedFeatures.splice(updatedFeatures.indexOf(feature), 1);
    } else {
      // If the feature is not in the array, add it
      updatedFeatures.push(feature);
    }
    setData({ ...data, features: updatedFeatures });
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <h2 className='card-title mb-4'>Add Vehicle</h2>
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label htmlFor='id' className='form-label'>
                    Owner (User ID)
                  </label>
                  <input
                    type='number'
                    className='form-control'
                    id='id'
                    name='id'
                    placeholder='Enter User ID'
                    autoComplete='off'
                    onChange={(e) => setData({ ...data, id: e.target.value })}
                  />
                </div>
                <div className='row'>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='make' className='form-label'>
                      Make
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='make'
                      name='make'
                      placeholder='Enter Make'
                      autoComplete='off'
                      onChange={(e) => setData({ ...data, make: e.target.value })}
                    />
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='model' className='form-label'>
                      Model
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='model'
                      name='model'
                      placeholder='Enter Model'
                      autoComplete='off'
                      onChange={(e) => setData({ ...data, model: e.target.value })}
                    />
                  </div>
                </div>
                <div className='mb-3'>
                  <label htmlFor='type' className='form-label'>
                    Type
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='type'
                    name='type'
                    placeholder='Enter Type'
                    autoComplete='off'
                    onChange={(e) => setData({ ...data, type: e.target.value })}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='seatingCapacity' className='form-label'>
                    Seating Capacity
                  </label>
                  <input
                    type='number'
                    className='form-control'
                    id='seatingCapacity'
                    name='seatingCapacity'
                    placeholder='Enter Seating Capacity'
                    autoComplete='off'
                    onChange={(e) => setData({ ...data, seatingCapacity: e.target.value })}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='transmission' className='form-label'>
                    Transmission
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='transmission'
                    name='transmission'
                    placeholder='Enter Transmission'
                    autoComplete='off'
                    onChange={(e) => setData({ ...data, transmission: e.target.value })}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='gas' className='form-label'>
                    Gas
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='gas'
                    name='gas'
                    placeholder='Enter Gas'
                    autoComplete='off'
                    onChange={(e) => setData({ ...data, gas: e.target.value })}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Features</label>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value='Aircondition'
                      id='featureAircondition'
                      onChange={() => handleCheckboxChange('Aircondition')}
                    />
                    <label className='form-check-label' htmlFor='featureAircondition'>
                      Aircondition
                    </label>
                  </div>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value='Bluetooth'
                      id='featureBluetooth'
                      onChange={() => handleCheckboxChange('Bluetooth')}
                    />
                    <label className='form-check-label' htmlFor='featureBluetooth'>
                      Bluetooth
                    </label>
                  </div>
                  {/* Add more feature checkboxes here */}
                </div>
                <div className='mb-3'>
                  <label htmlFor='plate' className='form-label'>
                    Plate (Platenumber)
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='plate'
                    name='plate'
                    placeholder='Enter Plate'
                    autoComplete='off'
                    onChange={(e) => setData({ ...data, plate: e.target.value })}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='description' className='form-label'>
                    Description
                  </label>
                  <textarea
                    className='form-control'
                    id='description'
                    name='description'
                    rows='3'
                    placeholder='Enter Description'
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='phone' className='form-label'>
                    Phone
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='phone'
                    name='phone'
                    placeholder='Enter Phone'
                    autoComplete='off'
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                  />
                </div>
                <div className='row'>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='rate' className='form-label'>
                      Rate
                    </label>
                    <input
                      type='number'
                      className='form-control'
                      id='rate'
                      name='rate'
                      placeholder='Enter Rate'
                      autoComplete='off'
                      onChange={(e) => setData({ ...data, rate: e.target.value })}
                    />
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='deposit' className='form-label'>
                      Deposit
                    </label>
                    <input
                      type='number'
                      className='form-control'
                      id='deposit'
                      name='deposit'
                      placeholder='Enter Deposit'
                      autoComplete='off'
                      onChange={(e) => setData({ ...data, deposit: e.target.value })}
                    />
                  </div>
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

export default AddVehicle;
