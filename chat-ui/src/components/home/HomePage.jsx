import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import homeimage from "../../assets/homeimage.svg"
import Login from "../login/Login";
import Header from "./Header";
import Hero from "./Hero";
const HomePage = () => {
  return (
   <React.Fragment>
    <Box >
    <Header />
    </Box>
   <Box >
   <Hero />
  
   </Box>
    
   </React.Fragment>
  );
};

export default HomePage;
