import React, { useEffect } from 'react';

// Axios request that sends auth headers
import get from '../../services/getData';

const Dashboard = ({ logout, getToken }) => {
  // State to hold our data
  const [data, setData] = React.useState({});
  // Handle side effects
  useEffect(() => {
    // Passed from withAuth component, resolves token
    getToken()
      // Res contains token, return it
      .then(res => res)
      // Pass token to HTTP request, see services
      .then(x => {
        // Capture response object in state
        get(x).then(y => setData(y.data));
      });
  });
  return (
    <>
      {/* Format response data on screen */}
      <pre>{JSON.stringify(data, null, 4)}</pre>
      <div>this is the dashboard view</div>
      {/* Logout button POC */}
      <button type="submit" onClick={logout}>
        logout
      </button>
    </>
  );
};

export default Dashboard;
