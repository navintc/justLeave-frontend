import React, { useEffect, useState }  from "react";
import {Container, Navbar, Nav, NavDropdown, Button, Form, FormControl} from "react-bootstrap";
import {HR_MANAGER, UNASSIGNED, EMPLOYEE} from "../../configs/notedowns-config";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";


const TopNavbar = (props) => {
    const usertype = useSelector((state) => state.usertype.value)

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

                            {usertype == HR_MANAGER ? (
                                <>
                                <Nav.Link><Link to="/pendingleaves" style ={{textDecoration:"none"}}>Pending Leaves</Link></Nav.Link>
                                <Nav.Link><Link to="/rejectedleaves" style ={{textDecoration:"none"}}>Rejected Leaves</Link></Nav.Link>
                                <Nav.Link><Link to="/approvedleaves" style ={{textDecoration:"none"}}>Approved Leaves</Link></Nav.Link>
                                <Nav.Link>Help</Nav.Link>
                                <Nav.Link><Link to="/" style ={{textDecoration:"none"}}>Sign Out</Link></Nav.Link>
                                </>
                            ) : usertype == EMPLOYEE && (
                                <>
                                <Nav.Link><Link to="/userhome" style ={{textDecoration:"none"}}>Home</Link></Nav.Link>
                                <Nav.Link>Help</Nav.Link>
                                <Nav.Link><Link to="/" style ={{textDecoration:"none"}}>Sign Out</Link></Nav.Link>
                                </>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default TopNavbar;