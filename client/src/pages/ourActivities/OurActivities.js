import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import './OurActivities.scss';


function OurActivities(props) {
    const actives = [
        {
            name: 'Fehmida’s Senior Care Home',
            date: '30 June 2022',
            description: 'Our team visited Fehmida’s Senior Care Home, another old age home and spent the day there with senior citizens, doing activities and having lunch as well as listening to all difficulties they’re going through. We wanted this to be our last project before summer break.',
            image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },
        {
            name: 'World Blood Donor Day',
            date: '14 June 2022',
            description: 'A blood donation drive to take place in the Blood Bank where students across campus are encouraged to come and donate blood. This drive is arranged in order to gather blood for the blood bank as well as patients in Dow Hospital, Ojha.',
            image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },
        {
            name: 'Brain Tumour Awareness Seminar  - Dar Ul Sukoon',
            date: '6 June 2022',
            description: 'A session was conducted by our team at Dar Ul Sukoon to train the staff on brain tumours and management as they’ve children with disabilities. It was an interactive session with many further follow ups. This session was a part of our recently launched Community Outreach Program which targets educating our society on topics not openly discussed such as rape, self harm, hygiene etc. The program also works in accordance with Dow’s SDG goals.',
            image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },
        {
            name: 'Dar Ul Sukoon - Old Age Home',
            date: '4 June 2022',
            description: 'Our team visited Dar Ul Sukoon old age home to spend a day with them. They conducted activities, heard their stories, arranged lunch, flowers and cards for them. At the end an amount of 25000/- was also donated. 120+ seniors were targeted during this visit.',
            image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },
        {
            name: 'First Year Guide - Blood Module',
            date: '24 April 2022',
            description: 'An online seminar was conducted by 2nd year students who shared their opinions and study techniques for the first year students throughout Pakistan.',
            image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },
        {
            name: 'Girls Chaand Raat ',
            date: '24 April 202',
            description: 'Earings, bangles, henna were arranged on campus for girls specially in hostels to make Eid easier in the heat of Ramadan.',
            image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },
        {
            name: 'Khayaal Campaign',
            date: '3 April 2022 - 3 May 2022',
            description: 'This has been the biggest campaign of the year till now. A total of 9 lakh rupees were utilised. Khayal campaign was to provide relief to the underprivileged in the month of Ramadan. We conducted multiple street iftars as well as ration drives across Karachi. We also donated to many small organisations that were in need as well as individual needy cases that were brought up. During Khayaal Campaign CARE fed iftar to 1000+ people as well as rationing to 100+ families across Karachi.',
            image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },
        {
            name: 'Ramadan Ambassador Programme',
            date: '3 April 2022 - 3 May 2022',
            description: 'This program was launched to gather donations for our Khayal Campaign. This ambassadorship program was opened to students from different universities across Karachi. Their tasks were to collect donations and spread awareness of our goals. They were divided in groups with CARE members as group leaders. Each ambassador was awarded a certificate by CARE upon accomplishment of tasks.100+ students across universities in Karachi took part, this also increased CARE’s public reach.',
            image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },
        {
            name: 'Research Insiders - Introduction to Research Seminar',
            date: '25 March 2022 ',
            description: 'Our Research department conducted an Online workshop for students across Pakistan with Dr.Asif Qureshi as our host who guided the audience on how to start with their research. Our participant list exceeded 250+ students.',
            image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },
        {
            name: 'Culture Day',
            date: '22 March 2022',
            description: 'A performance about all provinces and cultures as well as food stalls were arranged by our team to celebrate Pakistan Day and our culture with the entire student body at Dow Ojha',
            image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },
        {
            name: 'First Year Guide to Med School',
            date: '14 February 2022',
            description: 'An online seminar was held where a panel of 2nd year students shared their resources and study methods to the new batch. This seminar targeted students around Pakistan.',
            image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },
        {
            name: 'Breast Cancer Awareness Session',
            date: '6 October 2021 ',
            description: 'A seminar in the NIDE building was conducted followed up by a question session and a checkup with the assistance of doctors. This seminar was targeting all lower class women who face issues but have no knowledge.',
            image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },
        {
            name: 'Bake Sale - Delicious Donations',
            date: '20 September 2021',
            description: 'A bake sale was conducted in Dow Ojha’s Cafeteria. The aims were to collect donations for STS as well as promote small home business owners',
            image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },

    ];

    return (
        <div className='activities-page'>
            <div className="margin-global-top-3" />

            <div className='front text-center'>
                <h1 className='pink-text'>
                    The Work We Have Done
                </h1>
            </div>

            <div className="margin-global-top-2" />

            <div className="all-activities">
                {
                    actives.map((active, index) => {
                        return (
                            <Container className='activity-card'>
                                <Row className="activity-row">
                                    <Col lg={4}>
                                        <div className='activity-image'>
                                            <img src={active.image} alt={active.name} style={{ 'width': '25rem' }} />
                                        </div>
                                    </Col>
                                    <Col lg={5}>
                                        <div className='activity-text'>
                                            <h2 className="pink-text">{active.name}</h2>
                                            <h3>{active.date}</h3>
                                            <p>{active.description}</p>
                                        </div>
                                    </Col>
                                </Row>
                                <hr />
                            </Container>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default OurActivities;