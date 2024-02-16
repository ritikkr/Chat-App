import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import homeimage from "../../assets/homeimage.svg"
import login from "../../assets/login.svg"

import Header from '../home/Header'
import RegisterForm from './RegisterForm'
const Register = () => {
  return (
    <React.Fragment>
        <Header />
        <Box sx={{display: 'flex', py: 8,}} flexDirection={"row"} justifyContent={"space-between"} alignContent={"center"} alignItems={"center"}>
        <Box sx={{display: 'flex', width: '50%', p: 4}} flexDirection={"row"} justifyContent={"center"} alignContent={"center"} alignItems={"center"}>
          <img src={login} height={600} width={600}/>
          </Box>
          <Box sx={{display: 'flex', width: '50%', p: 4}} flexDirection={"column"} justifyContent={"center"} alignContent={"center"} alignItems={"center"}>
                <Box sx={{width: '100%', mb: 4 , alignItems: "center", justifyContent:'center', alignContent: 'center', display: 'flex', flexDirection: 'column'}}>
                <Typography variant='h3'>Register</Typography>
                    <Stack direction={"row"} alignItems="center">
                    <Typography >Already have an account?</Typography>
                    <Link to="/login"><Typography >  Login here..</Typography></Link>
                    </Stack>
                </Box>
                <Box sx={{width: '100%',  }}>
                    <RegisterForm />
                </Box>
          </Box>
          
        </Box>
    </React.Fragment>
  )
}

export default Register