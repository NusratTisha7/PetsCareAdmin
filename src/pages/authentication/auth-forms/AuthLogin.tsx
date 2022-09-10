import React, {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Auth} from "aws-amplify";
import { useNavigate } from "react-router-dom";

// material-ui
import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
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


// project import
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from '../../../components/@extended/AnimateButton';

// assets
import {EyeOutlined, EyeInvisibleOutlined} from '@ant-design/icons';
import {SubmitHandler, useForm} from "react-hook-form";
import {dispatch} from "../../../store";
import login from "../Login";
import OTPsubmit from "./OTPsubmit";

type FormValues = {
    password: string;
    email: string;
};

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
    const [checked, setChecked] = React.useState(false);

    const router = useNavigate()
    const [showPassword, setShowPassword] = React.useState(false);

    const [show, setShow] = useState(false)

    const {register, handleSubmit, formState: {errors}, setError, getValues} = useForm<FormValues>();
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };
    const onSubmit: SubmitHandler<FormValues> = async data => {
        await Auth.signIn({
            username: data.email,
            password: data.password,
        }).then(() => {
            router('/dashboard')
        }).catch((error) => {
            console.log('sign in :', error.code);
            console.log('sign in :', error.message);
            if (error.code === "UserNotConfirmedException") {
                Auth.resendSignUp(data.email).then(()=> setShow(true))
            }
            if (error.code === "UserNotFoundException") {
                setError('email', {
                    type: 'custom',
                    message: error.message
                }, {shouldFocus: true})
            }
            if (error.code === "NotAuthorizedException") {
                setError('email', {
                    type: 'custom',
                    message: error.message
                }, {shouldFocus: true})
                setError('password', {
                    type: 'custom',
                    message: error.message
                }, {shouldFocus: true})
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
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="email-login">Email Address</InputLabel>
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
                            {/*{touched.email && errors.email && (*/}
                            {/*    <FormHelperText error id="standard-weight-helper-text-email-login">*/}
                            {/*        {errors.email}*/}
                            {/*    </FormHelperText>*/}
                            {/*)}*/}
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="password-login">Password</InputLabel>
                            <OutlinedInput
                                fullWidth
                                // error={Boolean(touched.password && errors.password)}
                                {...register('password', {required: {value: true, message: "Password is required"}, minLength : {value: 8, message: "Minimum length of password is 8"}})}
                                id="-password-login"
                                type={showPassword ? 'text' : 'password'}
                                error={Boolean(errors.password)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <EyeOutlined/> : <EyeInvisibleOutlined/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                placeholder="Enter password"
                            />
                            <FormHelperText id="outlined-weight-helper-text" sx={{color: "red"}}>{errors.password?.message}</FormHelperText>
                            {/*{touched.password && errors.password && (*/}
                            {/*    <FormHelperText error id="standard-weight-helper-text-password-login">*/}
                            {/*        {errors.password}*/}
                            {/*    </FormHelperText>*/}
                            {/*)}*/}
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sx={{mt: -1}}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                        size="small"
                                    />
                                }
                                label={<Typography variant="h6">Keep me sign in</Typography>}
                            />
                            <Link variant="h6" component={RouterLink} to="/forgot-password" color="text.primary">
                                Forgot Password?
                            </Link>
                        </Stack>
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
                                // disabled={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Login
                            </Button>
                        </AnimateButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider>
                            {/*<Typography variant="caption"> Login with</Typography>*/}
                        </Divider>
                    </Grid>
                    <Grid item xs={12}>
                        {/*<FirebaseSocial/>*/}
                    </Grid>
                </Grid>
            </form>

        </>
    );
};

export default AuthLogin;
