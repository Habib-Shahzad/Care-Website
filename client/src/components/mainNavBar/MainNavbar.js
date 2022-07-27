import React from 'react';
import { Link } from 'react-router-dom';
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
                            <Link to='/events'>Community Outreach</Link>
                            <Link to='/events'>Our Aims</Link>
                            <Link to='/events'>Know the Team</Link>
                        </Nav>

                        <Link className="me-auto nav-logo navbar-brand front" to="/" >
                            <img src='/frame_logo.png' alt="logo" />
                        </Link>

                        <Nav className="me-auto front">
                            <Link to='/events'>Patient Welfare</Link>
                            <Link to='/events'>Our Activities</Link>
                            <Link to='/events'>Contact Us</Link>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default MainNavbar;