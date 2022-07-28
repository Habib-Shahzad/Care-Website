import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './Home.scss';
import { FaWpforms } from 'react-icons/fa';

function Home(props) {
    return (
        <div className='home'>


            <div className='circle-thing absolute'>
                <img src='/designer_1.svg' alt="logo" />
            </div>

            <div className='home-initial'>
                <Container>
                    <Row>
                        <Col className='home-init-col1 front' md={5} >
                            <h2 >As here we Care</h2>
                            <div className='content'>
                                <p>
                                    CARE is a student-led society established at the Dow International Medical College, Karachi, and aims to create a viable, purposeful, and an unfaltering difference within our problem-ridden community and city in order to have a better tomorrow for all.
                                </p>
                            </div>

                            <Row>
                                <Col md={5} className='member-button'>
                                    <Button
                                        variant='custom'
                                        className='home-donate-button'>
                                        Member Support
                                    </Button>
                                </Col>

                                <Col md={3} className='support-button'>
                                    <Button
                                        variant='custom'
                                        className='home-donate-button'>
                                        Support Us
                                    </Button>
                                </Col>
                            </Row>
                        </Col>

                        <Col className='home-init-col2 front' >
                            <div className='home-image-container front'>
                                <img src='/home-image.jpeg' alt="main_image" />
                            </div>
                        </Col>
                    </Row>

                </Container>

            </div>



            <div className='qoute-1 front'>
                <p >“The way you get meaning into your life is to devote yourself to loving others, devote yourself to your community around you, and devote yourself to creating something that gives you purpose and meaning.”</p>

                <p>
                    Mitch Albom
                </p>
            </div>

            <div className='wavy-thing absolute'>
                <img src='/designer_2.svg' alt="logo" />
            </div>


            <div className='ambass-form'>
                <Container>
                    <Row>
                        <Col className='ambass-col1 front' md={6} >
                            <h3 >Become An Ambassador</h3>
                            <div className='content'>
                                <p>
                                    CARE hosts an ambassador programme where individuals who would like to volunteer on an events basis could join the society. Primary objective of starting this programme is to reduce the workload of CARE members and also increase volunteer participation of students who cannot volunteer as full time CARE members. Ambassadors shall not be promoted and will have to fulfill all their responsibilities to stay in the society.If an ambassador desires to join any other department, they will have to go through the standard recruitment process and will be subject to the same responsibilities as regular members.
                                </p>
                            </div>
                            <Row>
                                <Col>
                                    <div >
                                        <FaWpforms size={30} />
                                        <p className='p-header'>
                                            We Appreciate You
                                        </p>
                                        <p>
                                            For the services of all ambassadors CARE would provide certificates of appreciation at the end of year to all ambassadors that stay affiliated until the end of year.
                                        </p>
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <FaWpforms size={30} />
                                        <p className='p-header'>
                                            Get Recruited
                                        </p>
                                        <p>
                                            For recruitment related queries you can mail us at dimccaresorg.hr@gmail.com. CARE reserves the right to make any amends in the ambassadorship programme, provided it is beneficial for all parties involved.
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col className='ambass-col2 front' >
                            <div className='ambass-image-container front'>
                                <img src='/ambass-image.jpg' alt="main_image" />
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