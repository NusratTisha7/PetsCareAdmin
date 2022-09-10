import {SubmitHandler, useForm} from "react-hook-form";
import React, {useEffect, useRef, useState} from "react";
import {Auth} from "aws-amplify";
import AuthWrapper from "../AuthWrapper";
import ResetOTP from "./ResetOTP";
import {
    Button,
    FormHelperText,
    Grid, IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons";
import {current} from "@reduxjs/toolkit";

type FormValues = {
    oldPassword: string;
    password: string;
    rePassword: string;
};

const ResetPassword = () => {
    const {register, handleSubmit, formState: {errors}, watch, getValues} = useForm<FormValues>();
    const [show, setShow] = useState(false)
    const password = useRef({});
    const [user, setUser] = useState({
        username: undefined
    })

    console.log(user)

    const route = useNavigate()
    
    useEffect(()=> {
        Auth.currentUserInfo().then(r=>setUser(r))
    },[])
    password.current = watch("password", "");
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };

    const onSubmit: SubmitHandler<FormValues> = async data => {
        console.log('dvds',data)
        // await Auth.changePassword(user.username, data.oldPassword, data.password)
        //     .then(()=> route('/login'))
        //     .catch((e)=>console.log('asfav',e))

        Auth.currentAuthenticatedUser()
            .then(user => {
                console.log('useradscv', user)
                Auth.changePassword(user, data.oldPassword, data.password).then(()=>  route('/login'));
            })
            .catch(err => console.log("useradscv err",err));

    }

    return (
        <AuthWrapper>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline"
                           sx={{mb: {xs: -0.5, sm: 0.5}}}>
                        <Typography variant="h3">Reset Password</Typography>
                        <Typography component={Link} to="/register" variant="body1" sx={{textDecoration: 'none'}}
                                    color="primary">
                            Don&apos;t have an account?
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack sx={{marginTop: 2}}>
                            <InputLabel htmlFor="email-login">Old Password</InputLabel>
                            <TextField fullWidth
                                       placeholder={'xxxxxx'}
                                       {...register('oldPassword', {required: "Old password is required"})}
                                       error={Boolean(errors.oldPassword)}
                            />
                            <FormHelperText id="outlined-weight-helper-text"
                                            sx={{color: "red"}}>{errors.oldPassword?.message}</FormHelperText>
                            <InputLabel sx={{mt: 2}} htmlFor="email-login">Enter new Password</InputLabel>
                            <OutlinedInput
                                fullWidth
                                // error={Boolean(touched.password && errors.password)}
                                {...register('password', {
                                    required: {value: true, message: "Password is required"},
                                    minLength: {value: 8, message: "Minimum length of password is 8"}
                                })}
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
                            <FormHelperText id="outlined-weight-helper-text"
                                            sx={{color: "red"}}>{errors.password?.message}</FormHelperText>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="password-signup">Re-enter new Password</InputLabel>
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
                                                {showPassword ? <EyeOutlined/> : <EyeInvisibleOutlined/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    placeholder="******"
                                    inputProps={{}}
                                />
                                <FormHelperText id="outlined-weight-helper-text"
                                                sx={{color: "red"}}>{errors.rePassword?.message}</FormHelperText>

                            </Stack>

                        </Stack>
                        <Button variant={"outlined"} type={"submit"}>
                            Reset
                        </Button>
                    </form>

                </Grid>
            </Grid>
        </AuthWrapper>
    )
}
export default ResetPassword