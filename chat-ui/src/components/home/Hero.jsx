import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import homeimage from "../../assets/homeimage2.svg"

const Hero = () => {
    return (
        <Box sx={{display: 'flex', py: 8}} flexDirection={"row"} justifyContent={"space-between"} alignContent={"center"} alignItems={"center"}>
          <Box sx={{display: 'flex', width: '50%', p: 4}} flexDirection={"column"} justifyContent={"center"} alignContent={"center"} alignItems={"center"}>
            <Typography variant="h2">
              Welcome to RinChat App.
            </Typography>
            <Typography variant="description">
              Classic & feature rich.
            </Typography>
            <Link to="/login">
            <Button  variant="contained" size="large" sx={{fontWeight: 'bold'}}>
                Get Started
            </Button>
            </Link> 
          </Box>
          <Box sx={{display: 'flex', width: '50%', p: 4}} flexDirection={"row"} justifyContent={"center"} alignContent={"center"} alignItems={"center"}>
          <img src={homeimage} height={600} width={600}/>
          </Box>
        </Box>
      );
}

export default Hero