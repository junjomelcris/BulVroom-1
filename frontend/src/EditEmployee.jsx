import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function EditEmployee() {
	const [data, setData] = useState({
		fName: '',
		lName: '',
		username: '',
		email: '',
		password: '',
		profile_pic: '',
		address: '',
		contact: '',
		driver_license_1: '',
		valid_id: '',
		status: ''

	})
	const navigate = useNavigate()
	
	const {id} = useParams();

	useEffect(()=> {
		axios.get('http://localhost:8082/get/'+id)
		.then(res => {
			setData({...data, fName: res.data.Result[0].fName,
				lName: res.data.Result[0].lName,
				username: res.data.Result[0].username,
				email: res.data.Result[0].email,
				password: res.data.Result[0].email,
				profile_pic: res.data.Result[0].email,
				address: res.data.Result[0].address,
				contact: res.data.Result[0].contact,
				driver_license_1: res.data.Result[0].driver_license_1,
				valid_id: res.data.Result[0].valid_id,
				status: res.data.Result[0].status
			})
		})
		.catch(err =>console.log(err));
	}, [])

	const handleSubmit = (event) => {
		event.preventDefault();
	  
		// Display a confirmation dialog to the user
		const confirmUpdate = window.confirm('Are you sure you want to update this user?');
	  
		if (confirmUpdate) {
		  // Filter out 'password' and 'profile_pic' from updatedData
		  const { password, profile_pic, ...updatedDataWithoutSensitiveInfo } = data;
	  
		  axios
			.put(`http://localhost:8082/update/${id}`, updatedDataWithoutSensitiveInfo)
			.then((res) => {
			  if (res.data.Status === 'Success') {
				navigate('/employee');
			  } else {
				console.error('Error updating user data');
			  }
			})
			.catch((err) => console.error(err));
		}
	  };
  return (
    <div className='d-flex flex-column align-items-center pt-4'>
			<h2>update user {data.fName} </h2>
			<form class="row g-3 w-50" onSubmit={handleSubmit}>
			<div class="col-12">
					<label for="fName" class="form-label">First Name</label>
					<input type="text" class="form-control" id="fName" placeholder='Enter First Name' autoComplete='off'
					onChange={e => setData({...data, fName: e.target.value})} value={data.fName}/>
				</div>

				<div class="col-12">
					<label for="lName" class="form-label">Last Name</label>
					<input type="text" class="form-control" id="lName" placeholder='Enter Last Name' autoComplete='off'
					onChange={e => setData({...data, lName: e.target.value})} value={data.lName}/>
				</div>

				<div class="col-12">
					<label for="username" class="form-label">Username</label>
					<input type="text" class="form-control" id="username" placeholder='Enter Email' autoComplete='off' disabled={true}
					onChange={e => setData({...data, username: e.target.value})} value={data.username}/>
				</div>

				<div class="col-12">
					<label for="email" class="form-label">Email</label>
					<input type="email" class="form-control" id="email" placeholder='Enter Email' autoComplete='off' disabled={true}
					onChange={e => setData({...data, email: e.target.value})} value={data.email}/>
				</div>
				
				

				
				<div class="col-12">
					<label for="address" class="form-label">Address</label>
					<input type="text" class="form-control" id="address" placeholder='Enter Address' autoComplete='off'
					onChange={e => setData({...data, address: e.target.value})} value={data.address}/>
				</div>

				<div class="col-12">
					<label for="contact" class="form-label">Contact</label>
					<input type="text" class="form-control" id="contact" placeholder='Enter Contact' autoComplete='off'
					onChange={e => setData({...data, contact: e.target.value})} value={data.contact}/>
				</div>

								<div className="col-12">
				<label htmlFor="status" className="form-label">
					Status
				</label>
				<select
					className="form-select"
					id="status"
					value={data.status}
					onChange={(e) => setData({ ...data, status: e.target.value })}
				>
					<option value="Verified">Verified</option>
					<option value="Not Verified">Not Verified</option>
				</select>
				</div>



				
				<div class="col-12">
					<button type="submit" class="btn btn-primary">Update</button>
				</div>
			</form>
		</div>
  )
}

export default EditEmployee