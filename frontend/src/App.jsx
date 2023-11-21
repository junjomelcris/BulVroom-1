import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Home from './Home';
import Employee from './Employee';
import Vehicles from './Vehicles';
import Profile from './Profile';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import AddVehicle from './AddVehicle';
import Transactions from './Transactions';
import Login from './Login';
import Start from './Start';
import EmployeeLogin from './EmployeeLogin';

function App() {
  const isAuthenticated = localStorage.getItem('auth') === 'true';

  const PrivateRoute = ({ element, ...props }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="start" element={<Start />} />
        <Route path="employeeLogin" element={<EmployeeLogin />} />

        <Route
          path="/"
          element={<PrivateRoute element={<Dashboard />} />}
        >
          <Route index element={<Home />} />
          <Route path="employee" element={<Employee />}>
            <Route path="create" element={<AddEmployee />} />
            <Route path="edit/:id" element={<EditEmployee />} />
          </Route>
          <Route path="vehicles" element={<Vehicles />}>
            <Route path="add" element={<AddVehicle />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
