import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomSnackBar from "../utils/CustomSnackBar";
import useProvideAuth, {useAuth} from "../hooks/useProvideAuth";

const LoginForm = () => {
  const [registerSucess, setRegisterSucess] = useState({
    type: "none",
    message: "",
  });

  const {login, apiReponseStatus, setApiReponseStatus} = useAuth()

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    // reset()
    login(data)
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"column"} alignItems="center" spacing={2}>
          <TextField
            variant="outlined"
            placeholder="UserName"
            sx={{ width: 500 }}
            // value="ritik"
            {...register("userName", {
              required: true,
              minLength: 1
            })}
            error={errors?.userName}
            helperText={errors.userName?.type==="required" && "User Name is required"}
          
          />
          <TextField
            variant="outlined"
            placeholder="Password"
            sx={{ width: 500 }}
            {...register("password",{
              required: true,
              minLength: 1
            })}
            error={errors?.password}
            // value={"123"}
            helperText={errors.password?.type==="required" && "Password is required"}
          
          />
        
            <Button variant="contained" sx={{ width: 500 }} size="large" type="submit">
              Login
            </Button>
          
        </Stack>
      </form>
      {console.log("apiR", apiReponseStatus)}
      {apiReponseStatus.type === "success" && <CustomSnackBar type={apiReponseStatus.type} open={true}  handleCloseSnack={() => setApiReponseStatus({...apiReponseStatus, type: 'none', message: ''})}  message={apiReponseStatus.message}/>}

      {apiReponseStatus.type === "error" && (
        <CustomSnackBar
          type={apiReponseStatus.type}
          open={true}
          handleCloseSnack={() =>
            setApiReponseStatus({ ...apiReponseStatus, type: "none", message: "" })
          }
          message={apiReponseStatus.message}
        />
      )}
    </React.Fragment>
  );
};

export default LoginForm;
