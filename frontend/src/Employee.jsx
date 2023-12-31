import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import { BsEye, BsCheck, BsX, BsSlash } from 'react-icons/bs';
function Employee() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [viewDataModalData, setViewDataModalData] = useState({});

  useEffect(() => {
    axios
      .get('https://bulvroom.onrender.com/getUsers')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setData(res.data.Result);
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');

    if (confirmDelete) {
      axios
        .delete('https://bulvroom.onrender.com/delete/' + id)
        .then((res) => {
          if (res.data.Status === 'Success') {
            const updatedData = data.filter((user) => user.id !== id);
            setData(updatedData);
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
        .put(`https://bulvroom.onrender.com/verify/${id}`)
        .then((res) => {
          if (res.data.Status === 'Success') {
            const updatedData = data.map((user) => {
              if (user.id === id) {
                return { ...user, status: 'approved' };
              }
              return user;
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
    const confirmDisapprove = window.confirm('Are you sure you want to disapprove this user?');

    if (confirmDisapprove) {
      axios
        .put(`https://bulvroom.onrender.com/disApp/${id}`)
        .then((res) => {
          if (res.data.Status === 'Success') {
            const updatedData = data.map((user) => {
              if (user.id === id) {
                return { ...user, status: 'disapproved' };
              }
              return user;
            });
            setData(updatedData);
          } else {
            alert('Error');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleOpenModal = (image, title) => {
    setModalImage(image);
    setModalTitle(title);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleOpenViewDataModal = (userData) => {
    setViewDataModalData(userData);
    setModalTitle('User Data');
    setModalIsOpen(true);
  };

  const filteredData = data.filter((user) => {
    if (filter === 'all') return true;
    if (filter === 'approved' && user.status === 'approved') return true;
    if (filter === 'pending' && user.status === 'pending') return true;
    if (filter === 'disapproved' && user.status === 'disapproved') return true;
    return false;
  });

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>USER MANAGEMENT</h3>
      </div>
      <div className='d-flex justify-content-start mt-2'>
        <div className='dropdown'>
          <button
            className='btn btn-filter dropdown-toggle'
            type='button'
            id='filterDropdown'
            data-bs-toggle='dropdown'
            aria-expanded={dropdownOpen}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            FILTER {dropdownOpen ? <span>&#9650;</span> : <span>&#9660;</span>}
          </button>
          <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby='filterDropdown'>
            <li onClick={() => handleFilterChange('all')}>
              <button className={`dropdown-item ${filter === 'all' ? 'active' : ''}`}>All</button>
            </li>
            <li onClick={() => handleFilterChange('approved')}>
              <button className={`dropdown-item ${filter === 'approved' ? 'active' : ''}`}>Approved</button>
            </li>
            <li onClick={() => handleFilterChange('pending')}>
              <button className={`dropdown-item ${filter === 'pending' ? 'active' : ''}`}>Pending</button>
            </li>
            <li onClick={() => handleFilterChange('disapproved')}>
              <button className={`dropdown-item ${filter === 'disapproved' ? 'active' : ''}`}>Disapproved</button>
            </li>
          </ul>
        </div>
      </div>

      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Image</th>
              <th>Driver's License</th>
              <th>Valid ID</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user, index) => (
              <tr key={index}>
                <td>{user.fName}</td>
                <td>{user.lName}</td>
                <td>
                  <img
                    src={user.profile_pic}
                    alt=""
                    className='users_image'
                    onClick={() => handleOpenModal(user.profile_pic, "Driver's License 1")}
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleOpenModal(user.driver_license_1, "Driver's License 1")}
                    className='btn btn-sm btn-success me-2'
                  >
                    <BsEye />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleOpenModal(user.valid_id, 'Valid ID')}
                    className='btn btn-sm btn-success me-2'
                  >
                    <BsEye />
                  </button>
                </td>
                <td>{user.status}</td>
                <td>
                  <div className="mt-2">
                  <button onClick={() => handleOpenViewDataModal(user)} className='btn btn-sm btn-success me-2'>
                      View Data
                    </button>
                    <button onClick={() => handleVerify(user.id)} className='btn btn-sm btn-success me-2'>
                      Approve
                    </button>
                    <button onClick={() => handleDisApp(user.id)} className='btn btn-sm btn-success me-2'>
                      Disapprove
                    </button>
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Image Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
          content: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <img src={modalImage} alt={modalTitle} style={{ maxWidth: '100%', maxHeight: '80vh' }} />
        <button onClick={handleCloseModal} className="btn btn-danger mt-3">
          Close
        </button>
      </ReactModal>

      <ReactModal
        isOpen={modalIsOpen && modalTitle === 'User Data'}
        onRequestClose={handleCloseModal}
        contentLabel="User Data Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
          content: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <h2>User Data</h2>
        <table className='table'>
          <tbody>
            <tr>
              <td>First Name:</td>
              <td>{viewDataModalData.fName}</td>
            </tr>
            <tr>
              <td>Last Name:</td>
              <td>{viewDataModalData.lName}</td>
            </tr><tr>
              <td>Username:</td>
              <td>{viewDataModalData.username}</td>
            </tr><tr>
              <td>Email:</td>
              <td>{viewDataModalData.email}</td>
            </tr><tr>
              <td>Address:</td>
              <td>{viewDataModalData.address}</td>
            </tr><tr>
              <td>Contact:</td>
              <td>{viewDataModalData.contact}</td>
            </tr>
            <tr>
              <td>Status:</td>
              <td>{viewDataModalData.status}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleCloseModal} className="btn btn-danger mt-3">
          Close
        </button>
      </ReactModal>
    </div>
  );
}

export default Employee;
