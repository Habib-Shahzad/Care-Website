import React from "react";
import { Designer2 } from "../../components";
import './OurAims.scss';


function OurAims(props) {


    const aims = [
        {
            name: "Fundraising",
            content: "CARE takes priority for various fundraising projects organized by the Department of Events, Campaigning, and Outreach (ECO). Most of these events are conducted for students, with 100% of the profits directed towards use in future collaboration and donation drives, as well as welfare projects initiated by CARE.",
        },
        {
            name: "Awareness Campaigns",
            content: "In a nation where higher education is not easily accessible and the literacy rate stands below 60%, our objective is to raise awareness about significant monthly topics recognized by the World Health Organization (WHO). These topics encompass events like World Blood Donor Day, World Lung Cancer Day, Breast Cancer Awareness Month, and others. Through these campaigns, CARE aims to disseminate vital information about the nature, causes, prevalence, and treatment of diseases to the general public."
        },
        {
            name: "Bringing Social Changes",
            content: "The Community Outreach program tackles societal stigmas and challenges, which significantly contribute to mental health and self-esteem issues among the youth. The program is designed to drive social transformation and address various cultural stigmas such as racism, bullying, child abuse, depression, and more. These informative sessions will be conducted for students at schools, colleges, and universities throughout Karachi."
        },
        {
            name: "Medical Development and Research",
            content: "Our proficient Department of Research is dedicated to producing medical research articles and strives to have them published in reputable journals within the medical industry. The research conducted will primarily concentrate on epidemiology, community medicine, and public health, aiming to enhance our understanding of disease prevalence within our community."
        },
        {
            name: "Collaborations",
            content: "CARE actively seeks collaboration with other welfare organizations, external entities, companies, or businesses that share similar interests. Together, we can work towards creating a brighter future."
        },
    ]

    return (
        <div className="aims-page">


            <div className='wavy-container'>
                <div className='wavy-thing'>
                    <Designer2 />
                </div>
            </div>

            <div className='wavy-container'>
                <div className='wavy-thing2'>
                    <Designer2 />
                </div>
            </div>


            <div className='text-center our-aims-main front'>


                {
                    aims.map((aim, index) => {
                        return (
                            <div className='aim front' key={index}>
                                <h3 className='pink-text'>
                                    {aim.name}
                                </h3>
                                <p>{aim.content}</p>
                            </div>
                        )
                    }
                    )
                }

            </div>
        </div>

    )
}

export default OurAims;