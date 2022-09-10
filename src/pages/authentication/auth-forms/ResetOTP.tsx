import React, {useRef, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack,
    TextField
} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {Auth} from "aws-amplify";
import {useNavigate} from "react-router-dom";
import {EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons";

type FormValues = {
    otp: string;
    password: string;
    rePassword: string
};

const ResetOTP = (props: { vMail: any }) => {
    const [open, setOpen] = useState(true);
    console.log(props)
    const [showPassword, setShowPassword] = React.useState(false);

    const router = useNavigate()

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };
    const {register, handleSubmit, formState: {errors}, watch, setError} = useForm<FormValues>();
    const password = useRef({});
    password.current = watch("password", "");


    const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
        console.log('data otp', data.otp)
        console.log('data mail', props.vMail)
        await Auth.forgotPasswordSubmit(
            props.vMail,
            data.otp,
            data.password
        ).then((r) => {
            console.log('data mail rrrrrr', r)
            handleClose()
            router('/login')

        }).catch(error => {
            if (error.code === "CodeMismatchException") {
                setError('otp', {
                    type: 'custom',
                    message: 'OTP Does not match'
                }, {shouldFocus: true})
            }
            console.log('data err', error)
        })

    }

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"OTP"}
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        An OTP has been sent to your email. Please enter it here to verify.
                    </DialogContentText>
                    <Stack sx={{marginTop: 2}}>
                        <InputLabel htmlFor="email-login">Enter OTP here</InputLabel>
                        <TextField fullWidth
                                   placeholder={'xxxxxx'}
                                   {...register('otp', {required: "OTP code is required"})}
                                   error={Boolean(errors.otp)}
                        />
                        <FormHelperText id="outlined-weight-helper-text"
                                        sx={{color: "red"}}>{errors.otp?.message}</FormHelperText>
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

                </DialogContent>
                <DialogActions>
                    <Button variant={'outlined'} type={'submit'} autoFocus>
                        Verify
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default ResetOTP