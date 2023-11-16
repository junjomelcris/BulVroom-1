import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function Home() {
  const [adminCount, setAdminCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [vCount, setvCount] = useState(0);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Fetch data and set state
    axios
      .get('https://bulvroom.onrender.com/adminCount')
      .then((res) => {
        setAdminCount(res.data[0].admin);
      })
      .catch((err) => console.log(err));

    axios
      .get('https://bulvroom.onrender.com/userCount')
      .then((res) => {
        setEmployeeCount(res.data[0].users);
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
        chartInstance.current.data.datasets[0].data = [adminCount, employeeCount, vCount];
        chartInstance.current.update();
      } else {
        // Create a new chart instance when chartInstance is not initialized
        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Admin', 'Verified Users', 'Verified Vehicles'],
            datasets: [
              {
                label: 'Count',
                backgroundColor: ['#007BFF', '#28A745', '#FFC107'],
                borderColor: 'rgba(0,123,255,0.8)',
                borderWidth: 1,
                hoverBackgroundColor: ['#0056b3', '#218838', '#FFA000'],
                hoverBorderColor: 'rgba(0,123,255,1)',
                data: [adminCount, employeeCount, vCount],
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
  }, [adminCount, employeeCount, vCount]);

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {adminCount}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Verified Users</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {employeeCount}</h5>
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
