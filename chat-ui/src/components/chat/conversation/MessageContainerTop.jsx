import { Call, VideoCall } from "@mui/icons-material";
import { Avatar, Box, IconButton, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios";


const settings = [ 'Block', 'Report'];


const MessageContainerTop = ({profile, selectedId}) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (mLink) => {
    setSelectedMenu(mLink)
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [userDetail, setUserDetail] = React.useState([])


  useEffect(() => {
      axios.get(`/api/v1/user/${selectedId}`)
      .then((res) => {
        setUserDetail(res.data)
      })
     

  }, [selectedId])

  return (
    <Paper>
    <Box  sx={{ display: "flex",  p:1, width: '100%'}} justifyContent="space-between">
      <Box >
          <Stack direction="row" >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          <Stack direction={"column"}  sx={{ml:2}}>
          <Typography sx={{fontWeight: 'bold', fontSize: '20px'}}>{userDetail.firstName}</Typography>
          <Typography sx={{color: userDetail.online ? "Green": "black"}}>{userDetail.online ? "🟢 Online": "Offline"}</Typography>
          </Stack>
          </Stack>
      </Box>
      <Box>
        <Stack direction={"row"} spacing={3} sx={{mr: 4, mt: 1}} alignItems="center">
        {/* <IconButton><Call sx={{height: 30, width: 30}}/></IconButton>
        <IconButton><VideoCall sx={{height: 30, width: 30}}/></IconButton> */}
        <IconButton onClick={handleOpenUserMenu}><MoreVertIcon sx={{height: 30, width: 30}} /></IconButton>
        <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
        </Stack>
      </Box>
    </Box>
    </Paper>
  );
};

export default MessageContainerTop;
