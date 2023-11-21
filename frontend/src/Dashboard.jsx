import React, { useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import KeepAlive from './KeepAlive';
function Dashboard() {
	const navigate = useNavigate()
	useEffect(() => {
		axios.get('https://bulvroom.onrender.com/dashboard')
			.then(res => {
				if (res.data.Status === "Success") {
					if (res.data.role === "admin") {
						navigate('/');
					} else {
						const id = res.data.id;
						navigate('/employeedetail/' + id)
					}
				}
			})
	}, [])

	const handleLogout = () => {
		const confirmLogout = window.confirm("Are you sure you want to logout?");

		if (confirmLogout) {
			axios
				.get('https://bulvroom.onrender.com/logout')
				.then((res) => {
					localStorage.clear();
					navigate('/login');
				})
				.catch((err) => console.log(err));
		}
	};

	return (
		<div className="container-fluid">
			<div className="row flex-nowrap">
				<div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-success">
					<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 fw-bold">
						<a href="/" className="d-flex align-items-center pb-3  fw-bold mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
							<span className="fs-5 fw-bolder d-none d-sm-inline">Admin Dashboard</span>
						</a>
						<KeepAlive />
						<ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
							<li>
								<Link to="/" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle">
									<i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
							</li>
							<li>
								<Link to="/employee" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Manage Users</span> </Link>
							</li>
							<li>
								<Link to="/vehicles" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-car-front"></i> <span className="ms-1 d-none d-sm-inline">Manage Vehicles</span> </Link>
							</li>
							<li>
								<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-...." crossOrigin="anonymous" />

								<Link to="/transactions" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 fas fa-book"></i> <span className="ms-1 d-none d-sm-inline">Transactions</span>
								</Link>
							</li>
							{/*<li>
								<Link to="profile" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Profile</span></Link>
							</li>*/}
							<li onClick={handleLogout}>
								<a href="#" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span></a>
							</li>
						</ul>
					</div>
				</div>
				<div className="col p-0 m-0">
					<div className='p-2 d-flex justify-content-center shadow text-success'>
						<h4 >BULVROOM MANAGEMENT SYSTEM</h4>
					</div>
					<Outlet /><KeepAlive />
				</div>
			</div>
		</div>
	)
}

export default Dashboard