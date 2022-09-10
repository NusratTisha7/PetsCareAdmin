import AuthWrapper from "../AuthWrapper";
import {Button, Grid, InputLabel, Stack, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Auth} from "aws-amplify";
import ResetOTP from "./ResetOTP";

type FormValues = {
    email: string;
};

const ForgotPassword = () => {

    const {register, handleSubmit, formState: {errors}, setError, getValues} = useForm<FormValues>();
    const [show, setShow] = useState(false)

    const onSubmit: SubmitHandler<FormValues> = async data => {
        console.log('dvds',data)
        await Auth.forgotPassword(data.email)
            .then(r => {
                console.log(r)
                setShow(true)
            })
            .catch(err => {
            console.log(err)
        })
    }

    return (
        <AuthWrapper>
            {
                show && (<ResetOTP vMail={getValues('email')}/>)
            }
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline"
                           sx={{mb: {xs: -0.5, sm: 0.5}}}>
                        <Typography variant="h3">Forgot Password</Typography>
                        <Typography component={Link} to="/register" variant="body1" sx={{textDecoration: 'none'}}
                                    color="primary">
                            Don&apos;t have an account?
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="email-login">Enter email address here. We will send you a reset
                                email</InputLabel>
                            <TextField
                                id="email-login"
                                type="email"
                                {...register('email', {
                                    required: {value: true, message: "Email is required"}, pattern: {
                                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                        message: "Email address is not valid"
                                    }
                                })}
                                error={Boolean(errors.email)}
                                helperText={errors.email?.message}
                                placeholder="Enter email address"
                                fullWidth
                                // error={Boolean(touched.email && errors.email)}
                            />
                            <Button variant={"outlined"} type={"submit"}>
                                Sent Link
                            </Button>
                        </Stack>
                    </form>

                </Grid>
            </Grid>
        </AuthWrapper>
    )
}

export default ForgotPassword