import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8082/getVehicles')
      .then((res) => {
        if (res.data.Status === "Success") {
          setVehicles(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8082/deleteVehicle/${id}`)
      .then((res) => {
        if (res.data.Status === "Success") {
          window.location.reload(true);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }

  const handleVerify = () => {
    // Implement logic to verify selected vehicles here.
    // selectedVehicles array contains the vehicle IDs that were selected for verification.
    // Make an API call to your backend to perform the verification.
  }

  const handleCheckboxChange = (vehicleId) => {
    if (selectedVehicles.includes(vehicleId)) {
      setSelectedVehicles(selectedVehicles.filter((id) => id !== vehicleId));
    } else {
      setSelectedVehicles([...selectedVehicles, vehicleId]);
    }
  }

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>VEHICLE MANAGEMENT</h3>
      </div>
      <Link to="/createVehicle" className='btn btn-success'>Add Vehicle</Link>
      <div className='mt-3'>
        <button
          className="btn btn-primary btn-sm mb-2"
          onClick={handleVerify}
          disabled={selectedVehicles.length === 0}
        >
          Verify Selected
        </button>
        <table className='table'>
          <thead>
            <tr>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Color</th>
              <th>License Plate</th>
              <th>Description</th>
              <th>Rental Price per Day</th>
              <th>Status</th>
              <th>Verification Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={index}>
                <td>{vehicle.Make}</td>
                <td>{vehicle.Model}</td>
                <td>{vehicle.Year}</td>
                <td>{vehicle.Color}</td>
                <td>{vehicle.LicensePlate}</td>
                <td>{vehicle.Description}</td>
                <td>${vehicle.RentalPrice.toFixed(2)}</td>
                <td>{vehicle.Status}</td>
                <td>{vehicle.VerificationStatus}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      checked={selectedVehicles.includes(vehicle.VehicleID)}
                      onChange={() => handleCheckboxChange(vehicle.VehicleID)}
                    />
                    <span className="ms-2">Confirm</span>
                  </div>
                  <div className="mt-2">
                    <Link to={`/editVehicle/${vehicle.VehicleID}`} className='btn btn-primary btn-sm me-2'>Edit</Link>
                    <button onClick={() => handleDelete(vehicle.VehicleID)} className='btn btn-sm btn-danger'>Delete</button>
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

export default Vehicles;
