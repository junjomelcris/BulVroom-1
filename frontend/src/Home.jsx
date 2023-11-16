import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function Home() {
  const [approvedUserCount, setApprovedUserCount] = useState(0);
  const [pendingUserCount, setPendingUserCount] = useState(0);
  const [approvedVehicleCount, setApprovedVehicleCount] = useState(0);
  const [pendingVehicleCount, setPendingVehicleCount] = useState(0);
  const [vCount, setvCount] = useState(0);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Fetch data and set state
    axios
      .get('https://bulvroom.onrender.com/userCounts')
      .then((res) => {
        setApprovedUserCount(res.data.approvedUsers);
        setPendingUserCount(res.data.pendingUsers);
      })
      .catch((err) => console.log(err));

    axios
      .get('https://bulvroom.onrender.com/vehicleCounts')
      .then((res) => {
        setApprovedVehicleCount(res.data.approvedVehicles);
        setPendingVehicleCount(res.data.pendingVehicles);
      })
      .catch((err) => console.log(err));

    axios
      .get('https://bulvroom.onrender.com/vCount')
      .then((res) => {
        setvCount(res.data[0].vehicles);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        // Update the existing chart instance when data changes
        chartInstance.current.data.datasets[0].data = [
          approvedUserCount,
          pendingUserCount,
          approvedVehicleCount,
          pendingVehicleCount,
          vCount,
        ];
        chartInstance.current.update();
      } else {
        // Create a new chart instance when chartInstance is not initialized
        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Approved Users', 'Pending Users', 'Approved Vehicles', 'Pending Vehicles', 'Verified Vehicles'],
            datasets: [
              {
                label: 'Count',
                backgroundColor: ['#007BFF', '#FFC107', '#28A745', '#FFA000', '#6610f2'],
                borderColor: 'rgba(0,123,255,0.8)',
                borderWidth: 1,
                hoverBackgroundColor: ['#0056b3', '#FFA000', '#218838', '#FFA000', '#5a1ca6'],
                hoverBorderColor: 'rgba(0,123,255,1)',
                data: [approvedUserCount, pendingUserCount, approvedVehicleCount, pendingVehicleCount, vCount],
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: 'category',
              },
            },
          },
        });
      }
    }
  }, [approvedUserCount, pendingUserCount, approvedVehicleCount, pendingVehicleCount, vCount]);

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Approved Users</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {approvedUserCount}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Pending Users</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {pendingUserCount}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Approved Vehicles</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {approvedVehicleCount}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Pending Vehicles</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {pendingVehicleCount}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Verified Vehicles</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {vCount}</h5>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className='mt-4 px-5 pt-3'>
        <h3>Count Statistics</h3>
        <canvas ref={chartRef} width='7' height='1'></canvas>
      </div>

      {/* List of admin  */}
      <div className='mt-4 px-5 pt-3'>
        <h3>List of Admins</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Admin</td>
              <td>Admin</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
