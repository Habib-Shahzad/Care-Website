import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Container } from 'react-bootstrap';
import './Footer.scss'

function Footer(props) {
    return (
        <footer className="footer-distributed front">

            <Container>
                <Row>
                    <Col md={5}>
                        <div className="footer-links">
                            <Link to="/">Home</Link>
                            <p className="footer-company-name">CARE © 2022</p>
                        </div>

                    </Col>

                    <Col >
                        <img src='/frame_logo.png' alt="logo" />
                    </Col>

                    <Col md={3}>
                        <div className='footer-right'>
                            <Button
                                variant="custom"
                                className='footer-button'
                            >
                                Code of Ethics
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <hr />
                </Row>

                <Row>
                    <Col md={9}>
                        <div className="special">
                            <i className="fa fa-facebook" />
                            <i className="fa fa-instagram" />
                            <i className="fa fa-envelope" />
                        </div>
                    </Col>

                    <Col >
                        <p className='footer-links'>
                            <a href="mailto:dimccaresorg.pr@gmail.com">dimccaresorg.pr@gmail.com</a>
                        </p>
                    </Col>
                </Row>

            </Container>
        </footer>
    );
}

export default Footer;