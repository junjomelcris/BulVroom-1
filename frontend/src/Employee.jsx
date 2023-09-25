import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Employee() {
  const [data, setData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8082/getUsers')
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();
  const handleDelete = (id) => {
    axios
      .delete('http://localhost:8082/delete/' + id)
      .then((res) => {
        if (res.data.Status === 'Success') {
          window.location.href = '/employee';
           // Navigate to the /employee page
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  };
  const handleVerify = () => {
    // You can implement the logic to verify selected users here.
    // selectedUsers array contains the user IDs that were selected for verification.
    // Make an API call to your backend to perform the verification.
  }

  const handleCheckboxChange = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  }

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>USER MANAGEMENT</h3>
      </div>
      <Link to="/create" className='btn btn-success'>Add User</Link>
      <div className='mt-3'>
        <button
          className="btn btn-primary btn-sm mb-2"
          onClick={handleVerify}
          disabled={selectedUsers.length === 0}
        >
          Verify Selected
        </button>
        <table className='table'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Image</th>
              <th>Username</th>
              <th>Email</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Driver's License 1</th>
              <th>Driver's License 2</th>
              <th>Valid ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((users, index) => (
              <tr key={index}>
                <td>{users.fName}</td>
                <td>{users.lName}</td>
                <td>{
                    <img src={`http://localhost:8082/images/`+users.profile_pic} alt="" className='users_image'/>
                    }</td>
                <td>{users.username}</td>
                <td>{users.email}</td>
                <td>{users.address}</td>
                <td>{users.contact}</td>
                <td>{users.driver_license_1}</td>
                <td>{users.driver_license_2}</td>
                <td>{users.valid_id}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(users.id)}
                      onChange={() => handleCheckboxChange(users.id)}
                    />
                    <span className="ms-2">Confirm</span>
                  </div>
                  <div className="mt-2">
                    <Link to={`/employeeEdit/` + users.id} className='btn btn-primary btn-sm me-2'>Edit</Link>
                    <button onClick={() => handleDelete(users.id)} className='btn btn-sm btn-danger'>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee;
