import React from "react";
// import { Button, Container, Row, Col } from 'react-bootstrap';
import './OurTeam.scss';
import { useState } from 'react';


function OurTeam(props) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    const members = [
        {
            name: 'Mustafa',
            position: 'President',
            image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },
        {
            name: 'Mustafa',
            position: 'President',
            image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },
        {
            name: 'Mustafa',
            position: 'President',
            image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },
        {
            name: 'Mustafa',
            position: 'President',
            image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        }

    ]; 
    return (
        <div className='text-center team-main front'>
            <div className='front'>
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
            {
                members.map((member, index) => {
                    return (
                        <div className='member-card'>
                            <div className='member-image'>
                                <img src={member.image} alt={member.name} style={{'width': '25rem'}} />
                            </div>
                            <div className='member-details'>
                                <h3>{member.name}</h3>
                                <p>{member.position}</p>
                            </div>
                        </div>
                    )
                })
            }
         </div>   
            
    )
}

export default OurTeam;