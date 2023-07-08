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
                            <Link to='/our-aims'>Our Aims</Link>
                            <Link to='/our-team'>Know the Team</Link>
                            <a
                                href="https://api.whatsapp.com/send?phone=923332401013"
                                target='_blank' rel="noreferrer"
                            >Contact Us</a>
                        </Nav>

                        <Link
                            className="nav-logo navbar-brand front" to="/" >
                            <img src='/frame_logo.png' alt="logo" />
                        </Link>


                        <Nav className="front">
                            <Link to='/community-outreach'>Community<br /> Outreach</Link>
                            <Link to='/research-dev'>Research<br /> Development </Link>

                            <Link to='/patient-welfare'>Patient<br /> Welfare</Link>
                            <Link to='/our-activities'>Our<br /> Activities</Link>

                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default MainNavbar;