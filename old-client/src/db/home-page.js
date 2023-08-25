import {
    FormControl,
    FormHelperText,
    Button,
    TextField,
} from '@mui/material';
import { Col, Form, Row, Spinner } from 'react-bootstrap';
import api from '../api';
import { useForm, Controller } from "react-hook-form";
import Autocomplete from '@mui/material/Autocomplete';


import { useState, useEffect } from 'react';

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



export const HomePageContent = () => {

    const [imagesArray, setImagesArray] = useState([]);
    const [editObj, setEditObj] = useState(null);


    useEffect(() => {
        setLoading(true);

        (
            async () => {
                const response = await fetch(`${api}/home-page/data`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-store'
                    },
                });
                const content = await response.json();
                content?.data ? setEditObj(content?.data) : setEditObj({ mainContent: "", mainImage: null });


                const imageResponse = await fetch(`${api}/image/table-data`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-store'
                    },
                });
                const imageContent = await imageResponse.json();
                setImagesArray(imageContent.data)

            })();

        setLoading(false);
    }, []);


    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm();


    const [loading, setLoading] = useState(true);
    const [formSubmitted, setSuccess] = useState(null);


    const onSubmit = async data => {


        setLoading(true);

        await fetch(`${api}/home-page/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            credentials: 'include',
            withCredentials: true,
            body: JSON.stringify({
                ...data,
                _id: editObj?._id
            }),
        });

        setSuccess(true);

        reset();

        await new Promise((resolve) => setTimeout(resolve, 2000));


        setLoading(false);

    };


    useEffect(() => {

        if (editObj?.mainImage) {
            setValue("mainImage", editObj?.mainImage);
            setValue("mainImage", editObj?.ambassadorImage);
        }
    }, [editObj, setValue])



    return <>

        {
            formSubmitted &&
            <>
                <div className="alert alert-success" role="alert">
                    Updated successfully!
                </div>


                <Button style={classes.button} onClick={() => {
                    window.location.reload();
                }} variant="contained" color="primary">
                    Refresh
                </Button>


            </>
        }

        {
            (!formSubmitted && (loading || editObj == null)) ? <Spinner animation="border" variant="primary" /> :
                <>
                    {

                        !formSubmitted &&

                        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                            <fieldset>
                                <legend>Home Page Details</legend>
                                <Row>
                                    <Row style={classes.rowGap}>
                                        <Form.Group controlId="content">
                                            <FormControl style={classes.formControl}>
                                                <TextField
                                                    defaultValue={editObj ? editObj.mainContent : null}
                                                    {...register("mainContent", {
                                                        required: "Content is required!",
                                                    })}
                                                    error={errors.mainContent ? true : false}
                                                    color="secondary"
                                                    autoComplete="none"
                                                    label="content"
                                                    multiline
                                                    rows={10}
                                                    aria-describedby="content-helper"
                                                />
                                                {!errors.title &&
                                                    <FormHelperText id="content-helper">Type the content of the blog</FormHelperText>
                                                }
                                                <FormHelperText error={errors.mainContent ? true : false} id="content-helper">{errors.mainContent && <>{errors.mainContent.message}</>}</FormHelperText>

                                            </FormControl>
                                        </Form.Group>
                                    </Row>

                                </Row>


                                <Row style={classes.rowGap}>
                                    <Form.Group as={Col} md={6} controlId="image">
                                        <FormControl style={classes.formControl}>
                                            <Controller
                                                render={(props) => (
                                                    <Autocomplete
                                                        defaultValue={editObj.mainImage}
                                                        isOptionEqualToValue={(option, value) => option._id === value._id}
                                                        id="combo-box-mainImage"
                                                        color="secondary"
                                                        options={imagesArray}
                                                        getOptionLabel={(option) => option.name}
                                                        onChange={(e, data) => { props.field.onChange(data); }}
                                                        renderInput={(params) =>
                                                            <TextField
                                                                error={errors.mainImage ? true : false}
                                                                color="secondary"
                                                                {...params}
                                                                label="Main Image"
                                                            />
                                                        }
                                                    />
                                                )}
                                                rules={{ required: "Select atleast one image!" }}
                                                onChange={([, data]) => data}
                                                defaultValue={undefined}
                                                name={"mainImage"}
                                                control={control}
                                            />
                                            {!errors.mainImage &&
                                                <FormHelperText id="name-helper">Select images</FormHelperText>
                                            }
                                            <FormHelperText error={errors.mainImage ? true : false} id="name-helper">{errors.mainImage && <>{errors.mainImage.message}</>}</FormHelperText>

                                        </FormControl>
                                    </Form.Group>


                                    <Form.Group as={Col} md={6} controlId="image">
                                        <FormControl style={classes.formControl}>
                                            <Controller
                                                render={(props) => (
                                                    <Autocomplete
                                                        defaultValue={editObj.ambassadorImage}
                                                        isOptionEqualToValue={(option, value) => option._id === value._id}
                                                        id="combo-box-ambassadorImage"
                                                        color="secondary"
                                                        options={imagesArray}
                                                        getOptionLabel={(option) => option.name}
                                                        onChange={(e, data) => { props.field.onChange(data); }}
                                                        renderInput={(params) =>
                                                            <TextField
                                                                error={errors.ambassadorImage ? true : false}
                                                                color="secondary"
                                                                {...params}
                                                                label="Ambassadorship Image"
                                                            />
                                                        }
                                                    />
                                                )}
                                                rules={{ required: "Select atleast one image!" }}
                                                onChange={([, data]) => data}
                                                defaultValue={undefined}
                                                name={"ambassadorImage"}
                                                control={control}
                                            />
                                            {!errors.ambassadorImage &&
                                                <FormHelperText id="name-helper">Select images</FormHelperText>
                                            }
                                            <FormHelperText error={errors.ambassadorImage ? true : false} id="name-helper">{errors.ambassadorImage && <>{errors.ambassadorImage.message}</>}</FormHelperText>

                                        </FormControl>
                                    </Form.Group>


                                </Row>


                                <Button style={classes.button} type="submit" variant="contained" color="primary">
                                    Update
                                </Button>



                            </fieldset>
                        </Form>

                    }
                </>
        }
    </>




}