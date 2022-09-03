import React, { useState, useEffect } from 'react';
import api from '../api';
import TreeItem from '@mui/lab/TreeItem';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Col, Form, Row } from 'react-bootstrap';
import { FormControl, Input, FormControlLabel, Checkbox, InputLabel, FormHelperText, Button, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const createTableData = (data) => {
    const { _id, title } = data;
    return { _id, title };
}

const startAction = async (obj, selected, setOriginalTableRows, setTableRows) => {

}

const activityObj = {
    apiTable: `${api}/activity/table-data`,
    deleteApi: `${api}/activity/delete`,
    createTableData: createTableData,
    headCells: [
        { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
    ],
    ManyChild: '',
    checkboxSelection: '_id',
    Delete: function (items) {
        let html = [];
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            html.push(
                <TreeItem key={i} nodeId={`${element._id}`} label={element.name} />
            )
        }
        return html;
    },
    editAllowed: false,
    deleteAllowed: true,
    addAllowed: true,
    modelName: 'Activity',
    ordering: 'title',
    searchField: 'title',
    rightAllign: [],
    type: 'enhanced',
    startAction: startAction,
    actionOptions: [
        { label: '', value: '', type: '' },
    ],

    Form: function (id, classes) {

        let navigate = useNavigate();

        let queryID = '';
        if (id != null) queryID = id;

        const [usersArray, setUsersArray] = useState([]);
        const [pressedBtn, setPressedBtn] = useState(null);
        const [loading, setLoading] = useState(true);

        const [errorMessage, setErrorMessage] = useState("");

        useEffect(() => {
            (
                async () => {
                    const response = await fetch(`${api}/activity/table-data`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-store'
                        },
                        credentials: 'include',
                        withCredentials: true,
                    });
                    const content = await response.json();
                    setUsersArray(content.data);
                    setLoading(false);
                })();
        }, [queryID]);

        const { register, handleSubmit, formState: { errors }, reset, watch, control } = useForm();

        const onSubmit = async (data) => {
            setLoading(true);

            let success = false;

            if (queryID === '') {
                const response = await fetch(`${api}/user/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-store'
                    },
                    credentials: 'include',
                    withCredentials: true,
                    body: JSON.stringify({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        password: data.password,
                        active: data.active,
                        admin: data.admin,
                    }),
                });
                const content = await response.json();

                if (content.success) {
                    setUsersArray([...usersArray, content.data]);
                    success = true;
                }

                else {
                    setErrorMessage(content.error);
                    setLoading(false);
                }

            }

            if (success) {

                reset();
                if (pressedBtn === 1) {
                    if (queryID === '') {
                        navigate({
                            pathname: `/admin/user`,
                            state: { data: 'added', name: data.firstName }
                        });
                    }
                }
                else {
                    setLoading(false);
                    navigate('/admin/user/add');
                }
            }
        };



        const [showPassword, setShowPassword] = useState(false);
        const [showConfirmPassword, setShowConfirmPassword] = useState(false);


        const handleClickShowPassword = () => {
            setShowPassword(!showPassword);
        };

        const handleClickShowConfirmPassword = () => {
            setShowConfirmPassword(!showConfirmPassword);
        }

        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };


        if (loading) return <div></div>


        return (
            <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <fieldset>
                    <legend>Details</legend>
                    <Row sx={classes.rowGap}>
                        <Form.Group as={Col} md={6} controlId="firstName">
                            <FormControl sx={classes.formControl}>
                                <InputLabel error={errors.firstName ? true : false} color="secondary" htmlFor="name">First Name</InputLabel>
                                <Input
                                    {...register("firstName", {
                                        required: "First Name is required!",
                                    })}
                                    color="secondary"
                                    autoComplete="none"
                                    type="text"
                                    error={errors.firstName ? true : false}
                                    aria-describedby="name-helper"
                                />
                                {!errors.firstName &&
                                    <FormHelperText id="name-helper">Enter First Name Ex. John</FormHelperText>
                                }
                                <FormHelperText error={errors.firstName ? true : false} id="name-helper">{errors.firstName && <>{errors.firstName.message}</>}</FormHelperText>

                            </FormControl>
                        </Form.Group>


                        <Form.Group as={Col} md={6} controlId="lastName">
                            <FormControl sx={classes.formControl}>
                                <InputLabel error={errors.lastName ? true : false} color="secondary" htmlFor="name">Last Name</InputLabel>
                                <Input
                                    {...register("lastName", {
                                        required: "Last Name is required!",
                                    })}
                                    color="secondary"
                                    autoComplete="none"
                                    type="text"
                                    error={errors.lastName ? true : false}
                                    aria-describedby="name-helper"
                                />
                                {!errors.lastName &&
                                    <FormHelperText id="name-helper">Enter First Name Ex. Smith</FormHelperText>
                                }
                                <FormHelperText error={errors.lastName ? true : false} id="name-helper">{errors.lastName && <>{errors.lastName.message}</>}</FormHelperText>

                            </FormControl>
                        </Form.Group>

                    </Row>

                    <Row sx={classes.rowGap}>

                        <Form.Group as={Col} md={6} controlId="email">
                            <FormControl sx={classes.formControl}>
                                <InputLabel error={errors.email ? true : false} color="secondary" htmlFor="name">Email</InputLabel>
                                <Input
                                    {...register("email", {
                                        required: "Email is required!",
                                    })}
                                    color="secondary"
                                    autoComplete="none"
                                    type="text"
                                    error={errors.email ? true : false}
                                    aria-describedby="name-helper"
                                />
                                {!errors.email &&
                                    <FormHelperText id="name-helper">Enter Email Ex. john@example.com</FormHelperText>
                                }
                                <FormHelperText error={errors.email ? true : false} id="name-helper">{errors.email && <>{errors.email.message}</>}</FormHelperText>

                            </FormControl>
                        </Form.Group>

                    </Row>

                    <Row sx={classes.rowGap}>

                        <Form.Group as={Col} md={6} controlId="password">
                            <FormControl sx={classes.formControl}>
                                <InputLabel error={errors.password ? true : false} color="secondary" htmlFor="name">Password</InputLabel>
                                <Input
                                    {...register("password", {
                                        required: "Password is required!",
                                    })}
                                    color="secondary"
                                    autoComplete="none"
                                    type={showPassword ? 'text' : 'password'}
                                    error={errors.password ? true : false}
                                    aria-describedby="name-helper"

                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {!errors.password &&
                                    <FormHelperText id="name-helper">Enter Password</FormHelperText>
                                }
                                <FormHelperText error={errors.password ? true : false} id="name-helper">{errors.password && <>{errors.password.message}</>}</FormHelperText>

                            </FormControl>
                        </Form.Group>


                        <Form.Group as={Col} md={6} controlId="confirmPassword">
                            <FormControl sx={classes.formControl}>
                                <InputLabel error={errors.confirmPassword ? true : false} color="secondary" htmlFor="name">Confirm Password</InputLabel>
                                <Input
                                    {...register("confirmPassword", {
                                        required: "Confirm Password is required!",
                                        validate: (value) => value === watch("password") || "Passwords do not match"
                                    })}
                                    color="secondary"
                                    autoComplete="none"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    error={errors.confirmPassword ? true : false}
                                    aria-describedby="name-helper"

                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }

                                />
                                {!errors.confirmPassword &&
                                    <FormHelperText id="name-helper">Confirm the password</FormHelperText>
                                }
                                <FormHelperText error={errors.confirmPassword ? true : false} id="name-helper">{errors.confirmPassword && <>{errors.confirmPassword.message}</>}</FormHelperText>

                            </FormControl>
                        </Form.Group>

                    </Row>


                    <Row sx={classes.rowGap}>
                        <Form.Group as={Col} md={6} controlId="active">

                            <FormControlLabel
                                control={
                                    <Controller
                                        name={"active"}
                                        defaultValue={true}
                                        control={control}
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


                    <Row sx={classes.rowGap}>
                        <Form.Group as={Col} md={6} controlId="admin">

                            <FormControlLabel
                                control={
                                    <Controller
                                        name={"admin"}
                                        defaultValue={false}
                                        control={control}
                                        render={(props) => (
                                            <Checkbox
                                                checked={props.field.value}
                                                onChange={(e) => props.field.onChange(e.target.checked)}
                                            />
                                        )}
                                    />
                                }
                                label={"Admin"}
                            />
                        </Form.Group>
                    </Row>

                    {
                        errorMessage.length > 0 && (
                            <>
                                <FormHelperText style={{ margin: '1rem' }} error={errorMessage.length > 0 ? true : false} >{errorMessage.length > 0 && <>{errorMessage}</>}</FormHelperText>
                            </>
                        )
                    }

                </fieldset>
                <Button sx={classes.button} onClick={_ => setPressedBtn(1)} type="submit" variant="contained" color="primary">
                    Save
                </Button>

                <Button onClick={_ => setPressedBtn(2)} type="submit" variant="contained" color="primary">
                    Save and add another
                </Button>
            </Form>);
    },
}

export default activityObj;