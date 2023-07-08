import {
    FormControl,
    Input,
    InputLabel,
    FormHelperText,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
} from '@mui/material';


import React, { useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useForm, Controller } from "react-hook-form";
import Autocomplete from '@mui/material/Autocomplete';



export const BlogTypeToLabel = {
    PATIENT_WELFARE: 'Patient Welfare',
    COMMUNITY_OUTREACH: 'Community Outreach',
    RESEARCH_DEVELOPMENT: 'Research & Development',
}

export const BlogTypes = [
    {
        key: 'PATIENT_WELFARE',
        label: 'Patient Welfare',
    },
    {
        key: 'COMMUNITY_OUTREACH',
        label: 'Community Outreach',
    },
    {
        key: 'RESEARCH_DEVELOPMENT',
        label: 'Research & Development',
    },
]


const createTableData = (data) => {
    const { _id, title, blogType, active } = data;

    const typeLabel = BlogTypeToLabel[blogType] ?? '-';

    return { _id, title, blogType: typeLabel, active };
}

const startAction = async (obj, selected, setOriginalTableRows, setTableRows) => {
    if (obj.type === 'active') {
        const rows = [];
        let active = true;
        if (obj.value === 'in-active') active = false;

        const response = await fetch(`${api}/blog/set-active`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            withCredentials: true,
            body: JSON.stringify({ active: active, selected: selected })
        });
        const content = await response.json();
        content.data.forEach(element => {
            rows.push(createTableData(element));
        });
        setTableRows(rows);
        setOriginalTableRows(rows);
    }
}


const blogObj = {
    apiTable: `${api}/blog/table-data`,
    deleteApi: `${api}/blog/delete`,
    createTableData: createTableData,
    headCells: [
        { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
        { id: 'blog-type', numeric: false, disablePadding: true, label: 'Blog Type' },
        { id: 'active', numeric: false, disablePadding: false, label: 'Active' },
    ],
    ManyChild: '',
    checkboxSelection: '_id',
    Delete: function (items) { },
    editAllowed: true,
    deleteAllowed: true,
    addAllowed: true,
    modelName: 'Blog',
    ordering: 'name',
    searchField: 'name',
    rightAllign: [],
    type: 'enhanced',
    startAction: startAction,
    actionOptions: [
        { label: '', value: '', type: '' },
        { label: 'Set active', value: 'active', type: 'active' },
        { label: 'Set in-active', value: 'in-active', type: 'active' }
    ],
    Form: function (id, classes) {
        let navigate = useNavigate();

        let queryID = '';
        if (id != null) queryID = id;


        const blogEditObj = {
            title: '',
            content: '',
            blogType: '',
            active: true,
            imageList: [],
        };

        const [editObj, setEditObj] = useState(blogEditObj);

        const [blogsArray, setBlogsArray] = useState([]);
        const [pressedBtn, setPressedBtn] = useState(null);
        const [loading, setLoading] = useState(true);

        const [imagesArray, setImagesArray] = useState([]);


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
                })();
        }, []);



        useEffect(() => {
            (
                async () => {
                    const response = await fetch(`${api}/blog/table-data`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-store'
                        },
                    });
                    const content = await response.json();
                    const obj = content.data.find(o => o._id === queryID);
                    setEditObj(obj != null ? obj : blogEditObj);
                    setBlogsArray(content.data);
                    setLoading(false);
                })();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [queryID]);

        const {
            control,
            register,
            handleSubmit,
            formState: { errors },
            reset,
            getValues
        } = useForm();


        const onSubmit = async data => {

            data.imageList = data.imageList.map(imageObj => imageObj._id);

            setLoading(true);

            if (queryID === '') {
                const response = await fetch(`${api}/blog/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-store'
                    },
                    credentials: 'include',
                    withCredentials: true,
                    body: JSON.stringify(data),
                });
                const content = await response.json();
                setBlogsArray([...blogsArray, content.data]);
            } else {
                const response = await fetch(`${api}/blog/update`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-store'
                    },
                    credentials: 'include',
                    withCredentials: true,
                    body: JSON.stringify({ _id: queryID, ...data }),
                });
                const content = await response.json();
                const objArray = [...blogsArray];
                const index = objArray.findIndex(obj => obj._id === queryID);
                objArray[index] = content.data;
                queryID = '';
                setBlogsArray(objArray);
            }
            reset();
            if (pressedBtn === 1) {
                navigate('/admin/blog');
            }
            else {
                setEditObj(null);
                setLoading(false);
                queryID = '';
                navigate('/admin/blog/add');
            }
        };


        const [selectedImages, setSelectedImages] = useState(null);

        useEffect(() => {
            if (editObj)
                setSelectedImages(editObj.imageList);
            reset({ ...getValues(), imageList: editObj.imageList });
        }, [editObj, getValues, reset]);

        if (loading) return <div></div>

        return (

            <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <fieldset>
                    <legend>Details</legend>
                    <Row style={classes.rowGap}>
                        <Form.Group as={Col} md={6} controlId="title">
                            <FormControl style={classes.formControl}>
                                <InputLabel error={errors.title ? true : false} color="secondary" htmlFor="title">Title</InputLabel>
                                <Input
                                    defaultValue={editObj.title}
                                    {...register("title", {
                                        required: "Title is required!",
                                    })}
                                    color="secondary"
                                    autoComplete="none"
                                    type="text"
                                    error={errors.title ? true : false}
                                    aria-describedby="title-helper"
                                />
                                {!errors.title &&
                                    <FormHelperText id="title-helper">Enter Blog Title</FormHelperText>
                                }
                                <FormHelperText error={errors.title ? true : false} id="name-helper">{errors.title && <>{errors.title.message}</>}</FormHelperText>

                            </FormControl>
                        </Form.Group>


                        <Form.Group as={Col} md={6} controlId="blogType">
                            <FormControl style={classes.formControl}>
                                <Controller
                                    render={(props) => (
                                        <Autocomplete
                                            defaultValue={editObj ?
                                                {
                                                    key: editObj.blogType,
                                                    label: BlogTypeToLabel[editObj.blogType] ?? ''

                                                }
                                                : undefined}
                                            isOptionEqualToValue={(option, value) => {
                                                return option.key === value
                                            }}
                                            id="select-blogType"
                                            color="secondary"
                                            options={BlogTypes}
                                            getOptionLabel={(option) => {

                                                console.log(option)

                                                return option.label
                                            }}
                                            onChange={(e, data) => {
                                                props.field.onChange(data.key);
                                            }}
                                            renderInput={(params) =>
                                                <TextField
                                                    error={errors.blogType ? true : false}
                                                    color="secondary"
                                                    {...params}
                                                    label="Blog Type"
                                                />
                                            }
                                        />
                                    )}
                                    rules={{ required: "Select a blog type!" }}
                                    onChange={([, data]) => data}
                                    defaultValue={undefined}
                                    name={"blogType"}
                                    control={control}
                                />
                                {!errors.blogType &&
                                    <FormHelperText id="name-helper">Select Blog Type</FormHelperText>
                                }
                                <FormHelperText error={errors.blogType ? true : false} id="name-helper">{errors.blogType && <>{errors.blogType.message}</>}</FormHelperText>

                            </FormControl>
                        </Form.Group>
                    </Row>


                    <Row style={classes.rowGap}>
                        <Form.Group controlId="content">
                            <FormControl style={classes.formControl}>
                                <TextField
                                    defaultValue={editObj.content}
                                    {...register("content", {
                                        required: "Content is required!",
                                    })}
                                    error={errors.content ? true : false}
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
                                <FormHelperText error={errors.content ? true : false} id="content-helper">{errors.content && <>{errors.content.message}</>}</FormHelperText>

                            </FormControl>
                        </Form.Group>
                    </Row>

                    <Row style={classes.rowGap}>
                        <Form.Group as={Col} md={6} controlId="active">

                            <FormControlLabel
                                control={
                                    <Controller
                                        name={"active"}
                                        control={control}
                                        defaultValue={editObj.active}
                                        render={(props) => (
                                            <Checkbox

                                                checked={props.field.value}
                                                onChange={(e) => props.field.onChange(e.target.checked)}
                                            />
                                        )}
                                    />
                                }
                                label={"Active"}
                            />

                        </Form.Group>
                    </Row>



                    <Row style={classes.rowGap}>
                        <Form.Group as={Col} md={6} controlId="image">
                            <FormControl style={classes.formControl}>
                                <Controller
                                    render={(props) => (
                                        <Autocomplete
                                            multiple
                                            defaultValue={editObj ? editObj.imageList : undefined}
                                            isOptionEqualToValue={(option, value) => option._id === value._id}
                                            id="combo-box-imageList"
                                            color="secondary"
                                            options={imagesArray}
                                            getOptionLabel={(option) => option.name}
                                            onChange={(e, data) => { setSelectedImages(data); props.field.onChange(data); }}
                                            renderInput={(params) =>
                                                <TextField
                                                    error={errors.imageList ? true : false}
                                                    color="secondary"
                                                    {...params}
                                                    label="Image Name"
                                                />
                                            }
                                        />
                                    )}
                                    rules={{ required: "Select atleast one image!" }}
                                    onChange={([, data]) => data}
                                    defaultValue={undefined}
                                    name={"imageList"}
                                    control={control}
                                />
                                {!errors.imageList &&
                                    <FormHelperText id="name-helper">Select images</FormHelperText>
                                }
                                <FormHelperText error={errors.imageList ? true : false} id="name-helper">{errors.imageList && <>{errors.imageList.message}</>}</FormHelperText>

                            </FormControl>
                        </Form.Group>

                    </Row>

                    {
                        selectedImages && selectedImages.map((image, index) =>
                            <div key={index} style={{ width: '50%' }}>
                                <Row style={classes.rowGap}>
                                    <img src={image?.image?.filePath} alt='preview' />
                                </Row>
                            </div>
                        )
                    }


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

export default blogObj;



