import React from 'react';
import { Divider, Typography } from '@mui/material';
import { Container, Col, Row } from 'react-bootstrap';
import { userObj, activityObj, blogObj, imageObj, departmentObj } from '../../db';
import { useParams } from 'react-router';
import './AdminForm.scss';

const classes = {
    title: {
        flex: '1 1 100%',
        marginBottom: 5
    },
    demo: {
        marginBottom: 15
    },
    highlight: {
        color: '#c31200'
    },
    marginTopAll: {
        marginTop: 15
    },
    delete: {
        backgroundColor: '#c31200',
        color: 'white',
        marginRight: 15,
        '&:hover': {
            background: 'black',
        },
    },
    formControl: {
        width: '100%',
    },
    rowGap: {
        marginBottom: 15
    },
    button: {
        marginRight: 5
    },
    image: {
        width: '100%',
        marginBottom: 30
    },
    divider: {
        margin: '1rem 0'
    },
};

function AdminForm(props) {
    const { model, id } = useParams();

    let formFetch = {};
    if (model === 'user') formFetch = userObj;
    else if (model === 'activity') formFetch = activityObj;
    else if (model === 'blog') formFetch = blogObj;
    else if (model === 'image') formFetch = imageObj;
    else if (model === 'department') formFetch = departmentObj;
    else formFetch = {};


    if (Object.keys(formFetch).length === 0) {
        return <div>No data</div>;
    }

    return (
        <Container fluid className='adminForm'>
            <Row>
                <Col>
                    <Typography sx={classes.title} variant="h3">
                        {formFetch.modelName}
                        <Divider />
                    </Typography>
                </Col>
            </Row>
            <Row>
                <Col>{formFetch.Form(id, classes)}</Col>
            </Row>
        </Container>
    );
}

export default AdminForm;