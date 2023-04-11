import React, { } from "react";
import { useNavigate } from "react-router";
import {
    Container,
    Navbar,
    Nav,
    NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar
                collapseOnSelect
                expand="md"
                variant="dark"
                className="navbar-section"
            >
                <Container>
                    <Link to={"/"}>
                        <Navbar.Brand>
                            ACTIVITY <strong>APP</strong>
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav>
                            <Nav.Link as={Link} to={"/Assistant"}>
                                Ask AI Assistant</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBar;
