import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Carousel } from 'react-bootstrap';
import api from '../../api';
import { BlogTypes } from '../../constants';
import './ResearchDev.scss';


function ResearchDev(props) {

    const [blogs, setBlogs] = useState([]);


    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${api}/blog-by-type/${BlogTypes.RESEARCH_DEVELOPMENT}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    withCredentials: true
                });
                const content = await response.json();
                setBlogs(content.data);
            })();

    }, [])


    return (
        <div className='events-page'>

            <div className='absolute weird-circle1 '>
                <svg viewBox="0 0 1306 1373" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.5">
                        <path d="M-141.158 438.147C-190.535 586.646 -106.643 758.222 -102.234 920.219C-100.71 976.595 -108.907 1032.94 -96.7397 1089.03C-69.0008 1217.47 56.0093 1305.53 176.271 1347.01C233.627 1366.81 294.419 1379.87 351.053 1368.22C394.605 1359.26 433.076 1336.29 470.725 1313.56L1130.82 916.128C1204.51 871.743 1284.23 818.926 1302.05 729.937C1314.35 668.642 1294.05 602.7 1273.12 540.72C1247.4 464.56 1216.71 383.554 1153.65 334.775C1081.56 278.939 987.092 280.328 905.536 244.068C773.284 185.392 680.2 30.7445 541.526 4.29519C476.794 -8.04306 413.008 10.7805 355.194 36.165C246.186 84.0023 167.407 169.038 66.5633 226.087C-19.6343 274.857 -107.362 336.486 -141.158 438.147Z" fill="#ED56A8" fillOpacity="0.5" stroke="none" style={{ mixBlendMode: 'color-dodge' }} />
                    </g>
                </svg>
            </div>

            <div className='absolute weird-circle2 '>
                <svg viewBox="0 0 1306 1373" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.5">
                        <path d="M-141.158 438.147C-190.535 586.646 -106.643 758.222 -102.234 920.219C-100.71 976.595 -108.907 1032.94 -96.7397 1089.03C-69.0008 1217.47 56.0093 1305.53 176.271 1347.01C233.627 1366.81 294.419 1379.87 351.053 1368.22C394.605 1359.26 433.076 1336.29 470.725 1313.56L1130.82 916.128C1204.51 871.743 1284.23 818.926 1302.05 729.937C1314.35 668.642 1294.05 602.7 1273.12 540.72C1247.4 464.56 1216.71 383.554 1153.65 334.775C1081.56 278.939 987.092 280.328 905.536 244.068C773.284 185.392 680.2 30.7445 541.526 4.29519C476.794 -8.04306 413.008 10.7805 355.194 36.165C246.186 84.0023 167.407 169.038 66.5633 226.087C-19.6343 274.857 -107.362 336.486 -141.158 438.147Z" fill="#ED56A8" fillOpacity="0.5" stroke="none" style={{ mixBlendMode: 'color-dodge' }} />
                    </g>
                </svg>
            </div>

            {
                blogs?.length > 5 &&
                <>

                    <div className='absolute weird-circle3 '>
                        <svg viewBox="0 0 1306 1373" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.5">
                                <path d="M-141.158 438.147C-190.535 586.646 -106.643 758.222 -102.234 920.219C-100.71 976.595 -108.907 1032.94 -96.7397 1089.03C-69.0008 1217.47 56.0093 1305.53 176.271 1347.01C233.627 1366.81 294.419 1379.87 351.053 1368.22C394.605 1359.26 433.076 1336.29 470.725 1313.56L1130.82 916.128C1204.51 871.743 1284.23 818.926 1302.05 729.937C1314.35 668.642 1294.05 602.7 1273.12 540.72C1247.4 464.56 1216.71 383.554 1153.65 334.775C1081.56 278.939 987.092 280.328 905.536 244.068C773.284 185.392 680.2 30.7445 541.526 4.29519C476.794 -8.04306 413.008 10.7805 355.194 36.165C246.186 84.0023 167.407 169.038 66.5633 226.087C-19.6343 274.857 -107.362 336.486 -141.158 438.147Z" fill="#ED56A8" fillOpacity="0.5" stroke="none" style={{ mixBlendMode: 'color-dodge' }} />
                            </g>
                        </svg>
                    </div>

                    <div className='absolute weird-circle4'>
                        <svg viewBox="0 0 1306 1373" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.5">
                                <path d="M-141.158 438.147C-190.535 586.646 -106.643 758.222 -102.234 920.219C-100.71 976.595 -108.907 1032.94 -96.7397 1089.03C-69.0008 1217.47 56.0093 1305.53 176.271 1347.01C233.627 1366.81 294.419 1379.87 351.053 1368.22C394.605 1359.26 433.076 1336.29 470.725 1313.56L1130.82 916.128C1204.51 871.743 1284.23 818.926 1302.05 729.937C1314.35 668.642 1294.05 602.7 1273.12 540.72C1247.4 464.56 1216.71 383.554 1153.65 334.775C1081.56 278.939 987.092 280.328 905.536 244.068C773.284 185.392 680.2 30.7445 541.526 4.29519C476.794 -8.04306 413.008 10.7805 355.194 36.165C246.186 84.0023 167.407 169.038 66.5633 226.087C-19.6343 274.857 -107.362 336.486 -141.158 438.147Z" fill="#ED56A8" fillOpacity="0.5" stroke="none" style={{ mixBlendMode: 'color-dodge' }} />
                            </g>
                        </svg>
                    </div>

                    <div className='absolute weird-circle5'>
                        <svg viewBox="0 0 1306 1373" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.5">
                                <path d="M-141.158 438.147C-190.535 586.646 -106.643 758.222 -102.234 920.219C-100.71 976.595 -108.907 1032.94 -96.7397 1089.03C-69.0008 1217.47 56.0093 1305.53 176.271 1347.01C233.627 1366.81 294.419 1379.87 351.053 1368.22C394.605 1359.26 433.076 1336.29 470.725 1313.56L1130.82 916.128C1204.51 871.743 1284.23 818.926 1302.05 729.937C1314.35 668.642 1294.05 602.7 1273.12 540.72C1247.4 464.56 1216.71 383.554 1153.65 334.775C1081.56 278.939 987.092 280.328 905.536 244.068C773.284 185.392 680.2 30.7445 541.526 4.29519C476.794 -8.04306 413.008 10.7805 355.194 36.165C246.186 84.0023 167.407 169.038 66.5633 226.087C-19.6343 274.857 -107.362 336.486 -141.158 438.147Z" fill="#ED56A8" fillOpacity="0.5" stroke="none" style={{ mixBlendMode: 'color-dodge' }} />
                            </g>
                        </svg>
                    </div>

                    <div className='absolute weird-circle6'>
                        <svg viewBox="0 0 1306 1373" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.5">
                                <path d="M-141.158 438.147C-190.535 586.646 -106.643 758.222 -102.234 920.219C-100.71 976.595 -108.907 1032.94 -96.7397 1089.03C-69.0008 1217.47 56.0093 1305.53 176.271 1347.01C233.627 1366.81 294.419 1379.87 351.053 1368.22C394.605 1359.26 433.076 1336.29 470.725 1313.56L1130.82 916.128C1204.51 871.743 1284.23 818.926 1302.05 729.937C1314.35 668.642 1294.05 602.7 1273.12 540.72C1247.4 464.56 1216.71 383.554 1153.65 334.775C1081.56 278.939 987.092 280.328 905.536 244.068C773.284 185.392 680.2 30.7445 541.526 4.29519C476.794 -8.04306 413.008 10.7805 355.194 36.165C246.186 84.0023 167.407 169.038 66.5633 226.087C-19.6343 274.857 -107.362 336.486 -141.158 438.147Z" fill="#ED56A8" fillOpacity="0.5" stroke="none" style={{ mixBlendMode: 'color-dodge' }} />
                            </g>
                        </svg>
                    </div>
                </>
            }


            <div className='events-initial'>

                <div className='quote-1 pink-text front'>
                    <p>"Medical research brings hope, knowledge, and healing to the forefront of humanity's quest for a healthier future."</p>
                    <p>
                        Dr. Jonas Salk
                    </p>
                </div>

                <div className='text-center main-text-area front'>

                    <div className='box1'>
                        <h1 className='pink-text'>
                            Research and Development
                        </h1>
                        <p >
                            Through our dedicated research and development program, CARE strives to innovate and create sustainable solutions that empower communities, transform lives, and pave the way for a brighter and more equitable future.
                        </p>
                    </div>
                    {/* 
                    <div className='box2'>
                        <h3 className='pink-text'>
                            Climate Change
                        </h3>
                        <h5 className='pink-text'>
                            What Is Climate Change?
                        </h5>
                        <p >
                            According to NASA, climate change is long-term change is a lonng-term change in the average weather patterns that have come to
                            define Earth's local, regional and global climates. It refers to both human and naturally produced warming effects on our planet.
                            We are bringing this campaign to all schools and the colleges very soon, if you are interested you can mail us at dimccaresorg.pr@gmail.com
                        </p>
                    </div> */}
                </div>

            </div>


            <div className='margin-global-top-5' />

            <Container className='all-blogs-container'>

                {
                    blogs.map((blog, index) => {

                        return (
                            <Row key={index} className='blog-container'>

                                <Col>
                                    {blog.imageList.length > 0 ?
                                        <div className='blog'>
                                            <h3 className='pink-text'>
                                                {blog.title}
                                            </h3>
                                            <p>
                                                {blog.content}
                                            </p>
                                        </div>
                                        :
                                        <div className='blog-center-container'>
                                            <h3 className='pink-text'>
                                                {blog.title}
                                            </h3>
                                            <p>
                                                {blog.content}
                                            </p>
                                        </div>
                                    }

                                </Col>

                                {blog.imageList.length > 0 &&
                                    <Col>
                                        <Carousel interval={3000 + (index * 100)} fade>
                                            {
                                                blog.imageList.map((imageObj, key) => {
                                                    return (
                                                        <Carousel.Item
                                                            key={key}
                                                        >
                                                            <img
                                                                className="d-block w-100"
                                                                src={imageObj.image.filePath}
                                                                alt="First slide"
                                                            />
                                                        </Carousel.Item>
                                                    )
                                                })
                                            }

                                        </Carousel>
                                        <div className='margin-global-top-2' />
                                    </Col>
                                }

                                <hr />
                            </Row>
                        );
                    })
                }


            </Container>


            <Container className='purpose-container text-center front'>
                <div className='purpose-text'>
                    <h3 className='aim pink-text'>Our Purpose!</h3>
                    <p>
                        The student demographic of any country is its
                        most potential filled, as well as, its most volatile
                        population segment. Given the alarming figures
                        stated above, and the blatant disregard for basic
                        practices, imposes upon us an ever more
                        important duty to guide them. In this age of
                        information there is a perception of an informed
                        individual, however, ironically, we have never been
                        so misinformed due to the widespread of false
                        information. Thus, it is crucial that we relay reliable
                        and correct information to the young pupils of our community.<br />
                    </p>

                    <p>Be kind, even a small contribution from your side would make a change for someone fighting a hard battle</p>

                </div>

                <h3 className='donate-header pink-text'>Assist Us</h3>

                <p style={{ fontWeight: '500', margin: '0' }}> Make a Change </p>
                <Button
                    onClick={() => {
                        window.open("https://api.whatsapp.com/send?phone=923332401013", "_blank");
                    }}
                    variant='custom'
                    className='pink-care-button'
                >Donate Now
                </Button>
            </Container>


        </div>
    );
}

export default ResearchDev;