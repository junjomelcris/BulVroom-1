import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function Home() {
  const [approvedUserCount, setApprovedUserCount] = useState(0);
  const [pendingUserCount, setPendingUserCount] = useState(0);
  const [approvedVehicleCount, setApprovedVehicleCount] = useState(0);
  const [pendingVehicleCount, setPendingVehicleCount] = useState(0);
  const [transactionData, setTransactionData] = useState([]);

  const userChartRef = useRef(null);
  const vehicleChartRef = useRef(null);
  const transactionChartRef = useRef(null);
  const userChartInstance = useRef(null);
  const vehicleChartInstance = useRef(null);
  const transactionChartInstance = useRef(null);

  useEffect(() => {
    // Fetch data and set state
    axios
      .get('https://bulvroom.onrender.com/approvedPendingUserCount')
      .then((res) => {
        setApprovedUserCount(res.data.approved);
        setPendingUserCount(res.data.pending);
      })
      .catch((err) => console.log(err));

    axios
      .get('https://bulvroom.onrender.com/approvedPendingVehicleCount')
      .then((res) => {
        setApprovedVehicleCount(res.data.approved);
        setPendingVehicleCount(res.data.pending);
      })
      .catch((err) => console.log(err));

    axios
      .get('https://bulvroom.onrender.com/transactions')
      .then((res) => {
        // Assuming transaction data is an array of numbers
        setTransactionData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // Create or update user count chart
    if (userChartRef.current) {
      if (userChartInstance.current) {
        userChartInstance.current.destroy();
      }

      const ctx = userChartRef.current.getContext('2d');
      userChartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Approved Users', 'Pending Users'],
          datasets: [
            {
              label: 'Count',
              backgroundColor: ['#28A745', '#FFC107'],
              borderColor: 'rgba(0,123,255,0.8)',
              borderWidth: 1,
              hoverBackgroundColor: ['#218838', '#FFA000'],
              hoverBorderColor: 'rgba(0,123,255,1)',
              data: [approvedUserCount, pendingUserCount],
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
  }, [approvedUserCount, pendingUserCount]);

  useEffect(() => {
    // Create or update vehicle count chart
    if (vehicleChartRef.current) {
      if (vehicleChartInstance.current) {
        vehicleChartInstance.current.destroy();
      }

      const ctx = vehicleChartRef.current.getContext('2d');
      vehicleChartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Approved Vehicles', 'Pending Vehicles'],
          datasets: [
            {
              label: 'Count',
              backgroundColor: ['#28A745', '#FFC107'],
              borderColor: 'rgba(0,123,255,0.8)',
              borderWidth: 1,
              hoverBackgroundColor: ['#218838', '#FFA000'],
              hoverBorderColor: 'rgba(0,123,255,1)',
              data: [approvedVehicleCount, pendingVehicleCount],
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
  }, [approvedVehicleCount, pendingVehicleCount]);

  useEffect(() => {
    // Create or update transaction line chart
    if (transactionChartRef.current) {
      if (transactionChartInstance.current) {
        transactionChartInstance.current.destroy();
      }

      const ctx = transactionChartRef.current.getContext('2d');
      transactionChartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({ length: transactionData.length }, (_, i) => i + 1),
          datasets: [
            {
              label: 'Transactions',
              borderColor: '#007BFF',
              borderWidth: 1,
              data: transactionData,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
            },
          },
        },
      });
    }
  }, [transactionData]);

  return (
    <div>
      <div className='mt-4 px-5 pt-3'>
        <h3>User Count Statistics</h3>
        <canvas ref={userChartRef} width='7' height='1'></canvas>
      </div>

      <div className='mt-4 px-5 pt-3'>
        <h3>Vehicle Count Statistics</h3>
        <canvas ref={vehicleChartRef} width='7' height='1'></canvas>
      </div>

      <div className='mt-4 px-5 pt-3'>
        <h3>Transaction Statistics</h3>
        <canvas ref={transactionChartRef} width='7' height='1'></canvas>
      </div>

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
