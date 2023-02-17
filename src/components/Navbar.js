import * as React from 'react';
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import auth from '../Auth';
// import { useNavigate } from 'react-router-dom';
// import { Route } from 'react-router-dom';
//import Addnewtransaction from './Addnewtransaction';
// import * as Addnewtransaction from "./Addnewtransaction.js";
//import { Route, useNavigate, Routes } from "react-router-dom"]
import axios from 'axios';
// import Popup from './Popup';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

const ButtonPage = () => {
	const [showPopup, setShowPopup] = useState(false);
	const [data, setData] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleClickLink = async () => {
		setIsLoading(true);
		try {
			await fetch(`${process.env.REACT_APP_BASE_URL}api/transactions/updown/gmail`, {
				method: "GET",
				headers: { 'x-auth-token': auth.getToken() }
			}).then(() => {
				window.location.reload();
			})
			// await response;
			//console.log(data);
		} catch (error) {
			// console.error(error);
		}
	};


	const handleClick = () => {
		async function datasetting() {
			await axios.get(`${process.env.REACT_APP_BASE_URL}api/chatadvice/ask`, {
				headers: { 'x-auth-token': auth.getToken() }
			}).then(response => {
				// console.log(response.data);
				setData(response.data);
			});
		}
		datasetting();
		setShowPopup(true);
	};

	const handleCloseLink = () => {
		setShowPopup(false);
	}

	return (

		<>
			{[false].map((expand) => (
				<Navbar key={expand} bg="light" expand={expand} className="mb-3">
					<Container fluid>
						<Navbar.Brand href="/">Personal Finance</Navbar.Brand>
						<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
						<Navbar.Offcanvas
							id={`offcanvasNavbar-expand-${expand}`}
							aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
							placement="end"
						>
							<Offcanvas.Header closeButton>
								<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
									WELCOME
								</Offcanvas.Title>
							</Offcanvas.Header>
							<Offcanvas.Body>
								<Nav className="justify-content-end flex-grow-1 pe-3">
									<Button><Link to="/">Home</Link></Button><br />
									<Button><Link to="/Login">Login</Link></Button><br />
									<Button><Link to="/Logout">Logout</Link></Button><br />
									<Button><Link to="/Register">Register</Link></Button><br />
									{/* <button onClick={()=>navigate('/Transactions')}>Go to Destination Page</button> */}
									<Button><Link to="/Transactions">Transactions</Link></Button><br />
									<Button><Link to="/Category">Categories</Link></Button><br />
								</Nav>
								{/* <Form className="d-flex">
									<Form.Control
										type="search"
										placeholder="Search"
										className="me-2"
										aria-label="Search"
									/>
									<Button variant="outline-success">Search</Button>
								</Form> */}
								<br />
								<Button variant="outline-success" onClick={handleClickLink}>
									{isLoading ? 'Loading...' : 'Gmail'}
								</Button>
								<br />
								<br />
								{/* <Button variant="outline-success" onClick={<Popup />} ></Button> */}
								<Button variant="outline-success" onClick={handleClick}>Advice</Button>
								{showPopup && (
									<div className="popup">
										<h2>Advice</h2>
										{data === "" ? (
											<p>Loading....</p>
										) : (
											<>
												<p>{data}</p>
												<br /> <br />
												<Button variant="outline-success" onClick={handleCloseLink}>Close Popup</Button>
											</>
										)}
									</div>

								)}
							</Offcanvas.Body>
						</Navbar.Offcanvas>
					</Container>
				</Navbar>
			))}
		</>
	);
};

export default ButtonPage;