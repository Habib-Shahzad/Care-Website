import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Carousel } from 'react-bootstrap';
import api from '../../api';
import './CommunityOutreach.scss';


function EventsCamp(props) {

    const [blogs, setBlogs] = useState([]);


    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${api}/outreachBlog/table-data`, {
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

    // const blogs = [
    //     {
    //         title: 'Self Harm and Suicide',
    //         description: 'Suicide and self-harm are major global public health problems with more than 800,000 (suicide) incidents worldwide annually. Seventy-five percent of the global suicides occur in low and middle-income countries (LMICs). Pakistan being one these LMICs has one of the population most vulnerable to suicide and self-harm. More alarmingly there is a lack of information on suicidal behavior. Considering all of the above CARE has decided to engage with the student body opting for various approaches, like conducting workshops and educating the ones who are more likely to indulge in such activities.',
    //         images: [
    //             'https://swiperjs.com/demos/images/nature-1.jpg',
    //             'https://swiperjs.com/demos/images/nature-2.jpg',
    //         ]
    //     },
    //     {
    //         title: 'Mental Health',
    //         description: 'Maintaining sound mental health is crucial for everyone, from a child to an elderly individual alike.A recent study, the first of its kind in Pakistan, has revealed that a substantial number of school - going adolescents are suffering from symptoms of anxiety and depression.Both of these, and other mental health impairments, can have a debilitating impact on the developing mind of a teenager if not managed properly.Unfortunately, a lack of mental health awareness, negative stigmas around therapy and the paucity of trained professionals in schools and healthcare facilities has led to a growing proportion of our adolescents with their mental health needs unmet and no proper guidance on where to seek help.Addressing these issues is an urgent need of the Pakistani population.',
    //         images: [
    //             'https://swiperjs.com/demos/images/nature-1.jpg',
    //             'https://swiperjs.com/demos/images/nature-2.jpg',
    //         ]
    //     },

    //     {
    //         title: 'Personal Hygiene',
    //         description: 'Puberty and Self hygiene is an important topic yet, it is something which is not discussed freely in our society. Young individuals are often left to deal with their bodies and the changes they are going through all by themselves, which unfortunately leads to the spread of incorrect information within these children.CARE plans to eradicate myths prevalent among children.Our goal is to educate them about the right ways to deal with puberty and all the changes our body goes through while also maintaining a sense of personal hygiene.CARE plans to do this by having a small workshop with girls and boys of ages close to puberty where we are going to teach them about how to process the effects of puberty.',
    //         images: [
    //             'https://swiperjs.com/demos/images/nature-1.jpg',
    //             'https://swiperjs.com/demos/images/nature-2.jpg',
    //         ]
    //     },


    //     {
    //         title: 'Racism',
    //         description: 'Racism is one of the major global issues that needs to be addressed. It includes differentiating people on the basis of their religion, ethnicity and skin tone.Unfortunately, it is far more common in Pakistan than acknowledged.Based on the survey we conducted, as part of our research, 52% of the respondents were a victim to Racism.This is an unnerving figure.CARE intends to remedy this by conducting seminars and workshop on absolving prejudices and having a spirit of acceptance.CARE shall also provide information material such as brochures.',
    //         images: []
    //     },



    //     {
    //         title: 'Child Abuse',
    //         description: 'The Child abuse campaign revolves around fighting against the stigma and neglect around child abuse awareness, since 2018 there has been an 11% increase in reports of child abuse incidents. Children in Pakistan are vulnerable to many forms of violence(physical, psychological, sexual) and exploitation, the shocking statistics on child abuse is testimony of the severity of the issue at hand.CARE intends to host online campaigns as well as workshops for children in schools to teach them about what child abuse is and how it can be prevented.',
    //         images: []
    //     },


    // ]

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


            <div className='events-initial'>

                <div className='quote-1 pink-text front'>
                    <p>“Altruism itself depends on a recognition of the reality of other persons, and on the equivalent capacity to regard oneself as merely one individual among many.”</p>
                    <p>
                        Thomas Nagel
                    </p>
                </div>

                <div className='text-center main-text-area front'>

                    <div className='box1'>
                        <h1 className='pink-text'>
                            Community Outreach Programme
                        </h1>
                        <p >
                            In pursuance of raising awareness CARE has initiated its innovative and much needed Community Outreach Programme (COP). The COP is aimed to start a conversation on alarming issues that are predominant in our society, however, it is unfortunate that these issues are not actively recognized or are as informed as they should be. The CARE team is currently working on seeking institutional participation in spreading awareness on the following topics:
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

export default EventsCamp;