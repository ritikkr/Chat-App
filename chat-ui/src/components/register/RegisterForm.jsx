import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomSnackBar from "../utils/CustomSnackBar";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useProvideAuth from "../hooks/useProvideAuth";

const RegisterForm = () => {
  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {signup, apiReponseStatus, setApiReponseStatus} = useProvideAuth()
  const onSubmit = (data) => {
    signup(data)
    
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"column"} alignItems="center" spacing={2}>
          <Stack direction={"row"} spacing={2}>
            <TextField
              variant="outlined"
              placeholder="First Name"
              name="firstName"
              {...register("firstName", {
                required: true,
                minLength: 1
              })}
              sx={{ width: 246 }}
              error={errors?.firstName}
              helperText={errors.firstName?.type==="required" && "First Name is required"}
            />
            <TextField
              variant="outlined"
              placeholder="Last Name"
              name="lastName"
              {...register("lastName",{
                required: true,
                minLength: 1
              })}
              sx={{ width: 236 }}
              error={errors?.lastName}
              helperText={errors.lastName?.type==="required" && "Last Nameis required"}
            />
          </Stack>
          <TextField
            variant="outlined"
            placeholder="UserName"
            name="userName"
            {...register("userName",{
              required: true,
              minLength: 1
            })}
            sx={{ width: 500 }}
            error={errors?.userName}
            helperText={errors.userName?.type==="required" && "User Name is required"}
          />
          <TextField
            variant="outlined"
            placeholder="Phone Number"
            name="phoneNumber"
            {...register("phoneNumber", {
              required: true,
              minLength: 10
            })}
            sx={{ width: 500 }}
            error={errors?.phoneNumber}
            helperText={errors.phoneNumber?.type==="required" && "Phone number is required"}
          />
          <TextField
            variant="outlined"
            placeholder="Password"
            name="password"
            {...register("password",{
              required: true,
              minLength: 1
            })}
            sx={{ width: 500 }}
            error={errors?.password}
            helperText={errors.password?.type==="required" && "Password is required"}
          />
          <Button
            variant="contained"
            sx={{ width: 500 }}
            size="large"
            type="submit"
          >
            Register
          </Button>
        </Stack>
      </form>
      {apiReponseStatus.type === "success" && <CustomSnackBar type={apiReponseStatus.type} open={true}  handleCloseSnack={() => setApiReponseStatus({...apiReponseStatus, type: 'none', message: ''})}  message={apiReponseStatus.message}/>}
      {apiReponseStatus.type === "error" && <CustomSnackBar type={apiReponseStatus.type} open={true} handleCloseSnack={() => setApiReponseStatus({...apiReponseStatus, type: 'none', message: ''})}  message={apiReponseStatus.message}/>}
      
    </React.Fragment>
  );
};

export default RegisterForm;
