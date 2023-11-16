import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

function Home() {
  const [adminCount, setAdminCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [vCount, setvCount] = useState(0);
  const [approvedUserCount, setApprovedUserCount] = useState(0);
  const [pendingUserCount, setPendingUserCount] = useState(0);
  const [approvedVehicleCount, setApprovedVehicleCount] = useState(0);
  const [pendingVehicleCount, setPendingVehicleCount] = useState(0);
  const [transactionData, setTransactionData] = useState([]);

  const chartRefUsers = useRef(null);
  const chartRefVehicles = useRef(null);
  const chartRefTransactions = useRef(null);

  useEffect(() => {
    // Fetch data and set state
    axios.get('https://bulvroom.onrender.com/adminCount')
      .then((res) => {
        setAdminCount(res.data[0].admin);
      })
      .catch((err) => console.log(err));

    axios.get('https://bulvroom.onrender.com/userCount')
      .then((res) => {
        setEmployeeCount(res.data[0].users);
      })
      .catch((err) => console.log(err));

    axios.get('https://bulvroom.onrender.com/vCount')
      .then((res) => {
        setvCount(res.data[0].vehicles);
      })
      .catch((err) => console.log(err));

    // Fetch data for approved/pending users
    axios.get('https://bulvroom.onrender.com/approvedPendingUserCount')
      .then((res) => {
        setApprovedUserCount(res.data[0].approvedUsers);
        setPendingUserCount(res.data[0].pendingUsers);
      })
      .catch((err) => console.log(err));

    // Fetch data for approved/pending vehicles
    axios.get('https://bulvroom.onrender.com/approvedPendingVehicleCount')
      .then((res) => {
        setApprovedVehicleCount(res.data[0].approvedVehicles);
        setPendingVehicleCount(res.data[0].pendingVehicles);
      })
      .catch((err) => console.log(err));

    // Fetch data for transactions
    axios.get('https://bulvroom.onrender.com/transactions')
      .then((res) => {
        setTransactionData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // Create a new chart instance for approved/pending users
    if (chartRefUsers.current) {
      const ctxUsers = chartRefUsers.current.getContext('2d');
      new Chart(ctxUsers, {
        type: 'bar',
        data: {
          labels: ['Approved Users', 'Pending Users'],
          datasets: [
            {
              label: 'Count',
              backgroundColor: ['#28A745', '#FFC107'],
              borderColor: 'rgba(40,167,69,0.8)',
              borderWidth: 1,
              hoverBackgroundColor: ['#218838', '#FFA000'],
              hoverBorderColor: 'rgba(40,167,69,1)',
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

    // Create a new chart instance for approved/pending vehicles
    if (chartRefVehicles.current) {
      const ctxVehicles = chartRefVehicles.current.getContext('2d');
      new Chart(ctxVehicles, {
        type: 'bar',
        data: {
          labels: ['Approved Vehicles', 'Pending Vehicles'],
          datasets: [
            {
              label: 'Count',
              backgroundColor: ['#28A745', '#FFC107'],
              borderColor: 'rgba(40,167,69,0.8)',
              borderWidth: 1,
              hoverBackgroundColor: ['#218838', '#FFA000'],
              hoverBorderColor: 'rgba(40,167,69,1)',
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

    // Create a new chart instance for transactions
    if (chartRefTransactions.current) {
      const ctxTransactions = chartRefTransactions.current.getContext('2d');
      new Chart(ctxTransactions, {
        type: 'line',
        data: {
          labels: transactionData.map((transaction) => transaction.date),
          datasets: [
            {
              label: 'Transactions',
              borderColor: '#007BFF',
              borderWidth: 1,
              fill: false,
              data: transactionData.map((transaction) => transaction.amount),
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
  }, [approvedUserCount, pendingUserCount, approvedVehicleCount, pendingVehicleCount, transactionData]);

  return (
    <div>
      {/* Existing code for Admin, Verified Users, and Verified Vehicles */}

      {/* Bar Chart for Approved/Pending Users */}
      <div className='mt-4 px-5 pt-3'>
        <h3>Users Statistics</h3>
        <canvas ref={chartRefUsers} width='7' height='1'></canvas>
      </div>

      {/* Bar Chart for Approved/Pending Vehicles */}
      <div className='mt-4 px-5 pt-3'>
        <h3>Vehicles Statistics</h3>
        <canvas ref={chartRefVehicles} width='7' height='1'></canvas>
      </div>

      {/* Line Chart for Transactions */}
      <div className='mt-4 px-5 pt-3'>
        <h3>Transactions Statistics</h3>
        <canvas ref={chartRefTransactions} width='7' height='1'></canvas>
      </div>

      {/* List of admin and other content */}
    </div>
  );
}

export default Home;
