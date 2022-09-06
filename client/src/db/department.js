import {
    FormControl,
    Input,
    InputLabel,
    FormHelperText,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    IconButton
} from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import React, { useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Autocomplete from '@mui/material/Autocomplete';

const createTableData = (data) => {
    const { _id, name, active } = data;
    return { _id, name, active };
}

const startAction = async (obj, selected, setOriginalTableRows, setTableRows) => {
    if (obj.type === 'active') {
        const rows = [];
        let active = true;
        if (obj.value === 'in-active') active = false;

        const response = await fetch(`${api}/department/set-active`, {
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


const departmentObj = {
    apiTable: `${api}/department/table-data`,
    deleteApi: `${api}/department/delete`,
    createTableData: createTableData,
    headCells: [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'active', numeric: false, disablePadding: false, label: 'Active' },
    ],
    ManyChild: '',
    checkboxSelection: '_id',
    Delete: function (items) { },
    editAllowed: true,
    deleteAllowed: true,
    addAllowed: true,
    modelName: 'Department',
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


        const departmentEditObj = {
            name: '',
            active: true,
            members: [],
        };

        const [editObj, setEditObj] = useState(departmentEditObj);

        const [departmentsArray, setdepartmentsArray] = useState([]);
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
                    const response = await fetch(`${api}/department/table-data-auto`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-store'
                        },
                    });
                    const content = await response.json();
                    const obj = content.data.find(o => o._id === queryID);
                    setEditObj(obj != null ? obj : departmentEditObj);

                    setdepartmentsArray(content.data);
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
        } = useForm(
                {
                    defaultValues: {
                        members: editObj.members,
                    }
                }
        );

        useEffect(()=> {
            if (editObj) {
                reset({
                    name: editObj.name,
                    active: editObj.active,
                    members: editObj.members,
                });
            }
        }, [editObj, reset])

        const { fields: memberFields, append: membersAppend, remove: membersRemove } = useFieldArray({
            control,
            name: "members"
        });

        const addMembersRow = () => {
            membersAppend({
                name: '',
                role: '',
                image: '',
            });
        }


        const onSubmit = async data => {

            setLoading(true);

            if (queryID === '') {
                const response = await fetch(`${api}/department/add`, {
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
                setdepartmentsArray([...departmentsArray, content.data]);
            } else {
                const response = await fetch(`${api}/department/update`, {
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
                const objArray = [...departmentsArray];
                const index = objArray.findIndex(obj => obj._id === queryID);
                objArray[index] = content.data;
                queryID = '';
                setdepartmentsArray(objArray);
            }
            reset();
            if (pressedBtn === 1) {
                navigate('/admin/department');
            }
            else {
                setEditObj(null);
                setLoading(false);
                queryID = '';
                navigate('/admin/department/add');
            }
        };



        if (loading) return <div></div>

        return (

            <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <fieldset>
                    <legend>Details</legend>
                    <Row style={classes.rowGap}>
                        <Form.Group as={Col} md={6} controlId="name">
                            <FormControl style={classes.formControl}>
                                <InputLabel error={errors.name ? true : false} color="secondary" htmlFor="name">name</InputLabel>
                                <Input
                                    defaultValue={editObj.name}
                                    {...register("name", {
                                        required: "name is required!",
                                    })}
                                    color="secondary"
                                    autoComplete="none"
                                    type="text"
                                    error={errors.name ? true : false}
                                    aria-describedby="name-helper"
                                />
                                {!errors.name &&
                                    <FormHelperText id="name-helper">Enter department name</FormHelperText>
                                }
                                <FormHelperText error={errors.name ? true : false} id="name-helper">{errors.name && <>{errors.name.message}</>}</FormHelperText>

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


                    <fieldset>
                        <legend>List of Members</legend>
                        <IconButton onClick={() => { addMembersRow(); }} variant="contained" color="secondary" aria-label="Add">
                            <AddCircleIcon fontSize="large" />
                        </IconButton>
                        <IconButton onClick={() => { membersRemove(-1); }} variant="contained" color="secondary" aria-label="Remove">
                            <RemoveCircleIcon fontSize="large" />
                        </IconButton>

                        <hr />
                        {
                            memberFields.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <Row style={classes.rowGap}>
                                            <Form.Group as={Col} md={5} controlId="name">

                                                <FormControl style={classes.formControl}>
                                                    <InputLabel error={errors[`members[${index}].name`] ? true : false} color="secondary" htmlFor="code">Member Name</InputLabel>
                                                    <Input
                                                        {...register(`members[${index}].name`, {
                                                            required: "name is required!",
                                                        })}
                                                        color="secondary"
                                                        autoComplete="none"
                                                        type="text"
                                                        error={errors[`members[${index}].name`] ? true : false}
                                                        aria-describedby="code-helper"
                                                    />
                                                    {
                                                        !errors[`members[${index}].name`] &&
                                                        <FormHelperText id="name-helper">Enter Member Name</FormHelperText>
                                                    }
                                                    <FormHelperText error={errors[`members[${index}].name`] ? true : false} id="name-helper">{errors[`members[${index}].name`] && <>{errors[`members[${index}].name`].message}</>}</FormHelperText>

                                                </FormControl>
                                            </Form.Group>


                                            <Form.Group as={Col} md={5} controlId="role">

                                                <FormControl style={classes.formControl}>
                                                    <InputLabel error={errors[`members[${index}].role`] ? true : false} color="secondary" htmlFor="code">Member Role</InputLabel>
                                                    <Input
                                                        {...register(`members[${index}].role`, {
                                                            required: "role is required!",
                                                        })}
                                                        color="secondary"
                                                        autoComplete="none"
                                                        type="text"
                                                        error={errors[`members[${index}].role`] ? true : false}
                                                        aria-describedby="code-helper"
                                                    />
                                                    {
                                                        !errors[`members[${index}].role`] &&
                                                        <FormHelperText id="role-helper">Enter Member role</FormHelperText>
                                                    }
                                                    <FormHelperText error={errors[`members[${index}].role`] ? true : false} id="role-helper">{errors[`members[${index}].role`] && <>{errors[`members[${index}].role`].message}</>}</FormHelperText>

                                                </FormControl>
                                            </Form.Group>

                                        </Row>

                                        <Row style={classes.rowGap}>

                                            <Form.Group as={Col} md={6} controlId="image">
                                                <FormControl style={classes.formControl}>
                                                    <Controller
                                                        render={(props) => (
                                                            <Autocomplete
                                                                defaultValue={editObj.members[index].image}
                                                                isOptionEqualToValue={(option, value) => option._id === value._id}
                                                                id="combo-box-image"
                                                                color="secondary"
                                                                options={imagesArray}
                                                                getOptionLabel={(option) => option.name}
                                                                onChange={(e, data) => { props.field.onChange(data?._id); }}
                                                                renderInput={(params) =>
                                                                    <TextField
                                                                        error={errors[`members[${index}].image`] ? true : false}
                                                                        color="secondary"
                                                                        {...params}
                                                                        label="Image Name"
                                                                    />
                                                                }
                                                            />
                                                        )}
                                                        rules={{ required: "Select an image" }}
                                                        onChange={([, data]) => data}
                                                        defaultValue={undefined}
                                                        name={`members[${index}].image`}
                                                        control={control}
                                                    />
                                                    {!errors[`members[${index}].image`] &&
                                                        <FormHelperText id="name-helper">Select image</FormHelperText>
                                                    }
                                                    <FormHelperText error={errors[`members[${index}].image`] ? true : false} id="name-helper">{errors[`members[${index}].image`] && <>{errors[`members[${index}].image`].message}</>}</FormHelperText>

                                                </FormControl>
                                            </Form.Group>
                                        </Row>

                             
                                        <hr />
                                    </div>
                                );
                            })

                        }
                    </fieldset>


            

           


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

export default departmentObj;



