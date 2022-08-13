import React from "react";
import { Card } from 'react-bootstrap';

import './OurTeam.scss';


function OurTeam(props) {

    const departments = [


        {
            name: 'Care Leadership',

            members: [
                {
                    name: 'Wajiha Asim',
                    text: 'President',
                    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
                },
                {
                    name: 'Muhammad Mustafa',
                    text: 'Gen Sec',
                    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
                },

            ]
        },


        {
            name: 'IT department',

            members: [
                {
                    name: 'Mufize Firoz Vohra',
                    text: 'Head of Public Relations',
                    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
                },
                {
                    name: 'Mufize Firoz Vohra',
                    text: 'Member',
                    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
                },

            ]
        },

        {
            name: 'Public Relations',

            members: [
                {
                    name: 'Hammad Ahmad',
                    text: 'Head of Public Relations',
                    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
                },
                {
                    name: 'Hammad Ahmad',
                    text: 'Head of Public Relations',
                    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
                },
                {
                    name: 'Hammad Ahmad',
                    text: 'Head of Public Relations',
                    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
                },
                {
                    name: 'Mufize Firoz Vohra',
                    text: 'Member',
                    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
                },
            ]
        },

    ];


    return (
        <div className='text-center teams-page front'>

            <div className='text-center main-text-area front'>
                <h1 className='pink-text'>
                    Meet The Team
                </h1>
                <p >
                    This highly prized department is the face of CARE, and is responsible for

                    the conduction of all CARE-associated events, both on-campus, off-
                    campus, and online. The “Event Planning” division is responsible for

                    conducting annual batch events, special visits to welfare organizations,
                    and other forms of fundraiser events. The “W.H.O. Awareness” division is
                    responsible for conducting awareness campaigns in accordance with
                    W.H.O. monthly events. These awareness campaigns may be conducted
                    online or physically.
                </p>
            </div>


            <div className='margin-global-top-3' />

            {
                departments.map((department, index) => {
                    return (
                        <div key={index} >
                            <div className="text-center">
                                <h3 className="pink-text">{department.name}</h3>
                            </div>

                            <div className="department-members">
                                {
                                    department.members.map((member, index) => {
                                        return (
                                            <Card className='member-card' key={index} style={{ width: '18rem' }}>
                                                <Card.Img
                                                    variant="top"
                                                    src={member.image} />
                                                <Card.Body>
                                                    <Card.Title>{member.name}</Card.Title>
                                                    <Card.Text>
                                                        {member.text}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        )
                                    }
                                    )
                                }
                            </div>
                            <div className='margin-global-top-2' />
                        </div>
                    )
                })
            }
        </div>

    )
}

export default OurTeam;