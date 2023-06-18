import {
    FormControl,
    Input,
    InputLabel,
    FormHelperText,
    Button,
} from '@mui/material';

import React, { useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useForm, Controller } from "react-hook-form";

const createTableData = (data) => {
    const { _id, name, image } = data;
    console.log(data);

    const filePath = image.filePath;
    return { _id, name, image, filePath };
}

const startAction = async (obj, selected, setOriginalTableRows, setTableRows) => {

}

const imageObj = {
    apiTable: `${api}/image/table-data`,
    deleteApi: `${api}/image/delete`,
    createTableData: createTableData,
    headCells: [
        { id: 'name', numeric: false, disablePadding: false, label: 'name' },
        { id: 'image', numeric: false, disablePadding: false, label: 'Image Preview' },
        { id: 'filePath', numeric: false, disablePadding: false, label: 'Image Path' },
    ],
    ManyChild: '',
    checkboxSelection: '_id',
    Delete: function (items) { },
    editAllowed: false,
    deleteAllowed: true,
    addAllowed: true,
    modelName: 'Image',
    ordering: 'name',
    searchField: 'name',
    rightAllign: [],
    type: 'enhanced',
    startAction: startAction,
    actionOptions: [
        { label: '', value: '', type: '' }],
    Form: function (id, classes) {
        let navigate = useNavigate();

        let queryID = '';
        if (id != null) queryID = id;


        const [imagesArray, setImagesArray] = useState([]);
        const [pressedBtn, setPressedBtn] = useState(null);
        const [loading, setLoading] = useState(true);


        const {
            control,
            register,
            handleSubmit,
            formState: { errors },
            reset,
            setValue
        } = useForm();



        const imageChange = event => {
            let reader = new FileReader();
            if (event.target.files && event.target.files[0]) {
                if (event.target.files[0].size / 1024 < 3000) {
                    reader.readAsDataURL(event.target.files[0]);
                    const objectUrl = URL.createObjectURL(event.target.files[0]);
                    reader.onload = ((theFile) => {
                        var image = new Image();
                        image.src = theFile.target.result;
                        image.onload = function () {
                            setValue('image', event.target.files[0]);
                            setValue('fileUrl', objectUrl, { shouldValidate: true });
                        };
                    });
                } else {
                    alert("Size too large. Must be below 3Mb.");
                }
            }
        }

        useEffect(() => {
            (
                async () => {
                    const response = await fetch(`${api}/image/table-data`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-store'
                        },
                    });
                    const content = await response.json();
                    setImagesArray(content.data)
                    setLoading(false);
                })();
        }, [queryID]);



        const onSubmit = async data => {

            const { name, image } = data;
            const formData = new FormData();

            formData.append("data",
                JSON.stringify({
                    name
                })
            );
            formData.append("image", image);

            setLoading(true);

            if (queryID === '') {

                const response = await fetch(`${api}/image/add`, {
                    method: 'POST',
                    credentials: 'include',
                    withCredentials: true,
                    body: formData,
                    headers: {
                        // "Content-Type": "multipart/form-data"
                    }
                });
                const content = await response.json();
                setImagesArray([...imagesArray, content.data]);
            } else { }
            reset();
            if (pressedBtn === 1) {
                navigate('/admin/image');
            }
            else {
                setLoading(false);
                queryID = '';
                navigate('/admin/image/add');
            }
        };

        if (queryID !== '') return <div></div>

        if (loading) return <div></div>

        return (
            <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <fieldset>
                    <legend>Details</legend>
                    <Row style={classes.rowGap}>
                        <Form.Group as={Col} md={6} controlId="name">
                            <FormControl style={classes.formControl}>
                                <InputLabel error={errors.name ? true : false} color="secondary" htmlFor="name">Name</InputLabel>
                                <Input
                                    {...register("name", {
                                        required: "Name is required!",
                                    })}
                                    color="secondary"
                                    autoComplete="none"
                                    type="text"
                                    error={errors.name ? true : false}
                                    aria-describedby="name-helper"
                                />
                                {!errors.name &&
                                    <FormHelperText id="name-helper">Enter Image Name</FormHelperText>
                                }
                                <FormHelperText error={errors.name ? true : false} id="name-helper">{errors.name && <>{errors.name.message}</>}</FormHelperText>

                            </FormControl>
                        </Form.Group>
                    </Row>

                    <Row style={classes.rowGap}>
                        <Col md={6}>
                            <Controller
                                name="fileUrl"
                                control={control}
                                render={({ field: { value }, fieldState: { error } }) => (
                                    <label htmlFor="image">
                                        <Input
                                            error={!!error}
                                            hidden
                                            onChange={imageChange}
                                            accept="image/*"
                                            id="image"
                                            type="file"
                                        />
                                        <Button type="button" variant="contained" component="span">
                                            Upload
                                        </Button>
                                        {value &&
                                            <>
                                                <div className="margin-global-top-1" />
                                                <img style={{ width: '30rem' }} src={value} alt="preview" />
                                            </>
                                        }

                                        {error &&
                                            <FormHelperText error={error ? true : false} >{error.message}</FormHelperText>
                                        }
                                    </label>
                                )}
                                rules={{
                                    required: 'Image is required!',
                                }}
                            />
                        </Col>
                    </Row>

                    <div className="margin-global-top-2" />

                </fieldset>
                <Button style={classes.button} onClick={_ => setPressedBtn(1)} type="submit" variant="contained" color="primary">
                    Save
                </Button>


                <Button onClick={_ => setPressedBtn(2)} type="submit" variant="contained" color="primary">
                    Save and add another
                </Button>
            </Form>);
    },
}

export default imageObj;



