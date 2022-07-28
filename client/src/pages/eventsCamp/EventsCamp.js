import React from 'react';
import {Button, Container, Row, Col } from 'react-bootstrap';
import './EventsCamp.scss';



function EventsCamp(props) {
    
    return (
        <><div className='q-1 front'>
            <p>“Altruism itself depends on a recognition of the reality of other persons, and on the equivalent capacity to regard oneself as merely one individual among many.”</p>
            <p>
                Thomas Nagel
            </p>
        </div><div>
                <Container>
                    <Row>
                        <h1>
                            Events Campaigning And Outreach
                        </h1>
                        <p>
                            "In pursuance of raising awareness CARE has initiated its innovative and much needed Community Outreach Programme (COP). The COP is aimed to start a conversation on alarming issues that are predominant in our society, however, it is unfortunate that these issues are not actively recognized or are as informed as they should be. The CARE team is currently working on seeking institutional participation in spreading awareness on the following topics:"
                        </p>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col md={5}>
                            <h2>
                                Self Harm and Suicide
                            </h2>
                            <p>
                                Suicide and self-harm are major global public health problems with more than 800,000 (suicide) incidents worldwide annually. Seventy-five percent of the global suicides occur in low and middle-income countries (LMICs). Pakistan being one these LMICs has one of the population most vulnerable to suicide and self-harm. More alarmingly there is a lack of information on suicidal behavior. Considering all of the above CARE has decided to engage with the student body opting for various approaches, like conducting workshops and educating the ones who are more likely to indulge in such activities.
                            </p>
                        </Col>
                        <Col md={5}>
                                {/* <div className='events-camp-1 front'> */}
                                    <img src='/home-image.jpeg' alt="main_image" />
                                {/* </div> */}
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col md={5}>
                            <h3>
                                Mental Health
                            </h3>
                            <p>
                                Maintaining sound mental health is crucial for everyone, from a child to an elderly individual alike. A recent study, the first of its kind in Pakistan, has revealed that a substantial number of school-going adolescents are suffering from symptoms of anxiety and depression. Both of these, and other mental health impairments, can have a debilitating impact on the developing mind of a teenager if not managed properly. Unfortunately, a lack of mental health awareness, negative stigmas around therapy and the paucity of trained professionals in schools and healthcare facilities has led to a growing proportion of our adolescents with their mental health needs unmet and no proper guidance on where to seek help. Addressing these 
                                issues is an urgent need of the Pakistani population.
                            </p>
                            <Row md={3}>
                                <div className='events-camp-2 front'>
                                <img src='/home-image.jpeg' alt="main_image" />
                                </div>
                            </Row>
                        </Col>
                        <Col md={5}>
                            <h4>
                                Personal Hygiene
                            </h4>
                            <p>
                                Puberty and Self hygiene is an important topic yet, it is something which is not discussed freely in our society. Young individuals are often
                                left to deal with their bodies and the changes they are going through all
                                by themselves, which unfortunately leads to the spread of incorrect
                                information within these children. CARE plans to eradicate myths
                                prevalent among children. Our goal is to educate them about the right
                                ways to deal with puberty and all the changes our body goes through
                                while also maintaining a sense of personal hygiene. CARE plans to do
                                this by having a small workshop with girls and boys of ages close to
                                puberty where we are going to teach them about how to process the
                                effects of puberty.
                            </p>
                            <Row md={3}>
                                <div className='events-camp-3 front'>
                                <img src='/home-image.jpeg' alt="main_image" />
                                </div>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={5}>
                            <h5>
                                Racism
                            </h5>
                            <p>
                            Racism is one of the major global issues that needs to be addressed. It includes differentiating people on the basis of their religion, ethnicity
                            and skin tone. Unfortunately, it is far more common in Pakistan than acknowledged. Based on the survey we conducted, as part of our
                            research, 52% of the respondents were a victim to Racism. This is an unnerving figure. CARE intends to remedy this by conducting seminars
                            and workshop on absolving prejudices and having a spirit of acceptance. CARE shall also provide information material such as brochures.
                            </p>
                        </Col>
                        <Col md={5}>
                            <h6>
                                Child Abuse
                            </h6>
                            <p>
                                The Child abuse campaign revolves around fighting against the stigma and neglect around child abuse awareness, since 2018 there has been an 11% increase in reports of child abuse incidents. Children in Pakistan
                                are vulnerable to many forms of violence (physical, psychological, sexual) and exploitation, the shocking statistics on child abuse is testimony of the severity of the issue at hand. CARE intends to host
                                online campaigns as well as workshops for children in schools to teach them about what child abuse is and how it can be prevented.
                            </p>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <h7 className='aim'>Our Aim!</h7>

                    <div className='aim-para'>
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

                    <h3 className='donate-header'>Assist Us</h3>

                    <p style={{ fontWeight: '500', margin: '0' }}> Make a Change </p>

                    <Button
                        variant='custom'
                        className='donate-button'
                    >Donate Now </Button>
                </Container>
                
            </div></>
    );
}

export default EventsCamp;