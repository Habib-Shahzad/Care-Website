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


import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';



const createTableData = (data) => {
    const { _id, title, active } = data;
    return { _id, title, active };
}

const startAction = async (obj, selected, setOriginalTableRows, setTableRows) => {
    if (obj.type === 'active') {
        const rows = [];
        let active = true;
        if (obj.value === 'in-active') active = false;

        const response = await fetch(`${api}/activity/set-active`, {
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


const activityObj = {
    apiTable: `${api}/activity/table-data`,
    deleteApi: `${api}/activity/delete`,
    createTableData: createTableData,
    headCells: [
        { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
        { id: 'active', numeric: false, disablePadding: false, label: 'Active' },
    ],
    ManyChild: '',
    checkboxSelection: '_id',
    Delete: function (items) { },
    editAllowed: true,
    deleteAllowed: true,
    addAllowed: true,
    modelName: 'Activity',
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


        const activityEditObj = {
            title: '',
            content: '',
            active: true,
            imageList: [],
            activityDate: null,
        };

        const [editObj, setEditObj] = useState(activityEditObj);

        const [activitysArray, setactivitysArray] = useState([]);
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
                    const response = await fetch(`${api}/activity/table-data`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-store'
                        },
                    });
                    const content = await response.json();
                    const obj = content.data.find(o => o._id === queryID);
                    setEditObj(obj != null ? obj : activityEditObj);
                    setactivitysArray(content.data);
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
                const response = await fetch(`${api}/activity/add`, {
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
                setactivitysArray([...activitysArray, content.data]);
            } else {
                const response = await fetch(`${api}/activity/update`, {
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
                const objArray = [...activitysArray];
                const index = objArray.findIndex(obj => obj._id === queryID);
                objArray[index] = content.data;
                queryID = '';
                setactivitysArray(objArray);
            }
            reset();
            if (pressedBtn === 1) {
                navigate('/admin/activity');
            }
            else {
                setEditObj(null);
                setLoading(false);
                queryID = '';
                navigate('/admin/activity/add');
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
                                    <FormHelperText id="title-helper">Enter activity Title</FormHelperText>
                                }
                                <FormHelperText error={errors.title ? true : false} id="name-helper">{errors.title && <>{errors.title.message}</>}</FormHelperText>

                            </FormControl>
                        </Form.Group>


                        <Form.Group as={Col} md={6} controlId="activityDate">
                            <FormControl style={classes.formControl}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Controller
                                        render={(props) => (
                                            <MobileDatePicker
                                                error={errors.activityDate ? true : false}
                                                label="Activity Date"
                                                inputFormat="dd/MM/yyyy"
                                                defaultValue={editObj.activityDate}
                                                value={props.field.value}
                                                onChange={(data) => { props.field.onChange(data); }}
                                                renderInput={(params) => <TextField
                                                    color="secondary"
                                                    autoComplete="none"
                                                    aria-describedby="activityDate-helper"
                                                    {...params}
                                                />}
                                            />
                                        )}
                                        rules={{ required: "Activity Date is required!" }}
                                        onChange={([, data]) => data}
                                        defaultValue={editObj.activityDate}
                                        name={"activityDate"}
                                        control={control}
                                    />
                                </LocalizationProvider>
                                {!errors.activityDate &&
                                    <FormHelperText id="activityDate-helper">Enter Activity Date</FormHelperText>
                                }
                                <FormHelperText error={errors.activityDate ? true : false} id="percentOff-helper">{errors.activityDate && <>{errors.activityDate.message}</>}</FormHelperText>

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
                                    <FormHelperText id="content-helper">Type the content of the activity</FormHelperText>
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

export default activityObj;



