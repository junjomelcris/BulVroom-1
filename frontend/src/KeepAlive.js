// KeepAlive.js

import { useEffect } from 'react';

const KeepAlive = () => {
  useEffect(() => {
    const keepAliveInterval = setInterval(() => {
      // Send a GET request to the keep-alive endpoint
      fetch('/keep-alive')
        .then((response) => {
          if (response.status === 200) {
            console.log('Server is alive');
          }
        })
        .catch((error) => {
          console.error('Failed to keep the server alive:', error);
        });
    }, 180000); // Send a request every 10 minutes (adjust the interval as needed)

    return () => {
      clearInterval(keepAliveInterval); // Cleanup the interval on unmount
    };
  }, []);

  return null;
};

export default KeepAlive;
