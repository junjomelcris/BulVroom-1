import 'bootstrap-icons/font/bootstrap-icons.min.css';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './style.css';
function Dashboard() {
  return (
    <div className="container-fluid">
    <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 "style={{ backgroundColor: '#70B678', color: 'white'  }}>
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 d-none fw-bolder d-none d-sm-inline">Bulvroom Admin</span>
                </a>
                <ul className="nav nav-pills flex-column mb-sm-auto fw-bolder mb-0  align-items-center align-items-sm-start" id="menu">
                   
                    <li>
                        <Link to="/" data-bs-toggle="collapse" className="nav-link px-0 align-middle"style={{ color: 'white'  }}>
                            <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
                       
                    </li>

                    <li className="nav-item">
                        <Link to="/pages/users" className="nav-link align-middle px-0"style={{ color: 'white'  }}>
                            <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Manage Users</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/pages/users" className="nav-link align-middle px-0"style={{ color: 'white'  }}>
                            <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Manage Vehicles</span>
                        </Link>
                    </li>
                   
                    <li>
                        <Link to="/pages/profile" className="nav-link px-0 align-middle"style={{ color: 'white'  }}>
                            <i className="fs-4 bi-person "></i> <span className="ms-1 d-none d-sm-inline">Profile</span></Link>
                    </li>
                   
                    <li>
                        <Link to="/pages/logout" className="nav-link px-0 align-middle"style={{ color: 'white'  }}>
                            <i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span> </Link>
                    </li>
                    
                </ul>
            </div>
        </div>
        <div className="col p-0 m-0">
            <div className='p-2 d-flex justify-content-center shadow'>
                <h4>BULVROOM DASHBOARD</h4>
            </div>
            <Outlet/>
        </div>
    </div>
</div>
  )
}

export default Dashboard