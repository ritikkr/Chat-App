import { Delete, Done, Edit } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import { useAuth } from "../../hooks/useProvideAuth";
import { ClickAwayListener } from "@mui/base";
import axios from "axios";

const ShowText = ({ msg, selectedId }) => {
  const { user } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState(msg.text);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleClickAway = () => {
    console.log("user clicked awasy");
    setIsEdit(false)
  };

  const handleUpdateClick = () => {
    setIsEdit(false)
    console.log("api call for update message");
    axios.put(`/api/v1/message/${msg.id}/${inputValue}`)
    .then((res) => {
        console.log("Message updated succssfully");

    })
  }

  const handleDeleteClick = () => {
        axios.delete(`/api/v1/message/${msg.id}`)
        .then((res) => {
            console.log("message deleted sucessfully");
        })
  }

  return (
    <div
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
      style={{
        marginLeft: msg.fromUserId === user.id ? 0 : 2,
        marginRight: msg.fromUserId === user.Id ? 2 : 0,
        justifyContent: msg.fromUserId === user.id ? "flex-end" : "flex-start",
        display: "flex",
        flexDirection: "column",
        height: isEdit ? '120px' : '100px'
        
      }}
      
    >
      {msg.fromUserId === user.id && isHovering && <Stack
        direction={"row"}
        sx={{
          alignSelf: msg.fromUserId === user.id ? "flex-end" : "flex-start",
        }}
      >
        <Tooltip title="Edit Message">
          <IconButton onClick={() => setIsEdit(true)} >
            <Edit sx={{ height: 18, width: 18, color: "blue" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Message">
          <IconButton onClick={handleDeleteClick}>
            <Delete sx={{ height: 18, width: 18, color: "red" }} />
          </IconButton>
        </Tooltip>
      </Stack>}
      <Paper
        sx={{
          width: "fit-content",
          p: 2,
          borderRadius: "10px",
          alignSelf: msg.fromUserId === selectedId ? "flex-start" : "flex-end",
          minWidth: 50,
          background: !isEdit && msg.fromUserId === user.id && "#0d6efd",
          color: msg.fromUserId === user.id && 'white'
        }}
        
      >
        {!isEdit ? (
          <Typography sx={{ width: "fit-content", borderRadius: "10px" }} >
            {" "}
            {msg.text}
          </Typography>
        ) : (
          //   <h2>hi</h2>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ width: "fit-content", display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                <TextField value={inputValue} onChange={(e) => setInputValue(e.target.value)} sx={{width: 500}}   fullWidth />
                <IconButton onClick={handleUpdateClick}><Done sx={{ height: 18, width: 18, color: "green" }}/></IconButton>
            </Box>
          </ClickAwayListener>
        )}
      </Paper>
      <Typography
        sx={{
          ml: 2,
          alignSelf: msg.fromUserId === selectedId ? "flex-start" : "flex-end",
        }}
      >
        {new Date(msg.sentAt).toLocaleDateString().slice(0, 5) +
          " " +
          new Date(msg.sentAt).toLocaleTimeString().slice(0, 5)}
      </Typography>
      {/* <ClickAwayListener onClickAway={handleClickAway}>
        <Box sx={{ position: "relative" }}>
          <button type="button">Open menu dropdown</button>
        </Box>
      </ClickAwayListener> */}
    </div>
  );
};

export default ShowText;
