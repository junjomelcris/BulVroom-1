import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function Home() {
  const [adminCount, setAdminCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [vCount, setvCount] = useState(0);
  const [perTypeCount, setPerTypeCount] = useState([]);
  const [userVehicleCount, setUserVehicleCount] = useState([]);
  const [approvedUserCount, setApprovedUserCount] = useState(0);
  const [pendingUserCount, setPendingUserCount] = useState(0);
  const [approvedVehicleCount, setApprovedVehicleCount] = useState(0);
  const [pendingVehicleCount, setPendingVehicleCount] = useState(0);

  const chartUserRef = useRef(null);
  const chartVehicleRef = useRef(null);
  const chartUserInstance = useRef(null);
  const chartVehicleInstance = useRef(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Fetch data and set state
    axios
      .get('https://bulvroom.onrender.com/userCount')
      .then((res) => {
        setApprovedUserCount(res.data[0].users);
      })
      .catch((err) => console.log(err));

    axios
      .get('https://bulvroom.onrender.com/userCountpen')
      .then((res) => {
        setPendingUserCount(res.data[0].users);
      })
      .catch((err) => console.log(err));

    axios
      .get('https://bulvroom.onrender.com/vCount')
      .then((res) => {
        setApprovedVehicleCount(res.data[0].vehicles);
      })
      .catch((err) => console.log(err));

    axios
      .get('https://bulvroom.onrender.com/pendingvCount')
      .then((res) => {
        setPendingVehicleCount(res.data[0].vehicles);
      })
      .catch((err) => console.log(err));

    axios
      .get('https://bulvroom.onrender.com/api/vehicles-per-type-count')
      .then((res) => {
        setPerTypeCount(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get('https://bulvroom.onrender.com/api/user-vehicle-count')
      .then((res) => {
        setUserVehicleCount(res.data);
      })
      .catch((err) => console.log(err));

  }, []);

  useEffect(() => {
    const totalUsers = approvedUserCount + pendingUserCount + 10; // Adding 30 for better visualization
    const maxYUser = Math.ceil(totalUsers / 10) * 10; // Round up to the nearest 10

    // Create or update user count chart
    if (chartUserRef.current) {
      if (chartUserInstance.current) {
        chartUserInstance.current.destroy();
      }

      const ctx = chartUserRef.current.getContext('2d');
      chartUserInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Approved Users', 'Pending Users'],
          datasets: [
            {
              label: 'Count',
              backgroundColor: ['#28A745', '#218838'],
              borderColor: 'rgba(40, 167, 69, 0.8)',
              borderWidth: 1,
              hoverBackgroundColor: ['#218838', '#1e7e34'],
              hoverBorderColor: 'rgba(40, 167, 69, 1)',
              data: [approvedUserCount, pendingUserCount],
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'category',
            },
            y: {
              beginAtZero: true,
              max: maxYUser,
            },
          },
        },
      });
    }
  }, [approvedUserCount, pendingUserCount]);

  useEffect(() => {
    const totalVehicles = approvedVehicleCount + pendingVehicleCount + 10; // Adding 30 for better visualization
    const maxYVehicle = Math.ceil(totalVehicles / 10) * 10; // Round up to the nearest 10

    // Create or update vehicle count chart
    if (chartVehicleRef.current) {
      if (chartVehicleInstance.current) {
        chartVehicleInstance.current.destroy();
      }

      const ctx = chartVehicleRef.current.getContext('2d');
      chartVehicleInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Approved Vehicles', 'Pending Vehicles'],
          datasets: [
            {
              label: 'Count',
              backgroundColor: ['#28A745', '#218838'],
              borderColor: 'rgba(40, 167, 69, 0.8)',
              borderWidth: 1,
              hoverBackgroundColor: ['#218838', '#1e7e34'],
              hoverBorderColor: 'rgba(40, 167, 69, 1)',
              data: [approvedVehicleCount, pendingVehicleCount],
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'category',
            },
            y: {
              beginAtZero: true,
              max: maxYVehicle,
            },
          },
        },
      });
    }
  }, [approvedVehicleCount, pendingVehicleCount]);
  return (
    <div> 
      <div className='mt-4 px-5 pt-3'>
    <center><h3>Count Statistics</h3></center>
  </div>
       <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-50'>
          <div className='text-center pb-1'>
            <h4>Verified Vehicles</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {approvedVehicleCount}</h5>
          </div>
          <canvas ref={chartVehicleRef} width='7' height='3'></canvas>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-50'>
          <div className='text-center pb-1'>
            <h4>Verified Users</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {approvedUserCount}</h5>
          </div>
          <canvas ref={chartUserRef} width='7' height='3'></canvas>
        </div>
      </div>
      {/* Bar Chart */}
     

      {/* List of admin  */}
      <div className='mt-4 px-5 pt-3'>
        <h3>List of Admins</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>admin@gmail.com</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>

      <div className='row'>
        <div className='mt-4 px-5 pt-3 col-6'>
          <h3>Vehicles per Type</h3>
          <table className='table'>
            <thead>
              <tr>
                <th>Vehicle Type</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {
                perTypeCount?.map((row) => (
                  <tr key={row.type}>
                    <td>{row.type}</td>
                    <td>{row.count}</td>
                  </tr>
                ))
              }
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
        <div className='mt-4 px-5 pt-3 col-6'>
          <h3>Vehicles per User</h3>
          <table className='table'>
            <thead>
              <tr>
                <th>User</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {
                userVehicleCount?.map((row) => (
                  <tr key={row.id}>
                    <td>{row.fullName}</td>
                    <td>{row.vehicleCount}</td>
                  </tr>
                ))
              }
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
