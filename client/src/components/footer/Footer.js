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
                                onClick={() => {
                                    window.open("https://drive.google.com/file/d/1ZFRCvcHLq_MdlO5kkWp3prp_Vvz_Jm6A/view", "_blank");
                                }}
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
                            <i
                                onClick={() => {
                                    window.open("https://www.facebook.com/Caredimc", "_blank");
                                }}
                                className="fa fa-facebook" />
                            <i
                                onClick={() => {
                                    window.open("https://instagram.com/dimc_cares", "_blank");
                                }}
                                className="fa fa-instagram" />
                            <i
                                onClick={() => {
                                    window.open("https://api.whatsapp.com/send?phone=923332401013", "_blank");
                                }}
                                className="fa fa-whatsapp" />
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