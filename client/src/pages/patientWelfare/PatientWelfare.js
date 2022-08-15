import React from "react";
// import { Button, Container, Row, Col } from 'react-bootstrap';
import './PatientWelfare.scss';


function PatientWelfare(props) {
        const PatientBlogs =[
            {
                text:"CAREs Patient Welfare Programme was established with the vision of assisting every underprivileged patient in the finest and fastest way possible. The programme was started by first-year MBBS students in the DOW Ojha campus after seeing a lack of support for those who need it the most. Many disadvantaged patients feel frustrated and helpless during their hospital visits. The declining health of their loved ones compounded by their financial strains and the confusing health care system sends them into a spiral of depression. We aim to provide holistic care to our patients by not only assisting them financially but also guiding them during their time in the hospital to find the answers they are so desperately in search of. From assisting young adults with an early cancer diagnosis to providing life-saving hepatitis medication and even organizing blood donation drives for bone marrow transplant patients, the programme strives to help any and all who reach out for help. We primarily focus on providing financial support for diagnostic tests in DOWs Radiology and Blood lab department. So donate now to join us in this journey of bringing smiles to the needy during their toughest time!",
                image:  'public/ambass-image.jpg'
            }
        ];
    return (
        <div className='text-center patient-welfare-head front'>
            <div className='front'>
                <h1 className='pink-text'>
                    Care Patient Welfare
                </h1>
            </div>
            {
                PatientBlogs.map((blog, index) => {
                    return (
                        <div className='blog-card'>
                            <div className='blog-image'>
                                <img src={blog.image} alt={blog.name} style={{'width': '25rem'}} />
                            </div>
                            <div className='blog-details'>
                                {/* <h3>{blog.name}</h3> */}
                                <p>{blog.text}</p>
                            </div>
                        </div>
                    )
                })
            }
            <div className='text-center blog-start front'>
                <h3 className="pink-text">
                    Start a Bloghh
                </h3>
                <p>
                    Many disadvantaged patients feel frustrated and helpless during their hospital visits. The declining health of their loved ones compounded by their financial strains and the confusing health care system sends them into a spiral of depression. We aim to provide holistic care to our patients by not only assisting them financially but also guiding them during their time in the hospital to find the answers they are so desperately in search of. 
                    From assisting young adults with an early cancer diagnosis to providing life-saving hepatitis medication and even organizing blood donation drives for bone marrow transplant patients, the programme strives to help any and all who reach out for help. We primarily focus on providing financial support for diagnostic tests in DOWs Radiology and Blood lab department.
                    So donate now to join us in this journey of bringing smiles to the needy during their toughest time!
                </p>
            </div>

        </div>
    )
}
export default PatientWelfare;