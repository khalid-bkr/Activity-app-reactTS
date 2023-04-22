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
                                <div className="openAI-nav-style-nav">
                                    <img className="openAI-logo-nav"
                                        src="images/openai-svg.svg"
                                    />
                                    Ask AI Assistant
                                </div>
                            </Nav.Link>
                            <Nav.Link href="#link">Add Activity</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBar;
