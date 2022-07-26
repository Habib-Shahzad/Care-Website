import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './Home.scss'

function Home(props) {
    return (
        <div className='home'>

            <div className='circle-thing'>
                <img src='/designer_1.png' alt="logo" />
            </div>

            <div className='home-initial'>
                <Container>
                    <Row>
                        <Col className='home-first-col front' md={7} >
                            <h2 >As here we Care</h2>
                            <div className='content'>
                                <p>
                                    CARE is a student-led society established at the Dow International Medical College, Karachi, and aims to create a viable, purposeful, and an unfaltering difference within our problem-ridden community and city in order to have a better tomorrow for all.
                                </p>
                            </div>

                            <Row>
                                <Col md={3}>
                                    <Button
                                        variant='custom'
                                        className='home-donate-button'>
                                        Member Support
                                    </Button>
                                </Col>

                                <Col md={3}>
                                    <Button
                                        variant='custom'
                                        className='home-donate-button'>
                                        Support Us
                                    </Button>
                                </Col>
                            </Row>
                        </Col>

                        <Col className='front' >
                            <div className='home-image-container front'>
                                <img src='/home-image.jpeg' alt="main_image" />
                            </div>
                        </Col>
                    </Row>

                </Container>

            </div>



            <div className="donate-distributed front">

                <div className='donate-main'>
                    <h3 className='donate-header'>A Small Contribution can make a change</h3>

                    <div className='donate-quotes'>
                        <p>
                            “We ourselves feel that what we are doing is just a drop in the ocean.<br />
                            But the ocean would be less because of that missing drop.”<br />
                            - Mother Teresa
                        </p>

                        <p>Be kind, even a small contribution from your side would make a change for someone fighting a hard battle</p>
                    </div>

                    <h3 className='donate-header'>Even a Small Bit Matters</h3>

                    <p style={{ fontWeight: '500', margin: '0' }}> Make a Change </p>

                    <Button
                        variant='custom'
                        className='donate-button'
                    >Donate Now </Button>

                </div>

            </div>

        </div>
    );
}

export default Home;