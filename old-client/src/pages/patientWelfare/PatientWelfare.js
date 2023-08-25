import React, { useEffect, useState } from 'react';
import api from '../../api';
import { Carousel } from 'react-bootstrap';
import { BlogTypes } from '../../constants';
import './PatientWelfare.scss';



function PatientWelfare(props) {
    // const PatientBlogs = [
    //     {
    //         name: 'Patient Blog 1',
    //         text: "CAREs Patient Welfare Programme was established with the vision of assisting every underprivileged patient in the finest and fastest way possible. The programme was started by first-year MBBS students in the DOW Ojha campus after seeing a lack of support for those who need it the most. Many disadvantaged patients feel frustrated and helpless during their hospital visits. The declining health of their loved ones compounded by their financial strains and the confusing health care system sends them into a spiral of depression. We aim to provide holistic care to our patients by not only assisting them financially but also guiding them during their time in the hospital to find the answers they are so desperately in search of. From assisting young adults with an early cancer diagnosis to providing life-saving hepatitis medication and even organizing blood donation drives for bone marrow transplant patients, the programme strives to help any and all who reach out for help. We primarily focus on providing financial support for diagnostic tests in DOWs Radiology and Blood lab department. So donate now to join us in this journey of bringing smiles to the needy during their toughest time!",
    //         images: ['https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 'https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg'],
    //     },
    //     {
    //         name: 'Patient Blog 2',
    //         text: "CAREs Patient Welfare Programme was established with the vision of assisting every underprivileged patient in the finest and fastest way possible. The programme was started by first-year MBBS students in the DOW Ojha campus after seeing a lack of support for those who need it the most. Many disadvantaged patients feel frustrated and helpless during their hospital visits. The declining health of their loved ones compounded by their financial strains and the confusing health care system sends them into a spiral of depression. We aim to provide holistic care to our patients by not only assisting them financially but also guiding them during their time in the hospital to find the answers they are so desperately in search of. From assisting young adults with an early cancer diagnosis to providing life-saving hepatitis medication and even organizing blood donation drives for bone marrow transplant patients, the programme strives to help any and all who reach out for help. We primarily focus on providing financial support for diagnostic tests in DOWs Radiology and Blood lab department. So donate now to join us in this journey of bringing smiles to the needy during their toughest time!",
    //         images: ['https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 'https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg'],
    //     },
    //     {
    //         name: 'Patient Blog 3',
    //         text: "CAREs Patient Welfare Programme was established with the vision of assisting every underprivileged patient in the finest and fastest way possible. The programme was started by first-year MBBS students in the DOW Ojha campus after seeing a lack of support for those who need it the most. Many disadvantaged patients feel frustrated and helpless during their hospital visits. The declining health of their loved ones compounded by their financial strains and the confusing health care system sends them into a spiral of depression. We aim to provide holistic care to our patients by not only assisting them financially but also guiding them during their time in the hospital to find the answers they are so desperately in search of. From assisting young adults with an early cancer diagnosis to providing life-saving hepatitis medication and even organizing blood donation drives for bone marrow transplant patients, the programme strives to help any and all who reach out for help. We primarily focus on providing financial support for diagnostic tests in DOWs Radiology and Blood lab department. So donate now to join us in this journey of bringing smiles to the needy during their toughest time!",
    //         images: ['https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 'https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg'],
    //     }
    // ];



    const [patientBlogs, setPatientBlogs] = useState([]);


    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${api}/blog-by-type/${BlogTypes.PATIENT_WELFARE}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    withCredentials: true
                });
                const content = await response.json();
                setPatientBlogs(content.data);
            })();

    }, [])

    return (
        <div className='pw-page'>

            <div className="margin-global-top-3" />

            <div className='text-center pw-text-area front'>
                <div className='main-box'>
                    <h1 className='pink-text'>
                        Care Patient Welfare
                    </h1>
                    <p>
                        Many disadvantaged patients experience feelings of frustration and helplessness when they visit the hospital. The deteriorating health of their loved ones, coupled with financial burdens and the complexity of the healthcare system, can lead them into a state of depression. Our objective is to offer comprehensive care to these patients by not only providing financial assistance but also guiding them during their hospital stays, helping them find the answers they desperately seek. Whether it's supporting young adults with an early cancer diagnosis, supplying life-saving medication for hepatitis, or organizing blood donation drives for bone marrow transplant recipients, our program strives to assist anyone who reaches out for help. Join us in bringing smiles to those in need during their most challenging times by making a donation today!

                    </p>
                </div>
            </div>

            <div className="margin-global-top-5" />

            {
                patientBlogs.map((blog, index) => {
                    return (
                        <div key={index} className='box'>
                            <div className='blog-card text-center'>
                                <div className='blog-details'>
                                    <h3 className="pink-text">{blog.title}</h3>
                                    <div className='blog-image'>
                                        <Carousel interval={2000 + (index * 100)} fade>
                                            {
                                                blog.imageList.map((imageObj, key) => {
                                                    return (
                                                        <Carousel.Item
                                                            key={key}
                                                        >
                                                            <img
                                                                className="d-block w-100"
                                                                src={imageObj.image.filePath}
                                                                alt={`${blog.title}`}
                                                            />
                                                        </Carousel.Item>
                                                    )
                                                })
                                            }

                                        </Carousel>
                                    </div>
                                    <div className="blog-text">{blog.content}</div>
                                </div>

                            </div>
                        </div>
                    )
                })
            }

            <br />
            <br />
        </div>
    )
}
export default PatientWelfare;