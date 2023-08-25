import React, { useEffect, useState } from 'react';
import api from '../../api';
import { Card } from 'react-bootstrap';

import './OurTeam.scss';


function OurTeam(props) {

    // const departments = [


    //     {
    //         name: 'Care Leadership',

    //         members: [
    //             {
    //                 name: 'Wajiha Asim',
    //                 text: 'President',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             {
    //                 name: 'Muhammad Mustafa',
    //                 text: 'Gen Sec',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             {
    //                 name: 'Muhammad Ali Amir',
    //                 text: 'Director of Research and Patient Welfare',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             {
    //                 name: 'Rahmah Ashar Sakrani',
    //                 text: 'Director of Finance',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             {
    //                 name: 'Namrata Panjwani',
    //                 text: 'Director of Public Relations and Ambassadors',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },         
    //             {
    //                 name: 'Abiha Khurram',
    //                 text: 'Director of Media and Marketing',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             {
    //                 name: 'Rida Batool',
    //                 text: 'Director of World Health Organisation',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             {
    //                 name: 'Moiz Noman',
    //                 text: 'Director of Event Planning',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             }
    //         ]
    //     },


    //     {
    //         name: 'Department Of Public Relations',

    //         members: [
    //             {
    //                 name: 'Ahmad Anwar',
    //                 text: 'Head of Public Relations',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             {
    //                 name: 'Palwasha Kakkar',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             {
    //                 name: 'Mufize Firoz Vohra',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             {
    //                 name: 'Qazi Akhtar',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },



    //         ]
    //     },

    //     {
    //         name: 'Department of Research and Development',

    //         members: [
    //             {
    //                 name: 'Muhammad Areeb Syed',
    //                 text: 'Head of Research and Development',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             {
    //                 name: 'Bilal Syed',
    //                 text: 'Head of Public Relations',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             {
    //                 name: 'Tayyab Zahoor',
    //                 text: 'Head of Public Relations',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             {
    //                 name: 'Yumna Khabir',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             {
    //                 name: 'Reeha Amjad',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //         ]
    //     },
    //     {
    //         name: 'Department of Patient Welfare',

    //         members: [
    //             { 
    //                 name: 'Mahavash Nadeem',
    //                 text: 'Head of Patient Welfare',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Syed Haidar Jalal',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Mahnoor Rehan',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //         ]
    //     },
    //     {
    //         name: 'Department of World Health Organisation',

    //         members: [
    //             { 
    //                 name: 'Moeez Ibrahim',
    //                 text: 'Head of World Health Organisation',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Haadya Khan',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Syeda Javeria',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Zara Jamil',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //         ]

    //     },
    //     {
    //         name: 'Department of Community Outreach',

    //         members: [
    //             { 
    //                 name: 'Moiz Noman',
    //                 text: 'Head of Community Outreach',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Saljok Ali',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Arfa Khan',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Jenelle Alvares',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Zara Ahmed Qureshi',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },

    //         ]        
    //     },
    //     {
    //         name: 'Department of Event Planning',

    //         members: [
    //             { 
    //                 name: 'Haniah Mahboob',
    //                 text: 'Head of Event Planning',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Abiha Raza',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Atiqa Fatima',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Ahsan Zaheer',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Khubaib Basit',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Anusha Amir',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Ali Rizvi',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Areeka Irfan',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //         ]

    //     },
    //     {
    //         name: 'Department of Finance',

    //         members: [
    //             { 
    //                 name: 'Bilal Khan',
    //                 text: 'Head of Finance',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Rana Zargham Asif',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Muhammad Haseeb Shoaib',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Muhammad Azzam',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //         ]

    //     },
    //     {
    //         name: 'Department of Media and Marketing',

    //         members: [
    //             { 
    //                 name: 'Areeba Nisa',
    //                 text: 'Head of Media and Marketing',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Fahad Farooq',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Arooba Sheikh',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Yasir Raza',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Maryum Mubbashir',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Anas Aijaz',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //         ]
    //     },
    //     {
    //         name: 'Department if Human Resources',

    //         members: [
    //             { 
    //                 name: 'Syed Wijdan Ali',
    //                 text: 'Head of Human Resources',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Eesha Nadeem',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Abdur Rehman',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //             { 
    //                 name: 'Khizar Saeed',
    //                 text: 'Member',
    //                 image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
    //             },
    //         ]

    //     }

    // ];



    const [departments, setDepartments] = useState([]);


    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${api}/department/table-data`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    withCredentials: true
                });
                const content = await response.json();
                setDepartments(content.data);
            })();

    }, [])


    return (
        <div className='text-center teams-page front'>

            <div className='text-center main-text-area front'>
                <h1 className='pink-text'>
                    Meet The Team
                </h1>
                <p >
                    CARE, a community & nonprofit organization dedicated to promoting well-being and health, encompasses various departments to ensure effective operations.

                </p>
            </div>


            <div className='margin-global-top-3' />

            {
                departments.map((department, index) => {
                    return (
                        <div className='box-container'>
                            <div className='box' key={index} >
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
                                                        src={member.image.image.filePath} />
                                                    <Card.Body>
                                                        <Card.Title>{member.name}</Card.Title>
                                                        <Card.Text>
                                                            {member.role}
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
                        </div>
                    )
                })
            }
        </div>

    )
}

export default OurTeam;