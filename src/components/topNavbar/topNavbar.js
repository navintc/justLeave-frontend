import React, { useEffect, useState }  from "react";
import {Container, Navbar, Nav, NavDropdown, Button, Form, FormControl} from "react-bootstrap";

const TopNavbar = (props) => {
    return(
        <div>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">justLeave</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <div class={"col"}></div>
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}
                            navbarScroll>

                            <Nav.Link href="#action1">Home</Nav.Link>
                            <Nav.Link href="#action2">Pending Leaves</Nav.Link>
                            <Nav.Link href="#action3">Rejected Leaves</Nav.Link>
                            <Nav.Link href="#action4">Approved Leaves</Nav.Link>
                            <Nav.Link href="#action5">Help</Nav.Link>
                            <Nav.Link href="#action6">Sign Out</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default TopNavbar;