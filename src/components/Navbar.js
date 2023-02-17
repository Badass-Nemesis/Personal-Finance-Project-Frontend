import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';
// import { Route } from 'react-router-dom';
//import Addnewtransaction from './Addnewtransaction';
// import * as Addnewtransaction from "./Addnewtransaction.js";
//import { Route, useNavigate, Routes } from "react-router-dom"



const handleClicLink = async (objectId) => {
	try {
		const response = await fetch("http://localhost:5000/api/transactions/updown/gmail", {
			method: "GET",

		});
		await response.json();
		//console.log(data);
		window.location.reload();
	} catch (error) {
		console.error(error);
	}
};



const ButtonPage = () => {

	// let navigate = useNavigate();

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
									Offcanvas
								</Offcanvas.Title>
							</Offcanvas.Header>
							<Offcanvas.Body>
								<Nav className="justify-content-end flex-grow-1 pe-3">
									<Nav.Link href="/Home">Home</Nav.Link>
									<Nav.Link href="/Login">Login</Nav.Link>
									<Nav.Link href="/Logout">Logout</Nav.Link>
									<Nav.Link href="/register">Register</Nav.Link>
									{/* <button onClick={()=>navigate('/Transactions')}>Go to Destination Page</button> */}
									<Nav.Link href="/Transactions">Transactions</Nav.Link>
									<NavDropdown
										title="Categories"
										id={`offcanvasNavbarDropdown-expand-${expand}`}
									>
										<NavDropdown.Item href="/Categoryfifteen">
											From last 15 days
										</NavDropdown.Item>
										<NavDropdown.Item href="/Categorythirty">
											From last 30 days
										</NavDropdown.Item>
										<NavDropdown.Item href="/Categorysixty">
											From last 60 days
										</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item href="/Categories">
											Complete Categories
										</NavDropdown.Item>
									</NavDropdown>
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
								<Button variant="outline-success" onClick={() => {
									handleClicLink()
								}}>Gmail</Button>
							</Offcanvas.Body>
						</Navbar.Offcanvas>
					</Container>
				</Navbar>
			))}
		</>
	);
};

export default ButtonPage;