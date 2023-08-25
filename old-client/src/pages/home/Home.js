import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './Home.scss';
import { Designer1, Designer2 } from '../../components';
import { FaWpforms } from 'react-icons/fa';
import api from '../../api';

function Home(props) {

    const [homePageData, setHomePageData] = useState(null);

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${api}/home-page/data`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    withCredentials: true
                });
                const content = await response.json();
                setHomePageData(content?.data);
            })();

    }, [])

    return (
        <div className='home'>

            <div className='absolute circle-thing'>
                <Designer1 />
            </div>

            <div className='home-initial'>
                <Container>
                    <Row>
                        <Col className='home-init-col1 front' >
                            <h2 >AS HERE WE CARE</h2>
                            <div className='content w-100'>
                                <p>
                                    {homePageData?.mainContent}
                                </p>
                            </div>

                            <div className='home-init-buttons' style={{ display: 'flex' }}>
                                <div className='member-button'>
                                    <Button
                                        onClick={() => {
                                            window.open("https://linktr.ee/CAREHumanResources", "_blank");
                                        }}
                                        variant='custom'
                                        className='pink-care-button home-main-button'>
                                        Member Support
                                    </Button>
                                </div>

                                <div style={{ paddingLeft: '2rem' }} className='support-button'>
                                    <Button
                                        onClick={() => {
                                            window.open("https://api.whatsapp.com/send?phone=923332401013", "_blank");
                                        }}
                                        variant='custom'
                                        className='pink-care-button home-main-button'>
                                        Support Us
                                    </Button>
                                </div>
                            </div>
                        </Col>

                        <Col className='front' >
                            <div className='home-image-container front'>
                                <img src={homePageData?.mainImage?.image.filePath} alt="main_image" />
                            </div>
                        </Col>
                    </Row>

                </Container>

            </div>

            <div className='quote-1 front'>
                <h4 className='pink-text' >“The way you get meaning into your life is to devote yourself to loving others, devote yourself to your community around you, and devote yourself to creating something that gives you purpose and meaning.”</h4>

                <h4 className='pink-text'>
                    Mitch Albom
                </h4>
            </div>

            <div className='wavy-container'>
                <div className='wavy-thing'>
                    <Designer2 />
                </div>
            </div>


            <div className='ambass-form'>
                <Container>
                    <Row>
                        <Col className='ambass-col1 front' md={6}>
                            <h3 >Become An Ambassador</h3>
                            <div className='content'>
                                <p>
                                    CARE hosts an ambassador programme where individuals who would like to volunteer on an events basis could join the society. Primary objective of starting this programme is to reduce the workload of CARE members and also increase volunteer participation of students who cannot volunteer as full time CARE members. Ambassadors shall not be promoted and will have to fulfill all their responsibilities to stay in the society.If an ambassador desires to join any other department, they will have to go through the standard recruitment process and will be subject to the same responsibilities as regular members.
                                </p>
                            </div>
                            <Row>
                                <Col >
                                    <div className='appreciate-container' >
                                        <p className='header-text'>
                                            <FaWpforms size={30} /> We Appreciate You
                                        </p>
                                        <p>
                                            For the services of all ambassadors CARE would provide certificates of appreciation at the end of year to all ambassadors that stay affiliated until the end of year.
                                        </p>
                                    </div>
                                </Col>
                                <Col  >
                                    <div className='recruit-container'  >
                                        <p className='header-text'>
                                            <FaWpforms size={30} /> Get Recruited
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
                                <img src={homePageData?.ambassadorImage?.image.filePath} alt="ambass_image" />
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
                        onClick={() => {
                            window.open("https://api.whatsapp.com/send?phone=923332401013", "_blank");
                        }}
                        variant='custom'
                        className='pink-care-button'
                    >Donate Now
                    </Button>

                </div>

            </div>

        </div>
    );
}

export default Home;