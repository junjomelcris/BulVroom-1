import React, { useState, useEffect } from 'react';

function Dashcontent() {
  const [registeredUsersCount, setRegisteredUsersCount] = useState({userCount:0});

  useEffect(() => {
    // Fetch user data from the backend API
    fetch('/api/getRegisteredUsersCount')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setRegisteredUsersCount(data.count))
      .catch((error) => console.error('Failed to fetch data:', error));
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className='p-3 d-flex justify-content-around mt-3'>
      <div className='px-3 pt-2 pb-3  shadow-sm w-25'>
        <div className='text-center pb-1'>
          <i className="fs-4 bi-people"></i><h4>Verified Users</h4>
        </div>
        <hr/>
        <div>
          <p>Total: {registeredUsersCount.userCount}</p>
        </div>
      </div>

      <div className='px-3 pt-2 pb-3  shadow-sm w-25'>
        <div className='text-center pb-1'>
          <i className="fs-4 bi-car-front"></i><h4>Vehicles</h4>
        </div>
        <hr/>
        <div>
          {/* You can fetch and display data for "Vehicles" in a similar manner */}
          <p>Total: {}</p>
        </div>
      </div>

      <div className='px-3 pt-2 pb-3  shadow-sm w-25'>
        <div className='text-center pb-1'>
          <i className="fs-4 bi-people"></i><h4>Verified Users</h4>
        </div>
        <hr/>
        <div>
          {/* You can fetch and display data for "Verified Users" in a similar manner */}
          <p>Total: {}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashcontent;
