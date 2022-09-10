import React, {useEffect, useRef, useState} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {SubmitHandler, useForm} from "react-hook-form";
// material-ui
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography, TextField
} from '@mui/material';

// third party
import * as Yup from 'yup';
import {Formik} from 'formik';

// project import
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from '../../../components/@extended/AnimateButton';
import {strengthColor, strengthIndicator} from '../../../utils/password-strength';

// assets
import {EyeOutlined, EyeInvisibleOutlined} from '@ant-design/icons';
import {Auth} from "aws-amplify";
import OTPsubmit from "./OTPsubmit";

// ============================|| FIREBASE - REGISTER ||============================ //

type FormValues = {
    password: string;
    email: string;
    firstName : string;
    lastName : string;
    rePassword: string
};

const AuthRegister = () => {
    const [level, setLevel] = useState({
        color: undefined,
        label: undefined
    });



    const [show, setShow] = useState(false)

    const router = useNavigate()
    const [showPassword, setShowPassword] = React.useState(false);


    const {register, handleSubmit, watch, formState: {errors}, setError, getValues} = useForm<FormValues>();
    const password = useRef({});
    password.current = watch("password", "");
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };


    // const changePassword = () => {
    //     const temp = strengthIndicator(getValues('password'));
    //     setLevel(strengthColor(temp));
    // };


    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };
    const onSubmit: SubmitHandler<FormValues> = async data => {
        console.log(data)
        await Auth.signUp({
            username: data.email,
            password: data.password,
            attributes: {
                email: data.email,
                given_name: data.firstName,
                family_name: data.lastName,
            }
        }).then(() => {
            setShow(true)
            // router('/login')
        }).catch((error) => {
            console.log('sign in :', error.code);
            console.log('sign in :', error.message);
            if (error.code === "UsernameExistsException") {
                setError('email', {
                    type: 'custom',
                    message: 'This email is already registered'
                }, {shouldFocus: true})
            }
            if (error.code === "InvalidPasswordException") {
                setError('password', {
                    type: 'custom',
                    message: 'Password has missing pattern. Use uppercase, lower case, number, combination'
                }, {shouldFocus: true})
            }
            if (error.code === "UserNotConfirmedException") {
                Auth.resendSignUp(data.email).then(() => setShow(true))
            }
        });
    }

    return (
        <>
            {
                show && (<OTPsubmit vMail={getValues('email')}/>)
            }
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                            <TextField
                                id="firstname-login"
                                type="firstname"
                                {...register('firstName' ,{required: {value : true, message : "LastName is required"}})}
                                placeholder="John"
                                fullWidth
                                error={Boolean(errors.lastName)}
                                helperText={errors.lastName?.message}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                            <TextField
                                fullWidth
                                id="lastname-signup"
                                type="lastname"
                                placeholder="Doe"
                                inputProps={{}}
                                {...register('lastName' ,{required: {value : true, message : "LastName is required"}})}
                                error={Boolean(errors.lastName)}
                                helperText={errors.lastName?.message}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                            <TextField
                                id="email-login"
                                type="email"
                                {...register('email' ,{required: {value : true, message : "Email is required"},    pattern: {
                                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                        message: "Email address is not valid"
                                    }})}
                                error={Boolean(errors.email)}
                                helperText={errors.email?.message}
                                placeholder="Enter email address"
                                fullWidth
                                // error={Boolean(touched.email && errors.email)}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="password-signup">Password</InputLabel>
                            <OutlinedInput
                                fullWidth
                                id="password-signup"
                                type={showPassword ? 'text' : 'password'}
                                {...register('password', {
                                    required: {value: true, message: "Password is required"},
                                    minLength: {value: 8, message: "Minimum length of password is 8"},
                                })}
                                error={Boolean(errors.password)}
                                name="password"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                placeholder="******"
                                inputProps={{}}
                            />
                            <FormHelperText id="outlined-weight-helper-text" sx={{color: "red"}}>{errors.password?.message}</FormHelperText>
                        </Stack>

                        <FormControl fullWidth sx={{mt: 2}}>
                            {/*<Grid container spacing={2} alignItems="center">*/}
                            {/*    <Grid item>*/}
                            {/*        <Box sx={{bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px'}}/>*/}
                            {/*    </Grid>*/}
                            {/*    <Grid item>*/}
                            {/*        <Typography variant="subtitle1" fontSize="0.75rem">*/}
                            {/*            {level?.label}*/}
                            {/*        </Typography>*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="password-signup">Password</InputLabel>
                            <OutlinedInput
                                fullWidth
                                id="password-signup"
                                type={showPassword ? 'text' : 'password'}
                                {...register('rePassword', {
                                    required: {value: true, message: "Re Enter Password is required"},
                                    minLength: {value: 8, message: "Minimum length of password is 8"},
                                    validate: value =>
                                        value === password.current || "The passwords do not match"
                                })}
                                error={Boolean(errors.rePassword)}
                                name="rePassword"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                placeholder="******"
                                inputProps={{}}
                            />
                            <FormHelperText id="outlined-weight-helper-text" sx={{color: "red"}}>{errors.rePassword?.message}</FormHelperText>
                        </Stack>
                        <FormControl fullWidth sx={{mt: 2}}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Box sx={{bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px'}}/>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1" fontSize="0.75rem">
                                        {level?.label}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            By Signing up, you agree to our &nbsp;
                            <Link variant="subtitle2" component={RouterLink} to="#">
                                Terms of Service
                            </Link>
                            &nbsp; and &nbsp;
                            <Link variant="subtitle2" component={RouterLink} to="#">
                                Privacy Policy
                            </Link>
                        </Typography>
                    </Grid>
                    {/*{errors.submit && (*/}
                    {/*    <Grid item xs={12}>*/}
                    {/*        <FormHelperText error>{errors.submit}</FormHelperText>*/}
                    {/*    </Grid>*/}
                    {/*)}*/}
                    <Grid item xs={12}>
                        <AnimateButton>
                            <Button
                                disableElevation
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Create Account
                            </Button>
                        </AnimateButton>
                    </Grid>
                    {/*<Grid item xs={12}>*/}
                    {/*    <Divider>*/}
                    {/*        <Typography variant="caption">Sign up with</Typography>*/}
                    {/*    </Divider>*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={12}>*/}
                    {/*    <FirebaseSocial />*/}
                    {/*</Grid>*/}
                </Grid>
            </form>

        </>
    );
};

export default AuthRegister;
