import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'approved', 'pending', 'disapproved'
  const [dropdownOpen, setDropdownOpen] = useState(false); // To manage dropdown visibility

  useEffect(() => {
    axios
      .get('https://bulvroom.onrender.com/getVehicles') // Update the API endpoint
      .then((res) => {
        if (res.data.Status === 'Success') {
          setVehicles(res.data.Result); // Update the state variable
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handleDelete = (vehicleId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this vehicle?');

    if (confirmDelete) {
      axios
        .delete(`https://bulvroom.onrender.com/deleteVehicle/${vehicleId}`) // Update the API endpoint
        .then((res) => {
          if (res.data.Status === 'Success') {
            // Filter out the deleted vehicle from the data
            const updatedVehicles = vehicles.filter((vehicle) => vehicle.vehicle_id !== vehicleId);
            setVehicles(updatedVehicles);
          } else {
            alert('Error');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleApprove = (vehicleId) => {
    const confirmApprove = window.confirm('Are you sure you want to approve this vehicle?');

    if (confirmApprove) {
      axios
        .put(`https://bulvroom.onrender.com/vApp/${vehicleId}`) // Update the API endpoint
        .then((res) => {
          if (res.data.Status === 'Success') {
            // Update the status locally in the state
            const updatedVehicles = vehicles.map((vehicle) => {
              if (vehicle.vehicle_id === vehicleId) {
                return { ...vehicle, status: 'approved' };
              }
              return vehicle;
            });
            setVehicles(updatedVehicles);
          } else {
            alert('Error');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDisapprove = (vehicleId) => {
    const confirmDisapprove = window.confirm('Are you sure you want to disapprove this vehicle?');

    if (confirmDisapprove) {
      axios
        .put(`https://bulvroom.onrender.com/vdisApp/${vehicleId}`) // Update the API endpoint
        .then((res) => {
          if (res.data.Status === 'Success') {
            // Update the status locally in the state
            const updatedVehicles = vehicles.map((vehicle) => {
              if (vehicle.vehicle_id === vehicleId) {
                return { ...vehicle, status: 'disapproved' };
              }
              return vehicle;
            });
            setVehicles(updatedVehicles);
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

  const fetchOwnerUsername = async (id) => {
    try {
      const response = await axios.get(`https://bulvroom.onrender.com/getUsername/${id}`);
      console.log(response.data); // Log the response for debugging
      return response.data.Result.username;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      const updatedVehicles = await Promise.all(
        vehicles.map(async (vehicle) => {
          const username = await fetchOwnerUsername(vehicle.id);
          return { ...vehicle, ownerUsername: username };
        })
      );
      setVehicles(updatedVehicles);
    };

    fetchData();
  }, [vehicles]);

  const filteredData = vehicles.filter((vehicle) => {
    if (filter === 'all') return true;
    if (filter === 'approved' && vehicle.status === 'approved') return true;
    if (filter === 'pending' && vehicle.status === 'pending') return true;
    if (filter === 'disapproved' && vehicle.status === 'disapproved') return true;
    return false;
  });

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>VEHICLE MANAGEMENT</h3>
      </div>
      <Link to="/addvehicle" className='btn btn-success'>Add Vehicles</Link>
      {/* Filter dropdown */}
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
              <th>Make</th>
              <th>Model</th>
              <th>Type</th>
              <th>Seating Capacity</th>
              <th>Transmission</th>
              <th>Gas</th>
              <th>Features</th>
              <th>Plate</th>
              <th>Description</th>
              <th>Phone</th>
              <th>Rate</th>
              <th>Deposit</th>
              <th>Status</th>
              <th>Owner Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((vehicle, index) => (
              <tr key={index}>
                <td>{vehicle.make}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.seatingCapacity}</td>
                <td>{vehicle.transmission}</td>
                <td>{vehicle.gas}</td>
                <td>{vehicle.features}</td>
                <td>{vehicle.plate}</td>
                <td>{vehicle.description}</td>
                <td>{vehicle.phone}</td>
                <td>{vehicle.rate}</td>
                <td>{vehicle.deposit}</td>
                <td>{vehicle.status}</td>
                <td>{vehicle.ownerUsername}</td> {/* Display the owner's username */}
                <td>
                  <div className="mt-2">
                    <button onClick={() => handleApprove(vehicle.vehicle_id)} className='btn btn-sm btn-success me-2'>Approve</button>
                    <button onClick={() => handleDisapprove(vehicle.vehicle_id)} className='btn btn-sm btn-dark me-2'>Disapprove</button>
                    <button onClick={() => handleDelete(vehicle.vehicle_id)} className='btn btn-sm btn-danger'>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Vehicles;
