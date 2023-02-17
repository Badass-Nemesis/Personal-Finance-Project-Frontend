import * as React from 'react';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';




const handleClicLink = async () => {
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

const ButtonPage = () => {
	// let navigate = useNavigate();
	const [open, setOpen] = React.useState(false);
	const [data, setData] = useState('');

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_BASE_URL}api/chatadvice/ask`, {
			headers: { 'x-auth-token': auth.getToken() }
		}).then(response => {
			// console.log(response.data);
			setData(response.data);
		});
	});

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};




	return (
		<>
			{[false].map((expand) => (
				<Navbar key={expand} bg="light" expand={expand} className="mb-3">
					<Container fluid>
						<Navbar.Brand href="#">Personal Finance</Navbar.Brand>
						<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
						<Navbar.Offcanvas
							id={`offcanvasNavbar-expand-${expand}`}
							aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
							placement="end"
						>
							<Offcanvas.Header closeButton>
								<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
									Profile
								</Offcanvas.Title>
							</Offcanvas.Header>
							<Offcanvas.Body>
								<Nav className="justify-content-end flex-grow-1 pe-3">
									<Nav.Link href="/">Home</Nav.Link>
									<Nav.Link href="/Login">Login</Nav.Link>
									<Nav.Link href="/Logout">Logout</Nav.Link>
									<Nav.Link href="/register">Register</Nav.Link>
									{/* <button onClick={()=>navigate('/Transactions')}>Go to Destination Page</button> */}
									<Nav.Link href="/Transactions">Transactions</Nav.Link>
									<Nav.Link href="/Category">Categories</Nav.Link>
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
								<Button variant="outline-success" onClick={() => {
									handleClicLink()
								}}>Gmail</Button>
								<br />
								<br />
								{/* <Button variant="outline-success" ></Button> */}
								<Button variant="outlined" onClick={handleClickOpen}>
									Advice
								</Button>
								<Dialog
									open={open}
									onClose={handleClose}
									aria-labelledby="alert-dialog-title"
									aria-describedby="alert-dialog-description"
								>
									<DialogTitle id="alert-dialog-title">
										{"Advice"}
										{data}
									</DialogTitle>
									<DialogContent>
										<DialogContentText id="alert-dialog-description">
											{data}
										</DialogContentText>
									</DialogContent>
									<DialogActions>
										<Button onClick={handleClose} autoFocus>
											ThankYou
										</Button>
									</DialogActions>
								</Dialog>
							</Offcanvas.Body>
						</Navbar.Offcanvas>
					</Container>
				</Navbar>
			))}
		</>
	);
};

export default ButtonPage;