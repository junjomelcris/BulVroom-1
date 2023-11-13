import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Transactions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    const response = await axios.get('https://bulvroom.onrender.com/transactions')
    if(response.status == 200) {
        setData(response.data);
    } else {
        alert("error");
    }
  }

  function formatDateTime(dateTimeString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    const formattedDate = new Date(dateTimeString).toLocaleDateString('en-US', options);
    return formattedDate;
  }

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Transaction Records</h3>
      </div>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Vehicle ID</th>
              <th>Owner</th>
              <th>Booker</th>
              <th>Pickup Location</th>
              <th>Dropoff Location</th>
              <th>Pickup Datetime</th>
              <th>Rate</th>
              <th>Days Rented</th>
              <th>Total Payment</th>
              <th>Payment Method</th>
              <th>Gcash Ref No</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.vehicle_id}</td>
                <td>{transaction.owner}</td>
                <td>{transaction.fullname}</td>
                <td>{transaction.pickup_location}</td>
                <td>{transaction.dropoff_location}</td>
                <td>{formatDateTime(transaction.pickup_datetime)}</td>
                <td>{transaction.rate}</td>
                <td>{transaction.days_rented}</td>
                <td>{transaction.total_payment}</td>
                <td>{transaction.payment_method == 0 ? "Cash" : "Gcash"}</td>
                <td>{transaction.gcash_ref_no}</td>
                <td>{transaction.status == 1 ? "Pending" : transaction.status == 2 ? "Approved" : "Rejected"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;
