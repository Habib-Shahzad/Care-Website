import React from "react";
// import { Button, Container, Row, Col } from 'react-bootstrap';
import './OurAims.scss';
import { useState } from 'react';


function OurAims(props) {

    return (
        <div className='text-center our-aims-main front'>
            <div className='front'>
                <h1 className='pink-text'>
                    Our Aims
                </h1>

                <h3 className ='pink-text'>
                    Fundraising
                </h3>
                <p >
                    CARE takes priority for various
                    fundraising projects organized by the
                    Department of Events, Campaigning, and
                    Outreach (ECO). Most of these events are
                    conducted for the students of Dow
                    University of Health Sciences, with 100%
                    of the profits directed towards use in
                    future collaboration and donation drives,
                    and welfare projects initiated by CARE.
                </p>
                <h3 className ='pink-text'>
                    Awareness Campaigns
                </h3>
                <p >
                    In a country with limited access to higher
                    education, and a literacy rate of under
                    60% - it is our aim to spread awareness
                    regarding important W.H.O. monthly
                    topics, including World Blood Donor Day, World Lung Cancer Day, Breast Cancer
                    Awareness Month, and more. Using these
                    campaigns, important information
                    regarding the nature of disease, etiology
                    of disease, prevalence of disease, and
                    treatment of disease will be shared with
                    the public via CARE.
                </p>
                <h3 className ='pink-text'>
                    Bringing Social Changes
                </h3>
                <p >
                    stigmas and issues, which is the top
                    cause of mental health & self-esteem
                    issues within the youth of the country.
                    CARE has launched the “Community
                    Outreach” program, which aims to create
                    a social change and address various
                    stigmas within our culture, including
                    racism, bullying, child abuse, depression,
                    and more. These sessions will be
                    delivered to school, college, and
                    university students across Karachi.
                </p>
                <h3 className ='pink-text'>
                    Medical Development and Research
                </h3>
                <p >
                    CARE’s highly skilled Department of
                    Research will consistently work towards
                    writing in medical research articles, and
                    aims for publications within well-known
                    journals of the medical industry. The
                    research will focus on epidemiology,
                    community medicine, and public health
                    in order to provide a better
                    understanding regarding disease
                    prevalence within our community.
                </p>
                <h3 className ='pink-text'>
                    Collaborations:
                </h3>
                <p >
                    CARE actively seeks to participate with
                    other welfare organizations, or external
                    organizations, companies, or businesses
                    with alike interests. Collectively, we can
                    achieve a better tomorrow.
                </p>
                
            </div>
        </div>   
            
    )
}

export default OurAims;