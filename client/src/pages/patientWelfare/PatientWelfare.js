import React from "react";
// import { Button, Container, Row, Col } from 'react-bootstrap';
import './PatientWelfare.scss';


function PatientWelfare(props) {
    return (
        <div className='text-center patient-welfare-head front'>
            <div className='front'>
                <h1 className='pink-text'>
                    Care Patient Welfare
                </h1>
                <p >
                    The team responsible for the welfare activity within the Dow University Hospital attached to the Dow International Medical College, Karachi. This is one of CARE’s latest projects that has observed noteworthy progress. It is also capable of handling the welfare cases in other government hospitals of Karachi, including Civil Hospital Karachi. The members of the team manually mediate any welfare case brought to CARE using a robust verification system that estimates the financial neediness of the patient,
                    through a series of discussions, interviews, and questionnaire
                </p>
            </div>
        </div>
    )
}

export default PatientWelfare;