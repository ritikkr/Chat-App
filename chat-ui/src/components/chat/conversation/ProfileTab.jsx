import { Avatar, Box, ImageList, ImageListItem, Paper, Stack, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import login from "../../../assets/login.svg"

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];
const ProfileTab = ({profile, selectedId}) => {
  const [userDetail, setUserDetail] = useState([])


  useEffect(() => {
      axios.get(`/api/v1/user/${selectedId}`)
      .then((res) => {
        console.log(res.data);
        setUserDetail(res.data)
      })
     

  }, [selectedId])

  return (
   <Box sx={{ height: '100%', borderLeft: '1px solid black', background: "#F5f5f5"}}>
        <Box sx={{height: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <Avatar alt={userDetail.firstName}  sx={{height: 200, width: 200}}/>
            <Typography variant='h4' sx={{fontWeight:'bold', mt: 2}}>{userDetail.firstName}</Typography>
            <Typography variant='h7' >@{userDetail.userName}</Typography>
            <Typography variant='h7' >{userDetail.phoneNumber}</Typography>


            <Typography>Last seen 2:00 am</Typography>
        </Box>
        {/* <Box sx={{p:2}}>
          <Typography variant='h5' sx={{fontWeight: 'bold'}}>Attachments</Typography>
          <Box sx={{display: 'flex', flexWrap:'wrap'}}>
          <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {profile.filter((user) => user.id === selectedId)[0]?.userName && itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
          </Box>
          
          
        </Box> */}
   </Box>
  )
}

export default ProfileTab