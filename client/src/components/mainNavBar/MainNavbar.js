import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './MainNavbar.scss';

function MainNavbar(props) {

    return (
        <div className='nav-bar'>

            <Navbar expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse >
                        <Nav className="me-auto front">
                            <Nav.Link href="/">Code of Ethics</Nav.Link>
                            <Nav.Link href="/">Our Aims</Nav.Link>
                            <Nav.Link href="/">Know the Team</Nav.Link>
                        </Nav>

                        <Navbar.Brand className="me-auto nav-logo front" href="/">
                            <img src='/frame_logo.png' alt="logo" />
                        </Navbar.Brand>

                        <Nav className="me-auto front">
                            <Nav.Link href="/">Departments</Nav.Link>
                            <Nav.Link href="/">Contact Us</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default MainNavbar;