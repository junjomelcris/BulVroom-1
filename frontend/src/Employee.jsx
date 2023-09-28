import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Employee() {
  const [data, setData] = useState([]);

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
    // Display a confirmation dialog to the user
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
  
    if (confirmDelete) {
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
    }
  };
  
  const handleVerify = (id) => {
    const confirmVerify = window.confirm('Are you sure you want to approve this user?');

    if (confirmVerify) {
      axios
        .put(`http://localhost:8082/verify/${id}`)
        .then((res) => {
          if (res.data.Status === 'Success') {
            // Update the status locally in the state
            const updatedData = data.map((users) => {
              if (users.id === id) {
                return { ...users, status: 'approved' };
              }
              return users;
            });
            setData(updatedData);
          } else {
            alert('Error');
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const handleDisApp = (id) => {
    const confirmVerify = window.confirm('Are you sure you want to disapprove this user?');

    if (confirmVerify) {
      axios
        .put(`http://localhost:8082/disApp/${id}`)
        .then((res) => {
          if (res.data.Status === 'Success') {
            // Update the status locally in the state
            const updatedData = data.map((users) => {
              if (users.id === id) {
                return { ...users, status: 'disapproved' };
              }
              return users;
            });
            setData(updatedData);
          } else {
            alert('Error');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  
    // Use the filter method to find users whose data matches the search query
    const filteredUsers = data.filter((users) => {
      const fullName = `${users.fName} ${users.lName}`.toLowerCase();
      return fullName.includes(query.toLowerCase());
    });
  
    setData(filteredUsers);
  };



  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>USER MANAGEMENT</h3>
      </div>

      {/*<Link to="/create" className='btn btn-success '>Add User</Link>*/}
      <div className="d-flex justify-content-start mt-2">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="form-control w-25"
        />
      </div>

      <div className='mt-3'>
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
              <th>Valid ID</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
                  <tbody>
          {data.map((users, index) => (
            <tr key={index}>
              <td>{users.fName}</td>
              <td>{users.lName}</td>
              <td>
                <img
                  src={`http://localhost:8082/images/` + users.profile_pic}
                  alt=""
                  className='users_image'
                />
              </td>
              <td>{users.username}</td>
              <td>{users.email}</td>
              <td>{users.address}</td>
              <td>{users.contact}</td>
              <td>{users.driver_license_1}</td>
              <td>{users.valid_id}</td>
              <td>{users.status}</td>
              <td>
                
                <div className="mt-2">
                  <button onClick={() => handleVerify(users.id)} className='btn btn-sm btn-success me-2'>Approve</button>
                  <button onClick={() => handleDisApp(users.id)} className='btn btn-sm btn-dark me-2'>Disapprove</button>
                 {/*<Link to={`/employeeEdit/` + users.id} className='btn btn-primary btn-sm me-2'>Edit</Link>}*/}
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
