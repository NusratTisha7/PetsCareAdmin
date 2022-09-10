import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormHelperText,
    TextField
} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {Auth} from "aws-amplify";
import {useNavigate} from "react-router-dom";

type FormValues = {
    otp: string;
};

const OTPsubmit = (props: { vMail: any }) => {
    const [open, setOpen] = useState(true);
    console.log(props)

    const router = useNavigate()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {register, handleSubmit, formState: {errors}, setError} = useForm<FormValues>();

    const onSubmit : SubmitHandler<FormValues>  = async (data: any) => {
        console.log(data)
        try {
            await Auth.confirmSignUp(
                props.vMail,
                data.otp
            ).then(() => {
                handleClose()
                router('/login')

            }).catch(error=>{
                if (error.code === "CodeMismatchException") {
                    setError('otp', {
                        type: 'custom',
                        message: 'OTP Does not match'
                    }, {shouldFocus: true})
                }
            })
        }catch (e) {
            console.log(e)
        }
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
                    <TextField sx={{mt: 2}} fullWidth
                               placeholder={'xxxxxx'}
                               {...register('otp', {required: "OTP code is required"})}
                               error={Boolean(errors.otp)}
                    />
                    <FormHelperText id="outlined-weight-helper-text" sx={{color: "red"}}>{errors.otp?.message}</FormHelperText>
                </DialogContent>
                <DialogActions>
                    <Button type={'submit'} autoFocus>
                        Verify
                    </Button>
                </DialogActions>
            </form>


        </Dialog>
    )
}

export default OTPsubmit