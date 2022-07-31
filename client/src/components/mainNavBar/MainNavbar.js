import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './MainNavbar.scss';

function MainNavbar(props) {

    return (
        <div className='nav-bar'>

            <Navbar expand="lg">
                <Container>
                    <Navbar.Toggle className="front" aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="front">
                        <Nav className="me-auto front">
                            <Link to='/community-outreach'>Community Outreach</Link>
                            <Link to='/'>Our Aims</Link>
                            <Link to='/'>Know the Team</Link>
                        </Nav>

                        <Link className="me-auto nav-logo navbar-brand front" to="/" >
                            <img src='/frame_logo.png' alt="logo" />
                        </Link>

                        <Nav className="me-auto front">
                            <Link to='/patient-welfare'>Patient Welfare</Link>
                            <Link to='/'>Our Activities</Link>
                            <Link to='/'>Contact Us</Link>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default MainNavbar;